/*
    * crypto --> usado para gerar valores aleatórios.
*/

const express = require('express')
const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()

routes.post('/session', SessionController.create)

routes.get('/ongs', OngController.index)
routes.post('/ong', OngController.create)

routes.get('/profile', ProfileController.index)

routes.get('/incidents', IncidentController.index)
routes.post('/incident', IncidentController.create)

routes.delete('/incident/:id', IncidentController.delete)

module.exports = routes