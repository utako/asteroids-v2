(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Bullet = Asteroids.Bullet = function(pos, radius, color, theta, mag, game){
    this.pos = pos;
    this.radius = radius;
    this.color = color;
    this.theta = theta;
    this.mag = mag;
    this.game = game;
  };

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.prototype.hitAsteroids = function() {
    var bullet = this;
    var game = this.game;
    game.asteroids.forEach ( function(asteroid) {
      if (asteroid.isCollidedWith(bullet)) {
        if (asteroid.radius >= 30) {
          game.addSubAsteroids(asteroid, bullet);
        }
        game.removeAsteroid(asteroid);
        game.removeBullet(bullet);
        
      }
    });
  };
  
})(this);