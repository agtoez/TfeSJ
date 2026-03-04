from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

# Personalizamos cómo se ve el usuario en el panel
class CustomUserAdmin(UserAdmin):
    model = User
    # Agregamos nuestros campos personalizados a la vista del Admin
    fieldsets = UserAdmin.fieldsets + (
        ('Información de Verificación', {'fields': ('role', 'phone', 'is_verified', 'verification_status', 'dni_front', 'dni_back', 'selfie')}),
        ('Reputación', {'fields': ('rating_average', 'rating_count')}),
    )

admin.site.register(User, CustomUserAdmin)