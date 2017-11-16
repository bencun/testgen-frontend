define([
    'angular'
], function(
    angular) {

    var QuestionsController = function($scope, $rootScope, $state, $stateParams, DataFactory){
        console.log("Questions controller is alive.");
        
        var categoryId = parseInt($stateParams.categoryId, 10);
        DataFactory.setTarget(DataFactory.targets.questions, categoryId);
        
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

                    DataFactory.categories.read(categoryId).then(
                        function(data){
                            $scope.data.catData = data;
                        },
                        function(response){

                        }
                    );

                    $rootScope.UI.pagerVisible = true;
                    $rootScope.UI.searchVisible = true;
                    $rootScope.UI.navigationVisible = true;
                },
                function(response){
                    console.debug("Fetching questions from DataFactory failed miserably.");
                    $state.go("login");
                }
            );
            
        };

        $scope.pager();

        $scope.actions = {
            addQuestion: function(){
                $state.go('app.admin.question', {
                    categoryId: categoryId,
                    questionId: 0
                });
            },
            editQuestion: function(question){
                $state.go('app.admin.question', {
                    categoryId: categoryId,
                    questionId: question.id
                });
            },
            deleteQuestion: function(q){
                DataFactory.questions.delete(q.id).then(
                    function(response){
                        $scope.pager('refresh');
                        $scope.actions.closeSearch();
                    },
                    function(response){
                        
                    }
                );
            },
            closeSearch: function(){
                $state.go('app.admin.questions');
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
                    $state.go('app.admin.questions.search',
                    {searchQuery: $rootScope.UI.search.query},
                    {reload: 'app.admin.questions.search'});
                }
                else{
                    $scope.actions.closeSearch();
                }
            }
            else $scope.actions.closeSearch();
        });
    };
    QuestionsController.$inject = ['$scope', '$rootScope', '$state' ,'$stateParams', 'DataFactory'];

    angular.module('app').controller('QuestionsController', QuestionsController);
});