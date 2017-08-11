function my_random(top) {
    return Math.floor(Math.random() * top);
}

function random_color(){
    return colors[my_random(colors.length)];
}

function random_pattern(){
    console.log(patterns.length);
    return patterns[my_random(patterns.length)];
}

function rotate_matrix90CW(arr){
    
    var height = arr.length;
    var width = arr[0].length;
    var arr_result = [];
    for(var i = 0; i < width; i++ ){
        var row = [];
        for( var j = height - 1 ; j >= 0; j--){
            row.push(arr[j][i]);
        }
        arr_result.push(row);
    }
    console.log(arr);
    console.log(arr_result);
    return arr_result;
}
