from django.db import models
from django.contrib.auth.models import User

class Subreddit(models.Model):
    name = models.CharField(max_length=50, unique=True)
    display_name = models.CharField(max_length=50, unique=True)
    about = models.TextField(unique=True)
    date_created = models.DateTimeField(verbose_name='date created', auto_now_add=True)

    def __str__(self):
        return self.name

class Post(models.Model):
    title = models.CharField(max_length=300)
    content = models.TextField()
    date_created = models.DateTimeField(verbose_name="date_created", auto_now_add=True)
    date_edited = models.DateTimeField(verbose_name="date_edited", auto_now=True)
    author = models.ForeignKey(User, related_name="posts", on_delete=models.CASCADE)
    subreddit = models.ForeignKey(Subreddit, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["title", "subreddit"], name="sameTitle_in_sameSubreddit_notAllowed")
        ]

    def __str__(self):
        return self.title

class Comment(models.Model):
    content = models.TextField()
    date_created = models.DateTimeField(verbose_name="date_created", auto_now_add=True)
    date_edited = models.DateTimeField(verbose_name="date_edited", auto_now=True)
    author = models.ForeignKey(User, related_name="comments", on_delete=models.CASCADE)
    original_post = models.ForeignKey(Post, on_delete=models.CASCADE)
    parent_comment = models.ForeignKey("self", null=True, blank=True, related_name="child_comment", on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["content", "original_post", "author"], name="sameComment_in_samePost_by_sameAuthor_notAllowed")
        ]

    def __str__(self):
        return self.content

class Vote(models.Model):
    original_post = models.ForeignKey(Post, related_name="post_votes", on_delete=models.CASCADE, null=True)
    original_comment = models.ForeignKey(Comment, related_name="comment_votes", on_delete=models.CASCADE, null=True)
    owner = models.ForeignKey(User, related_name="votes", on_delete=models.CASCADE)
    vote_choice = models.IntegerField(choices=((1, "UP"), (2, "DOWN")))

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["original_post", "owner"], name="sameOwner_samePost_notAllowed"),
            models.UniqueConstraint(fields=["original_comment", "owner"], name="sameOwner_sameComment_notAllowed")
        ]