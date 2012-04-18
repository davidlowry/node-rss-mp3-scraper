node-rss-mp3-scraper
====================

Looks at an RSS feed and collects meta on the MP3 files referenced therein. A project to learn node.js properly.


requirements
------------
Currently makes *some* use of the modules
        var http = require('http')
        , FeedParser = require('feedparser')
        , parser = new FeedParser()
        , jsdom  = require('jsdom')
        , fs     = require('fs')
        , path = require('path')
        ;
