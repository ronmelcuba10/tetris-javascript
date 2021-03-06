function Tiles(ctx){
    this.score = 0;
    this.tiles = get2DArray(blocks_tall, blocks_wide, initial_value); 
    this.ctx = ctx;
    this.level = 1;
    
    this.update = function() {
        for (var i = blocks_tall - 1; i >= 0; i--){
            if(this.row_is_complete(i)){
                this.remove_row(i);
                this.score += blocks_wide;
                this.level = Math.ceil(this.score / 100);
                interval /= 2;
                this.repaint(i);
                i++;
            } 
        }
    }

    this.tilerize = function(piece){
        console.log("tiling");
        var coord_blocks = piece.coords_blocks();
        for(var i = 0; i < coord_blocks.length; i++ ){
            this.tiles[coord_blocks[i].x][coord_blocks[i].y] = coord_blocks[i].blck;
        }
    }

    // returns true if the tile is with in limits
    this.tile_is_whith_in_limits = function(x, y){
        return x >= 0 && x < blocks_wide && y < blocks_tall;
    }

    /**
     * Returns true 
     */

    this.row_is_complete = function(i){
        var complete = this.tiles[i].every( x => x != initial_value)
        if (complete) console.log(`row ${i} is  complete***********************************************************************`);
        return complete;
    }

    this.remove_row = function(i){
        console.log("Splicing ***********************+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log(` ${this.tiles.length}   ;  ${this.tiles[0].length}`);

        this.tiles[i].forEach(function(block){
            block.delete(this.ctx);
        })

        this.tiles.splice(i,1);
        this.tiles.unshift(Array(blocks_wide).fill(initial_value));
    }

    // 
    this.repaint = function(index){
        console.log("repainting");
        for( var y = index; y >= 0; y--){
            for ( var x = 0; x < blocks_wide; x++){
                if(this.tiles[y][x]){
                    console.log(` deleting on y=${y} x=${x}`);
                    this.tiles[y][x].delete(this.ctx);
                    console.log(` moving down `);
                    this.tiles[y][x].move(no_step,step);
                    console.log(` drawing  `);
                    this.tiles[y][x].draw(this.ctx)
                }
            }
        }
    }

    this.is_Empty_At = function(x,y){
        //console.log(`in Empty  value  in cell ${y},${x} is ${this.tiles[y][x]}`); 
        return ( y < 0 || this.tiles[y][x] == initial_value);
    }

    // prints the tile tilerized --- for debugging 
    this.print = function (){
        try{
            for( var y = 0; y < blocks_tall; y++){
                var str = "";
                for ( var x = 0; x < blocks_wide; x++){
                    if(this.tiles[y][x]) str += 1;
                    else str +=0;
                }
                console.log(str);
                str = "";
            }
        }
        catch(err){
            console.log(err.message);
        }
    }
}