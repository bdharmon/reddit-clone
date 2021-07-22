from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import CommentViewSet, PostViewSet, RegisterAccountViewSet, LoginViewSet, SubredditDetailViewSet, SubredditViewSet

router = routers.DefaultRouter()
router.register('register', RegisterAccountViewSet, 'register')
router.register('login', LoginViewSet, 'login')
router.register('subreddits', SubredditViewSet, 'subreddits')
router.register('r', SubredditDetailViewSet, 'r')
router.register('comments', CommentViewSet, 'comments')
router.register('', PostViewSet, '')

urlpatterns = [
    path('', include(router.urls)),
]
