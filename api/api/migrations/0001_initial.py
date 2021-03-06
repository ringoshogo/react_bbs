# Generated by Django 2.2.17 on 2021-01-24 02:18

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50, verbose_name='食品名')),
                ('resId', models.CharField(max_length=50, verbose_name='レスポンスID')),
                ('created_at', models.DateField(auto_now_add=True, verbose_name='作成日')),
            ],
        ),
    ]
