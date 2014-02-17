function Paddle(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}


Paddle.prototype.halfWidth = 40;
Paddle.prototype.halfHeight = 6;
Paddle.prototype.fireDelay = 0;
Paddle.prototype.canFire = false;
Paddle.prototype.score = 0;
Paddle.prototype.life = 4;

Paddle.prototype.update = function (du) {
    if (g_keys[this.GO_LEFT] && (this.cx - this.halfWidth > 0)) {
        this.cx -= 5 * du;
    } else if (g_keys[this.GO_RIGHT] && (this.cx + this.halfWidth < g_canvas.width)) {
        this.cx += 5 * du;
    }

    this.fireDelay -= 5 * du;
    if(this.fireDelay < 0){
        this.fireDelay = 0;
    }

    if(g_keys[KEY_S] && this.fireDelay === 0 && this.canFire){
        fire(this.cx - 20, this.cy);
        fire(this.cx + 20, this.cy);
        this.fireDelay = 40;
        fireS.play();
    }
};

Paddle.prototype.render = function (ctx) {
    sprites["paddle"].drawCentredAt(ctx,this.cx, this.cy);
};

Paddle.prototype.getBoundingBox = function(){
    return new BoundingBox({
        halfHeight : this.halfHeight,
        halfWidth : this.halfWidth,
        cx : this.cx,
        cy : this.cy
    })
};

Paddle.prototype.collidesWith = function (other) {
    var bb = this.getBoundingBox();
    return bb.intersects(other);
};
