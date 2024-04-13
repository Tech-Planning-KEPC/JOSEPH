from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class Commitee(models.Model):
    id = models.AutoField(primary_key=True)
    commitee_name = models.CharField(max_length=40)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)


class Department(models.Model):
    id = models.AutoField(primary_key=True)
    dept_name = models.CharField(max_length=40)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, first_name, last_name, password, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(email=email, first_name=first_name,
                          last_name=last_name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, first_name, last_name, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, first_name, last_name, password, **extra_fields)

    def create_superuser(self, email, first_name, last_name, password, **extra_fields):
        user = self.create_user(
            email=email, password=password, first_name=first_name, last_name=last_name)
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    first_name = models.CharField(max_length=20, null=False)
    last_name = models.CharField(max_length=20, null=False)
    department = models.ForeignKey(
        Department, on_delete=models.CASCADE, related_name='department')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']


class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=40)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)


class Item(models.Model):
    id = models.AutoField(primary_key=True)
    item_type = models.CharField(max_length=20, blank=True)
    tag_id = models.CharField(max_length=30, blank=True)
    name = models.CharField(max_length=40, blank=True)
    brand = models.CharField(max_length=20, blank=True)
    model = models.CharField(max_length=20, blank=True)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name='items')
    quantity = models.IntegerField(default=1)
    serial = models.CharField(max_length=40, null=True, blank=True)
    price = models.DecimalField(
        decimal_places=2, max_digits=10, null=True, default=0)
    tax = models.DecimalField(
        decimal_places=2, max_digits=10, null=True, default=0)
    bought_at = models.DateField(null=True)
    department = models.ForeignKey(
        Department, on_delete=models.CASCADE, related_name='items')
    status = models.CharField(max_length=20, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
