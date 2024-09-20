from rest_framework import permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
import jwt
from django.db.models import Q
from backend import settings
from django.utils import timezone as django_timezone
from datetime import datetime,timezone
from rest_framework import permissions
from django.conf import settings



class IsAdmin(permissions.BasePermission):
    def has_permission(self,request,view):
        return request.user.is_superuser

class IsProjectManagerPermission(permissions.BasePermission):
    def has_permission(self, request,view):
        # Get the token from the Authorization header
        auth_header = request.headers.get('Authorization')
        
        if not auth_header or not auth_header.startswith('Bearer '):
            return False
        
        token = auth_header[len('Bearer '):]
        
        try:
            # Decode the JWT token
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            
            # Check the token expiration
            exp = payload.get('exp')
            
            exp_datetime = datetime.fromtimestamp(exp, tz=timezone.utc)
            if exp_datetime < django_timezone.now():
                return False
            
            # Check the role claim
            role = payload.get('role')
            if role == 'Project_manager' or request.user.is_superuser :
                print(payload)
                return True
            
            # Role is valid
            return False
        
        except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
            return False
    
class IsEmployeeOrProjectManagerPeermission(permissions.BasePermission) :
    def has_permission(self, request,view):
        # Get the token from the Authorization header
        auth_header = request.headers.get('Authorization')
        
        if not auth_header or not auth_header.startswith('Bearer '):
            return False
        
        token = auth_header[len('Bearer '):]
        
        try:
            # Decode the JWT token
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            
            # Check the token expiration
            exp = payload.get('exp')
            
            exp_datetime = datetime.fromtimestamp(exp, tz=timezone.utc)
            if exp_datetime < django_timezone.now():
                return False
            
            # Check the role claim
            role = payload.get('role')
            if (role == 'Project_manager' or role == 'Employee' or request.user.is_superuser) :
                print(payload)
                return True
            
            # Role is valid
            return False
        
        except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
            return False
