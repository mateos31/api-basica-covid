const cors = require('cors')
const express = require('express')
const axios = require('axios')
const app = express()

app.use(cors())

app.get('/:country', async (req, res) => {
    try {
        const country = req.params.country
        const { data } = await axios(`https://disease.sh/v3/covid-19/countries/${country}?yesterday=true&twoDaysAgo=false`)
        return res.json(data)
    } catch (error) {
        console.error(error)
    }
})

app.listen('4567')