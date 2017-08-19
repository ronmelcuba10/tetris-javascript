function Sidebar(){
    this.side_canvas = document.getElementById(side_canvas_id);
    this.side_ctx = this.side_canvas.getContext(dimmensions); 
    this.display_tiles_long = 6;
    this.display_tiles_height = 4;
    this.display_x = unit;
    this.display_y = 2 * unit;

    this.draw_display = function() {
        var x0 = this.display_x;
        var x1 = this.display_x + 3 * factor;
        var x2 = this.display_x + (this.display_tiles_long - 1) * unit + 7 * factor;
        var x3 = this.display_x + this.display_tiles_long * unit;
        var y0 = this.display_y;
        var y1 = this.display_y + 3 * factor;
        var y2 = this.display_y + (this.display_tiles_height - 1) * unit + 7 * factor;
        var y3 = this.display_y + this.display_tiles_height * unit;
        this.side_ctx.lineWidth = border_size;
        this.side_ctx.strokeStyle = bkColor;
        this.side_ctx.fillStyle = bkColor;

        this.side_ctx.beginPath();
        this.side_ctx.moveTo(x1,y0);
        this.side_ctx.lineTo(x2,y0);
        this.side_ctx.quadraticCurveTo(x3, y0, x3, y1);
        this.side_ctx.lineTo(x3, y2);
        this.side_ctx.quadraticCurveTo(x3, y3, x2, y3);
        this.side_ctx.lineTo(x1, y3);
        this.side_ctx.quadraticCurveTo(x0, y3, x0, y2);
        this.side_ctx.lineTo(x0, y1);
        this.side_ctx.quadraticCurveTo(x0, y0, x1, y0);
        this.side_ctx.closePath();
        this.side_ctx.stroke();
        this.side_ctx.fill();
    }

    this.show_next = function(pc) {
        this.draw_display();
        var x_middle_display = this.display_x/unit + this.display_tiles_long/2;
        var y_middle_display = this.display_y/unit + this.display_tiles_height/2;
        p = pc.clone( x_middle_display , y_middle_display);
        console.log('next piece');
        p.print();
        console.log(` piece.x: ${p.x}   piece.y: ${p.y}  color ${p.color}  bk ${p.bkcolor}    `);
        p.draw(this.side_ctx);
        console.log(` x: ${side_bar_width/(unit * 2)}   y: ${2 * step}`);
    }

    this.next_piece_text = function() {
        var gradient= this.side_ctx.createLinearGradient(0, 0, this.side_canvas.width, 0);
        gradient.addColorStop("0","magenta");
        gradient.addColorStop("0.5","blue");
        gradient.addColorStop("1.0","red");
        this.side_ctx.font="20px Verdana";
        this.side_ctx.fillStyle = gradient;
        this.side_ctx.fillText("Next Piece",30,30);
    }


}