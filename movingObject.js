(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  var MovingObject = Asteroids.MovingObject = function (pos, radius, color, theta, mag){
    var colors = ["#155919", "#20918C", "#FADB50", "#7D41CC", "#A3263D"];
    this.pos = pos;
//    this.vel = vel;
    this.radius = (radius * Math.random());
    this.color = colors[Math.floor(colors.length*Math.random())];
    this.theta = theta;
    this.mag = mag;
  };
  
  MovingObject.prototype.move = function(){
    var movingObject = this;
    var dx = parseInt(this.mag) * Math.cos(degreesToRads(movingObject.theta));
    var dy = parseInt(this.mag) * Math.sin(degreesToRads(movingObject.theta));
    this.pos  = [(this.pos[0] + dx), (this.pos[1] + dy)];
  };
  
  var degreesToRads = function(degrees) {
    return (2 * parseInt(degrees) * Math.PI)/360; 
  };

  MovingObject.prototype.draw = function(ctx) {

    var posX = this.pos[0];
    var posY = this.pos[1];
    var width = this.radius;
    var height = 0;
    var start = 2 * Math.PI;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(posX, posY, width, height, start, false);
    ctx.fill();
  };

  MovingObject.prototype.isCollidedWith = function(otherObj) {
    var x1 = this.pos[0];
    var y1 = this.pos[1];
    var x2 = otherObj.pos[0];
    var y2 = otherObj.pos[1];
    var sumRadii = otherObj.radius + this.radius;
    var distX = Math.pow((x2-x1),2);
    var distY = Math.pow((y2-y1),2);

    if(Math.sqrt(distX + distY) < (sumRadii)){
      return true;
    }
    else {
      return false;
    }
  };
  
})(this);