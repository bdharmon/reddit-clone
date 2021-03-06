# Generated by Django 3.2.5 on 2021-07-25 00:39

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Subreddit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('display_name', models.CharField(max_length=50, unique=True)),
                ('about', models.TextField(unique=True)),
                ('date_created', models.DateTimeField(auto_now_add=True, verbose_name='date created')),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=300)),
                ('content', models.TextField()),
                ('date_created', models.DateTimeField(auto_now_add=True, verbose_name='date_created')),
                ('date_edited', models.DateTimeField(auto_now=True, verbose_name='date_edited')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posts', to=settings.AUTH_USER_MODEL)),
                ('subreddit', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='reddit_api.subreddit')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('date_created', models.DateTimeField(auto_now_add=True, verbose_name='date_created')),
                ('date_edited', models.DateTimeField(auto_now=True, verbose_name='date_edited')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to=settings.AUTH_USER_MODEL)),
                ('original_post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='reddit_api.post')),
                ('parent_comment', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='child_comment', to='reddit_api.comment')),
            ],
        ),
        migrations.AddConstraint(
            model_name='post',
            constraint=models.UniqueConstraint(fields=('title', 'subreddit'), name='sameTitle_in_sameSubreddit_notAllowed'),
        ),
        migrations.AddConstraint(
            model_name='comment',
            constraint=models.UniqueConstraint(fields=('content', 'original_post', 'author'), name='sameComment_in_samePost_by_sameAuthor_notAllowed'),
        ),
    ]
