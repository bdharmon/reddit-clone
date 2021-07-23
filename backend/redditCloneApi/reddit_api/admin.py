from django.contrib import admin
from .models import Comment, Post, Subreddit

# Register your models here.
admin.site.register(Subreddit)
admin.site.register(Post)
admin.site.register(Comment)