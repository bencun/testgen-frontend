define([
    'angular',
    './filteredPicker'
], function(
    angular,
    filteredPicker) {
        var directivesModule = angular.module('app.directives', []);
        
        directivesModule.directive('filteredPicker', filteredPicker);
        
        return directivesModule;
});