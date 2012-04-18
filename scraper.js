/**
  *
  
  * Intention is that this is split into three files to do separate tasks
  * Primary intention is to LEARN NODE and nothing else
  * Use on copyright free mp3 sources only
  
   THIS FILE
   grab rss feed
   find items with .mp3 file extensions mentioned
   store xml/ish data in a file to parse later
   ---
   PROCESSOR
   group by item title, playlist or whatever
   scrape mp3 files
   ascertain id3 meta data from files
   find available artwork
   store data
   ---
   WEB VIEW
   present available albums
   present available songs
   
  *
  **/
  
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
      scripts: ['http://code.jquery.com/jquery-1.5.min.js']
    
    }, function (err, window) {
    
      var $ = window.jQuery;
      var stack = new Array();
      
      parser.on('article', function (article){
        
        // either
        // - look for mp3 in enclosures
        // - look for mp3 in description/summary

        $('body').append(JSON.stringify(article));
        console.log(JSON.stringify(article));
        if ($('a').length > 0) {
          
          console.log('%s - %s (%s)', article.date, article.title, article.link);
          
          // prep and scrape mp3 urls
          links = new Array();

          $('a').each(function(){
            if($(this).attr('href').indexOf('\.mp3')>0) links[links.length] = $(this).attr('href');
          });
          
          // reset
          stack[stack.length] = {date: article.date, title: article.title, guid: article.link, links: links};
        
        }
      
        $('body').html('');

        // 
        // if (article.description.indexOf('.mp3')>0) {
        //   
        //   console.log('%s - %s (%s)', article.date, article.title, article.link);
        //   
        //   // prep and scrape mp3 urls
        //   links = new Array();
        //   $('body').append(JSON.stringify(article.enclosures));
        //   
        //   $('a').each(function(){
        //     if($(this).attr('href').indexOf('\.mp3')>0) links[links.length] = $(this).attr('href');
        //   });
        //   
        //   // reset
        //   $('body').html('');
        //   stack[stack.length] = {date: article.date, title: article.title, guid: article.link, links: links};
        // 
        // }
      
      });
      
      parser.on('end', function(articles){
        stack_string = JSON.stringify(stack);
        
        fs.createWriteStream('scrape-stores/'+target.filename, {
            flags: "a",
            encoding: "encoding",
            mode: 0666
        }).write(stack_string);
        
      });
      
      var target = {url: 'http://www.abc.net.au/triplej/listen/free_mp3s.xml', title: "filename", filename: "filename.scrape"};
      parser.parseUrl(target.url);
});
  
