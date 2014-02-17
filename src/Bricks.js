function Wall(descr){
	for(var property in descr){
		this[property] = descr[property];
	}
}

Wall.prototype.loadLevel = function(str){
	this.wall = new Array(this.rows);
	for(var i = 0; i < this.rows; i++){
		this.wall[i] = new Array(this.columns);
	}

	for(var i = 0; i < this.rows; i++){
		for(var j = 0; j < this.columns; j++){
			var t;
			if(str === undefined){
				t = 9;
			}
			else{
				t = str[i * this.columns + j];
			}
			this.wall[i][j] = makeBrick(t);
		}
	}
};

Wall.prototype.render = function(ctx){
	//render also checks if level is finished to avoid having to scan again through the bricks
	var finished = true;

	for(var i = 0; i < this.rows; i++){
		for(var j = 0; j < this.columns; j++){
			var thisAlive = this.wall[i][j].alive;
			finished = finished && !thisAlive;

			if(thisAlive){
				sprites[this.wall[i][j].color].drawCentredAt(ctx, this.brickHalfWidth * 2 * j + this.brickHalfWidth, 
				this.brickHalfHeight * 2 * i + this.spacing);	
			}
		}
	}

	if (finished){
		levelUp();
	}
};

Wall.prototype.collidesWith = function(other){
	for(var i = 1; i <= this.rows; i++){
		for(var j = 1; j <= this.columns; j++){

			if(this.wall[i-1][j-1].alive){
				var bb  = this.getBoundingBox(i,j);
				//----------
				if(bb.intersects(other)){
					var destroyed = hit(this.wall[i-1][j-1]);
					//power up
					if(Math.random() > 0.8 && destroyed){
						generatePowerUp(bb.cx, bb.cy);
					}
					return true;
				}
			}
		}
	}

	return false;
};

Wall.prototype.getBoundingBox = function(i,j){
	return new BoundingBox({
		halfWidth : this.brickHalfWidth,
		halfHeight : this.brickHalfHeight,

		cx : j * this.brickHalfWidth * 2 - this.brickHalfWidth,
		cy : i * this.brickHalfHeight * 2 + this.spacing - this.brickHalfHeight
	});
};

var g_wall = new Wall({
	rows : 8,
	columns : 10,

	brickHalfWidth : g_canvas.width / 20,
	brickHalfHeight : 8,

	spacing : 8 * 2 * 3
});

function makeBrick(t){
	var a = false;
	var h = 1;
	var c = "brickG";

	if(t === "0"){
		a = true;
		h = 1;
		c = "brickG";
	}

	if(t === "1"){
		a = true;
		h = 1;
		c = "brickR";
	}

	if(t === "2"){
		a = true;
		h = 1;
		c = "brickB";
	}

	if(t === "3"){
		a = true;
		h = 2;
		c = "brickS";
	}

	if(t === "5"){
		//a hole in the wall
		a = false;
		h = 0;
		var c = "brickS";
	}

	return {
		alive : a,
		hits: h,
		color: c
	};
}

function hit(brick){
	brick.hits -= 1;
	if(brick.hits === 0){
		brick.alive = false;
		brickDead.play();
		g_paddle1.score += 10;
		return true;
	}

	steel.play();
	return false;
}
