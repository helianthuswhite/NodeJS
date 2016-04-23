/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------


var async = require('async');
var unfluff = require('unfluff');
var request = require('request');

var watson = require('extract-relationships');

var bbcNewsStoryUrl = 'http://www.bbc.co.uk/news/magazine-30934629';

var bluemixoptions = {
    api : {
        url : 'https://gateway.watsonplatform.net/relationship-extraction-beta/api',
        user : "29a67ebe-30f1-40e9-b0f2-674fb8b77747",
        pass : "Hb7bn63UNeSn"
    }
};


async.waterfall([

    // 下载新闻内容
    function (callback) {
        request(bbcNewsStoryUrl, callback); 
    }, 

    
    // 获取到文本内容
    function (response, body, callback) {
        var contents = unfluff(body).text;
        callback(null, contents);
    }, 

    //
    // 调用服务
    function (text, callback) {
        watson.extract(text, bluemixoptions, callback);
    },

    //
    // 获取到实体名称
    function (storyinfo, callback) {

        var people = storyinfo.entities.filter(function (entity) {            
            return entity.type === 'PERSON' && 
                   entity.level === 'NAM'
        });

        // 获取姓名
        var names = people.map(function (person) {

            var personnames = [];

            person.mentions.forEach(function (mention) {
                if (mention.role === 'PERSON' && mention.mtype === 'NAM') {
                    personnames.push(mention.text);
                }
            });

            return personnames;
        });

        callback(null, names);
    }
], function(err, result){
    //打印结果
    console.log(result);
});