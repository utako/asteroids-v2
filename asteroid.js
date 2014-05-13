(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function(pos, vel, radius, color){
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
  };

  Asteroid.inherits(Asteroids.MovingObject2);

  Asteroid.COLORS = ["#A5C7C1", "#D1E0DE", "#8CA39F", "#C8E0E3", "#ACC2B1", "#D3E0BF"];
  //  Asteroid.RADIUS = 50;
  Asteroid.POSITIONS = [[screen.width, screen.height], [0, 0], [0, screen.height], [screen.width, 0]];

  Asteroid.randomAsteroid = function () {
    var dimX = Math.floor(screen.width * Math.random());
    var dimY = Math.floor(screen.height * Math.random());
    var pos = [dimX, dimY];
    // var pos = Asteroid.POSITIONS[Math.floor(Asteroid.POSITIONS.length*Math.random())];
    var vel = Asteroid._randomVec();
    var radius = Math.random() * 100 + 10;
    var color = Asteroid.COLORS[Math.floor(Asteroid.COLORS.length * Math.random())];
    return new Asteroid(pos, vel, radius, color);
  };
  
  Asteroid.subAsteroid = function(asteroid, bullet) {
    var pos = asteroid.pos;
    var vels = Asteroid._computeSubAsteroidVel(asteroid, bullet);
    var radius = asteroid.radius/2;
    var color = asteroid.color;
    return [new Asteroid(pos, vels[0], radius, color), new Asteroid(pos, vels[1], radius, color)]
  };
  
  Asteroid._computeSubAsteroidVel = function(asteroid, bullet) {
    var orig_vel = asteroid.vel;
    var new_mag = -Math.sqrt(Math.pow(asteroid.vel[0], 2) + Math.pow(asteroid.vel[1], 2));
    var new_vels = [];
    new_vels.push([new_mag*cos(bullet.theta-45), new_mag*sin(bullet.theta-45)]);
    new_vels.push([new_mag*cos(bullet.theta+45), new_mag*sin(bullet.theta+45)]);
    
    // if ((asteroid.vel[0] <=  1 && asteroid.vel[0] >  0) && (asteroid.vel[1] === 0)) {
//         new_vels = [[1, Math.cos(Math.PI/4)], [1, -Math.cos(Math.PI/4)]];
//     } else if (asteroid.vel[0] ===  0 && asteroid.vel[1] === -1) {
//         new_vels = [[Math.cos(Math.PI/4), 1], [-Math.cos(Math.PI/4), 1]];
//     } else if (asteroid.vel[0] ===  -1 && asteroid.vel[1] === 0) {
//         new_vels = [[-1, Math.cos(Math.PI/4)], [-1, -Math.cos(Math.PI/4)]];
//     } else if (asteroid.vel[0] ===  0 && asteroid.vel[1] === 1) {
//         new_vels = [[Math.cos(Math.PI/4), -1], [-Math.cos(Math.PI/4), -1]];
//     } else if (asteroid.vel[0] ===  1 && asteroid.vel[1] === -1) {
//         new_vels = [[Math.cos(Math.PI/8), Math.sin(Math.PI/8)], [Math.cos(3*Math.PI/8), Math.sin(3*Math.PI/8)]];
//     } else if (asteroid.vel[0] ===  -1 && asteroid.vel[1] === 1) {
//         new_vels = [[Math.cos(Math.PI + Math.PI/8), Math.sin(Math.PI + Math.PI/8)], [Math.cos(Math.PI + 3*Math.PI/8), Math.sin(Math.PI + 3*Math.PI/8)]];
//     } else if (asteroid.vel[0] ===  1 && asteroid.vel[1] === 1) {
//         new_vels = [[Math.cos(- Math.PI/8), Math.sin(-Math.PI/8)], [Math.cos(-3*Math.PI/8), Math.sin(-3*Math.PI/8)]];
//     } else if (asteroid.vel[0] ===  -1 && asteroid.vel[1] === -1) {
//         new_vels = [[Math.cos(5 * Math.PI/8), Math.sin(-5 * Math.PI/8)], [Math.cos(-15*Math.PI/8), Math.sin(15*Math.PI/8)]];
//     }
    return [new_vels[0], new_vels[1]]
  };

  Asteroid._randomVec = function() {
    var max = 2
    var velX = Math.floor(Math.random() * (max + 1)) - 1;
    var velY = Math.floor(Math.random() * (max + 1)) - 1;
    return [velX, velY]
  };  

  var sin = function(degrees) {
    var rads = degrees.toRads();
    return Math.sin(rads);
  };
  
  var cos = function(degrees) {
    var rads = degrees.toRads();
    return Math.cos(rads);
  };

  Number.prototype.toRads = function() {
    return (2 * parseInt(this) * Math.PI)/360; 
  };
  
})(this);