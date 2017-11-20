define([
    'angular',
    //'lib/appBootstrap', //critical to exclude
    //'lib/app', //critical to include
    'lib/appModule',
    'angular-mocks'
], function(angular){
    describe('AuthFactory for authentication', function(){
        //modules, services
        var AuthFactory;
        var $q,
            $httpBackend,
            $localStorage,
            $rootScope;
        
        beforeEach(module('app'));

        beforeEach(inject(function($injector){
            AuthFactory = $injector.get('AuthFactory');
            $q = $injector.get('$q');
            $localStorage = $injector.get('$localStorage');
            $httpBackend = $injector.get('$httpBackend');
            $rootScope = $injector.get('$rootScope');
        }));


        //helper vars
        var loginRequest = readJSON('tests/json/user_auth_req.json');
        var loginResponse = readJSON('tests/json/user_auth_res.json');
        var loginError = {message: "You are not logged in."};
        var verifyResponse = {admin: false};

        it('should be defined', function(){
            expect(AuthFactory).toBeDefined();
        });

        it('should have a login() method defined', function(){
            expect(AuthFactory.login).toBeDefined();
            expect(AuthFactory.login).toEqual(jasmine.any(Function));
        });

        it('should have a logout() method defined', function(){
            expect(AuthFactory.logout).toBeDefined();
            expect(AuthFactory.logout).toEqual(jasmine.any(Function));
        });

        it('should have a checkAuth() method defined', function(){
            expect(AuthFactory.checkAuth).toBeDefined();
            expect(AuthFactory.checkAuth).toEqual(jasmine.any(Function));
        });

        it('should have a checkAuthAdmin() method defined', function(){
            expect(AuthFactory.checkAuthAdmin).toBeDefined();
            expect(AuthFactory.checkAuthAdmin).toEqual(jasmine.any(Function));
        });

        it('should have a checkAuthUser() method defined', function(){
            expect(AuthFactory.checkAuthUser).toBeDefined();
            expect(AuthFactory.checkAuthUser).toEqual(jasmine.any(Function));
        });
        it('should have a getAuthToken() method defined', function(){
            expect(AuthFactory.getAuthToken).toBeDefined();
            expect(AuthFactory.getAuthToken).toEqual(jasmine.any(Function));
        });

        it('should have a login() method which logs in the user with  the admin flag set to false', function(){
            $httpBackend.whenPOST('api/login')
                .respond(function(method, url, data, headers){
                    var parsedData = JSON.parse(data);
                    if(parsedData.name == loginRequest.name &&
                        parsedData.password == loginRequest.password){
                            return [200, loginResponse];
                        }
                    else{
                        return [401, loginError];
                    }
            });
            
            $httpBackend.expectPOST('api/login');
            
            var loggedIn = false;
            var admin = false;
            AuthFactory.login(loginRequest.name, loginRequest.password).then(
                function(data){
                    loggedIn = true;
                    admin = data.admin;
                },
                function(data){
                    loggedIn = false;
                    admin = data.admin;
                }
            );

            $httpBackend.flush();

            expect(loggedIn).toBeTruthy();
            expect(admin).toBeFalsy();
        });

        it('should have a login() method which fails to logs in the user', function(){
            $httpBackend.whenPOST('api/login')
                .respond(function(method, url, data, headers){
                    return [401, loginError];
            });
            
            $httpBackend.expectPOST('api/login');
            
            var loggedIn = false;
            AuthFactory.login("bad", "combo").then(
                function(data){
                    loggedIn = true;
                },
                function(data){
                    loggedIn = false;
                }
            );

            $httpBackend.flush();
            
            expect(loggedIn).toBeFalsy();
        });

        it('should have a checkAuth() method which confirms the auth and returns the admin privilege flag as false', function(){
            $httpBackend.whenPOST('api/verify')
                .respond(function(method, url, data, headers){
                    return [200, verifyResponse];
            });
            
            $httpBackend.expectPOST('api/verify');
            
            var userVerified = false;
            AuthFactory.checkAuth().then(
                function(data){
                    userVerified = true;
                },
                function(data){
                    userVerified = false;
                }
            );
            
            $httpBackend.flush();

            expect(userVerified).toBeTruthy();
        });

        it('should have a checkAuth() method which fails to verify the token', function(){
            $httpBackend.whenPOST('api/verify')
                .respond(function(method, url, data, headers){
                    return [401, loginError];
            });
            
            $httpBackend.expectPOST('api/verify');
            
            var userVerified = false;
            AuthFactory.checkAuth().then(
                function(data){
                    userVerified = true;
                },
                function(data){
                    userVerified = false;
                }
            );
            
            $httpBackend.flush();

            expect(userVerified).toBeFalsy();
        });

        it('should have a checkAuthAdmin() method which confirms the login and admin privileges', function(){
            spyOn(AuthFactory, 'checkAuth').and.callFake(function(){
                var deferred = $q.defer();
                deferred.resolve({permAdmin: true});
                return deferred.promise;
            });
            
            var userAdmin = false;
            AuthFactory.checkAuthAdmin().then(
                function(data){
                    console.debug(data);
                    console.debug("checkAuthAdmin() -> resolved");
                    userAdmin = true;
                },
                function(data){
                    console.debug(data);
                    console.debug("checkAuthAdmin() -> resolved");
                    userAdmin = false;
                }
            );
            $rootScope.$apply();
            expect(userAdmin).toBeTruthy();
        });

        it('should have a checkAuthAdmin() method which confirms the login but denies the admin privileges', function(){
            spyOn(AuthFactory, 'checkAuth').and.callFake(function(){
                var deferred = $q.defer();
                deferred.resolve({permAdmin: false});
                return deferred.promise;
            });
            
            var userAdmin = false;
            AuthFactory.checkAuthAdmin().then(
                function(data){
                    userAdmin = true;
                },
                function(data){
                    userAdmin = false;
                }
            );
            $rootScope.$apply();
            expect(userAdmin).toBeFalsy();
        });

        it('should have a checkAuthAdmin() method which denies the login and the privileges', function(){
            spyOn(AuthFactory, 'checkAuth').and.callFake(function(){
                var deferred = $q.defer();
                deferred.reject(false);
                return deferred.promise;
            });
            
            var userAdmin = false;
            AuthFactory.checkAuthAdmin().then(
                function(data){
                    userAdmin = true;
                },
                function(data){
                    userAdmin = false;
                }
            );
            $rootScope.$apply();
            expect(userAdmin).toBeFalsy();
        });

        it('should have a checkAuthUser() method which confirms the login and user privileges', function(){
            spyOn(AuthFactory, 'checkAuth').and.callFake(function(){
                var deferred = $q.defer();
                deferred.resolve({permAdmin: false});
                return deferred.promise;
            });
            
            var userLimited = false;
            AuthFactory.checkAuthUser().then(
                function(data){
                    console.debug(data);
                    console.debug("checkAuthUser() -> resolved");
                    userLimited = true;
                },
                function(data){
                    console.debug(data);
                    console.debug("checkAuthUser() -> resolved");
                    userLimited = false;
                }
            );
            $rootScope.$apply();
            expect(userLimited).toBeTruthy();
        });

        it('should have a checkAuthUser() method which confirms the login but denies the user privileges', function(){
            spyOn(AuthFactory, 'checkAuth').and.callFake(function(){
                var deferred = $q.defer();
                deferred.resolve({permAdmin: true});
                return deferred.promise;
            });
            
            var userLimited = false;
            AuthFactory.checkAuthUser().then(
                function(data){
                    userLimited = true;
                },
                function(data){
                    userLimited = false;
                }
            );
            $rootScope.$apply();
            expect(userLimited).toBeFalsy();
        });

        it('should have a checkAuthUser() method which denies the login and the privileges', function(){
            spyOn(AuthFactory, 'checkAuth').and.callFake(function(){
                var deferred = $q.defer();
                deferred.reject(false);
                return deferred.promise;
            });
            
            var userLimited = false;
            AuthFactory.checkAuthUser().then(
                function(data){
                    userLimited = true;
                },
                function(data){
                    userLimited = false;
                }
            );
            $rootScope.$apply();
            expect(userLimited).toBeFalsy();
        });

        it('should have a logout() method which performs a successful RESTful API logout call', function(){
            $httpBackend.whenPOST('api/logout').respond(function(){
                return [200];
            });
            $httpBackend.expectPOST('api/logout');

            var successful = false;
            AuthFactory.logout().then(
                function(data){
                    successful = true;
                },
                function(data){
                    successful = false;
                }
            );

            $httpBackend.flush();

            expect(successful).toBeTruthy();
        });

        it('should have a logout() method which performs an usuccessful RESTful API logout call', function(){
            $httpBackend.whenPOST('api/logout').respond(function(){
                return [401];
            });
            $httpBackend.expectPOST('api/logout');

            var successful = false;
            AuthFactory.logout().then(
                function(data){
                    successful = true;
                },
                function(data){
                    successful = false;
                }
            );

            $httpBackend.flush();

            expect(successful).toBeFalsy();
        });

        it('should have a getAuthToken() method which returns the token value', function(){
            var mockToken = "ABC";
            $localStorage.authToken = mockToken;
            expect(AuthFactory.getAuthToken()).toEqual(mockToken);
        });

        it('should have a getAuthToken() method which returns an undefined value', function(){
            delete $localStorage.authToken;
            expect(AuthFactory.getAuthToken()).toBeUndefined();
        });



    });//describe
});//define