const { Pool } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ortaggi',
    password: '#Potterpaita16',
    port: 5432,
})

function getAll(req, res) {
    res.status(200)
    pool.query('SELECT * FROM ort', (err, response) => {
        res.send(response.rows)
    })
}

function postOrtaggio(req, res) {
    const { nome, produttore, quantita, data } = req.body;
    // DA METTERE CHE SE UN COSO E' GIA' PRESENTE LO UPDATI
    pool.query('INSERT INTO ort (name, produttore, quantita, dataraccolto)' + 
        'VALUES ($1, $2, $3, $4) RETURNING *', [nome, produttore, quantita, data], (err, response) => {
            res.send(response.rows)
        })
}

function putQuery(res, nome, quantita, data, nomeProduttore){
    if (nomeProduttore) {
        if (!nome && quantita && data){
            pool.query(
                'UPDATE ort SET quantita = $2, dataraccolto = $3 WHERE produttore = $1 RETURNING *',
                [nomeProduttore, quantita, data],
                (err, result) => {
                    if (err)
                        console.log(err)
                    res.send(result.rows)
                }
            )
        }
    }
        
    // pool.query(
    //     'UPDATE ort SET quantita = $2, dataraccolto = $3 WHERE produttore = $4 AND name = $1 RETURNING *',
    //     [n, q, d, nomeProduttore],
    //     (err, result) => {
    //         if (err)
    //             console.log(err)
    //         res.send(result.rows)
    //     }
    // )
}

function queryOrtaggio(req, res) {
    var { stringa } = req.body
    stringa = stringa.slice(0, -1) + '%' 
    pool.query(
        'SELECT * FROM ort WHERE name LIKE $1', [stringa], (err, results) => {
            if (err)
                console.warn(err)
            else
                res.send(results.rows)
        }
    )
}

module.exports = {
    putQuery,
    getAll,
    postOrtaggio,
    queryOrtaggio
}