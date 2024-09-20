from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import Group
from .permissions import  IsAdmin,IsProjectManagerPermission,IsEmployeeOrProjectManagerPeermission
from .models import User
from .serializers import UserSerializer
from .models import Department, Role, Employee, Project, Task, Expense
from .serializers import (
    DepartmentSerializer, RoleSerializer, EmployeeSerializer, ProjectSerializer,TaskSerializer, ExpenseSerializer
)

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        
        # Get the user's group (assuming a user belongs to only one group)
        user_group = Group.objects.filter(user=user).first()
        if user_group:
            token['role'] = user_group.name
        else:
            token['role'] = 'No Group'

        return token
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


#user table api views
class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.prefetch_related('groups').filter(is_active=True)
    serializer_class = UserSerializer
    permission_classes=[IsAuthenticated,IsAdmin]

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.prefetch_related('groups').filter(is_active=True)
    serializer_class = UserSerializer
    permission_classes=[IsAuthenticated,IsAdmin]
    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
# Department Views
class DepartmentListCreateAPIView(generics.ListCreateAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes=[IsAuthenticated,IsAdmin]

class DepartmentRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes=[IsAuthenticated,IsAdmin]

# Role Views
class RoleListCreateAPIView(generics.ListCreateAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes=[IsAuthenticated,IsAdmin]

class RoleRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes=[IsAuthenticated,IsAdmin]

# Employee Views
class EmployeeListCreateAPIView(generics.ListCreateAPIView):
    queryset = Employee.objects.select_related('user', 'department', 'role').all()
    serializer_class = EmployeeSerializer
    permission_classes=[IsAuthenticated,IsAdmin]

class EmployeeRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employee.objects.select_related('user', 'department', 'role').all()
    serializer_class = EmployeeSerializer
    permission_classes=[IsAuthenticated,IsAdmin]

# Project Views
class ProjectListCreateAPIView(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes=[IsAuthenticated,IsProjectManagerPermission]

class ProjectRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes=[IsAuthenticated,IsProjectManagerPermission]

# Task Views
class TaskListCreateAPIView(generics.ListCreateAPIView):
    queryset = Task.objects.select_related('project', 'assigned_to').all()
    serializer_class = TaskSerializer
    permission_classes=[IsAuthenticated, IsEmployeeOrProjectManagerPeermission]

class TaskRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.select_related('project', 'assigned_to').all()
    serializer_class = TaskSerializer
    permission_classes=[IsAuthenticated, IsEmployeeOrProjectManagerPeermission]

# Expense Views
class ExpenseListCreateAPIView(generics.ListCreateAPIView):
    queryset = Expense.objects.select_related('project').all()
    serializer_class = ExpenseSerializer
    permission_classes=[IsAuthenticated,IsAdmin]

class ExpenseRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Expense.objects.select_related('project').all()
    serializer_class = ExpenseSerializer
    permission_classes=[IsAuthenticated,IsAdmin]