from rest_framework import serializers
from .models import Property, PropertyImage

class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ['id', 'image', 'is_main']

class PropertySerializer(serializers.ModelSerializer):
    # Traemos las imágenes asociadas a la propiedad
    images = PropertyImageSerializer(many=True, read_only=True)
    # Mostramos el nombre del departamento en lugar de la clave técnica
    department_display = serializers.CharField(source='get_department_display', read_only=True)

    class Meta:
        model = Property;
        fields = [
            'id', 'title', 'description', 'price_per_day', 
            'capacity', 'department', 'department_display',
            'latitude', 'longitude', 'whatsapp_number', 
            'is_verified', 'images'
        ]