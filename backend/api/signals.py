from django.db.models.signals import post_save, post_migrate
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group

User = get_user_model()

@receiver(post_migrate)
def create_groups(sender, **kwargs):
    Group.objects.get_or_create(name='Employee')
    Group.objects.get_or_create(name='Project_manager')
    # Group.objects.get_or_create(name='Admin')

@receiver(post_save, sender=User)
def assign_group(sender, instance, created, **kwargs):
    if created and not instance.is_superuser and not instance.is_staff:
        group_name = instance.user_group or 'Employee'
        group, _ = Group.objects.get_or_create(name=group_name)
        instance.groups.add(group)