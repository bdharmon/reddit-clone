from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Account, Comment, Post, Subreddit
from .serializers import CommentSerializer, PostSerializer, RegisterAccountSerializer, LoginSerializer, SubredditSerializer
from knox.auth import AuthToken

# Create your views here.
class RegisterAccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = RegisterAccountSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": RegisterAccountSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

class LoginViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = LoginSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": LoginSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

# all subreddit pages (navbar selector)
class SubredditViewSet(viewsets.ModelViewSet):
    def list(self, request):
        queryset = Subreddit.objects.all()
        serializer = SubredditSerializer(queryset, many=True)
        return Response(serializer.data)

    lookup_field = "name"
    def retrieve(self, request, name=None):
        queryset = Subreddit.objects.get(name__icontains=name)
        serializer = SubredditSerializer(queryset)
        return Response(serializer.data)

# specific subreddit page
class SubredditDetailViewSet(viewsets.ModelViewSet):
    lookup_field = "name"
    def retrieve(self, request, name=None):
        queryset = Subreddit.objects.get(name__icontains=name)
        serializer = SubredditSerializer(queryset)
        return Response(serializer.data)

# All Posts
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["subreddit__name", "id"]

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["original_post"]