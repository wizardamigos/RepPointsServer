var fs = require("fs");
var async = require("async");
var git    = require('gitty');
var execSync = require('child_process').execSync;

var Engine = function(){

  var _this = this;

  var dis_snap_path = "data/dis_snapshot.json";
  var rules_path = "data/rules.json";
  var myRepo = git('.');
  var url = 'https://github.com/wizardamigosinstitute/RepPointsServer';

  var dis_snapshot, rules;

  var event_queue = async.queue(function(task, callback){
    _this.eventWrapper(task.fn, task.args, task.message, callback);
  });

  this.enqueueTask = function(_fn, _args, _message){
    event_queue.push({
      fn: _fn,
      args: _args,
      message: _message
    });
  }

  var redistribute_timer_id;
  var creation_timer_id;

  this.start = function(){
    async.series([
      function(cb){
        _this.gitInit(cb);
      },
      function(cb){
        _this.loadData(cb);
      },
      function(cb){

        redistribute_timer_id = setInterval(function(){
          _this.enqueueTask(_this.performRedistribution, [], "redistribution of points by RepPointsServer");
        }, rules.redistribution_interval);

        creation_timer_id = setInterval(function(){
          _this.enqueueTask(_this.performCreatePoints, [], "points created by RepPointsServer");
        }, rules.creation_interval);

        cb();
      }

    ]);
  }

  this.gitInit = function(cb){
    if(!fs.existsSync('.git')){

      console.log('initializing git');

      myRepo.initSync();
      myRepo.addRemoteSync('origin', url);

      execSync('git config --global user.email ' + process.env.GITHUB_USERNAME);
      execSync('git config --global user.name ' + process.env.GITHUB_USERNAME);

      execSync('git config credential.helper store');

      myRepo.addSync(['-A']);
      myRepo.commitSync('git init from heroku');

    }
    cb();
  }

  this.loadData = function(cb){
    console.log("--> git pull origin master");
      myRepo.pull('origin', 'master', function(err){
        if(err) return console.log(err);

        console.log('--> git pull successful!');

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
    execSync('git push --all --repo=' + url);

    console.log("pushed to remote");

    if(cb !== undefined) cb();
  }

  this.eventWrapper = function(fn, args, message, queue_callback){
    console.log("performing '" + message + "'");

    async.series([
      function(cb){
        _this.loadData(cb);
      },
      function(cb){
        fn.apply(null, args);
        cb();
      },
      function(cb){
        _this.saveData(message, cb);
      },
      function(cb){
        cb();
        queue_callback();
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

  /**
* Transfers reputation points from user A to user B
* if balance of A is sufficient
* #transferPoints
* @param {String} fromUserId
* @param {String} toUserId
* @param {int} amount
*/
  this.transferPoints = function(fromUserId, toUserId, amount){
      var valid = false;
      var users = dis_snapshot.users;

      for(var i = 0 ; i < users.length ; i++){
        if(users[i].name === fromUserId){
          console.log("fromUser found");
          if(users[i].points >= amount){
            console.log("withdrawal successful");
            users[i].points -= amount;
            valid = true;
          }
          break;
        }
      }

      if(valid){
        for(var i = 0 ; i < users.length ; i++){
          if(users[i].name == toUserId){
            console.log("toUser found");
            users[i].points = parseInt(users[i].points) + parseInt(amount);
            break;
          }
        }
      }

      dis_snapshot.timestamp = Date.now();
  }

}

module.exports = Engine;
