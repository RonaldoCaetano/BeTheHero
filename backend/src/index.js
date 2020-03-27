/*
    ? Tipos de parâmetros: 
        * Query: parâmetros enviados na rota, usados para filtros, paginação.
        * Route Params: parâmetros utilizados para identificar recursos (ex: usuário, seria um recurso a ser procurado em alguma entidade)
            * Modelo de aplicação: /client/12
    ? Request --> Retorna todos os dados do request
    ? Request Body --> Corpo da requisição, utilizado no method POST ou PUT para enviar os dados a serem cadastrados.
    ? Response --> Retorna todos os dados da resposta
*/

const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.listen(3333)