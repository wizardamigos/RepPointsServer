var fs = require("fs");
var async = require("async");

function engine(){

var _this = this;

var dis_snap_path = "data/dis_snapshot.json";
var rules_path = "data/rules.json";

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
      dis_snapshot = JSON.parse(fs.readFileSync(dis_snap_path, 'utf8'));
      console.log("read dis_snapshot");

      rules = JSON.parse(fs.readFileSync(rules_path, 'utf8'));
      console.log("read rules");
  }

  this.redistribute = function(){
    console.log("redistribute");

    var sum = 0;

    dis_snapshot.users.forEach(function(e){
      var r;
      sum += r = e.points * rules.redistribution_rate;
      e.points -= r;
    });

    dis_snapshot.users.forEach(function(e, i, arr){
      e.points += sum / arr.length;
    });

    dis_snapshot.timestamp = Date.now();

    fs.writeFile(dis_snap_path, JSON.stringify(dis_snapshot, null, 4), function(err){
      if(err){
        console.log(err);
      }
    });
  }

  this.createPoints = function(){
    console.log("create points");

    dis_snapshot.users.forEach(function(e, i, arr){
      e.points += rules.creation_rate / arr.length;
    });

    dis_snapshot.timestamp = Date.now();

    fs.writeFile(dis_snap_path, JSON.stringify(dis_snapshot, null, 4), function(err){
      if(err){
        console.log(err);
      }
    });
  }

}

module.exports = engine;
