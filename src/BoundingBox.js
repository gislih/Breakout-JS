// ============
// Bounding Box
// ============

function BoundingBox(descr){
	for(var property in descr){
		this[property] = descr[property];
	}
}

BoundingBox.prototype.intersects = function(other){
    return( (Math.abs(this.cx - other.cx) < (this.halfWidth + other.halfWidth)) && (Math.abs(this.cy - other.cy) < (this.halfHeight + other.halfHeight)) );
};
