const {WebCrawler} = require('../src/webcrawler')

describe('Web Crawler', () => {
    let webcrawler 

    beforeEach(() => {
        webcrawler = new WebCrawler("https://www.four-seasons-ventures.com/")
    })

    test('adds starting URL to queue', () => {
        expect(webcrawler._urlQueue).toEqual(
            [
                {
                    url: "https://www.four-seasons-ventures.com/", 
                    visited: false
                }
            ])
    })
})