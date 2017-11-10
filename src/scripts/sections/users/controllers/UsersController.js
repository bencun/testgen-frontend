define([
    'angular'
], function(
    angular) {

    var UsersController = function($scope, $rootScope, $state, $stateParams, DataFactory){
        console.log("Users controller is alive.");

        $rootScope.UI.pagerVisible = true;
        $rootScope.UI.searchVisible = true;
                
        DataFactory.setTarget(DataFactory.targets.users);

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
            addUser: function(){
                $state.go('app.admin.user', {
                    userId: 0
                });
            },
            editUser: function(user){
                $state.go('app.admin.user', {
                    userId: user.id
                });
            },
            deleteUser: function(user){
                DataFactory.users.delete(user.id);
                $scope.pager('refresh');
                $scope.$broadcast('searchStart');
            },
            closeSearch: function(){
                $state.go('app.admin.users');
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
                    $state.go('app.admin.users.search',
                    {searchQuery: $rootScope.UI.search.query},
                    {reload: 'app.admin.users.search'});
                }
                else{
                    $scope.actions.closeSearch();
                }
            }
            else $scope.actions.closeSearch();
        });
    };
    UsersController.$inject = ['$scope', '$rootScope', '$state' ,'$stateParams', 'DataFactory'];

    angular.module('app').controller('UsersController', UsersController);
});