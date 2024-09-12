from django.contrib import admin
from .models import User, Department, Role, Employee, Project, ProjectMember, Task, TaskComment, Expense

# Register your models here.
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('user_email', 'last_login', 'is_active', 'is_deleted')
    search_fields = ('user_email',)
    list_filter = ('is_active', 'is_deleted')


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('department_name', 'description', 'is_delete')
    search_fields = ('department_name',)
    list_filter = ('is_delete',)


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'department', 'is_delete')
    search_fields = ('name', 'department__department_name')
    list_filter = ('department', 'is_delete')


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'phone_no', 'user', 'department', 'role', 'is_active', 'is_delete', 'salary')
    search_fields = ('first_name', 'last_name', 'user__user_email', 'department__department_name', 'role__name')
    list_filter = ('department', 'role', 'is_active', 'is_delete')


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'start_date', 'end_date', 'department', 'project_expense', 'is_active', 'is_delete')
    search_fields = ('title', 'department__department_name')
    list_filter = ('status', 'department', 'is_active', 'is_delete')


@admin.register(ProjectMember)
class ProjectMemberAdmin(admin.ModelAdmin):
    list_display = ('project', 'employee')
    search_fields = ('project__title', 'employee__first_name', 'employee__last_name')
    list_filter = ('project', 'employee')


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'project', 'assigned_to', 'start_date', 'due_date', 'is_active', 'is_delete')
    search_fields = ('title', 'project__title', 'assigned_to__first_name', 'assigned_to__last_name')
    list_filter = ('status', 'project', 'is_active', 'is_delete')


@admin.register(TaskComment)
class TaskCommentAdmin(admin.ModelAdmin):
    list_display = ('task', 'employee', 'comment', 'date', 'is_delete')
    search_fields = ('task__title', 'employee__first_name', 'employee__last_name')
    list_filter = ('task', 'employee', 'is_delete')


@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('project', 'amount', 'description', 'date', 'is_delete')
    search_fields = ('project__title', 'amount', 'description')
    list_filter = ('project', 'is_delete')
