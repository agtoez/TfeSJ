import { Link } from 'react-router-dom';
import styles from './Landing.module.css';

const Landing = () => {
  return (
    <div className={styles.hero}>
      <nav className={styles.nav}>
        <div className={styles.logo}>🏔️ Tu Finde SJ</div>
        <div className={styles.authButtons}>
          <Link to="/login" className={styles.loginBtn}>Ingresar</Link>
          <Link to="/signup" className={styles.signupBtn}>Registrarse</Link>
        </div>
      </nav>
      
      <main className={styles.content}>
        <h1>Descubrí San Juan de forma segura</h1>
        <p>Alquileres temporarios verificados en los mejores valles de la provincia.</p>
        <Link to="/home" className={styles.exploreBtn}>Explorar Propiedades</Link>
      </main>
    </div>
  );
};

export default Landing;