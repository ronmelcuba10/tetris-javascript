
function Block(x,y,color,border, bkcolor){
    this.x = x * unit;
    this.y = y * unit;
    this.color = color;
    this.border = border;
    this.bkcolor = bkcolor;

    // slide the block by dx,dy vector
    this.move = function(dx,dy){
        this.x = this.x + dx * unit;
        this.y = this.y + dy * unit;
    }

    // draw this block with the specified parementers
    this.draw_color = function(ctx, color, border){
        var x0 = this.x;
        var x1 = this.x + 3*factor;
        var x2 = this.x + 7*factor;
        var x3 = this.x + unit;
        var y0 = this.y;
        var y1 = this.y + 3*factor;
        var y2 = this.y + 7*factor;
        var y3 = this.y + unit;
        ctx.lineWidth = border_size;
        ctx.strokeStyle = border;
        ctx.fillStyle = color;

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

    // draws the block in background color -> removes it
    this.delete = function (ctx) {
        this.draw_color(ctx, this.bkcolor, this.bkcolor);
    }

    // draws this block with its color
    this.draw = function (ctx){
        this.draw_color(ctx, this.color, this.border);
    }

    // returns the game tile in where the block is situated
    this.tile = function (){
        return new Coor_Block(this.y/unit, this.x/unit, this);
    }

    this.teleport = function(x,y){
        this.x = x * unit;
        this.y = y * unit;
    }

    this.clone = function() {
        return jQuery.extend(true, {}, this);
    }
}

