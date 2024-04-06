from django.db import models


class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=40)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)


class Department(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=40)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)


class Item(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=40)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name='items')
    department = models.ForeignKey(
        Department, on_delete=models.CASCADE, related_name='items')
    serial = models.CharField(max_length=40, null=True)
    price = models.DecimalField(decimal_places=2, max_digits=20, null=True)
    bought_at = models.DateField(null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
