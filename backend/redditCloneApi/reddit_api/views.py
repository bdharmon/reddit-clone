from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Count
from rest_framework import filters
from rest_framework.filters import OrderingFilter
from rest_framework.response import Response
from rest_framework import generics, viewsets, permissions
from .models import Comment, Post, Subreddit, Vote
from .serializers import CommentSerializer, LoginSerializer, PostSerializer, SubredditSerializer, UserSerializer, RegisterSerializer, VoteSerializer
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
    queryset = Post.objects.annotate(vote_count=Count('post_votes'))
    serializer_class = PostSerializer

    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]

    # def get_queryset(self):
    #     qs = super().get_queryset()
    #     with_counts = qs.annotate(vote_count=Count('post_votes'))
    #     hotness_order = with_counts.order_by('-vote_count')
    #     return hotness_order

    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ["subreddit__name", "id"]
    ordering = ["-date_created"]
    ordering_fields = ["vote_count", "date_created"]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.author == request.user:
            instance.delete()
            return Response("Post deleted.")
        else:
            return Response("Unauthorized.")

class PostWithMostUpVotes(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        with_counts = qs.annotate(vote_count=Count('post_votes'))
        hotness_order = with_counts.order_by('-vote_count')
        return hotness_order

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["original_post"]

class VoteViewSet(viewsets.ModelViewSet):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer

    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ["original_post", "original_comment"]

class PostWithMostUpVotes(viewsets.ModelViewSet):
        def list(self, request, *args, **kwargs):
            queryset = Vote.objects.raw("SELECT id, original_post_id FROM reddit_api_vote WHERE original_post_id IS NOT NULL AND vote_choice='1' GROUP BY original_post_id ORDER BY count(vote_choice) DESC;")
            serializer = VoteSerializer(queryset, many=True)
            sorted_list = []
            for x in serializer.data:
                sorted_list.append(x["original_post"])
            return Response(sorted_list)