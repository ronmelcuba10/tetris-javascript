$(document).ready( function (){
    var cycle;
    var isPaused = false;
    var tiles = get2DArray();         
    var logged = true;
    var canvas = document.getElementById(canvas_id);
    var ctx = canvas.getContext(dimmensions);
    var piece = new Piece(randomX(), unit, random_color(), bkColor, bkColor, logged);

    function run(){
        piece.draw(ctx);
    }

    function play() {
        if(piece.touchdown()) 
            piece = new Piece(randomX(), 2*unit, random_color(),bkColor,bkColor,logged);
        piece.move_down(ctx);
    }

    function move(key){
        switch (key) {
            case LEFT:  piece.move_left(ctx);
                        break;
            case UP:    piece.rotateCW(ctx);
                        break;
            case RIGHT: piece.move_right(ctx);
                        break;
            default: piece.move_down(ctx); // down
        }
    }

        
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