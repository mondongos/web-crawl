const fetch = require('node-fetch')
const cheerio = require('cheerio')
const urlParse = require('url-parse');
const lodash = require('lodash')

class WebCrawler {
    constructor(url) {
        this._pagesCrawled = 0
        this._startingURL = url
        this._urlQueue = [{url: this._startingURL, visited: false}]
        this._staticAssets = []
    }

    async runWebCrawler() {
        for (var i=0; i < this._urlQueue.length; i++) {
            try {
                if (this._urlQueue[i].visited === false) {
                    this._pagesCrawled += 1
                    console.log("Crawling page " + this._pagesCrawled + ": " + this._urlQueue[i].url)
                    let pagehtml = await this.parseHTML(this._urlQueue[i].url)
                    let newPages = this.removeInvalidAndDups(this.findHrefs(pagehtml))
                    this.addToQueue(newPages)
                    this._urlQueue[i].visited = true
                    let assets = this.getAssets(pagehtml)
                    this._staticAssets.push(this.generateAssetsObject(this._urlQueue[i].url, assets))
                }
            } catch(err) {
                console.log(err)
            }
        }
        try { 
            console.log(this._staticAssets)
            return this._staticAssets
        } catch(err) {
            console.log(err)
        }
    }

    generateAssetsObject(url, assets) {
        return {url: url, assets: assets}
    }

    getAssets(html) {
        let imageAssets = this.getImages(html)
        let scriptAssets = this.getScripts(html)
        let linkedAssets = this.getLinkedAssets(html)
        return imageAssets.concat(scriptAssets, linkedAssets)
    }

    getLinkedAssets(html) {
        let linked = []
        let $ = cheerio.load(html)
        $('link').each((index, value) => {
            let link = $(value).attr('href')
            linked.push(link)
        })
        return linked
    }

    getScripts(html) {
        let scripts = []
        let $ = cheerio.load(html)
        $('script').each((index, value) => {
            let script = $(value).attr('src')
            scripts.push(script)
        })
        return scripts
    }

    getImages(html) {
        let images = []
        let $ = cheerio.load(html)
        $('img').each((index, value) => {
            let image = $(value).attr('src')
            images.push(image)
        })
        return images
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
            let response = await fetch(pageURL)
            return response
        } catch(err) {
            console.log(err)
        }
    }
}

module.exports = {WebCrawler}