define([
    'angular',
    'lib/appModule', //critical to include
    'angular-mocks',
    'scripts/sections/home/factories/TestFactory'
], function(angular){
    describe('A test factory', function(){
        var tmpTestFactory;
        
        beforeEach(angular.mock.module('app'));

        beforeEach(
            inject(
                function(_TestFactory_){
                    tmpTestFactory = _TestFactory_;
                }
            )
        );

        it('should be defined', function(){
            expect(tmpTestFactory).toBeDefined();
        });
        it('should have a testMethod', function(){
            expect(tmpTestFactory.testMethod).toBeDefined();
        });
        it('should not return anything', function(){
            expect(tmpTestFactory.testMethod()).toBeUndefined();
        });
        it('should have a returnMethod', function(){
            expect(tmpTestFactory.returnMethod).toBeDefined();
        });
        it('should return "ok" when calling the returnMethod', function(){
            expect(tmpTestFactory.returnMethod()).toEqual("ok");
        });
    });
});