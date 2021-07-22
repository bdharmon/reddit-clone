# Generated by Django 3.2.5 on 2021-07-20 17:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('reddit_api', '0002_subreddit'),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=300)),
                ('content', models.TextField()),
                ('date_created', models.DateTimeField(auto_now_add=True, verbose_name='date_created')),
                ('date_edited', models.DateTimeField(auto_now=True, verbose_name='date_edited')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('subreddit', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='reddit_api.subreddit')),
            ],
        ),
    ]
