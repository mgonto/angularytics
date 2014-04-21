(function(){
    angular.module('angularytics', []).provider('Angularytics', function() {

        var eventHandlersNames = ['Google'];
        this.setEventHandlers = function(handlers) {
            if (angular.isString(handlers)) {
                handlers = [handlers];
            }
            eventHandlersNames = [];
            angular.forEach(handlers, function(handler) {
                eventHandlersNames.push(capitalizeHandler(handler))
            });
        }

        var capitalizeHandler = function(handler) {
            return handler.charAt(0).toUpperCase() + handler.substring(1);
        }
        
        var pageChangeEvent = '$locationChangeSuccess';
        this.setPageChangeEvent = function(newPageChangeEvent) {
          pageChangeEvent = newPageChangeEvent;
        }

        this.$get = function($injector, $rootScope, $location) {

            // Helper methods
            var eventHandlers = [];

            angular.forEach(eventHandlersNames, function(handler) {
                eventHandlers.push($injector.get('Angularytics' + handler + 'Handler'));
            });

            var forEachHandlerDo = function(action) {
                angular.forEach(eventHandlers, function(handler) {
                    action(handler);
                });
            }

            var service = {};
            // Just dummy function so that it's instantiated on app creation
            service.init = function() {

            }

            service.trackEvent = function(category, action, opt_label, opt_value, opt_noninteraction) {
                forEachHandlerDo(function(handler) {
                    if (category && action) {
                        handler.trackEvent(category, action, opt_label, opt_value, opt_noninteraction);
                    }
                });
            }
            
            service.trackPageView = function(url) {
                forEachHandlerDo(function(handler) {
                    if (url) {
                        handler.trackPageView(url);
                    }
                });
            }
            
            // Event listening
            $rootScope.$on(pageChangeEvent, function() {
                service.trackPageView($location.url())
            });

            return service;

            

        };

    });
})();
