from rest_framework import viewsets, permissions, status
from rest_framework.response import Response as HttpResponse
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend # 完全一致以外の機能はfilters.pyにて実装する

from .models import Post, Response, GoodClickUser
from .permissions import IsAuthorOrReadOnly
from .serializers import PostSerializer, UserSerializer, ResponseSerializer, GoodClickUserSerializer

ROUND_VALUE = 3
CNT = "cnt"
TASTE = "taste"
APPEARANCE = "appearance"
CONDITION = "condition"
EXP_DICT = {
    1 : 1   ,
    2 : 2   ,
    3 : 3   ,
    5 : 5   ,
    11: 14  ,
    12: 21  ,
    13: 31  ,
    21: 92  ,
    23: 178 ,
    26: 273 ,
    29: 365 ,
    31: 730 ,
    32: 1095,
    33: 1825,
    35: 3650,
    39: 4000,
    # 1 : "1日"     ,
    # 2 : "2日"     ,
    # 3 : "3日"     ,
    # 5 : "4,5日"   ,
    # 11: "1~2週間" ,
    # 12: "2~3週間" ,
    # 13: "3~4週間" ,
    # 21: "1~3ヶ月" ,
    # 23: "3~6ヶ月" ,
    # 26: "6~9ヶ月" ,
    # 29: "9~12ヶ月",
    # 31: "1~2年"   ,
    # 32: "2~3年"   ,
    # 33: "3~5年"   ,
    # 35: "5~10年"  ,
    # 39: "10年~"
    }

class PostViewSet(viewsets.ModelViewSet):
    # アクセス権限を個別に制御する
    # permission_classes = (permissions.IsAuthenticated,)
    # ⇒　プロジェクトごとにアクセス権限を制御する
    # 　　setting.pyにpermissionを追加
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny]

    def list(self, request, *args, **kwargs):
        """文字列を指定する場合、その文字列のみに紐づく値を取得"""
        query = request.query_params.get("query", None)
        queryset = ""
        if query is None:
            queryset = Post.objects.all()
        else:
            queryset = Post.objects.filter(title__icontains=query)
        serializer = PostSerializer(queryset, many=True)

        return HttpResponse(serializer.data)
    
    def retrieve(self, request, *args, **kwargs):
        """既存のretrieveだとserializerのfood_imageのURLが絶対パスになってしまうため、自作する"""
        instance = self.get_object()
        serializer = PostSerializer(instance, many=False)        
        return HttpResponse(serializer.data)



    @action(detail=True)
    def graph_data(self, request, pk=None, *args, **kwargs):

        # 返却データの初期化
        result = []
        data = {}
        exp_date_list = [1,2,3,5,11,12,13,21,23,26,29,31,32,33,35,39] #LineChart
        # exp_date_list = [1,2,3,5,14,21,31,92,178,273,365,730,1095,1825,3650,4000]
        for list_elem in exp_date_list:
            data[list_elem] = {CNT: 0, TASTE: 0, CONDITION: 0, APPEARANCE: 0}

        # 味、見た目、状態の値を更新
        query = Response.objects.filter(post=pk)
        for e in query:
            cur_dict = data.get(e.expire_date)
            cur_dict[CNT] = cur_dict.get(CNT, 0) + 1
            cur_dict[TASTE] = cur_dict.get(TASTE, 0) + e.taste
            cur_dict[CONDITION] = cur_dict.get(CONDITION, 0) + e.condition
            cur_dict[APPEARANCE] = cur_dict.get(APPEARANCE, 0) + e.appearance
            data[e.expire_date] = cur_dict
        
        # barChart 用のデータに加工
        for list_elem in exp_date_list:
            cnt = data[list_elem].pop(CNT)
            if cnt > 0:
                data[list_elem][TASTE] = round(data[list_elem][TASTE] / cnt, ROUND_VALUE)
                data[list_elem][CONDITION] = round(data[list_elem][CONDITION] / cnt, ROUND_VALUE)
                data[list_elem][APPEARANCE] = round(data[list_elem][APPEARANCE] / cnt, ROUND_VALUE)
            exp_days = EXP_DICT[list_elem]
            result.append({"name": exp_days, TASTE: data[list_elem][TASTE], CONDITION: data[list_elem][CONDITION], APPEARANCE: data[list_elem][APPEARANCE]})

        return HttpResponse(result)




class UserViewSet(viewsets.ModelViewSet):
    # queryset を使用しない場合(get_querysetをオーバーライド)、urls.pyにbasenameを設定する必要がある
    # queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        """ログインユーザの情報のみを対象とする"""
        # スタッフ権限がある場合は全てのユーザを取得する
        if self.request.user.is_staff:
            return get_user_model().objects.select_related('profile').all()

        # スタッフ権限がない場合は、ログインユーザの情報のみを取得する
        user = self.request.user
        # select_relatedの引数はmodelsで指定したrelated_nameの値
        return get_user_model().objects.select_related('profile').filter(id=user.id)

class ResponseViewSet(viewsets.ModelViewSet):
    serializer_class = ResponseSerializer
    queryset = Response.objects.all()
    # filter_backends=[DjangoFilterBackend]
    # filterset_fields = ['post']

    def list(self, request, *args, **kwargs):

        # URLからパラメータが存在する場合
        queryset = Response.objects.none()
        # URLからパラメータを取得
        post = request.query_params.get('post', None)
        if post is not None:
            try:
                queryset = Response.objects.filter(post=post)
            except ValidationError:
                queryset = Response.objects.none()
        serializer = ResponseSerializer(queryset, many=True)
        return HttpResponse(serializer.data)

class GoodClickUserViewSet(viewsets.ModelViewSet):

    serializer_class = GoodClickUserSerializer
    queryset = GoodClickUser.objects.all()

# ユーザプロファイルの機能は必要なし
# class UserProfileViewSet(viewsets.ModelViewSet):
#     # queryset = UserProfile.objects.all()

#     serializer_class = UserProfileSerializer

#     def get_queryset(self):
#         user = self.request.user
#         # 外部キーの情報を取得する　ポイント2／2
#         return UserProfile.objects.select_related('user').filter(user=user)

#     # ドキュメント用に作成したが必要なしか？
#     # def get_serializer(self):
#     #     """APIドキュメント用"""
#     #     if self.action is "create":
#     #         return UserProfileSerializer()
#     #     return super().get_serializer()
