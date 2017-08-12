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
