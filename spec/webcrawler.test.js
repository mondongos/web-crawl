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
            ]
        )
    })

    describe('fetch page', () => {
        
        test('fetches page successfully', async () => {
            expect.assertions(1)
            let pageData = await webcrawler.fetchPage("https://www.four-seasons-ventures.com/")
            expect(pageData.status).toEqual(200)
        })

        test('parse HTML', async () => {
            expect.assertions(1)
            let html =  await webcrawler.parseHTML("https://www.four-seasons-ventures.com/")
            expect(html.substring(0,15)).toEqual("<!doctype html>")
        })
    })

    describe('URL spider', () => {

        test('find hyperlinks within HTML', async () => {
            expect.assertions(1)
            let html = await webcrawler.parseHTML("https://www.four-seasons-ventures.com/")
            expect(webcrawler.findHrefs(html)).toEqual([
                'https://www.four-seasons-ventures.com/',
                'https://www.four-seasons-ventures.com/our-approach/',
                'https://www.four-seasons-ventures.com/companies/',
                'https://www.four-seasons-ventures.com/team/',
                'https://www.four-seasons-ventures.com/news-views/',
                'https://www.four-seasons-ventures.com/contact/',
                'https://www.four-seasons-ventures.com/companies/',
                'https://www.four-seasons-ventures.com/pomanda-launches-deal-room-at-the-london-business-show/',
                'https://www.four-seasons-ventures.com/pomanda-launches-deal-room-at-the-london-business-show/',
                'https://www.four-seasons-ventures.com/absolutely-couriers-adds-maydh-to-its-international-division/',
                'https://www.four-seasons-ventures.com/welcome-john-maddox/',
                'https://www.four-seasons-ventures.com/rebrand-as-absolutely/',
                'https://www.four-seasons-ventures.com/lorem-ipsum-dolor-sit-amet-3/',
                'tel:+44 20 3008 6351',
                'javascript:void(0);',
                'javascript:void(0);'
              ])
        })
    })
})