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
            let pageData = await webcrawler.fetchPage("https://www.four-seasons-ventures.com/")
            expect(pageData.status).toEqual(200)
        })

        test('parse HTML', async () => {
            let html =  await webcrawler.parseHTML("https://www.four-seasons-ventures.com/")
            expect(html.substring(0,15)).toEqual("<!doctype html>")
        })
    })

    describe('URL spider', () => {

        test('find hyperlinks within HTML', async () => {
            let html = await webcrawler.parseHTML("https://www.four-seasons-ventures.com/")
            let linksArr = webcrawler.findHrefs(html)
            expect(linksArr.length).toBeGreaterThan(1)
        })

        test('Remove hyperlinks which are not part of starting', async () => {
            let html = await webcrawler.parseHTML("https://www.four-seasons-ventures.com/")
            let linksArr = webcrawler.findHrefs(html)
            let filteredLinksArr = webcrawler.removeInvalidAndDups(linksArr)
            expect(filteredLinksArr.length).toBeLessThan(linksArr.length)
        })

        test('Check if URLs are in queue and add to queue', async () => {
            expect.assertions(1)
            let html = await webcrawler.parseHTML("https://www.four-seasons-ventures.com/")
            let linksArr = webcrawler.findHrefs(html)
            let filteredLinksArr = webcrawler.removeInvalidAndDups(linksArr)
            webcrawler.addToQueue(filteredLinksArr)
            expect(webcrawler._urlQueue.length).toEqual(filteredLinksArr.length - 1)
        })
    })

    describe('Building static assets', () => {

        test('Get images from page', async () => {
            let html = await webcrawler.parseHTML("https://www.four-seasons-ventures.com/")
            let images = webcrawler.getImages(html)
            expect(images.length).toBeGreaterThan(1)
        })

        test('Get scripts from page', async () => {
            let html = await webcrawler.parseHTML("https://www.four-seasons-ventures.com/")
            let scripts = webcrawler.getScripts(html)
            expect(scripts.length).toBeGreaterThan(1)
        })

        test('Get external linked assets from page', async () => {
            let html = await webcrawler.parseHTML("https://www.four-seasons-ventures.com/")
            let links = webcrawler.getLinkedAssets(html)
            expect(links.length).toBeGreaterThan(1)
        })

        test('Gets all assets from page', async () => {
            let html = await webcrawler.parseHTML("https://www.four-seasons-ventures.com/")
            let images = webcrawler.getImages(html).length
            let scripts = webcrawler.getScripts(html).length
            let links = webcrawler.getLinkedAssets(html).length
            expect(webcrawler.getAssets(html).length).toEqual(images + scripts + links)
        })
        
    })

    describe('Adding assets to array', () => {

        test('add assets to static assets array', async () => {
            expect.assertions(2)
            jest.setTimeout(15000)
            let expected = [
                {
                    url: expect.any(String), 
                    assets: expect.any(Array)
                }
            ]
            let results = await webcrawler.runWebCrawler()
            expect(results).toEqual(expect.arrayContaining(expected))
            expect(results.length).toBeGreaterThan(1)
        })
    })
})