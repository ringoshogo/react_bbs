# Generated by Django 3.0.8 on 2021-02-04 14:16

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0010_auto_20210204_2309'),
    ]

    operations = [
        migrations.AlterField(
            model_name='response',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2021, 2, 4, 23, 16, 53, 406366), verbose_name='作成日'),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='user',
            field=models.OneToOneField(help_text='ユーザ情報', on_delete=django.db.models.deletion.CASCADE, related_name='profile', to=settings.AUTH_USER_MODEL, verbose_name='ユーザ'),
        ),
    ]
