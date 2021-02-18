import uuid
from django.utils import timezone
from django.db import models
from django.contrib.auth.models import User
import os

def rename_path(filename, category):
    prefix = 'image/' + category + "/"
    name = str(uuid.uuid4()).replace('-','')
    ext = os.path.split(filename)[-1]
    return prefix + name + ext

def rename_food(self,filename):
    return rename_path(filename, 'food')

def rename_avator(self, filename):
    return rename_path(filename, 'avator')
            

class Post(models.Model):
    id = models.UUIDField('ID', primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(verbose_name='食品名',max_length=50)
    created_at = models.DateField(verbose_name="作成日",auto_now_add=True)
    food_image = models.ImageField(verbose_name="食品イメージ", null=True, blank=True, upload_to=rename_food)
    describe = models.TextField(verbose_name="説明", max_length=300, null=True, blank=True)

    def __str__(self):
        return self.title

class UserProfile(models.Model):
    """ユーザの写真を実装"""
    SEX = (
        (0, '不明'),
        (1, '男性'),
        (2, '女性'),
    )

    user = models.OneToOneField(User, verbose_name="ユーザ", on_delete=models.CASCADE, null=False, blank=False, help_text="ユーザ情報", related_name="profile")
    avator = models.ImageField(verbose_name="プロフィール画像", null=True, blank=True, help_text="プロフィール画像", upload_to=rename_avator)
    sex = models.SmallIntegerField(verbose_name="性別", choices=SEX, default=1)
    birthday = models.SmallIntegerField(verbose_name="誕生日")

class Response(models.Model):
    """各ポストに対するレスポンス"""
    SEX = (
        (0, '不明'),
        (1, '男性'),
        (2, '女性'),
    )
    id = models.UUIDField(verbose_name='ID', primary_key=True, default=uuid.uuid4, editable=False)
    post = models.ForeignKey(Post,verbose_name="スレッド", on_delete=models.CASCADE, null=False, blank=False, related_name="response")
    sex = models.SmallIntegerField(verbose_name="性別", choices=SEX)
    age = models.SmallIntegerField(verbose_name="年齢")
    userid = models.IntegerField(verbose_name="ユーザID")
    appearance = models.SmallIntegerField(verbose_name="見た目", default=1)
    taste = models.SmallIntegerField(verbose_name="味", default=1)
    condition = models.SmallIntegerField(verbose_name="健康状態", default=1)
    expire_date = models.SmallIntegerField(verbose_name="期限切れ後N日", default=1)
    expire_type = models.SmallIntegerField(verbose_name="賞味or消費", default=1) # 賞味期限か消費期限か
    comment = models.TextField(verbose_name="コメント", max_length=300, blank=True, null=True)
    # デフォルトの時間を入力する場合は、django.utils.timezone.nowをいれる
    created_at = models.DateTimeField(verbose_name="作成日", auto_now_add=True)

class GoodClickUser(models.Model):
    """各レスポンスに対するイイネボタン押下"""
    user = models.ForeignKey(User,verbose_name="ユーザ", on_delete=models.CASCADE)
    response = models.ForeignKey(Response, verbose_name="レスポンス", on_delete=models.CASCADE, related_name="goodClickUser")