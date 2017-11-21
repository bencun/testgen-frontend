define([
    'angular',
    //'lib/appBootstrap', //critical to exclude
    //'lib/app', //should be excluded because of bootstrapping
    'lib/appModule', //critical to include
    'lib/appRoutes',
    'angular-mocks'
], function(angular, appModule, appRoutes, ngMocks){
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
            
            //modules
            beforeEach(module('app.templates'));
            beforeEach(module('app'));
            //injections
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
            }));
            //setup (async with done();)
            beforeEach(function(done){
                //get state info
                state = $state.get('login');
                controllerName = state.controller;
                //create a new scope for the controller
                scope = $rootScope.$new();
                createController = function(){
                    return $controller(controllerName, {'$scope' : scope});
                };
                //remember to undefine the controller prior to reloading - this is unique to requirejs
                requirejs.undef('scripts/sections/login/controllers/LoginController');
                //async require for the module in which the controller we're testing is in
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

            it('should have a redirectUser method', function(){
                expect(LoginController.redirectUser).toBeDefined();
                expect(LoginController.redirectUser).toEqual(jasmine.any(Function));
            });

            it('should have a redirectAdmin method', function(){
                expect(LoginController.redirectAdmin).toBeDefined();
                expect(LoginController.redirectAdmin).toEqual(jasmine.any(Function));
            });

            it('should have a redirectUser method that sets UI flags and redirects to app.user.userTests', function(){
                spyOn($state, 'go');
                LoginController.redirectUser();

                expect($rootScope.UI.goBackVisible).toBeTruthy();
                expect($rootScope.UI.logoutVisible).toBeTruthy();
                expect($state.go).toHaveBeenCalledWith('app.user.userTests');
            });

            it('should have a redirectAdmin method that sets UI flags and redirects to app.admin.tests', function(){
                spyOn($state, 'go');
                LoginController.redirectAdmin();

                expect($rootScope.UI.goBackVisible).toBeTruthy();
                expect($rootScope.UI.logoutVisible).toBeTruthy();
                expect($state.go).toHaveBeenCalledWith('app.admin.tests');
            });
            
            it('should fail to login any user when calling tryLogin(true) when using bad credentials', function(){
                //spy the related functions
                spyOn(AuthFactory, 'login').and.callFake(function(){
                    var deferred = $q.defer();
                    deferred.reject({data:"Error"});
                    return deferred.promise;
                });
                spyOn($state, 'go');
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
            });
            it('should succeed logging in the admin user when calling tryLogin(true) with good credentials', function(){
                //spy the related functions
                spyOn(AuthFactory, 'login').and.callFake(function(){
                    var deferred = $q.defer();
                    deferred.resolve({admin:true});
                    return deferred.promise;
                });
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
            });
            it('should succeed logging in the regular user when calling tryLogin(true) with good credentials', function(){
                //spy the related functions
                spyOn(AuthFactory, 'login').and.callFake(function(){
                    var deferred = $q.defer();
                    deferred.resolve({admin:false});
                    return deferred.promise;
                });
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
                expect(LoginController.redirectUser).toHaveBeenCalled();
                expect(LoginController.redirectAdmin).not.toHaveBeenCalled();
            });
            it('should fail logging in the user when calling tryLogin() with bad auth', function(){
                //spy the related functions
                spyOn(AuthFactory, 'checkAuth').and.callFake(function(){
                    var deferred = $q.defer();
                    deferred.reject();
                    return deferred.promise;
                });
                spyOn(scope, 'tryLogin').and.callThrough();
                spyOn(LoginController, 'redirectUser');
                spyOn(LoginController, 'redirectAdmin');
                spyOn($state, 'go');
                //mock some user data
                scope.userData = {
                    username: "abc",
                    password: "def"
                };
                //call the function
                scope.tryLogin(false);
                
                
                $rootScope.$apply(); //NEVER FORGET, PROMISES NEED THIS
                expect(scope.tryLogin).toHaveBeenCalled();
                expect(LoginController.redirectUser).not.toHaveBeenCalled();
                expect(LoginController.redirectAdmin).not.toHaveBeenCalled();
                expect($state.go).not.toHaveBeenCalled();
            });
            it('should succeed logging in the user as admin when calling tryLogin() with good auth', function(){
                //spy the related functions
                spyOn(AuthFactory, 'checkAuth').and.callFake(function(){
                    var deferred = $q.defer();
                    deferred.resolve({permAdmin: true});
                    return deferred.promise;
                });
                spyOn(scope, 'tryLogin').and.callThrough();
                spyOn(LoginController, 'redirectUser');
                spyOn(LoginController, 'redirectAdmin');
                //mock some user data
                scope.userData = {
                    username: "abc",
                    password: "def"
                };
                //call the function
                scope.tryLogin(false);
                
                
                $rootScope.$apply(); //NEVER FORGET, PROMISES NEED THIS
                expect(scope.tryLogin).toHaveBeenCalled();
                expect(LoginController.redirectUser).not.toHaveBeenCalled();
                expect(LoginController.redirectAdmin).toHaveBeenCalled();
            });
            it('should succeed logging in the user as limited user when calling tryLogin() with good auth', function(){
                //spy the related functions
                spyOn(AuthFactory, 'checkAuth').and.callFake(function(){
                    var deferred = $q.defer();
                    deferred.resolve({permAdmin: false});
                    return deferred.promise;
                });
                spyOn(scope, 'tryLogin').and.callThrough();
                spyOn(LoginController, 'redirectUser');
                spyOn(LoginController, 'redirectAdmin');
                //mock some user data
                scope.userData = {
                    username: "abc",
                    password: "def"
                };
                //call the function
                scope.tryLogin(false);
                
                
                $rootScope.$apply(); //NEVER FORGET, PROMISES NEED THIS
                expect(scope.tryLogin).toHaveBeenCalled();
                expect(LoginController.redirectUser).toHaveBeenCalled();
                expect(LoginController.redirectAdmin).not.toHaveBeenCalled();
            });
        });//describe
    //});
});//define