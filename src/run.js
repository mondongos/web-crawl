const {WebCrawler} = require('../src/webcrawler')

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })

  readline.question(`Type the absolute URL of the site you would like to crawl: `, (url) => {
    const webcrawler = new WebCrawler(url)
    webcrawler.runWebCrawler()
    readline.close()
  })