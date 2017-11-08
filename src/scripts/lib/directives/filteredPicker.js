define([
    'angular'
], function(angular) {
    var filteredPicker = function(){
        return{
            restrict: 'AE',
            scope:{
                //fpArray: '=',
                //fpProperty: '@'
            },
            templateUrl:'/scripts/lib/directives/templates/filteredPicker.html',
            link: function(scope, element, attrs, modelCtrl){
                
            }
        };
    };

    return filteredPicker;
    
});