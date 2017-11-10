define([
    'angular'
], function(
    angular) {

    var CategoriesController = function($scope, $rootScope, $state, DataFactory){
        console.log("Categories controller is alive.");

        $rootScope.UI.pagerVisible = true;
        $rootScope.UI.searchVisible = true;
        $rootScope.UI.navigationVisible = true;

        DataFactory.setTarget(DataFactory.targets.categories);

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
            addCategory: function(){
                $state.go('app.admin.category', {
                    categoryId: 0
                });
            },
            viewCategory : function(cat){
                $state.go('app.admin.questions', {categoryId: cat.id, categoryName: cat.name});
            },        
            editCategory : function(cat){
                $state.go('app.admin.category', {categoryId: cat.id});
            },
            deleteCategory : function(cat){
                DataFactory.categories.delete(cat.id);
                $scope.pager('refresh');
                $scope.$broadcast('searchStart');
            },
            closeSearch: function(){
                $state.go('app.admin.categories');
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
                    $state.go('app.admin.categories.search',
                    {searchQuery: $rootScope.UI.search.query},
                    {reload: 'app.admin.categories.search'});
                }
                else{
                    $scope.actions.closeSearch();
                }
            }
            else $scope.actions.closeSearch();
        });
    };
    CategoriesController.$inject = ['$scope', '$rootScope', '$state', 'DataFactory'];

    angular.module('app').controller('CategoriesController', CategoriesController);
});