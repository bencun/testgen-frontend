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
                $http,
                $httpBackend,
                $controller,
                $templateCache,
    
                $rootScope,
                $state,
                AuthFactory,
                Notification,
                
                scope,
                state,
                controllerName,
                createController,
                LoginController;
            
            beforeEach(module('app.templates'));
            beforeEach(module('app'));

            beforeEach(inject(function($injector){
                $q = $injector.get('$q');
                $http = $injector.get('$http');
                $httpBackend = $injector.get('$httpBackend');
                $controller = $injector.get('$controller');
                $templateCache = $injector.get('$templateCache');
                $rootScope = $injector.get('$rootScope');
                $state = $injector.get('$state');
                AuthFactory = $injector.get('AuthFactory');
                Notification = $injector.get('Notification');

            }))
    
            /*
            THIS DOES NOT WORK AND IT'S INCOMPLETE
            beforeEach(inject(function($injector){
                $q = $injector.get('$q');
                $http = $injector.get('$http');
                $httpBackend = $injector.get('$httpBackend');
                $controller = $injector.get('$controller');
                $templateCache = $injector.get('$templateCache');
                $rootScope = $injector.get('$rootScope');
                $state = $injector.get('$state');
                AuthFactory = $injector.get('AuthFactory');
                Notification = $injector.get('Notification');

                var $compile = $injector.get('$compile');
                
                
                //$templateCache.removeAll();
                //$templateCache.put(appRoutes.routes['login'].templateUrl, data);
                
                //for template view
                //console.debug("TEMPLATE:");;
                //console.debug($templateCache.get('/scripts/sections/login/views/login.html'));
                scope = $rootScope.$new();
                var stateDetails = $state.get('login');
                var html = $templateCache.get(appRoutes.routes['login'].templateUrl);
                $rootScope.$apply();
                var compileFn = $compile(angular.element().html(html));
                var element = compileFn(scope);
                $rootScope.$apply();
                //var ctrl = $controller('LoginController', {'$scope': scope});

            }));
            */

            beforeEach(function(done){
                //get state info
                state = $state.get('login');
                controllerName = state.controller;    
                scope = $rootScope.$new();
                createController = function(){
                    return $controller(controllerName, {'$scope' : scope});
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
                expect(scope).toBeDefined();
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
                expect(scope.tryLogin).toBeDefined();
                expect(scope.tryLogin).toEqual(jasmine.any(Function));
            });
            
            it('should fail to login any user when calling tryLogin(true) when using bad credentials', function(){
                //spy the related functions
                spyOn(AuthFactory, 'login').and.callFake(function(){
                    var deferred = $q.defer();
                    deferred.reject({data:"Error"});
                    return deferred.promise;
                });
                spyOn($state, 'go');
                spyOn(Notification, 'warning');
                spyOn(scope, 'tryLogin').and.callThrough();
                spyOn(LoginController, 'redirectUser');
                spyOn(LoginController, 'redirectAdmin');
                //mock some user data
                scope.userData = {
                    username: "abc",
                    password: "def"
                };
                //call the function
                scope.tryLogin(true);
                
                
                $rootScope.$apply(); //NEVER FORGET, PROMISES NEED THIS
                expect(scope.tryLogin).toHaveBeenCalled();
                expect(LoginController.redirectUser).not.toHaveBeenCalled();
                expect(LoginController.redirectAdmin).not.toHaveBeenCalled();
                expect($state.go).not.toHaveBeenCalled();
                expect(Notification.warning).toHaveBeenCalled();
            });
            it('should succeed logging in the admin user when calling tryLogin(true) with good credentials', function(){
                //spy the related functions
                spyOn(AuthFactory, 'login').and.callFake(function(){
                    var deferred = $q.defer();
                    deferred.resolve({admin:true});
                    return deferred.promise;
                });
                spyOn($state, 'go');
                spyOn(Notification, 'warning');
                spyOn(scope, 'tryLogin').and.callThrough();
                spyOn(LoginController, 'redirectUser');
                spyOn(LoginController, 'redirectAdmin');
                //mock some user data
                scope.userData = {
                    username: "abc",
                    password: "def"
                };
                //call the function
                scope.tryLogin(true);
                
                
                $rootScope.$apply(); //NEVER FORGET, PROMISES NEED THIS
                expect(scope.tryLogin).toHaveBeenCalled();
                expect(LoginController.redirectUser).not.toHaveBeenCalled();
                expect(LoginController.redirectAdmin).toHaveBeenCalled();
                expect($state.go).not.toHaveBeenCalled();
                expect(Notification.warning).toHaveBeenCalled();
                
            });
            it('should succeed logging in the regular user when calling tryLogin(true) with good credentials', function(){});
            it('should fail logging in the user when calling tryLogin() with bad auth', function(){});
            it('should fail logging in the user when calling tryLogin() with good auth', function(){});
        });//describe
    //});
});//define