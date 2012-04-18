Project: node-rss-mp3-scraper
=============================

Looks at an RSS feed and collects meta on the MP3 files referenced therein. A project to learn node.js properly.

Requirements
------------
Currently makes *some* use of these modules

* http
* fs
* path
* feedparser # npm install feedparser
* jsdom # npm install jsdom

Data store
----------
Currently pushes scraped data onto a text file in a subfolder which the app creates if required

Input
-----
Currently hardcoded, eventually a file with list of RSS feeds to scrape on a regular basis with rules on when/how often to do so