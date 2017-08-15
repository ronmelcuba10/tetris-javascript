$(document).ready( function (){
    var cycle;
    var isPaused = false;
    var logged = true;
    var canvas = document.getElementById(canvas_id);
    var ctx = canvas.getContext(dimmensions);
    var piece;
    var tiles;


    /**
     * Main methods section
     */

    // starts the game
    function run(){
        tiles = new Tiles()
        piece = new_piece();
        piece.draw(ctx);
    }

    // if there is an active piece passes its blocks to the tiles
    function tilerize() {
        if (!piece) return;

        tiles.tilerize(piece);
        tiles.update(ctx);
    }

    // before creating a new piece get all its blocks
    function new_piece() {
        tilerize();
        return new Piece( middle, no_step, random_color(), bkColor, bkColor, logged);
    }

    // runs the game - this is the core
    function play() {
        if(no_collision_down()) {
            move_down();
            return;
        }
        piece = new_piece();
    }


    /**
     * Collision section
     */

    // returns true if there is no collision in the tiles passed as parameters
    function no_collision(contested_tiles){
        for( var i = 0; i < contested_tiles.length; i++){
            if (!(tiles.tile_is_whith_in_limits(contested_tiles.x, contested_tiles.y) 
                && (tiles.is_Empty_At(contested_tiles.x, contested_tiles.y))))
                return false;
        }
        return true;
    }

    // returns true if the piece can move to the left
    function no_collision_left(){
        return no_collision(piece.left_face());
    }

    // returns true if the piece can move to the left
    function no_collision_right(){
        return no_collision(piece.right_face());
    }

    // returns true if the piece can move down
    function no_collision_down() {
        return no_collision(piece.lower_face());
    }

    // returns true if the piece can rotate
    function no_collision_rotation(){
        return no_collision(piece.rotated_face());
    }

    

    /**
     * Moving section
     */

    // moves the piece based on the key pressed, if pused do nothing
    function move(key){
        if(isPaused) return;

        switch (key) {
            case LEFT:  
                move_left();
                break;
            case UP: 
                rotate();
                break;
            case RIGHT: 
                move_right();
                break;
            default: 
                play();
        }
    }
    
    // moves the piece down if not collision found
    function move_down(){
        if(no_collision_down()){
            piece.move_down(ctx);
            return;
        }
        piece.touch_down();
    }

    // moves left only if not collision 
    function move_left(){
        if(no_collision_left()) piece.move_left(ctx);
    }

    // moves left only if not collision
    function move_right(){
        if(no_collision_right()) piece.move_right(ctx);
    }

    // rotate clock wise only if not collision
    function rotate(){
        if(no_collision_rotation()) piece.rotateCW(ctx);
    }

    // pause/unpause
    function toggle_movement() {
        if(isPaused) cycle = setInterval(play, interval)
        else clearInterval(cycle);
        isPaused = !isPaused;
    }


    /**
     * Events section
     */

    // handling pause/restart event
    $(pause_btn_id).click(function(){
        toggle_movement();
    });

    // handling key events
    $(document).keydown(function (event) {
        var key = event.which;
        if(key == Space){
            toggle_movement();
            return;            
        }
        if(key == A ) key = LEFT;
        if(key == S ) key = DOWN;
        if(key == W ) key = UP;
        if(key == D ) key = RIGHT;
        if (key > 36 && key < 41){
            move(key);
            event.preventDefault();
        }
    });





        
    /**
     * THE GAME 
     */
    run();
    cycle = setInterval(play, interval);

});