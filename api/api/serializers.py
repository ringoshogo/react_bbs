from rest_framework import serializers
from .models import Post, UserProfile, Response, GoodClickUser
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.core.exceptions import FieldError

class GoodClickUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = GoodClickUser
        fields = '__all__'

class ResponseSerializer(serializers.ModelSerializer):
    # 外部キーの要素をフィールドに追加する方法
    # ① models.py にて 子のフィールドに指定している親モデルに related_name を付与する(例：related_name="goodClickUser")
    # ② serializers.py にて 親のシリアライザークラスにて①の名前と同じフィールドを設定する(例：goodClickUser)
    # ③ serializers.py にて fieldsに②の変数名を指定する
    goodClickUser = GoodClickUserSerializer(many=True, read_only=True)

    class Meta:
        model = Response
        fields = ('id', 'sex', 'age', 'post', 'userid', 'appearance', 'taste', 'condition', 'expire_date', 'expire_type', 'comment', 'created_at', 'goodClickUser')


class PostSerializer(serializers.ModelSerializer):
    response = ResponseSerializer(many=True, read_only=True)

    class Meta:
        fields = ('id', 'title', 'created_at', 'response', 'describe', 'food_image')
        model = Post

    def create(self, validated_data):
        title = validated_data.get("title")
        instance = Post.objects.filter(title=title)
        if instance:
            raise FieldError("{}は既に登録されています。".format(title))
        post = Post.objects.create(**validated_data)
        return post

class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = ('avator', 'sex', 'birthday')

class UserSerializer(serializers.ModelSerializer):
    # 外部キーの情報を取得する　ポイント1／2
    profile = UserProfileSerializer()

    class Meta:
        model = get_user_model()
        fields =('id', 'username', 'email', 'password', 'profile')

    # 次のUrlを参照に作成。。https://www.django-rest-framework.org/api-guide/relations/
    # AttributeError が発生したが、以下対応で回避できた。
    # ① UserProfileモデルのonetoonefield の引数にrelated_name="profile"を追加する⇒上記変数名と合わせる
    # 注意点：127.0.0.1:8000/docs/で作成する場合にエラー⇒ setattr(instance, attr, value) に attr=profile, value={dict}が入っている可能性あり
    def create(self, validated_data):
        user_profile_data = validated_data.pop('profile')

        # ユーザの新規作成
        user_password = validated_data.pop('password')
        # パスワードが2つ存在する場合
        if 'password2' in validated_data:
            password2 = validated_data.pop('password2')
            if password != password2:
                raise Exception("パスワードとパスワード確認用に異なる値が入力されています。")
        # email が登録済みの場合
        email = validated_data.get('email')
        if User.objects.filter(email=email):
            raise Exception("既にEメールが登録済みです。")

        user = User(**validated_data)
        user.set_password(user_password)
        user.save()

        # ユーザプロファイルの新規作成
        UserProfile.objects.create(user=user, **user_profile_data)
        return user

    def update(self, instance, validated_data):
        """ユーザ、プロファイルの情報を更新する"""
        password = validated_data.pop("password", None)
        if not instance.check_password(password):
            raise Exception("パスワードが一致しません。password: ", password)

        # 入力データで値を更新する
        for attr, value in validated_data.items():

            # ユーザプロファイルの情報を更新
            if attr is "profile":

                for child_attr, child_value in value.items():
                    setattr(instance.profile, child_attr, child_value)
            # ユーザの情報を更新        
            else:
                instance_val = getattr(instance, attr)
                setattr(instance, attr, value)

        instance.profile.save()
        instance.save()
        return instance

class GoodClickUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = GoodClickUser
        fields = ('user', 'response')

    def create(self, validated_data):
        user = validated_data.get('user')
        response = validated_data.get('response')
        query = GoodClickUser.objects.filter(user=user, response=response)
        if query:
            raise FieldError("既にクリック済です。")
        return GoodClickUser.objects.create(**validated_data)
