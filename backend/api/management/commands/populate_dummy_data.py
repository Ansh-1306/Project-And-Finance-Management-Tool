import random
from django.core.management.base import BaseCommand
from api.models import User, Department, Role, Employee, Project, Task, Expense
from django.utils import timezone
from django.contrib.auth.models import Group

class Command(BaseCommand):
    help = 'Populates the database with dummy data'

    def handle(self, *args, **kwargs):
        # Create departments
        department_names = ['IT', 'HR', 'Finance', 'Sales']
        departments = []
        for name in department_names:
            department, created = Department.objects.get_or_create(department_name=name, description=f"{name} Department")
            departments.append(department)

        # Create roles
        role_names = ['Developer', 'Manager', 'Analyst']
        roles = []
        for name in role_names:
            role, created = Role.objects.get_or_create(name=name, description=f"{name} Role", department=random.choice(departments))
            roles.append(role)

        # Create groups
        employee_group, created = Group.objects.get_or_create(name="Employee")

        # Create users
        users = []
        for i in range(1, 6):
            user, created = User.objects.get_or_create(
                username=f'user{i}', user_email=f'user{i}@example.com', is_active=True, is_staff=False
            )
            if created:
                user.set_password('password123')
                user.groups.add(employee_group)
                user.save()
            users.append(user)

        # Create employees
        employees = []
        for i, user in enumerate(users):
            employee, created = Employee.objects.get_or_create(
                first_name=f'First{i}', last_name=f'Last{i}', phone_no=f'12345678{i}',
                user=user, department=random.choice(departments), role=random.choice(roles),
                date_of_birth=timezone.now() - timezone.timedelta(days=10000),
                joining_date=timezone.now() - timezone.timedelta(days=365 * random.randint(1, 5)),
                salary=round(random.uniform(40000, 90000)), is_active=True
            )
            employees.append(employee)

        # Create projects
        projects = []
        for i in range(3):
            project, created = Project.objects.get_or_create(
                title=f'Project {i}', description='Sample project description',
                start_date=timezone.now() - timezone.timedelta(days=365), 
                end_date=timezone.now() + timezone.timedelta(days=365),
                status=random.choice(['not_started', 'in_progress', 'completed', 'on_hold']),
                department=random.choice(departments),
                project_expense=round(random.uniform(10000, 50000)),
                is_active=True
            )
            projects.append(project)

        # Create tasks
        tasks = []
        for project in projects:
            for i in range(5):
                task, created = Task.objects.get_or_create(
                    project=project,
                    title=f'Task {i} for {project.title}', 
                    description='Task description here',
                    assigned_to=random.choice(employees),
                    status=random.choice(['not_started', 'in_progress', 'completed', 'on_hold']),
                    start_date=timezone.now() - timezone.timedelta(days=random.randint(1, 10)),
                    due_date=timezone.now() + timezone.timedelta(days=random.randint(10, 20)),
                    is_active=True
                )
                tasks.append(task)

        # Create expenses
        for project in projects:
            for i in range(3):
                Expense.objects.get_or_create(
                    project=project,
                    amount=round(random.uniform(100, 1000)),
                    description=f'Expense {i} for project {project.title}',
                    date=timezone.now() - timezone.timedelta(days=random.randint(1, 10)),
                    is_active=True
                )

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with dummy data'))
