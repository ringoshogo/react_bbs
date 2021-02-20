"""bbs URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.schemas import get_schema_view # 追加
from rest_framework.documentation import include_docs_urls # 追加
from django.contrib.staticfiles.urls import static #追加
from django.contrib.staticfiles.urls import staticfiles_urlpatterns #追加
from django.conf import settings #追加

schema_view = get_schema_view(title='Blog API') # 追加

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('api.urls')),
    path('api-auth', include('rest_framework.urls')), # ログイン機能 ＋ 権限制御制御
    path('api/v1/rest-auth/', include('rest_auth.urls')), # 認証 ログイン／ログアウト／リセット／リセット確認
    # path('api/v1/rest-auth/registration/',
    #      include('rest_auth.registration.urls')), # サインアップ(新規登録)
    path('docs/', include_docs_urls(title='Blog API')), # ドキュメント
    path('schema/', schema_view), # ドキュメント
    
]

#画像用に追加
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)