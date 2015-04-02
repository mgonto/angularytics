(function(){
    angular.module('angularytics').factory('AngularyticsGoogleHandler', function() {
        var service = {};

        service.trackPageView = function(url) {
            _gaq.push(['_set', 'page', url]);
            _gaq.push(['_trackPageview', url]);
        };

        service.trackEvent = function(category, action, opt_label, opt_value, opt_noninteraction) {
            _gaq.push(['_trackEvent', category, action, opt_label, opt_value, opt_noninteraction]);
        };

        service.trackTiming = function(category, variable, value, opt_label) {
            _gaq.push(['_trackTiming', category, variable, value, opt_label]);
        };

        return service;
    }).factory('AngularyticsGoogleUniversalHandler', function ($log) {
        var service = {};

        service.trackPageView = function (url) {
        	if (typeof ga === 'undefined') {
        		$log.log('Google Analytics not loaded: missed pageView ' + url);
        	}
            ga('set', 'page', url);
            ga('send', 'pageview', url);
        };

        service.trackEvent = function (category, action, opt_label, opt_value, opt_noninteraction) {
        	if (typeof ga === 'undefined') {
        		$log.log('Google Analytics not loaded: missed action ' + action);
        	}
            ga('send', 'event', category, action, opt_label, opt_value, {'nonInteraction': opt_noninteraction});
        };

        service.trackTiming = function (category, variable, value, opt_label) {
        	if (typeof ga === 'undefined') {
        		$log.log('Google Analytics not loaded: missed timing ' + variable);
        	}
            ga('send', 'timing', category, variable, value, opt_label);
        };

        return service;
    });
})();
