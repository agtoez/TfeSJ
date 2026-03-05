import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // ¡Importante para que el mapa no se vea roto!
import L from 'leaflet';

// Arreglo rápido para un bug visual común de los íconos en React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Sub-componente invisible que "escucha" los clics en el mapa
function MapClickHandler({ setPosition }) {
    useMapEvents({
        click(e) {
            // e.latlng contiene { lat: número, lng: número }
            setPosition(e.latlng);
        },
    });
    return null;
}

const LocationPicker = ({ onLocationSelect }) => {
    // Coordenadas centrales de San Juan para iniciar el mapa
    const sanJuanCenter = [-31.5375, -68.5363]; 
    const [position, setPosition] = useState(sanJuanCenter);

    const handlePositionChange = (newPos) => {
        setPosition(newPos);
        // Le pasamos las coordenadas al formulario padre (para enviarlas a Django)
        if (onLocationSelect) {
            onLocationSelect(newPos);
        }
    };

    return (
        <div style={{ width: '100%', marginBottom: '20px' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                🗺️ Hacé clic en el mapa para ubicar tu propiedad:
            </p>
            
            {/* Contenedor del mapa */}
            <MapContainer 
                center={sanJuanCenter} 
                zoom={10} 
                style={{ height: '300px', width: '100%', borderRadius: '12px', zIndex: 0 }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                <MapClickHandler setPosition={handlePositionChange} />
                
                {/* Dibujamos el Pin donde el usuario hizo clic */}
                {position && <Marker position={position} />}
            </MapContainer>

            {/* Mostramos las coordenadas capturadas para darle feedback al usuario */}
            <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '8px' }}>
                Coordenadas seleccionadas: {position.lat.toFixed(5)}, {position.lng.toFixed(5)}
            </p>
        </div>
    );
};

export default LocationPicker;