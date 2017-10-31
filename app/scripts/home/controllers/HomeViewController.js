app.controller('HomeViewController',
['$scope', function($scope) {
    $scope.page = {
        heading: 'Welcome'
    };

    $scope.items = ["A", "List", "Of", "Items"];
}]);
