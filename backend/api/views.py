from django.shortcuts import render
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import Group
from .permissions import ProjectManagerOrAdminPermission,EmployeeorAdminPermission,IsAdmin,IsEmployeePermission,IsProjectManagerPermission
from .models import User
from .serializers import UserSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Department, Role, Employee, Project, ProjectMember, Task, TaskComment, Expense
from .serializers import (
    DepartmentSerializer, RoleSerializer, EmployeeSerializer, ProjectSerializer,
    ProjectMemberSerializer, TaskSerializer, TaskCommentSerializer, ExpenseSerializer
)
    
    
 


# View to render the HTML page at the root path

    
    
#Custom jwt tokenclass

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
    queryset = User.objects.filter(is_deleted=False)
    serializer_class = UserSerializer
    permission_classes=[IsAuthenticated,IsAdmin]

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.filter(is_deleted=False)
    serializer_class = UserSerializer
    permission_classes=[IsAuthenticated,IsAdmin]
    def delete(self, request, *args, **kwargs):
        # Perform a soft delete by setting `is_deleted` to True
        instance = self.get_object()
        instance.is_deleted = True
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
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes=[IsAuthenticated,IsAdmin]

class EmployeeRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employee.objects.all()
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

# ProjectMember Views
class ProjectMemberListCreateAPIView(generics.ListCreateAPIView):
    queryset = ProjectMember.objects.all()
    serializer_class = ProjectMemberSerializer
    permission_classes=[IsAuthenticated,IsProjectManagerPermission]

class ProjectMemberRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProjectMember.objects.all()
    serializer_class = ProjectMemberSerializer
    permission_classes=[IsAuthenticated,IsProjectManagerPermission]

# Task Views
class TaskListCreateAPIView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes=[IsAuthenticated,IsEmployeePermission,IsProjectManagerPermission]

class TaskRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes=[IsAuthenticated,IsEmployeePermission,IsProjectManagerPermission]

# TaskComment Views
class TaskCommentListCreateAPIView(generics.ListCreateAPIView):
    queryset = TaskComment.objects.all()
    serializer_class = TaskCommentSerializer
    permission_classes=[IsAuthenticated,IsEmployeePermission,IsProjectManagerPermission]

class TaskCommentRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TaskComment.objects.all()
    serializer_class = TaskCommentSerializer
    permission_classes=[IsAuthenticated,IsEmployeePermission,IsProjectManagerPermission]

# Expense Views
class ExpenseListCreateAPIView(generics.ListCreateAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes=[IsAuthenticated,IsAdmin]

class ExpenseRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes=[IsAuthenticated,IsAdmin]