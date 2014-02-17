function PowerUp(descr){
	for(var property in descr){
		this[property] = descr[property];
	}
}

PowerUp.prototype.yVel = 2;
PowerUp.prototype.redundant = false;

PowerUp.prototype.update = function(du){
	if(g_paddle1.collidesWith(this.getBoundingBox())){
		this.redundant = true;
		this.event();
		powerUpS.play();
	}
	this.applyGravity(du);
	this.cy += this.yVel * du;
};

PowerUp.prototype.render = function(ctx){
	sprites[this.type].drawCentredAt(ctx, this.cx, this.cy, 0);
};

PowerUp.prototype.getBoundingBox = function(){
	return new BoundingBox({
        halfHeight : 15,
        halfWidth : 15,
        cx : this.cx,
        cy : this.cy
    })
};

PowerUp.prototype.applyGravity = function(du){
	this.yVel += 0.01 * du;
}