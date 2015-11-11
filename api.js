var API = function (_engine){

  var self = this;
  var engine = _engine;

  this.transferPoints = function(req, res){
    console.log("received get " + JSON.stringify(req.query));

    var fromUserId = req.query.fromUserId;
    var toUserId = req.query.toUserId;
    var amount = req.query.amount;

    engine.enqueueTask(engine.transferPoints,
       [fromUserId, toUserId, amount],
       "transfer " + amount + " points from " + fromUserId + " to " + toUserId);

    res.status(200).send("task successfully enqueued");
  }

}

module.exports = API;
