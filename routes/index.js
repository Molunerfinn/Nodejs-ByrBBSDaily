var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    var db = req.db;
    var toptensDay = db.get('toptensDay');
    var toptens = db.get('toptens');

    function getData(dbName,callBack){
      dbName.find({},{sort: [["_id",-1]]},function(e,docs){
        callBack(docs)
    });    
    }

    getData(toptensDay,function(data){
      var toptensDayData = data;
      getData(toptens,function(data){
        var toptensData = data;
        res.render('index',{
          "toptensDay": toptensDayData,
          "toptens": toptensData,
          "titile": "Toptens"
        })    
      })
    })    
});

router.post('/topten', function(req, res) {

    var db = req.db;
    var loadNum = req.body.loadNum;
    var flag = req.body.flag;
    var toptensDay = db.get('toptensDay');
    var toptens = db.get('toptens');

    if(flag == "day"){
      toptensDay.find({},{sort: [["_id",-1]]},function(e,docs){
          if (loadNum < docs.length){
            res.send('toptens', {
                "toptensDay" : docs[loadNum],
            });
          } else{
            res.send("error");
          }
      });           
    } else{
      toptens.find({},{sort: [["_id",-1]]},function(e,docs){
          if (loadNum < docs.length){
            res.send('toptens', {
                "toptens" : docs[loadNum],
            });
          } else{
            res.send("error");
          }
      });
    }

});

module.exports = router;
