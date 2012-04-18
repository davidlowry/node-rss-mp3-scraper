var http = require('http')
    , FeedParser = require('feedparser')
    , parser = new FeedParser()
    , jsdom  = require('jsdom')
    , fs     = require('fs')
    , path = require('path')
    ;

    // check write dir exists
    if (!path.existsSync("scrape-stores")) {
       fs.mkdir('scrape-stores');
    }


    jsdom.env({
      html: "<html><body></body></html>",
      scripts: [
        'http://code.jquery.com/jquery-1.5.min.js'
      ]
    }, function (err, window) {
    
      var $ = window.jQuery;

      var stack = new Array();

      parser.on('article', function (article){
        //console.log('Got article: %s', JSON.stringify(article));
        contains_mp3s = article.description.indexOf('.mp3')>0;
        if (contains_mp3s) {
          console.log('%s - %s (%s)', article.date, article.title, article.link);
    
          // prep and scrape mp3 urls
          links = new Array();
          $('body').append(article.description);

          $('a').each(function(){
            if($(this).attr('href').indexOf('\.mp3')>0) links[links.length] = $(this).attr('href');
          });
           
          $('body').html('');
          stack[stack.length] = {date: article.date, title: article.title, guid: article.link, links: links};
        }
  
      });

      parser.on('end', function(articles){
        stack_string = JSON.stringify(stack);
        
        fs.createWriteStream('scrape-stores/'+target.filename, {
            flags: "a",
            encoding: "encoding",
            mode: 0666
        }).write(stack_string);
        
      });
      
      var target = {url: 'http://blog.iso50.com/feed', title: "ISO50", filename: "ISO50-2012-04-17.scrape"};
      parser.parseUrl(target.url);
});
  
/**
  *
   
   grab rss feed
   find items with .mp3 file extensions mentioned
   store xml/ish data in a file to parse later
   ---
   group by item title, playlist or whatever
   scrape mp3 files
   ascertain id3 meta data from files
   find available artwork
   store data
   ---
   present available albums
   present available songs
   
  *
  **/