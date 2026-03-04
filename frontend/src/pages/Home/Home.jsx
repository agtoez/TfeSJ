import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <h1>🏠 Bienvenidas/os a Tu Finde en San Juan</h1>
      <p className={styles.subtitle}>Esta es la página principal (en construcción).</p>
      
      <div className={styles.placeholderBox}>
        <p>🗺️ Próximamente: Aquí veremos el mapa interactivo de San Juan.</p>
        <p>🏡 Próximamente: Lista de cabañas y departamentos verificados.</p>
      </div>
    </div>
  );
};

export default Home;