from rest_framework import viewsets, permissions
from .models import Property
from .serializers import PropertySerializer

class PropertyViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Vista para listar y ver detalles de propiedades. 
    En la FASE 1, cualquier usuario puede ver las propiedades (ReadOnly).
    """
    queryset = Property.objects.filter(is_active=True, is_verified=True)
    serializer_class = PropertySerializer
    permission_classes = [permissions.AllowAny]