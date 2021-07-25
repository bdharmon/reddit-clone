from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.response import Response
from rest_framework import generics, viewsets, permissions
from .models import Comment, Post, Subreddit
from .serializers import CommentSerializer, LoginSerializer, PostSerializer, SubredditSerializer, UserSerializer, RegisterSerializer
from knox.models import AuthToken

# Register API
class RegisterAPI(viewsets.ModelViewSet):
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

# Login API
class LoginAPI(viewsets.ModelViewSet):
    serializer_class = LoginSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

# Get User API
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

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
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]

    lookup_field = "name"
    def retrieve(self, request, name=None):
        queryset = Subreddit.objects.get(name__icontains=name)
        serializer = SubredditSerializer(queryset)
        return Response(serializer.data)

# All Posts
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["subreddit__name", "id"]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.author == request.user:
            instance.delete()
            return Response("Post deleted.")
        else:
            return Response("Unauthorized.")


        

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["original_post"]