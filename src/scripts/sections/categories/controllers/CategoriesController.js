define([
    'angular'
], function(
    angular) {

    var CategoriesController = function($scope, $rootScope, $state, DataFactory, Notification, NotificationExtended){
        console.log("Categories controller is alive.");

        
        DataFactory.setTarget(DataFactory.targets.categories);
        
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
                    $rootScope.UI.navigationVisible = true;
                },
                function(response){
                    console.debug("Fetching categories from DataFactory failed miserably.");
                    $state.go("login");
                }
            );
            
        };

        $scope.pager();

        $scope.actions = {
            addCategory: function(){
                $state.go('app.admin.category', {
                    categoryId: 0
                });
            },
            viewCategory : function(cat){
                $state.go('app.admin.questions', {
                    categoryId: cat.id,
                    categoryName: cat.name
                });
            },        
            editCategory : function(cat){
                $state.go('app.admin.category', {
                    categoryId: cat.id
                });
            },
            deleteCategory : function(cat){
                NotificationExtended.confirmationDialog("Are you sure? This will also delete all questions belonging to this category: " + cat.name).then(
                    function(response){
                        DataFactory.categories.delete(cat.id).then(
                            function(response){
                                $scope.pager('refresh');
                                $scope.actions.closeSearch();
                            },
                            function(response){
                                Notification.error("Category wasn't deleted! Server message: " + response.message);
                            }
                        );
                    },
                    function(response){
                        //nothing
                    }
                );
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
    CategoriesController.$inject = ['$scope', '$rootScope', '$state', 'DataFactory', 'Notification', 'NotificationExtended'];

    angular.module('app').controller('CategoriesController', CategoriesController);
});