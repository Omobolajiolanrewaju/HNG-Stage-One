const express = require('express')
const router = require('./router')

const port = 3000

const app = express()

app.use('/api', router)

app.get('*', (req, res) => {
    res.status(404).json({
        data: null,
        error: 'Route not found'
    })
})

app.listen(port, () => {
    console.log(`Listening at http://localhost${port}`)
})