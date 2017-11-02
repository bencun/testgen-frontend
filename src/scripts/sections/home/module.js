define([
    'angular',
    './controllers/HomeViewController',
    'lib/appRoutes'
], function(angular, HomeViewController, routeConfig){
    
    console.log('Creating home module');

    var homeModule = angular.module('home', []);
    
    homeModule.config(
        '$stateProvider',
        '$urlRouterProvider',
        function(
            $stateProvider,
            $urlRouterProvider){
                console.log("Executing homeModule config");
                var stateName = 'home'; //try and modify the templateUrl for the home state
                $stateProvider.state(stateName, {
                    url: routeConfig[stateName].url,
                    templateUrl: routeConfig[stateName].templateUrl,
                    controller: 'HomeViewController'
                });
            });
        
    homeModule.controller('HomeViewController', HomeViewController);

    return homeModule;
});
