function Piece(x, y, border, color){
    this.x = x;
    this.y = y;
    this.color = color;
    this.border = border;
    this.pattern = random_pattern();
    this.height = this.pattern.length;
    this.width = this.pattern[0].length;
    console.log(` width: ${this.width} large: ${this.height}`);

    this.draw = function (ctx){
        var index = 0;
        this.blocks.forEach(function(block) {
            console.log(`block: ${index} x: ${block.x} y: ${block.y} `);
            index++;
            block.draw(ctx);
        });
    }

    this.rotate_piece = function(){
        this.pattern = rotate_matrix90CW(this.pattern);
    }

    this.move_down = function (){
        this.move(0, unit);
    }

    this.move = function (dx, dy){
        this.x = this.x + dx;
        this.y = this.y + dy;
        this.blocks.forEach(function(block) {
            block.move(dx, dy);
        });
    }


    this.build_piece = function (){
        console.log(`x: ${this.x}  y: ${this.y} `);
        var blocks = [];
        var horizontal = my_random(2) == 0;
        var flipped = my_random(2) == 0;
        var center_x = 2;
        var center_y = 1;
        var index = 0;
        for (var j = 0; j < block_height; j++){
            for (var i = 0; i < block_width; i++){
                var x_coord = this.x + (i - center_x) * unit;
                var y_coord = this.y + (j - center_y) * unit;
                console.log(`index: ${index} x: ${(i - center_x) * unit} y: ${(i - center_y) * unit} i: ${i} j: ${j} block? : ${this.pattern[j][i]} `);
                if (this.pattern[j][i]){
                    blocks.push(new Block(x_coord, y_coord, this.color, this.border));
                }
                index++;
            }
        }
        return blocks;
    }

    this.blocks = this.build_piece();

    

    

}