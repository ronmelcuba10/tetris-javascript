$(document).ready( function (){
    var cycle;
    var isPaused = false;
    var tiles = get2DArray();         
    var logged = true;
    var canvas = document.getElementById(canvas_id);
    var ctx = canvas.getContext(dimmensions);
    var piece;

    function run(){
        piece = new_piece();
        piece.draw(ctx);
    }

    function new_piece() {
        return new Piece(randomX(), unit, random_color(), bkColor, bkColor, logged);
    }

    function play() {
        if(touch_down()) {
            piece = new_piece();
            return;
        }
        piece.move_down(ctx);
    }

    function move(key){
        switch (key) {
            case LEFT:  
                if(piece.farthest_left()>0)
                    piece.move_left(ctx);
                break;
            case UP:    
                piece.rotateCW(ctx);
                break;
            case RIGHT: 
                if(piece.farthest_right()<canvas_width)
                    piece.move_right(ctx);
                break;
            default: 
                play();
        }
    }

    function touch_down(){
        var lp = piece.lowest_point();
        log(` the lowest point ->  ${lp}`, this.logged);
        return canvas_height <= lp;
    }



    

    // the game
    run();
    cycle = setInterval(play, 1000);
    


    $(pause_btn_id).click(function(){
        if(isPaused) {
            cycle = setInterval(play, 100);
            isPaused = false;
        }
        else {
            clearInterval(cycle);
            isPaused = true;
        }
    });


    $(document).keydown(function (event) {
        var key = event.which;
        if(key == A ) key = LEFT;
        if(key == S ) key = DOWN;
        if(key == W ) key = UP;
        if(key == D ) key = RIGHT;
        if (key > 36 && key < 41){
            move(key);
            event.preventDefault();
        }
    });



});