define(['angular'], function(angular) {
    var TimeFilter = function(){
        return function(input, req){
            if(req === 'h') return Math.floor(input / 3600);
            if(req === 'm') return Math.floor((input % 3600) / 60);
            if(req === 's') return Math.floor(input % 60);
        };
    };

    return TimeFilter;
});