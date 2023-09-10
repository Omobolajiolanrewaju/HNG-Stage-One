const fs = require('fs').promises
const path = require('path')

const dbFilePath = path.join(__dirname, "db.json")
const queryHandler = async(req, res) => {
    const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' })
    const currentTime = new Date().toLocaleTimeString();
    
    const name = req.query.slack_name
    const track = req.query.track

    const update = {
        slack_name: name,
        current_day: currentDay,
        utc_time: currentTime,
        track: track
    }

    const readDB = await fs.readFile(dbFilePath)
    const db = JSON.parse(readDB)

    if (req.query.slack_name != null && req.query.track != null) {
        const data = db[0]
        const newDB = {...data, ...update}


        return res.status(200).json(newDB)
    } else {
        return res.status(400).json({
            message: "Error: you have to provide both your Slack name and track."
        })
    }

}

module.exports = {
    queryHandler
}