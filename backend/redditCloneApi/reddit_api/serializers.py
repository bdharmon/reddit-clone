from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import Account, Comment, Post, Subreddit

class RegisterAccountSerializer(serializers.ModelSerializer):

    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = Account
        fields = ['email', 'username', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def create(self, validated_data):
        if self.validated_data['password'] == self.validated_data['password2']:
            user = Account.objects.create_user(validated_data['email'], validated_data['username'], validated_data['password'])
            return user
        else:
            raise serializers.ValidationError({"Password": "Passwords must match."})

class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    
    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        else:
            raise serializers.ValidationError("Invalid Credentials.")

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