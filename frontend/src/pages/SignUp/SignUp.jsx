import { useState } from 'react';
import api from '../../api/api';
import styles from './SignUp.module.css';

const SignUp = () => {
  const [role, setRole] = useState('CLIENT'); // Por defecto es Cliente
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: ''
  });
  
  // Estados separados para los archivos
  const [files, setFiles] = useState({
    dni_front: null,
    dni_back: null,
    selfie: null
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    
    // Agregamos datos básicos
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    data.append('role', role);

    // Si es OWNER, agregamos archivos obligatorios
    if (role === 'OWNER') {
      if (!files.dni_front || !files.selfie) {
        alert("Como propietario, debes subir tu DNI y Selfie para verificación.");
        return;
      }
      data.append('dni_front', files.dni_front);
      data.append('dni_back', files.dni_back);
      data.append('selfie', files.selfie);
    }

    try {
      await api.post('register/', data);
      alert("¡Registro exitoso! Ya podés ingresar.");
    } catch (err) {
      alert("Error en el registro. Verificá los datos.");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Crear Cuenta</h2>
        
        <div className={styles.roleSelector}>
          <label>¿Qué sos?</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="CLIENT">Quiero alquilar (Turista)</option>
            <option value="OWNER">Soy Propietario</option>
          </select>
        </div>

        <input name="username" placeholder="Nombre de usuario" onChange={handleInputChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleInputChange} required />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleInputChange} required />
        <input name="phone" placeholder="WhatsApp (Ej: 264555...)" onChange={handleInputChange} required />

        {/* --- SECCIÓN DINÁMICA PARA PROPIETARIOS --- */}
        {role === 'OWNER' && (
          <div className={styles.verificationSection}>
            <h3>Verificación Obligatoria 🛡️</h3>
            <p>Para evitar estafas, necesitamos validar tu identidad.</p>
            
            <label>DNI Frente:</label>
            <input type="file" name="dni_front" onChange={handleFileChange} accept="image/*" required />
            
            <label>DNI Dorso:</label>
            <input type="file" name="dni_back" onChange={handleFileChange} accept="image/*" />
            
            <label>Selfie con tu DNI:</label>
            <input type="file" name="selfie" onChange={handleFileChange} accept="image/*" required />
          </div>
        )}

        <button type="submit" className={styles.submitBtn}>Registrarme</button>
      </form>
    </div>
  );
};

export default SignUp;