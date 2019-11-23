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

        test('Remove hyperlinks which are not part of starting', async () => {
            let html = await webcrawler.parseHTML("https://www.four-seasons-ventures.com/")
            let linksArr = webcrawler.findHrefs(html)
            expect(webcrawler.removeInvalidAndDups(linksArr)).toEqual([
                'https://www.four-seasons-ventures.com/',
                'https://www.four-seasons-ventures.com/our-approach/',
                'https://www.four-seasons-ventures.com/companies/',
                'https://www.four-seasons-ventures.com/team/',
                'https://www.four-seasons-ventures.com/news-views/',
                'https://www.four-seasons-ventures.com/contact/',
                'https://www.four-seasons-ventures.com/companies/',
                'https://www.four-seasons-ventures.com/pomanda-launches-deal-room-at-the-london-business-show/',
                'https://www.four-seasons-ventures.com/absolutely-couriers-adds-maydh-to-its-international-division/',
                'https://www.four-seasons-ventures.com/welcome-john-maddox/',
                'https://www.four-seasons-ventures.com/rebrand-as-absolutely/',
                'https://www.four-seasons-ventures.com/lorem-ipsum-dolor-sit-amet-3/'
            ])
        })

        test('Check if URLs are in queue and add to queue', async () => {
            expect.assertions(1)
            let html = await webcrawler.parseHTML("https://www.four-seasons-ventures.com/")
            let linksArr = webcrawler.findHrefs(html)
            let filteredLinksArr = webcrawler.removeInvalidAndDups(linksArr)
            webcrawler.addToQueue(filteredLinksArr)
            expect(webcrawler._urlQueue).toEqual([
                { 
                    url: 'https://www.four-seasons-ventures.com/', 
                    visited: false 
                },
                {
                    url: 'https://www.four-seasons-ventures.com/our-approach/',
                    visited: false
                },
                {
                    url: 'https://www.four-seasons-ventures.com/companies/',
                    visited: false
                },
                {
                    url: 'https://www.four-seasons-ventures.com/team/',
                    visited: false
                },
                {
                    url: 'https://www.four-seasons-ventures.com/news-views/',
                    visited: false
                },
                {
                    url: 'https://www.four-seasons-ventures.com/contact/',
                    visited: false
                },
                {
                    url: 'https://www.four-seasons-ventures.com/pomanda-launches-deal-room-at-the-london-business-show/',
                    visited: false
                },
                {
                    url: 'https://www.four-seasons-ventures.com/absolutely-couriers-adds-maydh-to-its-international-division/',
                    visited: false
                },
                {
                    url: 'https://www.four-seasons-ventures.com/welcome-john-maddox/',
                    visited: false
                },
                {
                    url: 'https://www.four-seasons-ventures.com/rebrand-as-absolutely/',
                    visited: false
                },
                {
                    url: 'https://www.four-seasons-ventures.com/lorem-ipsum-dolor-sit-amet-3/',
                    visited: false
                }
            ])
        })

    })

    describe('Building static assets', () => {



        test('Get images from page', async () => {
            let html = await webcrawler.parseHTML("https://www.four-seasons-ventures.com/")
            expect(webcrawler.getImages(html)).toEqual([ 
                'https://www.four-seasons-ventures.com/wp-content/themes/fourseason/images/ring.gif',
                'https://www.four-seasons-ventures.com/wp-content/uploads/2018/07/banner.jpg',
                'https://www.four-seasons-ventures.com/wp-content/themes/fourseason/images/logo.png',
                'https://www.four-seasons-ventures.com/wp-content/themes/fourseason/images/white_logo.png',
                'https://www.four-seasons-ventures.com/wp-content/uploads/2018/07/P1150591_1024x1024-1.jpg',
                'https://www.four-seasons-ventures.com/wp-content/uploads/2018/12/GH-675X450-e1544529132213.jpg',
                'https://www.four-seasons-ventures.com/wp-content/uploads/2018/12/sameday-e1544527341831.jpeg',
                'https://www.four-seasons-ventures.com/wp-content/uploads/2018/12/ResizerImage675X450-1-e1544528757500.jpg',
                'https://www.four-seasons-ventures.com/wp-content/uploads/2018/07/JM-enhanced.jpg',
                'https://www.four-seasons-ventures.com/wp-content/uploads/2018/12/Pomanda-logo-512-x-12.jpeg',
                'https://www.four-seasons-ventures.com/wp-content/uploads/2018/11/Jeremy-Thompson_240x128-e1544529439784.jpg',
                'https://www.four-seasons-ventures.com/wp-content/uploads/2018/07/img4.jpg',
                'https://www.four-seasons-ventures.com/wp-content/uploads/2019/02/board-table-252-x-221-bw.jpg',
                'https://www.four-seasons-ventures.com/wp-content/uploads/2019/02/sunny-lady-252-x-221-bw.jpg',
                'https://www.four-seasons-ventures.com/wp-content/uploads/2019/02/hands-tablet-252-x-221-bw.jpg',
                'https://www.four-seasons-ventures.com/wp-content/uploads/2015/10/high-rise-252-x-221-bw.jpg',
                'https://www.four-seasons-ventures.com/wp-content/uploads/2019/02/Two-guys-tablet-251-x-221-bw.jpg',
                'https://www.four-seasons-ventures.com/wp-content/uploads/2018/07/contact.jpg',
                'https://www.four-seasons-ventures.com/wp-content/themes/fourseason/images/p1c.png'
            ])
        })

        test('Get scripts from page', async () => {
            let html = await webcrawler.parseHTML("https://www.four-seasons-ventures.com/")
            expect(webcrawler.getScripts(html)).toEqual([ 
                undefined,
                undefined,
                'https://www.four-seasons-ventures.com/wp-content/themes/fourseason/js/jquery.min.js?ver=20180710',
                'https://www.four-seasons-ventures.com/wp-content/themes/fourseason/js/bootstrap.min.js?ver=20180710',
                'https://www.four-seasons-ventures.com/wp-content/themes/fourseason/js/slick.js?ver=20180710',
                'https://www.four-seasons-ventures.com/wp-content/themes/fourseason/js/slick.min.js?ver=20180710',
                'https://www.four-seasons-ventures.com/wp-content/themes/fourseason/js/custom.js?ver=20180710',
                'https://www.four-seasons-ventures.com/wp-includes/js/wp-embed.min.js?ver=4.9.12'
            ])
        })

        test('Get external linked assets from page', async () => {
            let html = await webcrawler.parseHTML("https://www.four-seasons-ventures.com/")
            expect(webcrawler.getLinkedAssets(html)).toEqual([ 
                'https://gmpg.org/xfn/11',
                'https://www.four-seasons-ventures.com/',
                '//s.w.org',
                'https://www.four-seasons-ventures.com/feed/',
                'https://www.four-seasons-ventures.com/comments/feed/',
                'https://www.four-seasons-ventures.com/wp-content/themes/fourseason/css/bootstrap.min.css?ver=20180710',
                'https://www.four-seasons-ventures.com/wp-content/themes/fourseason/font-awesome/css/font-awesome.min.css?ver=20180710',
                'https://www.four-seasons-ventures.com/wp-content/themes/fourseason/css/slick.css?ver=20180710',
                'https://www.four-seasons-ventures.com/wp-content/themes/fourseason/css/slick-theme.css?ver=20180710',
                'https://www.four-seasons-ventures.com/wp-content/themes/fourseason/css/style.css?ver=20180710',
                'https://www.four-seasons-ventures.com/wp-content/themes/fourseason/css/responsive.css?ver=20180710',
                'https://www.four-seasons-ventures.com/wp-content/themes/fourseason/style.css?ver=4.9.12',
                'https://www.four-seasons-ventures.com/wp-json/',
                'https://www.four-seasons-ventures.com/xmlrpc.php?rsd',
                'https://www.four-seasons-ventures.com/wp-includes/wlwmanifest.xml',
                'https://www.four-seasons-ventures.com/',
                'https://www.four-seasons-ventures.com/wp-json/oembed/1.0/embed?url=https%3A%2F%2Fwww.four-seasons-ventures.com%2F',
                'https://www.four-seasons-ventures.com/wp-json/oembed/1.0/embed?url=https%3A%2F%2Fwww.four-seasons-ventures.com%2F&format=xml'
            ])
        })
        
    })


})