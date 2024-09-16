from django.contrib import admin
from .models import User, Department, Role, Employee, Project, ProjectMember, Task, TaskComment, Expense
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from .models import User

class CustomUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = User

class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User

class CustomUserAdmin(UserAdmin):
    form = CustomUserChangeForm
    add_form = CustomUserCreationForm
    model = User
    list_display = ('username', 'user_email', 'is_staff', 'is_active', 'get_groups')
    list_filter = ('is_staff', 'is_active', 'groups')
    fieldsets = (
        (None, {'fields': ('username', 'user_email', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'user_email', 'password1', 'password2', 'is_staff', 'is_active', 'groups')}
        ),
    )
    search_fields = ('username', 'user_email',)
    ordering = ('username',)

    def get_groups(self, obj):
        return obj.get_group_names()
    get_groups.short_description = 'Groups'

admin.site.register(User, CustomUserAdmin)


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('department_name', 'description', 'is_active')
    search_fields = ('department_name',)
    list_filter = ('is_active',)


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'department', 'is_active')
    search_fields = ('name', 'department__department_name')
    list_filter = ('department', 'is_active')


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'phone_no', 'user', 'department', 'role', 'is_active', 'salary')
    search_fields = ('first_name', 'last_name', 'user__user_email', 'department__department_name', 'role__name')
    list_filter = ('department', 'role', 'is_active')


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'start_date', 'end_date', 'department', 'project_expense', 'is_active')
    search_fields = ('title', 'department__department_name')
    list_filter = ('status', 'department', 'is_active')


@admin.register(ProjectMember)
class ProjectMemberAdmin(admin.ModelAdmin):
    list_display = ('project', 'employee')
    search_fields = ('project__title', 'employee__first_name', 'employee__last_name')
    list_filter = ('project', 'employee')


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'project', 'assigned_to', 'start_date', 'due_date', 'is_active')
    search_fields = ('title', 'project__title', 'assigned_to__first_name', 'assigned_to__last_name')
    list_filter = ('status', 'project', 'is_active')


@admin.register(TaskComment)
class TaskCommentAdmin(admin.ModelAdmin):
    list_display = ('task', 'employee', 'comment', 'date', 'is_active')
    search_fields = ('task__title', 'employee__first_name', 'employee__last_name')
    list_filter = ('task', 'employee', 'is_active')


@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('project', 'amount', 'description', 'date', 'is_active')
    search_fields = ('project__title', 'amount', 'description')
    list_filter = ('project', 'is_active')





# Register your models here.
# @admin.register(User)
# class UserAdmin(admin.ModelAdmin):
#     list_display = ('user_email', 'last_login', 'is_active', 'is_deleted')
#     search_fields = ('user_email',)
#     list_filter = ('is_active', 'is_deleted')

# from django.contrib import admin
# from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
# from django import forms
# from django.contrib.auth.forms import ReadOnlyPasswordHashField
# from django.core.exceptions import ValidationError
# from .models import User  # Import your custom user model

# # Define the user creation form
# class UserCreationForm(forms.ModelForm):
#     password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
#     password2 = forms.CharField(label='Password confirmation', widget=forms.PasswordInput)

#     class Meta:
#         model = User
#         fields = ('username', 'user_email',)

#     def clean_password2(self):
#         password1 = self.cleaned_data.get("password1")
#         password2 = self.cleaned_data.get("password2")
#         if password1 and password2 and password1 != password2:
#             raise ValidationError("Passwords don't match")
#         return password2

#     def save(self, commit=True):
#         user = super().save(commit=False)
#         user.set_password(self.cleaned_data["password1"])
#         if commit:
#             user.save()
#         return user

# # Define the user change form
# class UserChangeForm(forms.ModelForm):
#     password = ReadOnlyPasswordHashField()

#     class Meta:
#         model = User
#         fields = ('username', 'user_email', 'password', 'is_active', 'is_staff', 'is_superuser')

# # Define the UserAdmin class
# class UserAdmin(BaseUserAdmin):
#     form = UserChangeForm
#     add_form = UserCreationForm

#     list_display = ('username', 'user_email', 'is_active', 'is_staff', 'is_superuser')
#     list_filter = ('is_staff', 'is_superuser')
#     fieldsets = (
#         (None, {'fields': ('username', 'user_email', 'password')}),
#         ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
#         ('Important dates', {'fields': ('last_login', 'date_joined')}),
#     )
#     add_fieldsets = (
#         (None, {
#             'classes': ('wide',),
#             'fields': ('username', 'user_email', 'password1', 'password2'),
#         }),
#     )
#     search_fields = ('username', 'user_email')
#     ordering = ('username',)
#     filter_horizontal = ('groups', 'user_permissions',)

# # Register the custom user model with the custom UserAdmin
# admin.site.register(User, UserAdmin)

# Optional: Unregister the default Group model if not needed
# from django.contrib.auth.models import Group
# admin.site.unregister(Group)



# from django.contrib import admin
# from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
# from django.contrib.auth.models import Group
# from .models import User
# from django import forms
# from django.contrib.auth.forms import ReadOnlyPasswordHashField
# from django.core.exceptions import ValidationError

# class UserCreationForm(forms.ModelForm):
#     password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
#     password2 = forms.CharField(label='Password confirmation', widget=forms.PasswordInput)

#     class Meta:
#         model = User
#         fields = ('username', 'user_email', 'user_group')

#     def clean_password2(self):
#         password1 = self.cleaned_data.get("password1")
#         password2 = self.cleaned_data.get("password2")
#         if password1 and password2 and password1 != password2:
#             raise ValidationError("Passwords don't match")
#         return password2

#     def save(self, commit=True):
#         user = super().save(commit=False)
#         user.set_password(self.cleaned_data["password1"])
#         if commit:
#             user.save()
#         return user

# class UserChangeForm(forms.ModelForm):
#     password = ReadOnlyPasswordHashField()

#     class Meta:
#         model = User
#         fields = ('username', 'user_email', 'password', 'is_active', 'is_staff', 'is_superuser', 'user_group')

# class UserAdmin(BaseUserAdmin):
#     form = UserChangeForm
#     add_form = UserCreationForm

#     list_display = ('username', 'user_email', 'is_staff', 'is_superuser', 'user_group')
#     list_filter = ('is_staff', 'is_superuser', 'user_group')
#     fieldsets = (
#         (None, {'fields': ('username', 'user_email', 'password')}),
#         ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'user_group', 'groups', 'user_permissions')}),
#         ('Important dates', {'fields': ('last_login', 'date_joined')}),
#     )
#     add_fieldsets = (
#         (None, {
#             'classes': ('wide',),
#             'fields': ('username', 'user_email', 'user_group', 'password1', 'password2'),
#         }),
#     )
#     search_fields = ('username', 'user_email')
#     ordering = ('username',)
#     filter_horizontal = ('groups', 'user_permissions',)

#     def save_model(self, request, obj, form, change):
#         if not obj.is_superuser and not obj.is_staff and not obj.user_group:
#             obj.user_group = User.EMPLOYEE  # Default to Employee if not specified
#         super().save_model(request, obj, form, change)

# # Register the new UserAdmin
# admin.site.register(User, UserAdmin)

# Unregister the Group model from admin.
# admin.site.unregister(Group)
