# Web Crawler
A web crawler which, given a starting URL, visits every reachable page on the domain and returns the URL of every static asset (images, javascript, stylesheets) on each page in JSON format. 

The software is initalised with an empty array `_staticAssets` for asset objects, and an array of objects `_urlQueue` containing the starting URL and a `visited` boolean. At a high level, the software should: 
1. Visit first URL in `_urlQueue` where `visited: false`
2. Retrieve information from that page.
3. Identify all hyperlinks to other pages, and: 
    1. Check if URL exists in `_urlQueue`
    2. If no, push URL into `_urlQueue` with `{visited: false}`
4. Identify all assets on the page and add to `_staticAssets` as object with `url` and `assets`.
5. Change URL object `visited` status to `true` in `_urlQueue`
6. Go to next URL in `_urlQueue` and repeat from step 1. 
7. Once all URLs are visited, return `_staticAssets`

### How to use 
1. Clone this repository
2. Run `npm install` to install all necessary libraries
3. Run `node src/run.js` into the command line
4. When prompted, type in the absolute URL you'd like to crawl.

### Example output
```
[
    {
        "url": "http://www.example.org",
        "assets": [
            "http://www.example.org/image.jpg",
            "http://www.example.org/script.js"
        ]
    },
    {
        "url": "http://www.example.org/about",
        "assets": [
            "http://www.example.org/company_photo.jpg",
            "http://www.example.org/script.js"
        ]
    },
    ..
]
```

### Technology 
- JavaScript
- NodeJS
- Node libraries used:
    - node-fetch
    - Cheerio
    - url-parser
    - Lodash 
- Jest

### Testing
Run unit tests by running `npm run test`. 

I felt it was important to test on a real site to begin with. I picked the website for [Four Seasons Ventures](https://www.four-seasons-ventures.com/) for my tests because it's a small site, I know the people who own it and I know its not going to change much.  

I need to mock my unit tests because, in their current state, many of the tests would break if changes were made to the website. 

Note: testing takes some time because the async callbacks. When testing the `runWebCrawler` method, I had to `setTimeout` at 15 seconds as Jest has a default timeout of 5 seconds. 

