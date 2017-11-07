define([
    'angular'
], function(
    angular) {

    var CategoriesController = function($scope, $rootScope, $state, DataFactory){
        console.log("Categories controller is alive.");

        $rootScope.UI.pagerVisible = true;
        $rootScope.UI.searchVisible = true;

        DataFactory.setTarget(DataFactory.targets.categories);

        $scope.pager = function(dir){
            var currentData = DataFactory.load(dir);
            $scope.items = currentData.items;
            $rootScope.UI.pager.currentPage = currentData.currentPage;
            $rootScope.UI.pager.totalPages = currentData.totalPages;
        };

        $scope.pager();

        $scope.viewCategory = function(cat){
            $state.go('app.admin.questions', {categoryId: cat.id, categoryName: cat.name});
        };
        
        $scope.editCategory = function(cat){
            $state.go('app.admin.category', {categoryId: cat.id});
        };

        $scope.deleteCategory = function(){
            //TODO
        };

        $scope.$on('pagerNext', function(e){
            $scope.pager('next');
        });
        $scope.$on('pagerPrev', function(e){
            $scope.pager('prev');
        });
    };
    CategoriesController.$inject = ['$scope', '$rootScope', '$state', 'DataFactory'];

    angular.module('app').controller('CategoriesController', CategoriesController);
});