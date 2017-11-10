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
            addTest: function(){
                $state.go('app.admin.test', {
                    testId: 0
                });
            },
            editTest: function(test){
                $state.go('app.admin.test', {
                    testId: test.id
                });
            },
            deleteTest: function(test){
                DataFactory.tests.delete(test.id);
                $scope.pager('refresh');
                $scope.$broadcast('searchStart');
            },
            closeSearch: function(){
                $state.go('app.admin.tests');
            }
        };


        $scope.$on('pagerNext', function(e){
            $scope.pager('next');
        });
        $scope.$on('pagerPrev', function(e){
            $scope.pager('prev');
        });
        $scope.$on('searchStart', function(e){
            if($rootScope.UI.search.query){
                if($rootScope.UI.search.query.trim().length > 0){
                    $state.go('app.admin.tests.search',
                    {searchQuery: $rootScope.UI.search.query},
                    {reload: 'app.admin.tests.search'});
                }
                else{
                    $scope.actions.closeSearch();
                }
            }
            else $scope.actions.closeSearch();
        });
    };
    TestsController.$inject = ['$scope', '$rootScope', '$state' ,'$stateParams', 'DataFactory'];

    angular.module('app').controller('TestsController', TestsController);
});