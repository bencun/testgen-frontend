define([
    'angular',
    './TimeFilter'
], function(angular, TimeFilter) {
    var filterModule = angular.module('app.filters', []);

    filterModule.filter('timefilter', TimeFilter);

    return filterModule;
});