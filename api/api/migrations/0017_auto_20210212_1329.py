# Generated by Django 3.0.8 on 2021-02-12 04:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_auto_20210209_1821'),
    ]

    operations = [
        migrations.AlterField(
            model_name='goodclickuser',
            name='response',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='goodClickUser', to='api.Response', verbose_name='レスポンス'),
        ),
    ]