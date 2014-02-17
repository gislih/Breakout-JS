g_bullets = [];

function fire(x,y){
	var b = {
		cx : x,
		cy : y,
		redundant : false,
		yVel : 10
	};
	g_bullets.push(b);
}

function updateBullets(du){
	for(var i = 0; i < g_bullets.length; i++){
		g_bullets[i].cy -= g_bullets[i].yVel * du;
		if(g_bullets[i].cy < 0){
			g_bullets[i].redundant = true;
		}
	}

	for(var i = 0; i < g_bullets.length; i++){
		var bb = new BoundingBox({
			halfHeight : 5,
			halfWidth : 2,
			cx : g_bullets[i].cx,
			cy : g_bullets[i].cy
		});

		if(g_wall.collidesWith(bb)){
			g_bullets[i].redundant = true;
		}
	}

	for(var i = 0; i < g_bullets.length; i++){
		if(g_bullets[i].redundant){
			deleteElement(g_bullets, i);
		}
	}
}

function renderBullets(ctx){
	spr = sprites["bullet"];

	for(var i = 0; i < g_bullets.length; i++){
		spr.drawCentredAt(ctx, g_bullets[i].cx, g_bullets[i].cy);
	}
}

