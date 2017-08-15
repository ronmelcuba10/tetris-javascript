function Tiles(){

    this.tiles = get2DArray(blocks_tall, blocks_wide, initial_value); 
    
    
    this.update = function() {
        for (var i = 0; i < blocks_tall; i++){
            if(this.row_is_complete(i)){
                this.remove_row(i);
                this.repaint(ctx);
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
        if (complete) console.log("complete***********************************************************************");
        return complete;
    }

    this.remove_row = function(i){
        console.log("Splicing ***********************+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log(` ${this.tiles.length}   ;  ${this.tiles[0].length}`);

        this.tiles[i].forEach(function(block){
            block.delete(ctx);
        })

        this.tiles.splice(i);
        this.tiles.splice(0, 0, Array(blocks_wide).fill(initial_value));
    }

    /**
     * TO DO .........................until the lines deleted NOT further
     */
    this.repaint = function(ctx){
        console.log("repainting");
        for( var x = 0; x < blocks_tall; x++){
            for ( var y = 0; y < blocks_wide; y++){
                if(tiles[y][x]){
                    tiles[y][x].delete(ctx);
                    tiles[y][x].teleport(x,y);
                    tiles[y][x].draw(ctx)
                }
            }
        }



        this.tiles.forEach(function(col){
            col.forEach(function(block){
                if(block != initial_value) {
                    console.log(`block X:${block.x} Y:${block.y} `);
                    block.delete(ctx);
                    block.move(0,unit);
                    block.draw(ctx);
                } 
            })
        });
    }

    this.is_Empty_At = function(x,y){
        return this.tiles[y][x] == initial_value;
    }
}