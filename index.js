const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({extended: false})
const { putQuery, getAll, postOrtaggio, queryOrtaggio } = require('./functions')
const port = 8080;

app.listen(
    port,
    () => console.log(`Alive on port http://localhost:${port}`)
)

app.get('/ortaggi', getAll)

app.get('/ortaggi/search', jsonParser, queryOrtaggio)

app.post('/ortaggi', jsonParser, postOrtaggio)

app.put('/ortaggi/:nomeProduttore', jsonParser, (req, res) => {
    
    const { nomeProduttore } = req.params
    const { nome, quantita, data } = req.body
    
    putQuery(res, nome, quantita, data, nomeProduttore)
})

app.get('/ortaggi/:nomeProduttore', jsonParser, (req, res) => {
    const { nomeProduttore } = req.params
    pool.query(
        'SELECT * FROM ort WHERE produttore = $1', [nomeProduttore], (err, result) => {
            if (err)
                console.warn(err)
            else
                res.send(result.rows)
        }
    )
})

app.put('/ortaggi', jsonParser, (req, res) => {
    const { nome, produttore, quantita, data } = req.body
    putQuery(res, nome, quantita, data, produttore)
})