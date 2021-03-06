function Piece(x, y, color, border, bkcolor, logged, pat) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.border = border;
    this.bkcolor = bkcolor;
    this.pattern = pat ? pat : random_pattern();
    this.height = this.pattern.length;
    this.width = this.pattern[0].length;
    this.logged = logged;
    this.touched_down = false;
    this.center_x = 0;
    this.center_y = 0;
    this.right_vector = new Point(1, 0);
    this.left_vector = new Point(-1, 0);
    this.down_vector = new Point(0, 1);
    this.rotated_vector = new Point(0, 0);



    //log(` width: ${this.width} large: ${this.height}`, this.logged);

    // draws the piece with its color
    this.draw = function (ctx) {
        this.generic_draw(ctx, false);
    }

    // draws th piece with the backgorund color -> deletes it
    this.delete = function (ctx) {
        this.generic_draw(ctx, true);
    }

    // draws the piece using two option. With del = true means deletion
    this.generic_draw = function (ctx, del) {
        var index = 0;
        this.blocks.forEach(function (block) {
            //log(`block: ${index} x: ${block.x} y: ${block.y} `, this.logged);
            index++;
            if (del) block.delete(ctx);
            else block.draw(ctx);
        });
    }

    // moves the piece down
    this.move_down = function (ctx) {
        this.move(ctx, no_step, step);
    }

    // moves the piece left
    this.move_left = function (ctx) {
        this.move(ctx, -step, no_step);
    }

    //moves the piece right
    this.move_right = function (ctx) {
        this.move(ctx, step, no_step);
    }

    // moves the piece using specified vector
    this.move = function (ctx, dx, dy) {
        this.delete(ctx);
        this.x = this.x + dx;
        this.y = this.y + dy;
        this.blocks.forEach(function (block) {
            block.move(dx, dy);
        });
        this.draw(ctx);
    }

    // returns the center coords of the actual piece pattern
    this.set_pattern_center = function () {
        this.center_x = Math.ceil(this.width / 2);
        this.center_y = Math.floor(this.height / 2);
    }

    // returns the coords of the center block
    this.get_block_coord = function (i, j) {
        return new Point(
            this.x + (i - this.center_x),
            this.y + (j - this.center_y)
        );
    }

    // builds the piece based on the patterns's center coord and the pattern itself
    this.build = function () {
        log(`x: ${this.x}  y: ${this.y} `);
        var blocks = [];
        this.set_pattern_center();
        var index = 0;
        for (var j = 0; j < this.height; j++) {
            for (var i = 0; i < this.width; i++) {
                var point = this.get_block_coord(i, j);
                //log(`index: ${index} x: ${this.x - point.x} y: ${this.y - point.y} i: ${i} j: ${j} block? : ${this.pattern[j][i]} `, this.logged);
                if (this.pattern[j][i])
                    blocks.push(new Block(point.x, point.y, this.color, this.border, this.bkcolor));
                index++;
            }
        }
        return blocks;
    }

    // assignig this member
    this.blocks = this.build();


    // rotate clock wise the pattern
    this.rotateCW = function (ctx) {
        this.delete(ctx);
        this.pattern = rotate_matrix90CW(this.pattern);
        log(`width ${this.width}  height${this.height}`, this.logged);
        var temp = this.height;
        this.height = this.width;
        this.width = temp;
        log(`width ${this.width}  height${this.height}`, this.logged);
        this.blocks = this.build();
        this.draw(ctx);
    }


    // returns the list of blocks with their coords IN THE tiles
    this.coords_blocks = function () {
        var crd_blcks = [];
        this.blocks.forEach(function (block) {
            crd_blcks.push(block.tile());
        });
        return crd_blcks;
    }

    this.future_blocks = function (vector) {
        var face = [];
        this.set_pattern_center(this.width, this.height);
        for (var j = 0; j < this.height; j++) {
            for (var i = 0; i < this.width; i++) {
                if (this.pattern[j][i]) {
                    var tile_x_coord = (this.x - (this.center_x - i)) + vector.x;
                    var tile_y_coord = (this.y + (j - this.center_y)) + vector.y;
                    face.push(new Point(tile_x_coord, tile_y_coord));
                }
            }
        }
        return face;
    }

    // returns the contested tiles for the right movement
    this.right_face = function () {
        return this.future_blocks(this.right_vector);
    }

    // returns the contested tiles for the left movement
    this.left_face = function () {
        return this.future_blocks(this.left_vector);
    }

    // returns the contested tiles for moving down
    this.lower_face = function () {
        return this.future_blocks(this.down_vector);
    }

    //returns the contested tiles once rotated
    this.rotated_face = function () {
        var face = [];
        var fpattern = rotate_matrix90CW(this.pattern);
        var pheight = this.width;
        var pwidth = this.height;
        for (var j = 0; j < pheight; j++) {
            var first = 0;
            for (var i = 0; i < pwidth; i++) {
                if (fpattern[j][i]) {
                    var tile_x_coord = (this.x - (this.center_x - first));
                    var tile_y_coord = (this.y + (j - this.center_y));
                    log(`these are the rotated face coords x:${tile_x_coord} y:${tile_y_coord}`, this.logged);
                    face.push(new Point(tile_x_coord, tile_y_coord));
                }
            }
        }
        console.log("out of rotate");
        return face;
    }

    // tags the piece as not more move allowed
    this.touch_down = function () {
        this.touched_down = true;
    }

    // returns a clone of this piece in an specific location
    this.clone = function (x, y) {
        var cloned_piece = new Piece(x, y, this.color, this.border, this.bkcolor, this.logged, this.pattern);
        cloned_piece.pattern = this.pattern;
        cloned_piece.build();
        return cloned_piece;
    }

    this.print = function () {
        console.log(` The piece is width ${this.width}   long ${this.height} `);
        for (var j = 0; j < this.height; j++) {
            var str = "";
            for (var i = 0; i < this.width; i++)
                str += this.pattern[j][i];
            console.log(str);
        }
    }

    this.isStarting = function () {
        return this.blocks.some(b => b.y < 0);
    }

}