function Piece(x, y, color, border, bkcolor){
    this.x = x;
    this.y = y;
    this.color = color;
    this.border = border;
    this.bkcolor = bkcolor;
    this.pattern = random_pattern();
    this.height = this.pattern.length;
    this.width = this.pattern[0].length;
    console.log(` width: ${this.width} large: ${this.height}`);

    this.draw = function (ctx){
        this.generic_draw(ctx,false);
    }

    this.delete = function (ctx){
        this.generic_draw(ctx,true);
    }

    this.generic_draw = function (ctx, del){
        var index = 0;
        this.blocks.forEach(function(block) {
            console.log(`block: ${index} x: ${block.x} y: ${block.y} `);
            index++;
            if(del)block.delete(ctx);
            else block.draw(ctx);
        });
    }

    this.move_down = function(ctx){
        this.move(ctx, 0, unit);
    }

    this.move_left = function(ctx){
        this.move(ctx, -unit, 0);
    }

    this.move_right = function(ctx){
        this.move(ctx, unit, 0);
    }


    this.move = function (ctx,dx, dy){
        this.delete(ctx);
        this.x = this.x + dx;
        this.y = this.y + dy;
        this.blocks.forEach(function(block) {
            block.move(dx, dy);
        });
        this.draw(ctx);
    }


    this.build = function (){
        console.log(`x: ${this.x}  y: ${this.y} `);
        var blocks = [];
        var horizontal = my_random(2) == 0;
        var flipped = my_random(2) == 0;
        var center_x = 2;
        var center_y = 1;
        var index = 0;
        for (var j = 0; j < this.height; j++){
            for (var i = 0; i < this.width; i++){
                var x_coord = this.x + (i - center_x) * unit;
                var y_coord = this.y + (j - center_y) * unit;
                console.log(`index: ${index} x: ${(i - center_x) * unit} y: ${(i - center_y) * unit} i: ${i} j: ${j} block? : ${this.pattern[j][i]} `);
                if (this.pattern[j][i]){
                    blocks.push(new Block(x_coord, y_coord, this.color, this.border,this.bkcolor));
                }
                index++;
            }
        }
        return blocks;
    }

    this.blocks = this.build();

    this.rotateCW = function(ctx){
        this.delete(ctx);
        this.pattern = rotate_matrix90CW(this.pattern);
        console.log(`width ${this.width}  height${this.height}`);
        var temp = this.height;
        this.height = this.width;
        this.width = temp;
        console.log(`width ${this.width}  height${this.height}`);
        this.blocks = this.build();
        this.draw(ctx);
    }

    this.touchdown = function(){
        if (canvas_height - this.height*unit/2 <= this.y) console.log(` the lowest point ${this.y + this.height*unit/2}`);
        return canvas_height - this.height*unit/2 <= this.y ;
    }

}