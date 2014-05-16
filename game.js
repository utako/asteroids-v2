(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function (height, width, ctx) {
    this.height = height;
    this.width = width;
    this.ctx = ctx;
    this.ship = new Asteroids.Ship([(width/2),(height/2)], 20, "#ACA9CC", 90, 0);
    this.asteroids = [];
    this.bullets = [];
    this.show;
    

  };
  

  Game.FPS = 30;

  Game.prototype.addAsteroids = function (numAsteroids) {
    for (var i=0; i<numAsteroids; i++) {
      var randAsteroid = Asteroids.Asteroid.randomAsteroid();
      this.asteroids.push(randAsteroid);
    }
  };
  
  Game.prototype.addSubAsteroids = function (asteroid, bullet) {
      var subAsteroid0 = Asteroids.Asteroid.subAsteroid(asteroid, bullet)[0];
      var subAsteroid1 = Asteroids.Asteroid.subAsteroid(asteroid, bullet)[1];
      this.asteroids.push(subAsteroid0);
      this.asteroids.push(subAsteroid1);
  };
  
  Game.prototype.fireBullet = function() {
    var game = this;
    var bullet = this.ship.fireBullet(game);
    this.bullets.push(bullet);
  };
  
  Game.prototype.removeAsteroid = function(asteroid) {
    this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
//    delete this.asteroids[this.asteroids.indexOf(asteroid)];
  };
  
  Game.prototype.removeBullet = function(bullet) {
    // delete this.bullets[this.bullets.indexOf(bullet)];
    this.bullets.splice(this.bullets.indexOf(bullet), 1);
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.width, this.height);
    var game = this;
    this.ship.draw(ctx);
    this.asteroids.forEach ( function (asteroid) {
      asteroid.draw(ctx);
    });
    this.bullets.forEach ( function (bullet) {
      bullet.draw(ctx);
    });
  };

  Game.prototype.move = function(){
    var asteroids = this.asteroids;
    var game = this
    this.asteroids.forEach(function(asteroid){
      asteroid.move();
      if (asteroid.pos[0] >= window.innerWidth){
        var newVel = [-asteroid.vel[0], asteroid.vel[1]];
        game.asteroids.push(new Asteroids.Asteroid(asteroid.pos, newVel, asteroid.radius, asteroid.color));
        delete asteroids[asteroids.indexOf(asteroid)];
      }
      else if (asteroid.pos[1] >= window.innerHeight ){
        var newVel = [asteroid.vel[0], -asteroid.vel[1]];
        game.asteroids.push(new Asteroids.Asteroid(asteroid.pos, newVel, asteroid.radius, asteroid.color));
        delete asteroids[asteroids.indexOf(asteroid)];
      }
      else if (asteroid.pos[0] <= 0) {
        var newVel = [-asteroid.vel[0], asteroid.vel[1]];
        game.asteroids.push(new Asteroids.Asteroid(asteroid.pos, newVel, asteroid.radius, asteroid.color));
        delete asteroids[asteroids.indexOf(asteroid)];
      }
      else if (asteroid.pos[1] <= 0){
        var newVel = [asteroid.vel[0], -asteroid.vel[1]];
        game.asteroids.push(new Asteroids.Asteroid(asteroid.pos, newVel, asteroid.radius, asteroid.color));
        delete asteroids[asteroids.indexOf(asteroid)];
      }

    });
    this.ship.move();
    if (this.ship.pos[0] <= 0 || this.ship.pos[0] >= window.innerWidth || this.ship.pos[1] <= 0 || this.ship.pos[1] >= window.innerHeight) {
    var pos;
      if (this.ship.pos[0] <= 0) {
        pos = [window.innerWidth, window.innerHeight-this.ship.pos[1]];      
      } else if (this.ship.pos[0] >= window.innerWidth) {
        pos = [0, window.innerHeight - this.ship.pos[1]];
      } else if (this.ship.pos[1] <= 0) {
        pos = [window.innerWidth - this.ship.pos[0], window.innerHeight];
      } else if (this.ship.pos[1] >= window.innerHeight) {
        pos = [window.innerWidth - this.ship.pos[0], 0];
      }
      var radius = this.ship.radius;
      var color = this.ship.color;
      var theta = this.ship.theta;
      var mag = this.ship.mag;
      this.ship = new Asteroids.Ship(pos, radius, color, theta, mag);
    }
    this.bullets.forEach (function(bullet) {
      bullet.move();
    });
  };

  Game.prototype.checkCollisions = function() {
    var ship = this.ship;
    var game = this;
    this.asteroids.forEach(function(asteroid) {
      if (ship.isCollidedWith.bind(ship, asteroid)()) {
        // game.explodeShip();
       alert("GAME OVER");
        game.stop();
      }
    });
  };
  
  Game.prototype.explodeShip = function() {
    audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'sadtrombone.mp3');
    audioElement.play();
  };

  Game.prototype.step = function(){
    this.move();
    this.draw(this.ctx);
    this.checkCollisions();
    game = this;
    game.bullets.forEach(function(bullet) {
      bullet.hitAsteroids.bind(bullet)();
    })
  };

  Game.prototype.start = function(){
    var game = this;
    this.addAsteroids(20);
    this.show = setInterval(game.step.bind(game), Game.FPS);
  };

  Game.prototype.stop = function(){
    clearInterval(this.show);
  };

  Game.prototype.bindKeyHandlers = function(){
    var game = this;
    key('enter', function() {game.start()} );
    key('up', function() {game.ship.power(-.25)});
    key('left', function() {game.ship.rotate(-8)});
    key('down', function() {game.ship.power(.25)});
    key('right', function() {game.ship.rotate(8)});
    key('space', function() {game.fireBullet()});
    // this.audioElement.addEventListener("load", function() {
    //   this.audioElement.play();
    // }, false)
  };



})(this);