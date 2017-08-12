
$(document).ready( function (){
    var canvas_id = "game-canvas";
    var paused = false;
        

    var pieces = [];        // moving 
    var tiles = [];         // on the floor
    var canvas = document.getElementById(canvas_id);
    var ctx = canvas.getContext("2d");

    

    
    function randomX(){
        var n = my_random(canvas_width/unit);
        if(n<4) n = 4;
        if(n>16) n = 16;
        return n * unit;
    }


    //b.draw(ctx);
    //b.move_down(ctx);
    var b = new Piece(randomX(), unit, random_color(),bkColor,bkColor);
    b.draw(ctx);

    function play() {
        if(b.touchdown()) b = new Piece(randomX(), 2*unit, random_color(),bkColor,bkColor);
        b.rotateCW(ctx);
        b.move_down(ctx);
        b.draw(ctx);
    }

    var cycle = setInterval(play, 100);


    $("#pause").click(function(){
        if(paused) {
            cycle = setInterval(play, 100);
            paused = false
        }
        else {
            clearInterval(cycle);
            paused = true;
        }
    });


    $(document).keydown(function (event) {
        var key = event.which;
        if(key == A ) key = LEFT;
        if(key == S ) key = DOWN;
        if(key == W ) key = UP;
        if(key == D ) key = RIGHT;
        if (key > 36 && key < 41){
            the_board.move(select_vector(key));
            event.preventDefault();
        }
    });



    
    /*
    b.rotateCW(ctx);
    b.move_down(ctx);
    b.draw(ctx);
    */

    /*
    b.rotateCW(ctx);
    b.move_down(ctx);
    b.draw(ctx);
    */


    /*
    b.draw(ctx);
    
    b.move_down(ctx);
    b.move_down(ctx);
    b.draw(ctx)

    b.move_right(ctx)
    b.draw(ctx)
    b.move_right(ctx)
    b.draw(ctx)
    b.move_right(ctx)
    b.draw(ctx)
    
    b.move_down(ctx);
    b.draw(ctx)
    b.move_down(ctx);
    b.draw(ctx)
    b.move_down(ctx);
    b.draw(ctx)
    
    b.move_left(ctx);
    b.draw(ctx)

    b.move_down(ctx);
    b.move_down(ctx);
    b.rotateCW(ctx);
    b.draw(ctx);
    */

    



    

    //b.rotate_piece();
    
    /*
    console.log("ya rote ");

    
    console.log("ya move ");

    b.draw(ctx);

    console.log("ya pinte ");
    */

    /*
    var c = new Piece(200, 400, random_color(),"black");
    c.draw_piece(ctx);
    */


});