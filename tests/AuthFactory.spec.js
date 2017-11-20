define([
    'angular',
    //'lib/appBootstrap', //critical to exclude
    //'lib/app', //critical to include
    'lib/appModule',
    'angular-mocks'
], function(angular){
    describe('AuthFactory for authentication', function(){
        var AuthFactory;
        var $q,
            $httpBackend,
            $localStorage
        
        beforeEach(angular.mock.module('app'));

        beforeEach(inject(function($injector){
            AuthFactory = $injector.get('AuthFactory');
            $q = $injector.get('$q');
            $localStorage = $injector.get('$localStorage');
            $httpBackend = $injector.get('$httpBackend');
        }));

        it('should be defined', function(){
            expect(AuthFactory).toBeDefined();
        });

        it('should have a login() method defined', function(){
            expect(AuthFactory.login).toBeDefined();
            expect(AuthFactory.login).toEqual(jasmine.any(Function));
        });

        it('should have a login() method which returns a token and a privilege flag', function(){
            var loginRequest = readJSON('tests/json/user_auth_req.json');
            var loginResponse = readJSON('tests/json/user_auth_res.json');
            var loginError = {message: "Invalid user"};
            //set up a response
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
            //set the trigger
            $httpBackend.expectPOST('api/login');
            //call the function for successful login
            AuthFactory.login(loginRequest.name, loginRequest.password).then(
                function(data){
                    expect(data).toEqual(loginResponse);
                },
                function(data){}
            );
            //call the function for an unsuccessful login
            AuthFactory.login("bad", "data").then(
                function(data){},
                function(data){
                    expect(data).toEqual(loginError);
                }
            );
            //flush
            $httpBackend.flush();
        });
    });
});