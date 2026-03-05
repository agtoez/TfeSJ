import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import api from '../../api/api';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import styles from './Home.module.css';

// --- CONFIGURACIÓN OBLIGATORIA DE LEAFLET ---
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;
// --------------------------------------------

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);

  // Centro de San Juan
  const sanJuanCenter = [-31.5375, -68.5363];

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await api.get('properties/');
        setProperties(response.data);
      } catch (err) {
        console.error("Error cargando propiedades:", err);
        setError("No pudimos cargar los alojamientos. Intentá de nuevo más tarde.");
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>🗺️ Explorá San Juan</h1>
        <p>Encontrá tu alojamiento ideal en los mejores valles.</p>
      </header>

      {error && <div className={styles.error}>{error}</div>}

      {/* --- EL MAPA INTERACTIVO --- */}
      <div className={styles.mapWrapper}>
        <MapContainer 
          center={sanJuanCenter} 
          zoom={9} 
          scrollWheelZoom={false}
          className={styles.map}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {/* Dibujamos un Pin por cada propiedad */}
          {properties.map(prop => (
            <Marker key={prop.id} position={[prop.latitude, prop.longitude]}>
              <Popup>
                <div className={styles.popupContent}>
                  <strong>{prop.title}</strong>
                  <p>${prop.price_per_day} / noche</p>
                  <a href={`https://wa.me/${prop.whatsapp_number}`} target="_blank" rel="noreferrer">
                    Contactar
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* --- LA LISTA DE TARJETAS ABAJO DEL MAPA --- */}
      <div className={styles.propertyGrid}>
        {properties.map(prop => (
          <PropertyCard key={prop.id} property={prop} />
        ))}
      </div>
    </div>
  );
};

export default Home;