const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const port = 3053
const cakes = require("./data.json")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/cakes", (req, res) => {
    res.json({ cakes: cakes })
})

app.get("/cakes/:id", (req, res, next) => {
    const id = (req.params.id)

    let cake = cakes.filter(cake => {
        return cake.id == id
    })[0]

    res.json({ cakes: cake })
})

app.use(notFound)
app.use(errorHandler)

function notFound(req, res, next) {
  res.status(404).send({error: 'Not found!', status: 404, url: req.originalUrl})
}

function errorHandler(err, req, res, next) {
    console.error('ERROR', err)
    const stack =  process.env.NODE_ENV !== 'production' ? err.stack : undefined
    res.status(500).send({error: err.message, stack, url: req.originalUrl})
  }


app.listen(port, () => console.log("server is running on 3053"))