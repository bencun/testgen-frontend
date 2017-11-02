define([], function() {
    var appController = function($scope){
        $scope.testObject = {};
        $scope.testObject.text = "OK";
        console.log("OK");
    };

    return ['$scope', appController];
});