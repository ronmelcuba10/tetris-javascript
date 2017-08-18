function Sidebar(){
    this.side_canvas = document.getElementById(canvas_id);
    this.side_ctx = canvas.getContext(dimmensions); 
    this.x = 20
    this.y = 20;

    this.prepare_display = function() {
        var x0 = this.x;
        var x1 = this.x + 3*factor;
        var x2 = this.x + 7*factor;
        var x3 = this.x + 5 * unit;
        var y0 = this.y;
        var y1 = this.y + 3*factor;
        var y2 = this.y + 7*factor;
        var y3 = this.y + 5 * unit;
        this.side_ctx.lineWidth = border_size;
        this.side_ctx.strokeStyle = border;
        this.side_ctx.fillStyle = color;

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

    this.show_next = function(piece) {
        ///work with a copy
        //piece.teleport(side_bar_width/(unit * 2), 2 * step);
        //piece.draw(this.side_ctx);
    }
}