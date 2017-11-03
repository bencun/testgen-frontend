define([
    'angular',
    'lib/appRoutes',
    'lib/services/dependencyResolverFor'
], function(angular, routeConfig, dependencyResolverFor, appController) {
    var app = angular.module('app', ['ui.router']);
    app.controller('appController', appController);

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
    return app;
});
