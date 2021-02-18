# Generated by Django 3.0.8 on 2021-02-12 13:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_auto_20210212_1329'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='describe',
            field=models.TextField(blank=True, max_length=300, null=True, verbose_name='説明'),
        ),
        migrations.AddField(
            model_name='post',
            name='food_image',
            field=models.ImageField(blank=True, null=True, upload_to='', verbose_name='食品イメージ'),
        ),
    ]