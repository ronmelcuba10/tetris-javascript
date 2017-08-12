/*
I cant make the setInterval() function to work with this version
*/ 

$(document).ready( function (){
    var cycle;
    function Tetris(){
        this.isPaused = false;
        this.tiles = get2DArray();         
        this.canvas = document.getElementById(canvas_id);
        this.ctx = this.canvas.getContext("2d");
        this.piece = new Piece(randomX(), unit, random_color(),bkColor,bkColor);

        this.run = function(){
            this.piece.draw(this.ctx);
        }
    
        this.play = function() {
            console.log("playing");
            if(this.piece.touchdown()) 
                this.piece = new Piece(randomX(), 2*unit, random_color(),bkColor,bkColor);
            this.piece.move_down(this.ctx);
        }

        this.move = function(key){
            switch (key) {
                case LEFT:  this.piece.move_left(this.ctx);
                            break;
                case UP:    this.piece.rotateCW(this.ctx);
                            break;
                case RIGHT: this.piece.move_right(this.ctx);
                            break;
                default: this.piece.move_down(this.ctx); // down
            }
        }
    }

        
    var tetris = new Tetris(cycle);
    tetris.run();
    cycle = setInterval(tetris.play(), 1000);
    


    $("#pause").click(function(cycle){
        console.log(`is  ${tetris.isPaused}`);
        if(tetris.isPaused) {
            
            cycle = setInterval(tetris.play(), 100);
            tetris.isPaused = false;
        }
        else {
            clearInterval(cycle);
            tetris.isPaused = true;
        }
    });


    $(document).keydown(function (event) {
        var key = event.which;
        if(key == A ) key = LEFT;
        if(key == S ) key = DOWN;
        if(key == W ) key = UP;
        if(key == D ) key = RIGHT;
        if (key > 36 && key < 41){
            tetris.move(key);
            event.preventDefault();
        }
    });



});
