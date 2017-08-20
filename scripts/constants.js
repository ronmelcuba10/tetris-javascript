// sizes
var unit = 20;
var canvas_height = 700;
var canvas_width = 400;
var side_bar_height = 700;
var side_bar_width = 160;
var blocks_wide = canvas_width/unit;
var blocks_tall = canvas_height/unit;
var factor = unit/10;
var border_size = 2;
var block_width = 4;
var block_height = 2;
var step = 1;
var no_step = 0;
var middle = blocks_wide/2;

// colors
var bkColor = "black";
var canvas_id = "game-canvas";
var side_canvas_id = "side-canvas";
var colors = ["red","blue","green","yellow","orange","pink","aqua","fuchsia","purple","chartreuse","lime"];
var level_color = "red";

// pieces 
var line = [[1,1,1,1]];
var square = [[1,1],[1,1]];
var l_corner = [[1,0,0],[1,1,1]];
var r_corner = [[0,0,1],[1,1,1]];
var base = [[0,1,0],[1,1,1]];
var r_slide = [[0,1,1],[1,1,0]];
var l_slide = [[1,1,0],[0,1,1]];
var weird = [[1,0,0,1],[1,1,1,1]];
var patterns = [line, square, l_corner, r_corner, base, r_slide, l_slide];

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
var interval = 2048/2/2/2;
var dimmensions = "2d";
var initial_value = 0;
var pause_btn_id = "#pause";
var rotation_ccw_btn_id = "#rccw";
var left_btn_id = "#left";
var right_btn_id = "#right";
var down_btn_id = "#down";
var rotation_cw_btn_id = "#rcw"
var with_gradient = true;
