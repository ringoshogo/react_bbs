# Generated by Django 3.0.8 on 2021-02-05 06:52

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_auto_20210204_2316'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='response',
            name='birthday',
        ),
        migrations.RemoveField(
            model_name='response',
            name='user',
        ),
        migrations.AddField(
            model_name='response',
            name='age',
            field=models.SmallIntegerField(default=21, verbose_name='年齢'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='response',
            name='userid',
            field=models.IntegerField(default=22, verbose_name='ユーザID'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='response',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2021, 2, 5, 15, 51, 31, 580085), verbose_name='作成日'),
        ),
    ]
