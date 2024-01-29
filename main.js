const pg = require('pg')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const ExempleService = require("./services/ListService")
const ExempleService2 = require("./services/ItemService")



const app = express()
app.use(bodyParser.urlencoded({ extended: false })) // URLEncoded form data
app.use(bodyParser.json()) // application/json
app.use(cors())
app.use(morgan('dev')); // toutes les requêtes HTTP dans le log du serveur

//const connectionString = "postgres://user:password@192.168.56.101/instance"
const connectionString = "postgres://tp_sql_user:azerty@localhost/tp_sql2"
const db = new pg.Pool({ connectionString: connectionString })
const exempleService = new ExempleService(db)
const exempleService2 = new ExempleService2(db)
require('./api/Itemapp')(app, exempleService2)
require('./api/Listapp')(app, exempleService)
require('./datamodel/seederList')(exempleService)
require('./datamodel/seederItem')(exempleService2)


    .then(app.listen(3333))


