// ============
// SPRITE STUFF
// ============

function Sprite(image) {
    this.image = image;
    this.halfHeight = image.height / 2;
    this.halfWidth = image.width / 2;
}

function batchToArray(arrayIn, arrayOut){
    for(var name in arrayIn){
        arrayOut[name] = new Sprite(arrayIn[name]);
    }
}

Sprite.prototype.drawCentredAt = function (ctx, cx, cy, rotation) {

    if (rotation === undefined) rotation = 0;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.drawImage(this.image, -this.halfWidth, -this.halfHeight);

    ctx.restore();
};


