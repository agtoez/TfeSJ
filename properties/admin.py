from django.contrib import admin
from .models import Property, PropertyImage

class PropertyImageInline(admin.TabularInline):
    model = PropertyImage
    extra = 3 # Permite cargar 3 fotos de una sola vez

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ('title', 'department', 'price_per_day', 'is_verified')
    list_filter = ('department', 'is_verified')
    inlines = [PropertyImageInline]