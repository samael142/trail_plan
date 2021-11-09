# Generated by Django 3.2.9 on 2021-11-07 13:44

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Table',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('name', models.CharField(max_length=128)),
                ('created', models.DateField(auto_now_add=True)),
                ('updated', models.DateField(auto_now=True)),
                ('locked', models.BooleanField(default=False)),
                ('admin', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='table_admin', to=settings.AUTH_USER_MODEL)),
                ('users', models.ManyToManyField(related_name='table_users', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='TableEntry',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('good', models.CharField(max_length=64)),
                ('quantity', models.PositiveIntegerField(blank=True)),
                ('unit', models.CharField(blank=True, max_length=16)),
                ('price', models.PositiveIntegerField(blank=True)),
                ('locked', models.BooleanField(default=False)),
                ('table', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mainapp.table')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='entry_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Friend',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=False)),
                ('user1', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user', to=settings.AUTH_USER_MODEL)),
                ('user2', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_friend', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
