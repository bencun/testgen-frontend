define([
    'angular',
    'lib/appRoutes',
    'lib/services/dependencyResolverFor',
    'lib/factories/module',
    'lib/directives/module',
    'lib/filters/module'
], function(angular, routeConfig, dependencyResolverFor) {
    var app = angular.module('app', ['ui.router', 'ngAnimate', 'ui-notification', 'app.factories', 'app.directives', 'app.filters']);
    
    app.config([
        '$stateProvider',
        '$urlRouterProvider',
        '$locationProvider',
        'NotificationProvider',
        '$controllerProvider',
        '$compileProvider',
        '$filterProvider',
        '$provide',

        function(
            $stateProvider,
            $urlRouterProvider,
            $locationProvider,
            NotificationProvider,
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
            $stateProvider.state('app.admin', {
                abstract: true
            });
            $stateProvider.state('app.user', {
                abstract: true
            });

            //default way of the injection regarding the original code, not dynamic enough
            if(routeConfig.routes !== undefined) {
                angular.forEach(routeConfig.routes, function(routeProperties, routeName) {
                    $stateProvider.state(routeName, {
                        url: routeProperties.url,
                        templateUrl: routeProperties.templateUrl,
                        params: (routeProperties.params != null) ? routeProperties.params : null,
                        resolve: dependencyResolverFor(routeProperties.module),
                        controller: routeProperties.controller
                    });
                });
            }

            if(routeConfig.defaultRoutePath !== undefined) {
                $urlRouterProvider.otherwise(routeConfig.defaultRoutePath);
            }
            $urlRouterProvider.when('', '/');

            //config the notification provider
            NotificationProvider.setOptions({
                positionX: 'center',
                positionY: 'bottom',
                verticalSpacing: 4,
                maxCount: 3
            });
        }
    ]);

    app.run([
        '$rootScope',
        '$trace',
        'AuthFactory',
        '$transitions',
        '$state',
        'Notification',
        function($rootScope, $trace, AuthFactory, $transitions, $state, Notification){
            $trace.enable('TRANSITION');
            //ui settings
            $rootScope.UI = {
                pagerVisible: false,
                searchVisible: false,
                navigationVisible: false,
                goBackVisible: false,
                adminMode: true,
                pager:{
                    currentPage: 0,
                    totalPages: 0
                },
                search:{
                    count: 10,
                    query: null
                }
            };
            $rootScope.UI.pagerTrigger = function(dir){
                if(dir == 'next')
                    $rootScope.$broadcast('pagerNext');
                if(dir == 'prev')
                    $rootScope.$broadcast('pagerPrev');
            };
            $rootScope.UI.goBack = function(){
                window.history.back();
            };
            $rootScope.UI.search.start = function(){
                $rootScope.$broadcast('searchStart');
            };
            //admin restriction
            $transitions.onBefore( { to: 'app.admin.**' }, function(transition) {
                var AuthFactory = transition.injector().get('AuthFactory');
                AuthFactory.checkAuthAdmin().then(
                    function(response){
                        console.log("[app.admin] Admin auth OK.");
                    },
                    function(response){
                        console.log("Admin auth failed.");
                        console.log(response);
                        $state.go('login');
                        return false;
                    }
                );
              });
              //user restriction
              $transitions.onBefore( { to: 'app.user.**' }, function(transition) {
                var AuthFactory = transition.injector().get('AuthFactory');
                return AuthFactory.checkAuthUser().then(
                    function(response){
                        console.log("[app.user] User auth OK.");
                    },
                    function(response){
                        console.log("User auth failed.");
                        console.log(response);
                        $state.go('login');
                        return false;
                    }
                );
              });
    }]);

    return app;
});