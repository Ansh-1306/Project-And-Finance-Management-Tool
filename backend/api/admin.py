from django.contrib import admin
from .models import User, Department, Role, Employee, Project, Task, Expense
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


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'project', 'assigned_to', 'start_date', 'due_date', 'is_active')
    search_fields = ('title', 'project__title', 'assigned_to__first_name', 'assigned_to__last_name')
    list_filter = ('status', 'project', 'is_active')

@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('project', 'amount', 'description', 'date', 'is_active')
    search_fields = ('project__title', 'amount', 'description')
    list_filter = ('project', 'is_active')





