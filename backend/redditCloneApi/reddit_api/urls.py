from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .views import CommentViewSet, LoginAPI, PostViewSet, PostWithMostUpVotes, SubredditDetailViewSet, SubredditViewSet, RegisterAPI, UserAPI, VoteViewSet
from knox import views as knox_views

router = routers.DefaultRouter()
router.register('subreddits', SubredditViewSet, 'subreddits')
router.register('votes', VoteViewSet, 'votes')
router.register('mostupvotes', PostWithMostUpVotes, 'mostupvotes')
router.register('r', SubredditDetailViewSet, 'r')
router.register('comments', CommentViewSet, 'comments')
router.register('', PostViewSet, '')
router.register("api/auth/register", RegisterAPI, 'register')
router.register("api/auth/login", LoginAPI, 'login')

urlpatterns = [
    path('', include(router.urls)),
    path('api/auth', include('knox.urls')),
    path("api/auth/user", UserAPI.as_view()),
    path("api/auth/logout", knox_views.LogoutView.as_view(), name='knox_logout')
]
