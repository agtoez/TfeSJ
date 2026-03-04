import { useState } from 'react';
import api from '../../api/api';
import styles from './Login.module.css';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('login/', formData);
            // Guardamos el token para que el navegador "nos recuerde"
            localStorage.setItem('access_token', res.data.access);
            localStorage.setItem('refresh_token', res.data.refresh);
            alert("¡Bienvenido a San Juan!");
        } catch (error) {
            alert("Usuario o contraseña incorrectos");
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2>Ingresar</h2>
                <input 
                    type="text" 
                    placeholder="Usuario" 
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};