import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import './styles.css'
import logoImage from './../../assets/logo.svg'
import api from '../../services/api'

export default function NewIncident() {

    const [title, setTitle] = useState("")
    const [description, setDescripton] = useState('')
    const [value, setValue] = useState('')

    const sessionData = JSON.parse(localStorage.getItem('sessionData'))
    const history = useHistory()
    
    const data = {
        title,
        description,
        value
    }

    async function handleRegister(ev) {
        ev.preventDefault()

        try {
            await api.post('/incident', data, {
                headers: {
                    Authorization: sessionData.id
                }
            })
            alert('Cadastrado com sucesso!!')
            history.push('/profile')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImage} alt="Be The Hero" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041"/> 
                        Voltar para Home
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input value={title} onChange={({target}) => setTitle(target.value)} placeholder="Título do caso" />
                    <textarea value={description} onChange={({target}) => setDescripton(target.value)} placeholder="Descrição" />
                    <input value={value} onChange={({target}) => setValue(target.value)} placeholder="Valor em R$" />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}