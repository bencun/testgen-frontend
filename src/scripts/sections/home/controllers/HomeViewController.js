define([], function() {

    console.log('Creating home module controller.');

    var HomeViewController = function($scope){
        console.log('Executing home module controller.');

        $scope.page = {
            heading: 'Welcome'
        };
        $scope.items = ["A", "List", "Of", "Items"];

        console.log($scope);
    };

    return ['$scope', HomeViewController];
});