class WebCrawler {
    constructor(url) {
        this._startingURL = url
        this._urlQueue = [{url: this._startingURL, visited: false}]
        this._staticAssets = []
    }
}

module.exports = {WebCrawler}