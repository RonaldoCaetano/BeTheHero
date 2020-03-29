import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import './styles.css'
import logoImage from './../../assets/logo.svg'
import api from '../../services/api';

export default function Profile() {

    const { name, id } = JSON.parse(localStorage.getItem('sessionData'))
    const [incidents, setIncidents] = useState([])
    const history = useHistory()

    useEffect(() => {
        api.get('/profile', {
            headers : {
                Authorization: id
            }
        }).then(res => {
            setIncidents(res.data)
        })
    }, [id])

    async function handleDeleteIncident (incidentId) {
        try {
            await api.delete(`/incident/${incidentId}`, {
                headers: {
                    Authorization: id
                }
            })
            setIncidents(incidents.filter(i => i.id !== incidentId))
        } catch (err) {
            console.log(err)
        }
    }

    function handleLogout() {
        localStorage.removeItem('sessionData')
        history.push("/")
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImage} alt="Be The Hero" />
                <span>Bem vinda, {name}</span>

                <Link className="button" to="/incident/new">
                    Cadastrar novo caso
                </Link>

                <button onClick={handleLogout}>
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {
                    incidents.map(incident => (
                        <li key={incident.id}>
                            <strong>CASO:</strong>
                            <p>{incident.title}</p>

                            <strong>DESCRIÇÃO:</strong>
                            <p>{incident.description}</p>

                            <strong>VALOR:</strong>
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                            <button onClick={e => handleDeleteIncident(incident.id)} type="button">
                                <FiTrash2 size={20} color="" />
                            </button>
                        </li>
                    ))
                }
            </ul>

        </div>
    )
}