const express = require('express')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({extended: false})
const router = express.Router()
const pool = require('pool')

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

router.route('/ortaggi')
    .get(jsonParser, (req, res) => {
            res.status(200)
            console.log(req.body)
            pool.query('SELECT * FROM ort', (err, response) => {
            res.send(response.rows)
        })
    })
    .post(jsonParser, (req, res) => {
        const { nome, produttore, quantita, data } = req.body;
        pool.query('INSERT INTO ort (name, produttore, quantita, dataraccolto)' + 
            'VALUES ($1, $2, $3, $4) RETURNING *', [nome, produttore, quantita, data], (err, response) => {
                res.send(response.rows)
            })
    })
    .put(jsonParser, (req, res) => {
        const { nome, produttore, quantita, data } = req.body
    })

module.exports = router