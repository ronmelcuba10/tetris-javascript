
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
        draw_jewel_block(ctx, this.x, this.y, color);
    }

    // draws the block in background color -> removes it
    this.delete = function (ctx) {
        //this.draw_color(ctx, this.bkcolor, this.bkcolor);
        draw_jewel_block(ctx, this.x, this.y, this.bkcolor);
    }

    // draws this block with its color
    this.draw = function (ctx){
        //this.draw_color(ctx, this.color, this.border);
        draw_jewel_block(ctx, this.x, this.y, this.color);
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

