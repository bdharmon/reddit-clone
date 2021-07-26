from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import Comment, Post, Subreddit, Vote

# User serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]

# Register serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data["username"], validated_data["email"], validated_data["password"])

        return user

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "password"]
    
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials.")

class SubredditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subreddit
        fields = "__all__"

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"

    def to_representation(self, instance):
        rep = super(PostSerializer, self).to_representation(instance)
        rep["author"] = instance.author.username
        rep["subreddit"] = instance.subreddit.name
        rep["date_created"] = instance.date_created.date()
        return rep

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"

    def to_representation(self, instance):
        rep = super(CommentSerializer, self).to_representation(instance)
        rep["author"] = instance.author.username
        rep["original_post"] = instance.original_post.title
        rep["date_created"] = instance.date_created.date()
        return rep

class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = "__all__"
    
    def to_representation(self, instance):
        rep = super(VoteSerializer, self).to_representation(instance)
        rep["owner"] = instance.owner.username
        return rep