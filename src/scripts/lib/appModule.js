define([
    'angular',
    'lib/appRoutes',
    'lib/services/dependencyResolverFor',
    'lib/factories/module',
    'lib/directives/module',
    'lib/filters/module',
    'lib/appVendorLibs'
    //appVendorLibs had to be included because of Karma testing...
    //...app.js already includes this dependency but Karma needs it...
    //...as all tests directly include this file (appModule) and skip the app.js one
], function(angular, routeConfig, dependencyResolverFor) {
    var app = angular.module('app', [
        'ui.router',
        'ngAnimate',
        'ngStorage',
        'ui-notification',
        'angular-loading-bar',
        'app.factories', 'app.directives', 'app.filters']);
    
    app.config([
        '$stateProvider',
        '$urlRouterProvider',
        '$locationProvider',
        '$httpProvider',

        'NotificationProvider',
        'cfpLoadingBarProvider',

        '$controllerProvider',
        '$compileProvider',
        '$filterProvider',
        '$provide',

        function(
            $stateProvider,
            $urlRouterProvider,
            $locationProvider,
            $httpProvider,

            NotificationProvider,
            $cfpLoadingBarProvider,

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
            //defalut routes config
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

            //config the loading bar
            $cfpLoadingBarProvider.includeSpinner = false;
            
            //add the $http interceptor for the auth purposes
            $httpProvider.interceptors.push([
                '$q', '$location', '$localStorage',
                function ($q, $location, $localStorage) {
                    return {
                        request: function (config) {
                            config.headers = config.headers || {};
                            var token = $localStorage.authToken;
                            if (token) {
                                config.headers.Authorization = 'Bearer ' + token;
                            }
                            return config;
                        },
                        response: function (response) {
                            return response;
                        },
                        responseError: function(response) {
                          return $q.reject(response);
                        }
                    };
             }]);
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
                showNavbar: true,
                pagerVisible: false,
                searchVisible: false,
                navigationVisible: false,
                goBackVisible: false,
                adminMode: true,
                logoutVisible: true,
                defaultState: '*',
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
            $rootScope.UI.goHome = function(){
                $state.go($rootScope.UI.defaultState);
            };
            $rootScope.UI.logout = function(){
                AuthFactory.logout().then(
                    function(){
                        $state.go('login');
                        Notification.primary("You have been logged out.");
                    },
                    function(){
                        $state.go('login');
                        Notification.warning("You are not even logged in!");
                    }
                );
            };
            $rootScope.UI.search.start = function(){
                $rootScope.$broadcast('searchStart');
            };
            //admin restriction
            $transitions.onBefore( { to: 'app.admin.**' }, function(transition) {
                var AuthFactory = transition.injector().get('AuthFactory');
                AuthFactory.checkAuthAdmin().then(
                    function(response){
                        $rootScope.UI.goBackVisible = true;
                        $rootScope.UI.showNavbar = true;
                        $rootScope.UI.defaultState = 'app.admin.users';
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
                        $rootScope.UI.goBackVisible = true;
                        $rootScope.UI.showNavbar = true;
                        $rootScope.UI.defaultState = 'app.user.userTests';
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
              $transitions.onBefore( { to: 'app.user.userTest' }, function(transition) {
                var AuthFactory = transition.injector().get('AuthFactory');
                    $rootScope.UI.showNavbar = false;
                    return true;
              });
    }]);

    return app;
});
