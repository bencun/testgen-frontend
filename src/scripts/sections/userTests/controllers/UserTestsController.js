define([
    'angular'
], function(
    angular) {

    var UserTestsController = function($scope, $rootScope, $state, $stateParams, DataFactory){
        console.log("Tests controller is alive.");

        $rootScope.UI.pagerVisible = true;
        $rootScope.UI.searchVisible = true;
        $rootScope.UI.navigationVisible = false;
                
        DataFactory.setTarget(DataFactory.targets.userTests);

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
            startTest: function(test){
                $state.go('app.user.userTest', {
                    testId: test.id
                });
            },
            closeSearch: function(){
                $state.go('app.user.userTests');
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
                    $state.go('app.user.userTests.search',
                    {searchQuery: $rootScope.UI.search.query},
                    {reload: 'app.user.userTests.search'});
                }
                else{
                    $scope.actions.closeSearch();
                }
            }
            else $scope.actions.closeSearch();
        });
    };
    UserTestsController.$inject = ['$scope', '$rootScope', '$state' ,'$stateParams', 'DataFactory'];

    angular.module('app').controller('UserTestsController', UserTestsController);
});