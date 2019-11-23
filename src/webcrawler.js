const fetch = require('node-fetch')

class WebCrawler {
    constructor(url) {
        this._startingURL = url
        this._urlQueue = [{url: this._startingURL, visited: false}]
        this._staticAssets = []
    }

    async fetchPage(pageURL) {
        try {
            let fetchOptions = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    a: 10,
                    b: 20
                }) 
            }
            let response = await fetch(pageURL, fetchOptions)
            return response
        } catch(err) {
            console.log(err)
        }
    }
}

module.exports = {WebCrawler}