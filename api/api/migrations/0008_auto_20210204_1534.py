# Generated by Django 3.0.8 on 2021-02-04 06:34

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20210204_1533'),
    ]

    operations = [
        migrations.AlterField(
            model_name='response',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2021, 2, 4, 15, 34, 19, 681589), verbose_name='作成日'),
        ),
    ]
