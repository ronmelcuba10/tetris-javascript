$(document).ready( function (){
    var canvas_id = "game-canvas";
        

    var pieces = [];        // moving 
    var tiles = [];         // on the floor
    var canvas = document.getElementById(canvas_id);
    var ctx = canvas.getContext("2d");

    var b = new Piece(100, 200, random_color(),"black");
    b.draw(ctx);

    b.move_down();
    b.move_down();
    b.move_down();
    b.move_down();

    b.rotate_piece();
    b.draw(ctx);

    console.log("ya rote ");

    b.move_down();
    b.move_down();
    b.move_down();
    b.move_down();

    console.log("ya move ");

    b.draw(ctx);

    console.log("ya pinte ");

    /*
    var c = new Piece(200, 400, random_color(),"black");
    c.draw_piece(ctx);
    */


});