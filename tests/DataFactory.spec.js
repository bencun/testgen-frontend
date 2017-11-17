define([
    'angular',
    //'lib/appBootstrap', //critical to exclude
    //'lib/app', //critical to include
    'lib/appModule',
    'angular-mocks'
], function(angular){
    describe('DataFactory for paging and CRUD delegation', function(){
        var DataFactory;
        
        beforeEach(angular.mock.module('app'));

        beforeEach(
            inject(
                function(_DataFactory_){
                    DataFactory = _DataFactory_;
                }
            )
        );
        
        
        it('should be defined', function(){
            expect(DataFactory).toBeDefined();
        });
        
        it('should have these properties', function(){
            expect(DataFactory.targets).toBeDefined();
            expect(DataFactory.currentArray).toBeDefined();
            expect(DataFactory.perPage).toBeDefined();
            expect(DataFactory.currentPage).toBeDefined();
            expect(DataFactory.totalPages).toBeDefined();
            expect(DataFactory.target).toBeDefined();
            expect(DataFactory.targetLoader).toBeUndefined();
            expect(DataFactory.targetLoaderParam).toBeNull();
            expect(DataFactory.setTarget).toBeDefined();
        });
        /*
        it('should not return anything', function(){
            expect(DataFactory.testMethod()).toBeUndefined();
        });
        it('should have a returnMethod', function(){
            expect(DataFactory.returnMethod).toBeDefined();
        });
        it('should return "ok" when calling the returnMethod', function(){
            expect(DataFactory.returnMethod()).toEqual("ok");
        });*/
    });
});