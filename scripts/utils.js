function my_random(top) {
    return Math.floor(Math.random() * top);
}

function random_color(){
    return colors[my_random(colors.length)];
}

function random_pattern(){
    return patterns[my_random(patterns.length)];
}

function randomX(){
    var n = my_random(blocks_wide);
    if(n<4) n = 4;
    if(n>16) n = 16;
    return n * unit;
}

function get2DArray( w, h, value) {
    return Array(w).fill(value).map(x => Array(h).fill(value));
}

function rotate_matrix90CW(arr){
    var height = arr.length;
    var width = arr[0].length;
    var arr_result = [];
    for(var i = 0; i < width; i++ ){
        var string = "";
        var row = [];
        for( var j = height - 1 ; j >= 0; j--){
            row.push(arr[j][i]);
            string += arr[j][i];
        }
        //console.log(string);
        arr_result.push(row);
    }
    //console.log(arr);
    //console.log(arr_result);
    return arr_result;
}

function log(str,logged){
    if (logged) console.log(str);
}

function Coor_Block(x,y,blck){
    this.x = x;
    this.y = y;
    this.blck = blck;
    
    this.Equal = function(x,y){
        return this.x === x && this.y === y;
    }
}

function Point(x,y){
    this.x = x;
    this.y = y;

    this.Equal = function(x,y){
        return this.x === x && this.y === y;
    }
}

function draw_rounded_block(ctx, x, y, color, border){

    if(color == "black"){
        ctx.fillStyle = "black";
        ctx.fillRect(x,y,unit,unit);
        return;
    }

    var x0 = x;
    var x1 = x + 3*factor;
    var x2 = x + 7*factor;
    var x3 = x + unit;
    var y0 = y;
    var y1 = y + 3*factor;
    var y2 = y + 7*factor;
    var y3 = y + unit;
    ctx.lineWidth = border_size;
    ctx.strokeStyle = border;
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.moveTo(x1,y0);
    ctx.lineTo(x2,y0);
    ctx.quadraticCurveTo(x3, y0, x3, y1);
    ctx.lineTo(x3, y2);
    ctx.quadraticCurveTo(x3, y3, x2, y3);
    ctx.lineTo(x1, y3);
    ctx.quadraticCurveTo(x0, y3, x0, y2);
    ctx.lineTo(x0, y1);
    ctx.quadraticCurveTo(x0, y0, x1, y0);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}


function draw_jewel_block (ctx, x, y,color){

    if(color == "black"){
        ctx.fillStyle = "black";
        ctx.fillRect(x,y,unit,unit);
        return;
    }

    var x0 = x;
    var x1 = x + 2*factor;
    var x2 = x + 8*factor;
    var x3 = x + unit;
    var y0 = y;
    var y1 = y + 2*factor;
    var y2 = y + 8*factor;
    var y3 = y + unit;

    var color_shades = shades_of[color];

    var p1 = new Point (x0,y0);
    var p2 = new Point (x3,y0);
    var p3 = new Point (x3,y3);
    var p4 = new Point (x0,y3);
    var p5 = new Point (x1,y1);
    var p6 = new Point (x2,y1);
    var p7 = new Point (x2,y2);
    var p8 = new Point (x1,y2);

    var fill = true;

    draw_polygon( ctx, p1, p2, p6, p5, color_shades[4], fill );     // upper 
    draw_polygon( ctx, p5, p6, p7, p8, color_shades[3], fill );     // center
    draw_polygon( ctx, p1, p5, p8, p4, color_shades[2], fill );     // left
    draw_polygon( ctx, p2, p6, p7, p3, color_shades[1], fill );     // right
    draw_polygon( ctx, p4, p8, p7, p3, color_shades[0], fill );     // down

    ctx.beginPath();
    ctx.lineWidth="2";
    ctx.strokeStyle="black";
    ctx.rect(p1,x,p1,y,unit,unit);
    ctx.stroke();


}

function draw_polygon(ctx, p1, p2, p3, p4, color, fill){
    if(fill) ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.lineTo(p4.x, p4.y);
    ctx.closePath();
    ctx.fill();
}



