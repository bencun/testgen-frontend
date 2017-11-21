define([
    'angular'
], function(angular) {
    var filteredPicker = function(Notification){
        return{
            restrict: 'AE',
            scope:{
                fpArray: '=',
                fpTargetArray: '=',
                fpIdProperty: '@',
                fpFilterProperty: '@',
                fpPushMethod: '&',
                fpTitle: '@'
            },
            templateUrl:'/scripts/lib/directives/templates/filteredPicker.html',
            link: function(scope, element, attrs, modelCtrl){
                
                scope.query = '';

                scope.pushItem = function(item){
                    //check if the id perhaps matches
                    var results = $.grep(scope.fpTargetArray, function(e){
                        return e[scope.fpIdProperty] === item[scope.fpIdProperty];
                    });
                    //if the results array exists and isn't empty then we got a match
                    if(results.length > 0){
                        Notification.error('Item already exists!');
                        return false;
                    }
                    //if no match then push it
                    var newItem = angular.copy(item, {});
                    scope.fpPushMethod({arg: newItem});
                    return true;
                };
            }
        };
    };

    return ['Notification', filteredPicker];
    
});