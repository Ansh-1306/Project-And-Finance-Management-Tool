from django.db import models
from django.contrib.auth.hashers import make_password

# Create your models here.
# class User(models.Model):
#     user_id = models.AutoField(primary_key=True)
#     user_email = models.EmailField(unique=True)
#     password = models.CharField(max_length=255)
#     last_login = models.DateTimeField(null=True, blank=True)
#     is_active = models.BooleanField(default=True)
#     is_deleted = models.BooleanField(default=False)

#     def save(self, *args, **kwargs):
#         # Encrypt the password before saving
#         if self.pk is None or 'password' in self.get_dirty_fields():
#             self.password = make_password(self.password)
#         super(User, self).save(*args, **kwargs)

#     def __str__(self):
#         return self.user_email




# from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
# from django.db import models
# from django.utils import timezone
# from django.contrib.auth.hashers import make_password

# class CustomUserManager(BaseUserManager):
#     def create_user(self, username, user_email, password=None, **extra_fields):
#         if not username:
#             raise ValueError('The Username field must be set')
#         if not user_email:
#             raise ValueError('The Email field must be set')
#         email = self.normalize_email(user_email)
#         user = self.model(username=username, user_email=email, **extra_fields)
#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, username, user_email, password=None, **extra_fields):
#         extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_superuser', True)

#         if extra_fields.get('is_staff') is not True:
#             raise ValueError('Superuser must have is_staff=True.')
#         if extra_fields.get('is_superuser') is not True:
#             raise ValueError('Superuser must have is_superuser=True.')

#         return self.create_user(username, user_email, password, **extra_fields)

# class User(AbstractBaseUser, PermissionsMixin):
#     user_id = models.AutoField(primary_key=True)
#     username = models.CharField(max_length=150, unique=True,default="default_username")
#     user_email = models.EmailField(unique=True)
#     password = models.CharField(max_length=255)
#     last_login = models.DateTimeField(null=True, blank=True)
#     is_active = models.BooleanField(default=True)
#     is_deleted = models.BooleanField(default=False)
#     is_staff = models.BooleanField(default=False)
#     date_joined = models.DateTimeField(default=timezone.now)

#     objects = CustomUserManager()

#     USERNAME_FIELD = 'username'
#     EMAIL_FIELD = 'user_email'
#     REQUIRED_FIELDS = ['user_email']

#     def _str_(self):
#         return self.username

#     def save(self, *args, **kwargs):
#         super().save(*args, **kwargs)














from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager, Group
from django.db import models
from django.utils import timezone
from django.core.exceptions import ValidationError

class CustomUserManager(BaseUserManager):
    def create_user(self, username, user_email, password=None, **extra_fields):
        if not username:
            raise ValueError('The Username field must be set')
        if not user_email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(user_email)
        user = self.model(username=username, user_email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, user_email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(username, user_email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=150, unique=True)
    user_email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    last_login = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    
    groups = models.ManyToManyField(
        Group,
        verbose_name='groups',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        related_name="custom_user_set",
        related_query_name="user",
    )

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'user_email'
    REQUIRED_FIELDS = ['user_email']

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        is_new = self.pk is None
        super().save(*args, **kwargs)
        if is_new and not self.is_superuser and not self.is_staff:
            employee_group, created = Group.objects.get_or_create(name='Employee')
            self.groups.add(employee_group)

    def clean(self):
        super().clean()
        if not self.is_superuser and not self.is_staff and not self.groups.exists():
            raise ValidationError("Non-admin users must belong to at least one group.")

    def get_group_names(self):
        return ", ".join([group.name for group in self.groups.all()])



























class Department(models.Model):
    department_id = models.AutoField(primary_key=True)
    department_name = models.CharField(max_length=50)
    description =models.TextField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Role(models.Model):
    role_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField()
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Employee(models.Model):
    employee_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone_no = models.CharField(max_length=20)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    date_of_birth = models.DateTimeField()
    joining_date = models.DateTimeField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    salary = models.FloatField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Project(models.Model):
    STATUS_CHOICES = [
        ('not_started', 'Not Started'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('on_hold', 'On Hold'),
    ]
    
    project_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    project_expense = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title

class ProjectMember(models.Model):
    id = models.AutoField(primary_key=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.employee} in {self.project}"

class Task(models.Model):
    STATUS_CHOICES = [
        ('not_started', 'Not Started'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('on_hold', 'On Hold'),
    ]
    
    task_id = models.AutoField(primary_key=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    assigned_to = models.ForeignKey(Employee, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    start_date = models.DateTimeField()
    due_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title

class TaskComment(models.Model):
    id = models.AutoField(primary_key=True)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    comment = models.TextField()
    date = models.DateTimeField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Comment by {self.employee} on {self.task}"

class Expense(models.Model):
    id = models.AutoField(primary_key=True)
    amount = models.FloatField()
    description = models.TextField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    date = models.DateTimeField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Expense for {self.project} on {self.date}"
