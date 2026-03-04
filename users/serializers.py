from rest_framework import serializers
from .models import User

class UserRegistrationSerializer(serializers.ModelSerializer):
    # La contraseña no se devuelve en el JSON por seguridad
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'role', 'phone', 'dni_front', 'dni_back', 'selfie']

    def create(self, validated_data):
        # Creamos el usuario usando el método especial para encriptar la clave
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            role=validated_data.get('role', 'CLIENT'),
            phone=validated_data.get('phone', ''),
            # Los archivos se guardan directamente
            dni_front=validated_data.get('dni_front'),
            dni_back=validated_data.get('dni_back'),
            selfie=validated_data.get('selfie'),
        )
        return user