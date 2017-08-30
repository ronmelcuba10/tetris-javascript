// sizes
var unit = 20;
var canvas_height = 700;
var canvas_width = 400;
var side_bar_height = 700;
var side_bar_width = 160;
var blocks_wide = canvas_width / unit;
var blocks_tall = canvas_height / unit;
var factor = unit / 10;
var border_size = 2;
var block_width = 4;
var block_height = 2;
var step = 1;
var no_step = 0;
var middle = blocks_wide / 2;
var canvas_id = "game-canvas";
var side_canvas_id = "side-canvas";


// colors
var bkColor = "black";
var level_color = "red";
var colors = ["#FF0000", "#0000FF", "#008000", "#FFFF00", "#FFA500", "#FFC0CB", "#00FFFF", "#FF00FF", "#800080", "#7FFF00", "#00FF00"];
var shades_of = {};

shades_of[colors[0]] = ["#4c0000", "#b20000", "#ff0000", "#ff4c4c", "#ffb2b2"];
shades_of[colors[1]] = ["#00004c", "#0000b2", "#0000FF", "#4c4cff", "#b2b2ff"];
shades_of[colors[2]] = ["#002600", "#005900", "#008000", "#4ca64c", "#b2d8b2"];
shades_of[colors[3]] = ["#4c4c00", "#b2b200", "#FFFF00", "#ffff4c", "#ffffb2"];
shades_of[colors[4]] = ["#664200", "#b27300", "#FFA500", "#ffb732", "#ffd27f"];
shades_of[colors[5]] = ["#7f6065", "#00b2b2", "#FFC0CB", "#4cffff", "#99ffff"];
shades_of[colors[6]] = ["#004c4c", "#00b2b2", "#00FFFF", "#4cffff", "#b2ffff"];
shades_of[colors[7]] = ["#4c004c", "#b200b2", "#FF00FF", "#ff4cff", "#ff99ff"];
shades_of[colors[8]] = ["#330033", "#590059", "#800080", "#993299", "#cc99cc"];
shades_of[colors[9]] = ["#264c00", "#58b200", "#7FFF00", "#a5ff4c", "#cbff99"];
shades_of[colors[10]] = ["#004c00", "#00b200", "#00FF00", "#4cff4c", "#b2ffb2"];


// pieces 
var line = [[1, 1, 1, 1]];
var square = [[1, 1], [1, 1]];
var l_corner = [[1, 0, 0], [1, 1, 1]];
var r_corner = [[0, 0, 1], [1, 1, 1]];
var base = [[0, 1, 0], [1, 1, 1]];
var r_slide = [[0, 1, 1], [1, 1, 0]];
var l_slide = [[1, 1, 0], [0, 1, 1]];

var weird = [[1, 0, 0, 1], [1, 1, 1, 1]];
var chess = [[1, 0, 1, 0], [0, 1, 0, 1]];
var twin = [[1, 0, 0, 0], [0, 0, 0, 1]];

var patterns = [line, square, l_corner, r_corner, base, r_slide, l_slide];// [twin, weird, chess]; // for weird pieces

// keys
var LEFT = 37;
var UP = 38;
var RIGHT = 39;
var DOWN = 40;
var A = 65;
var W = 87;
var D = 68;
var S = 83;
var Space = 32;

// misc
var interval = 2048 / 2;
var dimmensions = "2d";
var initial_value = 0;
var pause_btn_id = "#pause";
var rotation_ccw_btn_id = "#rccw";
var left_btn_id = "#left";
var right_btn_id = "#right";
var down_btn_id = "#down";
var rotation_cw_btn_id = "#rcw"
var with_gradient = true;
