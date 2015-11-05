var fs = require("fs");
var async = require("async");

function engine(){

var _this = this;

var dis_snapshot, rules;

var redistribute_timer_id;
var creation_timer_id;

  this.start = function(){
    async.series([
      function(cb){
        _this.loadData();
        cb();
      },
      function(cb){
        //start timers
        redistribute_timer_id = setInterval(_this.redistribute, rules.redistribution_interval);
        creation_timer_id = setInterval(_this.createPoints, rules.creation_interval);
        cb();
      }
    ]);
  }

  this.loadData = function(){
      dis_snapshot = JSON.parse(fs.readFileSync('dis_snapshot.json', 'utf8'));
      console.log("read dis_snapshot");

      rules = JSON.parse(fs.readFileSync('rules.json', 'utf8'));
      console.log("read rules");
  }

  this.redistribute = function(){
    console.log("redistribute");
  }

  this.createPoints = function(){
    console.log("create points");
  }

}

module.exports = engine;
