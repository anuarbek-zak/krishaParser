var express = require('express');
var router = express.Router();
var User = require('../models/User');
var request = require('request');
var cheerio = require("cheerio");
var URL = "https://krisha.kz";
var async = require('async');
var needle = require('needle');

router.get('/api/users',function (req,res) {
    User.find({}).exec(function (err,users) {
        if(err) return err;
        res.send(users);
    });
});

router.get('/api/krisha/',function (req,response) {

    // request(URL+"/a/show/24386545",function (err, res, body2) {
    //     if (err) throw err;
    //     var $ = cheerio.load(body2);
    //     var price = $(".a-header.specialist").children(".price").text();
    //     var title = $(".a-header.specialist").children("h1").text();
    //     console.log("price",price);
    //     console.log("title",title);
    //     // titles.push(title);
    //     // callback();
    // });
    var links = [];
    var titles = [];
    needle.get(URL+"/prodazha/kvartiry/", function (err, res) {
        if (err) throw err;
        var $ = cheerio.load(res.body);
        $(".a-description").each(function () {
            var link = $(this).find('.link').attr('href');
            links.push(link);
        });
        console.log(links);
        async.each(
            links,
            function (item,callback) {
                needle.get(URL+item,function (err, resik) {
                    if (err) throw err;
                    var $ = cheerio.load(resik.body);
                    var title =  $("h1").text();
                    var price  = $(".a-header .price").text();
                    titles.push({title:title,price:price});
                    callback();
                });
            },
            function (err) {
                if(err) throw err;
                console.log(titles);
                response.send({titles:titles,links:links});
            }
         );
    });
});

module.exports = router;
