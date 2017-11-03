define(['angular'], function(angular) {
        
        var createFactory = function(){
            return {
                testMethod : function(){
                  console.log('Factory works!');  
                }
            };
        };
                    
        angular.module('app').factory('TestFactory', createFactory);
    });