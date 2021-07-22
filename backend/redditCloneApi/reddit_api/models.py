from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class MyAccountManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError("Users must have an email address.")
        if not username:
            raise ValueError("Users must have a username.")
        
        user = self.model(
            email = self.normalize_email(email),
            username = username
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password):
        user = self.create_user(
            email = self.normalize_email(email),
            username = username,
            password = password
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

# Create your models here.
class Account(AbstractBaseUser):
    email = models.EmailField(verbose_name="email", max_length=60, unique=True)
    username = models.CharField(max_length=30, unique=True)
    date_joined	= models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    objects = MyAccountManager()

    def __str__(self):
        return self.email
    
    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

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
    author = models.ForeignKey(Account, on_delete=models.CASCADE)
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
    author = models.ForeignKey(Account, on_delete=models.CASCADE)
    original_post = models.ForeignKey(Post, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["content", "original_post", "author"], name="sameComment_in_samePost_by_sameAuthor_notAllowed")
        ]

    def __str__(self):
        return self.content