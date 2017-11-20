define([
    'angular',
    //'lib/appBootstrap', //critical to exclude
    //'lib/app', //should be excluded because of bootstrapping
    'lib/appModule', //critical to include
    'lib/appRoutes',
    'angular-mocks',
    'lib/services/dependencyResolverFor'
], function(angular, appModule, appRoutes, ngMocks, dependencyResolverFor){
    //require(['scripts/sections/login/controllers/LoginController'], function(){
        describe('LoginController for the login page', function(){
            //modules, services etc.
            var $q,
                $httpBackend,
                $controller,
                $templateCache,
    
                $rootScope,
                $state,
                AuthFactory,
                Notification,
                $scope,
                
                state,
                controllerName,
                createController,
                LoginController;
            
            beforeEach(module('app'));
    
            beforeEach(inject(function($injector){
                $q = $injector.get('$q');
                $httpBackend = $injector.get('$httpBackend');
                $controller = $injector.get('$controller');
                $templateCache = $injector.get('$templateCache');
                $rootScope = $injector.get('$rootScope');
                $state = $injector.get('$state');
                AuthFactory = $injector.get('AuthFactory');
                Notification = $injector.get('Notification');
            }));

            beforeEach(function(done){
                state = $state.get('login');
                controllerName = state.controller;
                $templateCache.put(appRoutes.routes['login'].templateUrl);
    
                $scope = $rootScope.$new();
                createController = function(){
                    return $controller(controllerName, {'$scope' : $scope});
                };

                //remember to undefine the controller prior to reloading - this is unique to requirejs
                requirejs.undef('scripts/sections/login/controllers/LoginController');
                //async require for the controller we're testing
                require(['scripts/sections/login/controllers/LoginController'], function(){
                    LoginController = createController();
                    done();
                });
            });
    
            it('should be defined', function(){
                expect(LoginController).toBeDefined();
            });

            it('should have a scope', function(){
                expect($scope).toBeDefined();
            });

            it('should define UI flags properly', function(){
                expect($rootScope.UI).toBeDefined();
                expect($rootScope.UI.pagerVisible).toBeFalsy();
                expect($rootScope.UI.searchVisible).toBeFalsy();
                expect($rootScope.UI.navigationVisible).toBeFalsy();
                expect($rootScope.UI.logoutVisible).toBeFalsy();
                expect($rootScope.UI.goBackVisible).toBeFalsy();
            });
            
            it('should have a tryLogin() method on the scope', function(){
                expect($scope.tryLogin).toBeDefined();
                expect($scope.tryLogin).toEqual(jasmine.any(Function));
            });
            
            fit('should fail to login the admin user when calling tryLogin(true) when using bad credentials', function(){
                spyOn(AuthFactory, 'login').and.callFake(function(){
                    var deferred = $q.defer();
                    deferred.reject();
                    return deferred.promise;
                });
                $scope.userData = {
                    username: "abc",
                    password: "def"
                };
                $scope.tryLogin(true);
                //INCOMPLETE
            });

            it('should succeed logging in the admin user when calling tryLogin(true) with good credentials', function(){});
            it('should fail to login the regular user when calling tryLogin(true) when using bad credentials', function(){});
            it('should succeed logging in the regular user when calling tryLogin(true) with good credentials', function(){});
            it('should fail logging in the user when calling tryLogin() with bad auth', function(){});
            it('should fail logging in the user when calling tryLogin() with good auth', function(){});
        });//describe
    //});
});//define