from django.db import models
from django.conf import settings

class Property(models.Model):
    # Departamentos de San Juan para el filtro
    DEPARTAMENTOS_CHOICES = [
        ('ALBARDON', 'Albardón'), ('ANGACO', 'Angaco'), ('CALINGASTA', 'Calingasta'),
        ('CAPITAL', 'Capital'), ('CAUCETE', 'Caucete'), ('CHIMBAS', 'Chimbas'),
        ('IGLESIA', 'Iglesia'), ('JACHAL', 'Jáchal'), ('9DEJULIO', '9 de Julio'),
        ('POCITO', 'Pocito'), ('RAWSON', 'Rawson'), ('RIVADAVIA', 'Rivadavia'),
        ('SANMARTIN', 'San Martín'), ('SANTA_LUCIA', 'Santa Lucía'), ('SARMIENTO', 'Sarmiento'),
        ('ULLUM', 'Ullum'), ('VALLE_FERTIL', 'Valle Fértil'), ('25DEMAYO', '25 de Mayo'),
        ('ZONDA', 'Zonda'),
    ]

    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='properties')
    title = models.CharField(max_length=200)
    description = models.TextField()
    price_per_day = models.DecimalField(max_digits=10, decimal_places=2)
    capacity = models.IntegerField()
    
    # Ubicación
    department = models.CharField(max_length=20, choices=DEPARTAMENTOS_CHOICES)
    address = models.CharField(max_length=255)  # Solo visible tras contacto
    latitude = models.FloatField()  # Para el mapa
    longitude = models.FloatField() # Para el mapa
    
    # Contacto y Estado
    whatsapp_number = models.CharField(max_length=20)
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - {self.get_department_display()}"

class PropertyImage(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='properties/')
    is_main = models.BooleanField(default=False)

    def __str__(self):
        return f"Imagen para {self.property.title}"