from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import PostViewSet, UserViewSet, ResponseViewSet, GoodClickUserViewSet

# post_list = PostViewSet.as_view({
#     'get': 'list',
#     'post': 'create'
# })
# post_detail = PostViewSet.as_view({
#     'get': 'retrieve',
#     'put': 'update',
#     'patch': 'partial_update',
#     'delete': 'destroy'
# })
# urlpatterns = [
#     path('posts/', post_list),
#     path('posts/<str:pk>', post_detail),
# ]
# ⇒ routerでViewSetのURL設定を簡素化する。
router = DefaultRouter()
router.register(r'posts', PostViewSet, basename='posts')
router.register(r'users', UserViewSet, basename='users')
router.register(r'response', ResponseViewSet, basename='response')
router.register(r'goodclickuser', GoodClickUserViewSet, basename='goodclickuser')
# router.register(r'users_profile', UserProfileViewSet, basename='user_profile')
# basename は url になる


urlpatterns = [
    path('', include(router.urls)),
]