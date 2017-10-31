define([
    'lib/appRoutes',
    'lib/services/dependencyResolverFor'
], function(routeConfig, dependencyResolverFor) {
    app = angular.module('app', ['ui.router']);

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
                
            /*app = {
                controller : $controllerProvider.register,
                directive  : $compileProvider.directive,
                filter     : $filterProvider.register,
                factory    : $provide.factory,
                service    : $provide.service
            };*/

            app.controller = $controllerProvider.register,
            app.directive  = $compileProvider.directive,
            app.filter     = $filterProvider.register,
            app.factory    = $provide.factory,
            app.service    = $provide.service

            $locationProvider.html5Mode(true);

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
        }
    ]);

    return app;
});
