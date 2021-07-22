# Generated by Django 3.2.5 on 2021-07-21 18:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reddit_api', '0007_subreddit_display_name'),
    ]

    operations = [
        migrations.AddConstraint(
            model_name='post',
            constraint=models.UniqueConstraint(fields=('title', 'subreddit'), name='sameTitle_in_sameSubreddit_notAllowed'),
        ),
    ]
