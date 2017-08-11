
function Block(x,y,color,border){
    this.x = x;
    this.y = y;
    this.color = color;
    this.border = border;

    this.move = function(dx,dy){
        this.x = this.x + dx;
        this.y = this.y + dy;
    }

    this.draw = function(ctx){
        var x0 = this.x;
        var x1 = this.x + 3*factor;
        var x2 = this.x + 7*factor;
        var x3 = this.x + unit;
        var y0 = this.y;
        var y1 = this.y + 3*factor;
        var y2 = this.y + 7*factor;
        var y3 = this.y + unit;
        ctx.lineWidth = border_size;
        ctx.strokeStyle = color;
        ctx.fillStyle = border;

        ctx.beginPath();
        ctx.moveTo(x1,y0);
        ctx.lineTo(x2,y0);
        ctx.quadraticCurveTo(x3, y0, x3, y1);
        ctx.lineTo(x3, y2);
        ctx.quadraticCurveTo(x3, y3, x2, y3);
        ctx.lineTo(x1, y3);
        ctx.quadraticCurveTo(x0, y3, x0, y2);
        ctx.lineTo(x0, y1);
        ctx.quadraticCurveTo(x0, y0, x1, y0);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }
}

