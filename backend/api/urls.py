from django.urls import path
from . import views
from .views import UserListCreateView, UserDetailView
from .views import (
    DepartmentListCreateAPIView, DepartmentRetrieveUpdateDestroyAPIView,
    RoleListCreateAPIView, RoleRetrieveUpdateDestroyAPIView,
    EmployeeListCreateAPIView, EmployeeRetrieveUpdateDestroyAPIView,
    ProjectListCreateAPIView, ProjectRetrieveUpdateDestroyAPIView,
    ProjectMemberListCreateAPIView, ProjectMemberRetrieveUpdateDestroyAPIView,
    TaskListCreateAPIView, TaskRetrieveUpdateDestroyAPIView,
    TaskCommentListCreateAPIView, TaskCommentRetrieveUpdateDestroyAPIView,
    ExpenseListCreateAPIView, ExpenseRetrieveUpdateDestroyAPIView
)
from rest_framework_simplejwt.views import TokenRefreshView
from .views import CustomTokenObtainPairView


urlpatterns = [ # Path to handle form submission
     path('users/', UserListCreateView.as_view(), name='user-list-create'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    
    
    
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Department URLs
    path('departments/', DepartmentListCreateAPIView.as_view(), name='department-list-create'),
    path('departments/<int:pk>/', DepartmentRetrieveUpdateDestroyAPIView.as_view(), name='department-retrieve-update-destroy'),
    
    # Role URLs
    path('roles/', RoleListCreateAPIView.as_view(), name='role-list-create'),
    path('roles/<int:pk>/', RoleRetrieveUpdateDestroyAPIView.as_view(), name='role-retrieve-update-destroy'),
    
    # Employee URLs
    path('employees/', EmployeeListCreateAPIView.as_view(), name='employee-list-create'),
    path('employees/<int:pk>/', EmployeeRetrieveUpdateDestroyAPIView.as_view(), name='employee-retrieve-update-destroy'),
    
    # Project URLs
    path('projects/', ProjectListCreateAPIView.as_view(), name='project-list-create'),
    path('projects/<int:pk>/', ProjectRetrieveUpdateDestroyAPIView.as_view(), name='project-retrieve-update-destroy'),
    
    # ProjectMember URLs
    path('project-members/', ProjectMemberListCreateAPIView.as_view(), name='project-member-list-create'),
    path('project-members/<int:pk>/', ProjectMemberRetrieveUpdateDestroyAPIView.as_view(), name='project-member-retrieve-update-destroy'),
    
    # Task URLs
    path('tasks/', TaskListCreateAPIView.as_view(), name='task-list-create'),
    path('tasks/<int:pk>/', TaskRetrieveUpdateDestroyAPIView.as_view(), name='task-retrieve-update-destroy'),
    
    # TaskComment URLs
    path('task-comments/', TaskCommentListCreateAPIView.as_view(), name='task-comment-list-create'),
    path('task-comments/<int:pk>/', TaskCommentRetrieveUpdateDestroyAPIView.as_view(), name='task-comment-retrieve-update-destroy'),
    
    # Expense URLs
    path('expenses/', ExpenseListCreateAPIView.as_view(), name='expense-list-create'),
    path('expenses/<int:pk>/', ExpenseRetrieveUpdateDestroyAPIView.as_view(), name='expense-retrieve-update-destroy'),
]





