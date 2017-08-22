function Display(x, y, wide, height, color, border) {
    this.x = x;
    this.y = y;
    this.wide = wide;
    this.height = height;
    this.color = color;
    this.border = border;

    this.middle_tile = function () {
        return new Point(this.x / unit + this.wide / 2, this.y / unit + this.height / 2);
    }

    this.middle = function () {
        var p = this.middle_tile();
        return new Point(p.x * unit, p.y * unit);
    }
}

function Sidebar() {
    this.side_canvas = document.getElementById(side_canvas_id);
    this.side_ctx = this.side_canvas.getContext(dimmensions);
    this.display_tiles_long = 6;
    this.display_tiles_height = 4;
    this.initial_Y = 0;

    this.level_x = unit;
    this.level_y = this.initial_Y + 2 * unit;
    this.level_font_size = 20;
    this.level_font_color = "yellow";

    // 
    this.next_x_text = unit;
    this.next_y_text = this.level_y + 7 * unit;
    this.next_font_size = unit;
    this.next_x = unit;
    this.next_y = this.next_y_text + unit / 2;
    //
    this.score_x_text = unit;
    this.score_y_text = this.next_y + 7 * unit;
    this.score_font_size = 18;
    this.score_x = this.score_x_text;
    this.score_y = this.score_y_text + unit / 2;
    this.score_color = "white";

    this.next_display = new Display(
        this.next_x,
        this.next_y,
        this.display_tiles_long,
        this.display_tiles_height,
        bkColor,
        bkColor
    );

    this.score_display = new Display(
        this.score_x,
        this.score_y,
        this.display_tiles_long,
        this.display_tiles_height,
        bkColor,
        bkColor
    );

    this.level_display = new Display(
        this.level_x,
        this.level_y,
        this.display_tiles_long,
        this.display_tiles_height + 1,
        level_color,
        level_color
    );



    this.draw_display = function (display) {
        var x = display.x;
        var y = display.y;
        var wide = display.wide;
        var height = display.height;
        console.log(`x ${x}  y: ${y} `);
        var x0 = x;
        var x1 = x + 3 * factor;
        var x2 = x + (wide - 1) * unit + 7 * factor;
        var x3 = x + wide * unit;
        var y0 = y;
        var y1 = y + 3 * factor;
        var y2 = y + (height - 1) * unit + 7 * factor;
        var y3 = y + height * unit;
        this.side_ctx.lineWidth = border_size;
        this.side_ctx.strokeStyle = display.border;
        this.side_ctx.fillStyle = display.color;

        this.side_ctx.beginPath();
        this.side_ctx.moveTo(x1, y0);
        this.side_ctx.lineTo(x2, y0);
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


    this.show_next = function (pc) {
        this.draw_display(this.next_display);
        var middle = this.next_display.middle_tile();
        var p = pc.clone(middle.x, middle.y);
        console.log('next piece');
        p.print();
        console.log(` piece.x: ${p.x}   piece.y: ${p.y}  color ${p.color}  bk ${p.bkcolor}    `);
        p.draw(this.side_ctx);
        console.log(` x: ${side_bar_width / (unit * 2)}   y: ${2 * step}`);
    }

    this.show_text = function (text, x, y, font_size, font, color, w_gradient, outline = false) {
        if (w_gradient) {
            var gradient = this.side_ctx.createLinearGradient(0, 0, this.side_canvas.width, 0);
            gradient.addColorStop("0", "magenta");
            gradient.addColorStop("0.5", "blue");
            gradient.addColorStop("1.0", "red");
            this.side_ctx.fillStyle = gradient;
        }
        else this.side_ctx.fillStyle = color;

        this.side_ctx.font = font_size + "px " + font;

        if (outline) {
            this.side_ctx.strokeStyle = "#085921";
            this.side_ctx.lineWidth = 6;
            this.side_ctx.strokeText(text, x, y)
        }
        
        this.side_ctx.fillText(text, x, y);
    }

    this.show_score = function (score) {
        this.draw_display(this.score_display);
        this.side_ctx.font = "50px Verdana";
        this.side_ctx.fillStyle = this.score_color;
        this.side_ctx.textAlign = "center";
        var middle = this.score_display.middle();
        console.log(` score ${score}  x: ${middle.x}   y:${middle.y} `);
        this.side_ctx.fillText(score, middle.x, middle.y + unit);
    }

    this.show_level = function (level) {
        this.draw_display(this.level_display);
        var middle = this.level_display.middle();

        this.show_text("L E V E L",
            middle.x,
            middle.y - unit,
            this.level_font_size,
            "Impact",
            this.level_font_color,
            !with_gradient
        );

        this.show_text(level,
            middle.x,
            middle.y + 2 * unit,
            this.level_font_size + 40,
            "Impact",
            this.level_font_color,
            !with_gradient,
            true
        );
        console.log(` level x${this.level_display.x + unit / 2}   y${middle.y + unit / 2}   level: ${level}`);
    }



    this.show_level(" 1");
    this.show_text("Next Piece", this.next_x_text, this.next_y_text, this.next_font_size, "Verdana", "black", with_gradient);
    this.draw_display(this.next_display);
    this.show_text("YOUR SCORE", this.score_x_text, this.score_y_text, this.score_font_size, "Verdana", "black", with_gradient);
    this.draw_display(this.score_display);



}