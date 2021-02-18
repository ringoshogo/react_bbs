from django.contrib import admin
from .models import Post, UserProfile, Response


# 作成したモデルをDjango Adminで追加、編集、削除できるようにする
admin.site.register(Post)
admin.site.register(UserProfile)
admin.site.register(Response)
