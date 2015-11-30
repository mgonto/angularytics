(function(){
    angular.module('angularytics').factory('AngularyticsConsoleHandler', function($log) {
        var service = {};

        service.trackPageView = function(url) {
            $log.log("URL visited", url);
        };

        service.trackEvent = function(category, action, opt_label, opt_value, opt_noninteraction) {
            $log.log("Event tracked", category, action, opt_label, opt_value, opt_noninteraction);
        };

        service.trackTiming = function(category, variable, value, opt_label) {
            $log.log("Timing tracked", category, variable, value, opt_label);
        };

        return service;
    });
})();
