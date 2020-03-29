import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import './styles.css';
import heroesImage from './../../assets/heroes.png';
import logoImage from './../../assets/logo.svg';

import api from '../../services/api';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory()

    async function handleLogin(ev) {
        ev.preventDefault();
        try {
            const response = await api.post('/session', { id });
            const name = response.data.name;
            localStorage.setItem(
                'sessionData',
                JSON.stringify({
                    id,
                    name
                })
            );
            history.push('/profile')
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImage} alt="Logo" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">
                        Entrar
                    </button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImage} alt="Heroes" />
        </div>
    );
}
