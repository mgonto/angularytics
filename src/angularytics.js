(function(){
    angular.module('angularytics', []).provider("Angularytics", function () {
      var eventHandlersNames = ['GoogleUniversal'];
      
      var capitalizeHandler = function(handler) {
          return handler.charAt(0).toUpperCase() + handler.substring(1);
      }
      
      return {
        setEventHandlers: function(handlers) {
              if (angular.isString(handlers)) {
                  handlers = [handlers];
              }
              eventHandlersNames = [];
              angular.forEach(handlers, function(handler) {
                  eventHandlersNames.push(capitalizeHandler(handler))
              });
          },  
        $get: function () {
          return: {
            eventHandlers: eventHandlerNames;
          };
        }
      };
    });
 
    angular.module('angularytics', []).
        service('Angularytics', [ 'Angularytics', '$rootScope', '$location', function AngularyticsService(Angularytics, $rootScope, $location) {

            var pageChangeEvent = '$locationChangeSuccess';
            this.setPageChangeEvent = function(newPageChangeEvent) {
              pageChangeEvent = newPageChangeEvent;
            }

            var eventHandlers = Angularytics.eventHandlers;

            angular.forEach(eventHandlersNames, function(handler) {
                eventHandlers.push($injector.get('Angularytics' + handler + 'Handler'));
            });

            var forEachHandlerDo = function(action) {
                angular.forEach(eventHandlers, function(handler) {
                    action(handler);
                });
            }
 
            return {
                // Just dummy function so that it's instantiated on app creation
                init: function() {
                    console.log('angularytics service init done');
                },
                trackEvent: function(category, action, opt_label, opt_value, opt_noninteraction) {
                    forEachHandlerDo(function(handler) {
                        if (category && action) {
                            handler.trackEvent(category, action, opt_label, opt_value, opt_noninteraction);
                        }
                    });
                },
                trackPageView: function(url) {
                    forEachHandlerDo(function(handler) {
                        if (url) {
                            handler.trackPageView(url);
                        }
                    });
                },
                // Event listening
                $rootScope.$on(pageChangeEvent, function() {
                    trackPageView($location.path());
                });
            };
    });
})();
