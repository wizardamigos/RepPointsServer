var fs = require("fs");
var async = require("async");
var git    = require('gitty');

var Engine = function(){

var _this = this;

var dis_snap_path = "data/dis_snapshot.json";
var rules_path = "data/rules.json";
var myRepo = git('.');

var dis_snapshot, rules;

var event_queue = async.queue(function(task, callback){
  task(function(){callback();});
});

var redistribute_timer_id;
var creation_timer_id;

this.start = function(){
  async.series([
    function(cb){
      _this.loadData(cb);
    },
    function(cb){

      redistribute_timer_id = setInterval(function(){
        event_queue.push(_this.redistribute);
      }, rules.redistribution_interval);

      creation_timer_id = setInterval(function(){
        event_queue.push(_this.createPoints);
      }, rules.creation_interval);

      cb();
    }

  ]);
}

  this.loadData = function(cb){
      myRepo.pull('origin', 'master', function(err){
        if(err) return console.log(err);

        dis_snapshot = JSON.parse(fs.readFileSync(dis_snap_path, 'utf8'));
        console.log("read dis_snapshot");

        rules = JSON.parse(fs.readFileSync(rules_path, 'utf8'));
        console.log("read rules");

        if(cb !== undefined) cb();
      });
  }

  this.saveData = function(message, cb){
    //write to file
    fs.writeFileSync(dis_snap_path, JSON.stringify(dis_snapshot, null, 4));

    //stage
    myRepo.addSync([dis_snap_path]);

    //commit
    myRepo.commitSync(message);

    //push
    myRepo.push('origin', 'master', function(err){
      if(err) return console.log(err);

      console.log("pushed to remote");

      if(cb !== undefined) cb();
    });
  }

  this.redistribute = function(queue_callback){
    console.log("redistribute started");

    async.series([
      function(cb){
        _this.loadData(cb);
      },
      function(cb){
        _this.performRedistribution();
        cb();
      },
      function(cb){
        _this.saveData("redistribution by RepPointsServer", cb);
      },
      function(cb){
        queue_callback();
        cb();
      }
    ]);
  }

  this.createPoints = function(queue_callback){
    console.log("create points started");

    async.series([
      function(cb){
        _this.loadData(cb);
      },
      function(cb){
        _this.performCreatePoints();
        cb();
      },
      function(cb){
        _this.saveData("points created by RepPointsServer", cb);
      },
      function(cb){
        queue_callback();
        cb();
      }
    ]);
  }

  this.performRedistribution = function(){
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
  }

  this.performCreatePoints = function(){
    dis_snapshot.users.forEach(function(e, i, arr){
      e.points += rules.creation_rate / arr.length;
    });

    dis_snapshot.timestamp = Date.now();
  }

}

module.exports = Engine;
