define([
    'angular',
    'lib/directives/module', //critical to include
    'angular-mocks'
], function(angular, appModule, appRoutes, ngMocks){
    //require(['scripts/sections/login/controllers/LoginController'], function(){
        describe('filteredPicker as a UI component for filtering and picking items', function(){
            //modules, services etc.
            var $q,
                $controller,
                $templateCache,
    
                $rootScope,
                Notification,
                
                scope,
                element,
                isolateScope
            
            //modules
            beforeEach(module('ui-notification'));
            beforeEach(module('app.directives'));
            beforeEach(module('app.templates'));
            //injections
            beforeEach(inject(function($injector){
                $q = $injector.get('$q');
                $compile = $injector.get('$compile');
                $controller = $injector.get('$controller');
                $templateCache = $injector.get('$templateCache');
                $rootScope = $injector.get('$rootScope');
                Notification = $injector.get('Notification');

                scope = $rootScope.$new();
                element = angular.element('<filtered-picker '+
                'fp-array="testfpArray" '+
                'fp-target-array="testfpTargetArray" '+
                'fp-push-method="testfpPushMethod(arg);" '+
                'fp-id-property="k" '+
                'fp-filter-property="f" '+
                'fp-title="Test fp title">'+
                '</filtered-picker>'
                );
                $compile(element)(scope);
                scope.testfpArray = [
                        {
                            k: 1,
                            f: 'A'
                        },
                        {
                            k: 2,
                            f: 'B'
                        },
                        {
                            k: 3,
                            f: 'C'
                        }
                    ];
                scope.testfpTargetArray = [];
                scope.testfpPushMethod = function(arg){
                    scope.testfpTargetArray.push(arg )
                };
                //trigger scope update
                scope.$apply();
                //
                isolateScope = element.isolateScope();
            }));
            
            it('should be a defined element', function(){
                expect(element).toBeDefined();
            });

            it('should be a defined element with a scope', function(){
                expect(isolateScope).toBeDefined();
            });
            it('should have a property named query set to empty string on the scope', function(){                
                expect(isolateScope.query).toBeDefined();
                expect(isolateScope.query).toBe('');
            });
            it('should have a function named pushItem on the scope', function(){                
                expect(isolateScope.pushItem).toBeDefined();
                expect(isolateScope.pushItem).toEqual(jasmine.any(Function));
            });

            it('should have a matching title', function(){
                expect(element.find('h4')[0].innerHTML).toEqual("Test fp title");
            });

            it('should call the pushItem function when the button is clicked', function(){
                spyOn(isolateScope, 'pushItem');
                angular.element((element.find('div.filtered-picker-item')[0])).find('button')[0].click();
                expect(isolateScope.pushItem).toHaveBeenCalled();
            });
            
            it('should add items to the original scope array when item is clicked', function(){
                expect(scope.testfpArray).toBe(isolateScope.fpArray);
                expect(scope.testfpTargetArray).toBe(isolateScope.fpTargetArray);
                expect(element.find('div.filtered-picker-item').length).toEqual(3);
                expect(isolateScope.fpArray.length).toBe(3);
                expect(isolateScope.fpTargetArray.length).toBe(0);
                
                angular.element((element.find('div.filtered-picker-item')[0])).find('button')[0].click();
                expect(isolateScope.fpTargetArray.length).toBe(1);
                expect(element.find('div.filtered-picker-item').length).toEqual(3);
            });

            
            it('should skip adding item to the original scope array when item is clicked because item already exists', function(){
                expect(scope.testfpArray).toBe(isolateScope.fpArray);
                expect(scope.testfpTargetArray).toBe(isolateScope.fpTargetArray);
                expect(element.find('div.filtered-picker-item').length).toEqual(3);
                expect(isolateScope.fpArray.length).toBe(3);
                expect(isolateScope.fpTargetArray.length).toBe(0);
                angular.element((element.find('div.filtered-picker-item')[0])).find('button')[0].click();
                expect(isolateScope.fpTargetArray.length).toBe(1);
                angular.element((element.find('div.filtered-picker-item')[0])).find('button')[0].click();
                expect(isolateScope.fpTargetArray.length).toBe(1);
            });
            
        });//describe
    //});
});//define