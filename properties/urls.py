from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropertyViewSet

# El router genera automáticamente rutas como /api/properties/ y /api/properties/1/
router = DefaultRouter()
router.register(r'properties', PropertyViewSet, basename='property')

urlpatterns = [
    path('', include(router.urls)),
]