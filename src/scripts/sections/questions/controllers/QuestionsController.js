define([
    'angular'
], function(
    angular) {

    var QuestionsController = function($scope, $rootScope, $state, $stateParams, DataFactory){
        console.log("Questions controller is alive.");

        $rootScope.UI.pagerVisible = true;
        $rootScope.UI.searchVisible = true;
        $scope.categoryId = $stateParams.categoryId;
        
        DataFactory.setTarget(DataFactory.targets.questions);

        $scope.pager = function(dir){
            var currentData = DataFactory.load(dir);
            $scope.items = currentData.items;
            $rootScope.UI.pager.currentPage = currentData.currentPage;
            $rootScope.UI.pager.totalPages = currentData.totalPages;
        };

        $scope.pager();

        $scope.editQuestion = function(question){
            $state.go('app.admin.question', {
                categoryId: $scope.categoryId,
                questionId: question.id
            });
        };

        $scope.deleteQuestion = function(){
            //TODO
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