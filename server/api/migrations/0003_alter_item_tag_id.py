# Generated by Django 5.0.4 on 2024-06-01 20:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_item_tag_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='tag_id',
            field=models.CharField(max_length=20, unique=True),
        ),
    ]
