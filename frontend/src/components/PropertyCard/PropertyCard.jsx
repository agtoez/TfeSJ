import styles from './PropertyCard.module.css';

const PropertyCard = ({ property }) => {
  // Buscamos la imagen principal, o la primera, o nada si no hay fotos
  const mainImage = property.images?.find(img => img.is_main) || property.images?.[0];
  
  // Link de WhatsApp pre-armado
  const waLink = `https://wa.me/${property.whatsapp_number}?text=Hola! Vi tu propiedad "${property.title}" en Tu Finde en San Juan`;

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {mainImage ? (
          <img src={mainImage.image} alt={property.title} className={styles.image} />
        ) : (
          <div className={styles.noImage}>🏔️ Sin foto</div>
        )}
      </div>
      
      <div className={styles.content}>
        <span className={styles.department}>{property.department_display || property.department}</span>
        <h3 className={styles.title}>{property.title}</h3>
        <p className={styles.price}>${property.price_per_day} <span className={styles.perNight}>/ noche</span></p>
        <p className={styles.capacity}>👥 Hasta {property.capacity} personas</p>
        
        <a href={waLink} target="_blank" rel="noreferrer" className={styles.whatsappBtn}>
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  );
};

export default PropertyCard;