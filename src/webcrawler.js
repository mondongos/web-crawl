const fetch = require('node-fetch')
const cheerio = require('cheerio')
var urlParse = require('url-parse');
const lodash = require('lodash')

class WebCrawler {
    constructor(url) {
        this._startingURL = url
        this._urlQueue = [{url: this._startingURL, visited: false}]
        this._staticAssets = []
    }

    addToQueue(arr) {
        arr.forEach(item => {
            let array_of_strings = this._urlQueue.map(item => item.url);
            if (array_of_strings.indexOf(item) === -1) {
                this._urlQueue.push({url: item, visited: false})
            }
        })
    }

    removeInvalidAndDups(arr) {
        let domain = new urlParse(this._startingURL).hostname
        let validLinks = arr.filter(url => new urlParse(url).hostname === domain)
        return this.removeDuplicates(validLinks)
    }

    removeDuplicates(arr) {
        return lodash.sortedUniq(arr)
    }

    findHrefs(html) {
        let linksFound = []
        let $ = cheerio.load(html)
        $('a').each((index, value) => {
            let link = $(value).attr('href')
            linksFound.push(link)
        })
        return linksFound
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