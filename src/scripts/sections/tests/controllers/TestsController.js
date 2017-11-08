define([
    'angular'
], function(
    angular) {

    var TestsController = function($scope, $rootScope, $state, $stateParams, DataFactory){
        console.log("Tests controller is alive.");

        $rootScope.UI.pagerVisible = true;
        $rootScope.UI.searchVisible = true;
                
        DataFactory.setTarget(DataFactory.targets.tests);

        $scope.pager = function(dir){
            var currentData = DataFactory.load(dir);
            $rootScope.UI.pager.currentPage = currentData.currentPage;
            $rootScope.UI.pager.totalPages = currentData.totalPages;
            $scope.data = {
                items: currentData.items
            };
            
        };

        $scope.pager();

        $scope.actions = {
            editTest: function(test){
                $state.go('app.admin.test', {
                    testId: test.id
                });
            },
            deleteTest: function(test){
                DataFactory.tests.delete(test);
                $scope.pager('refresh');
            }
        };


        $scope.$on('pagerNext', function(e){
            $scope.pager('next');
        });
        $scope.$on('pagerPrev', function(e){
            $scope.pager('prev');
        });
    };
    TestsController.$inject = ['$scope', '$rootScope', '$state' ,'$stateParams', 'DataFactory'];

    angular.module('app').controller('TestsController', TestsController);
});