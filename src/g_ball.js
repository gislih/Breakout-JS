// ==========
// BALL STUFF
// ==========

function Ball(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

Ball.prototype.invincible = false;


Ball.prototype.update = function (du) {
    // Remember my previous position
    if(g_keys[KEY_S]){
        this.stuck = false;
    }

    if(this.stuck){
        this.cx = g_paddle1.cx;
        this.cy = g_paddle1.cy - g_paddle1.halfHeight - this.radius - 2;
        return;
    }

    var margin = 20;

    var prevX = this.cx;
    var prevY = this.cy;
    
    // Compute my provisional new position (barring collisions)
    var nextX = prevX + this.xVel * du;
    var nextY = prevY + this.yVel * du;

    // Bounce off the paddles
    if (g_paddle1.collidesWith(this.getBoundingBox(nextX, nextY)))
    {
        donk.play();

        this.yVel *= -1;
        var diff = g_paddle1.cx - nextX;
        var rate = 1.1;
        if ((diff >= -5) && (diff <= 5)) this.xVel = this.xVel  / rate;
        if ((diff >= 15) && (this.xVel < 0)) this.xVel  = this.xVel  * rate;
        if ((diff >= 15) && (this.xVel > 0)) this.xVel = this.xVel  * -rate;
        if ((diff <= -15) && (this.xVel > 0)) this.xVel  = this.xVel  * rate;
        if ((diff <= -15) && (this.xVel < 0)) this.xVel  = this.xVel  * -rate;
    }
    
    // Bounce off top edge
    if (nextY < 0 ) {               // top edge
        donk.play();
        this.yVel *= -1;
    }

    if(nextX < 0 ||
        nextX > g_canvas.width){
        donk.play();
        this.xVel *= -1;
    }

    //Bounce off the wall
    if(g_wall.collidesWith(this.getBoundingBox(nextX, nextY))){
        if(!this.invincible)this.yVel *= -1;
    }

    // Reset if we fall off the left or right edges
    var margin = 4 * this.radius;
    if (nextX < -margin || 
        nextX > g_canvas.width + margin) {
        this.reset();
    }

    //termainal velocity

    if(Math.abs(this.xVel) > this.tVel){
        this.xVel = this.tVel * this.xVel/this.xVel;
    }

	//update
    this.cx += this.xVel * du;
    this.cy += this.yVel * du;
};

Ball.prototype.reset = function () {
    this.stuck = true;
    this.xVel = 4;
    this.yVel = 3;
};

Ball.prototype.render = function (ctx) {
    var spr = "ball";
    if(this.invincible){
        spr = "ballinvinci";
    }
    sprites[spr].drawCentredAt(ctx, this.cx, this.cy);
};

//Get bounding box for ball
Ball.prototype.getBoundingBox = function(xpos, ypos){
     return new BoundingBox({
        cx : xpos,
        cy : ypos,
        halfWidth : this.radius,
        halfHeight : this.radius
    });
    
};

Ball.prototype.outOfBounds = function(){
    return this.cy > (g_canvas.height + 20);
};
