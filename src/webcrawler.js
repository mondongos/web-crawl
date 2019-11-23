const fetch = require('node-fetch')
const cheerio = require('cheerio')

class WebCrawler {
    constructor(url) {
        this._startingURL = url
        this._urlQueue = [{url: this._startingURL, visited: false}]
        this._staticAssets = []
    }

    findHrefs(html) {
        let urlList = []
        let $ = cheerio.load(html)
        $('a').each((index, value) => {
            let link = $(value).attr('href')
            urlList.push(link)
        })
        return urlList
    }

    findHrefs(html) {
        let urlList = []
        let $ = cheerio.load(html)
        $('a').each((index, value) => {
            let link = $(value).attr('href')
            urlList.push(link)
        })
        return urlList
    }

    async parseHTML(pageURL) {
        try {
            let response = this.fetchPage(pageURL)
            let parsedHTMLPromise = await response.then((res) => res.text())
            let results = await parsedHTMLPromise;
            return results
        } catch(err) {
            console.log(err)
        }
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