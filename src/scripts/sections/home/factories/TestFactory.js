define(['angular'], function(angular) {
        
        var createFactory = function(){
            return {
                testMethod : function(){
                    console.log('Factory works!');  
                },
                returnMethod : function(){
                    return "ok";
                }
            };
        };
                    
        angular.module('app').factory('TestFactory', createFactory);
    });