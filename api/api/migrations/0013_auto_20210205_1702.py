# Generated by Django 3.0.8 on 2021-02-05 08:02

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_auto_20210205_1552'),
    ]

    operations = [
        migrations.AlterField(
            model_name='response',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2021, 2, 5, 8, 2, 59, 156226, tzinfo=utc), verbose_name='作成日'),
        ),
    ]
