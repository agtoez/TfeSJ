from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # Definimos los roles para saber quién es quién
    ROLE_CHOICES = (
        ('CLIENT', 'Cliente'),
        ('OWNER', 'Propietario'),
        ('ADMIN', 'Administrador'),
    )
    
    # Estados de la verificación manual
    VERIFICATION_STATUS = (
        ('PENDING', 'Pendiente'),
        ('APPROVED', 'Aprobado'),
        ('RECHAZADO', 'Rechazado'),
    )

    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='CLIENT')
    phone = models.CharField(max_length=20, blank=True, null=True)
    
    # --- Campos de Verificación (FASE 1) ---
    # Usamos upload_to para organizar las fotos por año/mes
    dni_front = models.ImageField(upload_to='verifications/dni/', blank=True, null=True)
    dni_back = models.ImageField(upload_to='verifications/dni/', blank=True, null=True)
    selfie = models.ImageField(upload_to='verifications/selfies/', blank=True, null=True)
    
    is_verified = models.BooleanField(default=False)
    verification_status = models.CharField(
        max_length=10, 
        choices=VERIFICATION_STATUS, 
        default='PENDING'
    )

    # --- Reputación (FASE 1) ---
    rating_average = models.FloatField(default=0.0)
    rating_count = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.username} - {self.get_role_display()}"