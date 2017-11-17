define([
    'angular'
], function(
    angular) {

    var UserTestsController = function($scope, $rootScope, $state, $stateParams, DataFactory){
        console.log("Tests controller is alive.");

        $rootScope.UI.pagerVisible = true;
        $rootScope.UI.searchVisible = true;
        $rootScope.UI.navigationVisible = false;
        $scope.tabs = {
            activeTab: "templates", // templates||tests
            enabled: true
        };
                
        DataFactory.setTarget(DataFactory.targets.userTests);

        $scope.data = {
            items: []
        };
        $scope.pager = function(dir){
            DataFactory.load(dir).then(
                function(currentData){
                    $rootScope.UI.pager.currentPage = currentData.currentPage;
                    $rootScope.UI.pager.totalPages = currentData.totalPages;
                    $scope.data = {
                        items: currentData.items
                    };

                    $rootScope.UI.pagerVisible = true;
                    $rootScope.UI.searchVisible = true;
                    $rootScope.UI.navigationVisible = false;
                    $scope.tabs.enabled = true;
                },
                function(response){
                    console.debug("Fetching user templates from DataFactory has failed miserably.");
                    $state.go("login");
                }
            );
            
        };

        $scope.pager();

        $scope.actions = {
            startTest: function(test){
                $state.go('app.user.userTest', {
                    testId: test.id
                });
            },
            viewTest: function(test){
                $state.go('app.user.userTestView', {
                    testId: test.id
                });
            },
            closeSearch: function(){
                $state.go('app.user.userTests');
            },
            switchTab: function(t){
                if($scope.tabs.enabled){
                    if(t == 'templates'){
                        DataFactory.setTarget(DataFactory.targets.userTests);
                    }
                    if(t == 'tests'){
                        DataFactory.setTarget(DataFactory.targets.userTestsGraded);
                    }
                    $scope.data.items = [];
                    $scope.tabs.enabled = false;
                    $scope.pager();
                    $scope.tabs.activeTab = t;
                }
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