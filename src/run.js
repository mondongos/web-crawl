const {WebCrawler} = require('../src/webcrawler')

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })

  readline.question(`What URL would you like to crawl?: `, (url) => {
    const webcrawler = new WebCrawler(url)
    webcrawler.runWebCrawler()
    readline.close()
  })