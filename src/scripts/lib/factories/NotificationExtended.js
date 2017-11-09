define(['angular', 'angular-ui-notification'], function(angular, angularUiNotification) {
    
    var createFactory = function($q, Notification, $rootScope){
        var f = {
            confirmationDialog: function(question){
                //create a deferred action
                var deferred = $q.defer();
                //create a new temporary scope and don't forget to destroy it
                var tempScope = $rootScope.$new(true, $rootScope);
                tempScope.temporaryActions = {
                    resolve: function(){
                        deferred.resolve();
                    },
                    reject: function(){
                        deferred.reject();
                    }
                };
                //function to destroy the scope when notification is closed
                var destroyScope = function(e){
                    tempScope.$destroy();
                };
                //create a custom notification
                Notification.primary({
                    message: question,
                    templateUrl: "/scripts/lib/factories/templates/NotificationExtended.html",
                    scope: tempScope,
                    onClose: destroyScope,
                    closeOnClick: true
                });
                //return a promise
                return deferred.promise;
            }, //confirmationDialog()

        };
        return f;
    };
    createFactory.$inject = ['$q', 'Notification', '$rootScope'];
    
    return createFactory;
});