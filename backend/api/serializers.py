from rest_framework import serializers
from .models import User
from django.contrib.auth.hashers import make_password
from .models import Department, Role, Employee, Project, ProjectMember, Task, TaskComment, Expense




 
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_id', 'user_email', 'encrypted_password', 'last_login', 'is_active', 'is_deleted']
        extra_kwargs = {
            'encrypted_password': {'write_only': True}
        }

    def create(self, validated_data):
        # Hash the password before saving
        validated_data['encrypted_password'] = make_password(validated_data['encrypted_password'])
        return super().create(validated_data)

    def update(self, instance, validated_data):
        # Hash the password if it is being updated
        if 'encrypted_password' in validated_data:
            validated_data['encrypted_password'] = make_password(validated_data['encrypted_password'])
        return super().update(instance, validated_data)



class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class ProjectMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectMember
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

class TaskCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskComment
        fields = '__all__'

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'
