# Web Crawler
A web crawler which, given a starting URL, visits every reachable page on the domain and returns the URL of every static asset (images, javascript, stylesheets) on each page in JSON format. 

The software is initalised with an empty array `_staticAssets` for asset objects, and an array of objects `_urlQueue` containing the starting URL and a `visited` boolean. At a high level, the software should: 
1. Visit first URL in `_urlQueue` where `visited: false`
2. Retrieve information from that page.
3. Identify all hyperlinks to other pages, and: 
    1. Check if URL exists or if `visited: true` in `_urlQueue`
    2. If no, push URL into `_urlQueue` with `{visited: false}`
4. Identify all assets on the page and add `_staticAssets` as object with `url` and `assets`.
5. Change URL object `visited` status to true in `_urlQueue`
6. Go to next URL in `_urlQueue` and repeat from step 1. 
7. Once all URLs are visited, generate JSON with `url` and `assets`.

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
