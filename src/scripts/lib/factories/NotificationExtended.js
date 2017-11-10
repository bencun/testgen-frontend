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
                        nt.$$state.value.kill();
                        deferred.resolve();
                    },
                    reject: function(){
                        nt.$$state.value.kill();
                        deferred.reject();
                    }
                };
                //function to destroy the scope when notification is closed
                var destroyScope = function(e){
                    //if the message has closed by itself that should reject a promise
                    if(deferred.promise.$$state.status === 0){
                        deferred.reject();
                    }
                    tempScope.$destroy();
                };
                //create a custom notification
                var nt = Notification.primary({
                    message: question,
                    templateUrl: "/scripts/lib/factories/templates/NotificationExtended.html",
                    scope: tempScope,
                    onClose: destroyScope,
                    closeOnClick: false
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