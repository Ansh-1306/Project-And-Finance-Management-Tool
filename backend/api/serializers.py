from rest_framework import serializers
from .models import User
from django.contrib.auth.hashers import make_password
from .models import Department, Role, Employee, Project, Task, Expense




 
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_id', 'user_email','username','is_superuser', 'password', 'last_login', 'is_active']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        # Hash the password before saving
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

    def update(self, instance, validated_data):
        # Hash the password if it is being updated
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        return super().update(instance, validated_data)



class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class RoleSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer(read_only=True)
    
    class Meta:
        model = Role
        fields = '__all__'

class EmployeeSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    department = DepartmentSerializer(read_only=True)
    role = RoleSerializer(read_only=True)

    class Meta:
        model = Employee
        fields = '__all__'  


class ProjectSerializer(serializers.ModelSerializer):
    members = EmployeeSerializer(many=True, read_only=True)
    department = DepartmentSerializer(read_only=True)


    class Meta:
        model = Project
        fields = '__all__' 


class TaskSerializer(serializers.ModelSerializer):
    project = ProjectSerializer(read_only=True)
    assigned_to = EmployeeSerializer(read_only=True)

    class Meta:
        model = Task
        fields = '__all__'


class ExpenseSerializer(serializers.ModelSerializer):
    project = ProjectSerializer(read_only=True)

    class Meta:
        model = Expense
        fields = '__all__'
