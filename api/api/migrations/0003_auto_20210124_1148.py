# Generated by Django 2.2.17 on 2021-01-24 02:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20210124_1133'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='resId',
            new_name='res_id',
        ),
    ]
