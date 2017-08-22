var cycle;
var isPaused = false;
var logged = true;
var canvas = document.getElementById(canvas_id);
var ctx = canvas.getContext(dimmensions);
var piece;
var next_piece;
var tiles;
var side_bar;
var game_over = false;


/**
 * Main methods section
 */

// starts the game
function run(){
    game_over = false;
    tiles = new Tiles(ctx);
    side_bar = new Sidebar();
    piece = new Piece( middle, no_step, random_color(), bkColor, bkColor, logged); 
    next_piece = new Piece( middle, no_step, random_color(), bkColor, bkColor, logged); 
    side_bar.show_next(next_piece);
    side_bar.show_score(tiles.score);
    side_bar.show_level(tiles.level);
}

// if there is an active piece passes its blocks to the tiles
function tilerize() {
    if(piece.isStarting()){
        toggle_movement();
        game_over = true;
        piece = null;
        next_piece = null;
        alert("Game over");
        reset()
        return;
    }

    tiles.tilerize(piece);
    tiles.update();
    side_bar.show_score(tiles.score);
    side_bar.show_level(tiles.level);
}

// before creating a new piece get all its blocks
function new_piece() {
    tilerize();
    piece = next_piece;
    next_piece = new Piece( middle, no_step, random_color(), bkColor, bkColor, logged); 
    side_bar.show_next(next_piece);
}

function reset() {
    
}


// runs the game - this is the core
// if could not move down create a new piece
function play() {
    if(!move_down())
        new_piece();
}



/**
 * Collision section
 */

// returns true if there is no collision in the tiles passed as parameters
function collision(contested_tiles){
    for( var i = 0; i < contested_tiles.length; i++){
        if (!tiles.tile_is_whith_in_limits(contested_tiles[i].x, contested_tiles[i].y) 
            || !(tiles.is_Empty_At(contested_tiles[i].x, contested_tiles[i].y))){
                return true;
            }
    }
    return false;
}

// returns true if the piece can move to the left
function collision_left(){
    return collision(piece.left_face());
}

// returns true if the piece can move to the left
function collision_right(){
    return collision(piece.right_face());
}

// returns true if the piece can move down
function collision_down() {
    return collision(piece.lower_face());
}

// returns true if the piece can rotate
function collision_rotation(){
    return collision(piece.rotated_face());
}



/**
 * Moving section
 */

// moves the piece based on the key pressed, if pused do nothing
function move(key){
    if( isPaused) return;

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
            move_down();
    }
}

// moves the piece down if not collision found and returns true
// false if did not move down
function move_down(){
    if(!collision_down()){
        piece.move_down(ctx);
        return true;
    }
    piece.touch_down();
    return false;
}

// moves left only if not collision 
function move_left(){
    if(!collision_left()) piece.move_left(ctx);
}

// moves left only if not collision
function move_right(){
    if(!collision_right()) piece.move_right(ctx);
}

// rotate clock wise only if not collision
function rotate(){
    if(!collision_rotation()) piece.rotateCW(ctx);
}

// pause/unpause
function toggle_movement() {
    if(game_over) return;

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

$(left_btn_id).click(function(){
    if(!game_over) move_left();
});


$(right_btn_id).click(function(){
    if(!game_over)move_right();
});


$(down_btn_id).click(function(){
    if(!game_over)move_down();
});

$(rotation_cw_btn_id).click(function(){
    if(!game_over)rotate();
});

$(rotation_ccw_btn_id).click(function(){
    if(game_over) return;

    rotate();
    rotate();
    rotate();
});


// handling key events
$(document).keydown(function (event) {
    if(game_over) return;

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
if(!game_over) cycle = setInterval(play, interval);



