import { useEffect, useState } from 'react';
import api from '../../api/api';
import styles from './Profile.module.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const res = await api.get('profile/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Error al obtener perfil", err);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <p>Cargando perfil...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Hola, {profile.username}! 👋</h1>
        <p className={styles.role}>Tipo de cuenta: <strong>{profile.role}</strong></p>
        
        <div className={`${styles.statusBox} ${styles[profile.verification_status.toLowerCase()]}`}>
          <h3>Estado de Verificación:</h3>
          <p>{profile.verification_status === 'APPROVED' ? '✅ Verificado' : 
             profile.verification_status === 'PENDING' ? '⏳ Pendiente de revisión' : 
             '❌ Requiere atención'}</p>
        </div>

        {profile.is_verified ? (
          <p className={styles.successMsg}>Tu cuenta es segura. Ya podés publicar o alquilar con total confianza en San Juan.</p>
        ) : (
          <p className={styles.infoMsg}>Nuestro equipo está revisando tu DNI y Selfie. Te notificaremos cuando tu cuenta esté activa.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;