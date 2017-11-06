define([
    'angular',
    'lib/appRoutes',
    'lib/services/dependencyResolverFor',
    'lib/factories/module'
], function(angular, routeConfig, dependencyResolverFor) {
    var app = angular.module('app', ['ui.router', 'app.factories']);
    
    app.config([
        '$stateProvider',
        '$urlRouterProvider',
        '$locationProvider',
        '$controllerProvider',
        '$compileProvider',
        '$filterProvider',
        '$provide',

        function(
            $stateProvider,
            $urlRouterProvider,
            $locationProvider,
            $controllerProvider,
            $compileProvider,
            $filterProvider,
            $provide) {

            //register as controllerProvider, directive compileProvider, filterProvider and factory/service provider
            app.controller = $controllerProvider.register;
            app.directive  = $compileProvider.directive;
            app.filter     = $filterProvider.register;
            app.factory    = $provide.factory;
            app.service    = $provide.service;

            $locationProvider.html5Mode(true);

            $stateProvider.state('app', {
                abstract: true
            });

            //default way of the injection regarding the original code, not dynamic enough
            if(routeConfig.routes !== undefined) {
                angular.forEach(routeConfig.routes, function(routeProperties, routeName) {
                    $stateProvider.state(routeName, {
                        url: routeProperties.url,
                        templateUrl: routeProperties.templateUrl,
                        resolve: dependencyResolverFor(routeProperties.module),
                        controller: routeProperties.controller
                    });
                });
            }

            if(routeConfig.defaultRoutePath !== undefined) {
                $urlRouterProvider.otherwise(routeConfig.defaultRoutePath);
            }
            $urlRouterProvider.when('', '/');
        }
    ]);

    app.run([
        '$rootScope',
        '$trace',
        'AuthFactory',
        '$transitions',
        '$state',
        function($rootScope, $trace, AuthFactory, $transitions, $state){
            $trace.enable('TRANSITION');
            $transitions.onBefore( { to: 'app.**' }, function(transition) {
                var AuthFactory = transition.injector().get('AuthFactory');
                // If the function returns false, the transition is cancelled.
                AuthFactory.checkAuth().then(
                    //success, proceed with the transition and update the current status name
                    //...as we're using it to update the navbar
                    function(response){
                        console.log("Auth OK.");
                        $rootScope.currentState = transition.to().name;
                        return true;
                    },
                    //failure, go back to login screen
                    function(response){
                        console.log("Auth failed.");
                        console.log(response);
                        $state.go('login');
                        return false;
                    }
                );
              });
    }]);

    return app;
});
