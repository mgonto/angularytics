/**
 * The solution to tracking page views and events in a SPA with AngularJS
 * @version v0.1.0 - 2013-06-03
 * @link https://github.com/mgonto/angularytics
 * @author Martin Gontovnikas <martin@gonto.com.ar>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function(){
    angular.module('angularytics', []).provider('Angularytics', function() {

        var eventHandlersNames = ['Google'];
        this.setEventHandlers = function(handlers) {
            if (_.isString(handlers)) {
                handlers = [handlers];
            }
            eventHandlersNames = _.map(handlers, capitalizeHandler);
        }

        var capitalizeHandler = function(handler) {
            return handler.charAt(0).toUpperCase() + handler.substring(1).toLowerCase();
        }

        this.$get = function($injector, $rootScope, $location) {

            // Helper methods
            var eventHandlers = _.map(eventHandlersNames, function(handler) {
                return $injector.get('Angularytics' + handler + 'Handler');
            });

            var forEachHandlerDo = function(action) {
                _.each(eventHandlers, function(handler) {
                    action(handler);
                });
            }

            // Event listeing
            $rootScope.$on('$locationChangeSuccess', function() {
                forEachHandlerDo(function(handler) {
                    var url = $location.path();
                    if (url) {
                        handler.trackPageView(url);    
                    }
                })
            });

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

            return service;

            

        };

    });
})();
