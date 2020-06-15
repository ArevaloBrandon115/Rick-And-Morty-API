const superagent = require('superagent')

const config = require('./config.json')

const findByName = async name => {
    //using search by name url from API sends back the response.body
    const episodeUrl = `${config.url}?name=${name}`
    try {
        const episodeResponse = await superagent.get(episodeUrl)
        return episodeResponse.body
    } catch (error) {
        return error
    }
}

const findByID = async ID => {
    //using ID url from API sends back the response.body
    const episodeUrl = `${config.url}/${ID}`
    try {
        const episodeResponse = await superagent.get(episodeUrl)
        return episodeResponse.body
    } catch (error) {
        return error
    }
}

//exports methods
module.exports = {
    findByName,
    findByID
}