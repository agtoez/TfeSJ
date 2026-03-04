from django.urls import path
from .views import RegisterView, UserProfileView

urlpatterns = [
    # Al estar incluido con 'api/', esta ruta será 'api/register/'
    path('register/', RegisterView.as_view(), name='auth_register'),
    
    # Esta ruta será 'api/profile/'
    path('profile/', UserProfileView.as_view(), name='user_profile'),
]