define([
    'angular'
], function(
    angular) {

    var QuestionsController = function($scope, $rootScope, $state, $stateParams, DataFactory){
        console.log("Questions controller is alive.");

        $rootScope.UI.pagerVisible = true;
        $rootScope.UI.searchVisible = true;
        var categoryId = parseInt($stateParams.categoryId, 10);
        
        DataFactory.setTarget(DataFactory.targets.questions);

        $scope.pager = function(dir){
            var currentData = DataFactory.load(dir);
            $rootScope.UI.pager.currentPage = currentData.currentPage;
            $rootScope.UI.pager.totalPages = currentData.totalPages;
            $scope.data = {
                catData: DataFactory.categories.read(categoryId),
                items: currentData.items
            };
            
        };

        $scope.pager();

        $scope.actions = {
            editQuestion: function(question){
                $state.go('app.admin.question', {
                    categoryId: categoryId,
                    questionId: question.id
                });
            },
            deleteQuestion: function(q){
                DataFactory.questions.delete(q.id);
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
    QuestionsController.$inject = ['$scope', '$rootScope', '$state' ,'$stateParams', 'DataFactory'];

    angular.module('app').controller('QuestionsController', QuestionsController);
});