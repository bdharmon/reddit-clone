from django.contrib import admin
from .models import Account, Comment, Post, Subreddit

# Register your models here.
admin.site.register(Account)
admin.site.register(Subreddit)
admin.site.register(Post)
admin.site.register(Comment)