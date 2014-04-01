(function(){
    angular.module('angularytics').factory('AngularyticsGoogleHandler', function($log) {
        var service = {};

        service.trackPageView = function(url) {
            _gaq.push(['_set', 'page', url]);
            _gaq.push(['_trackPageview', url]);
        }

        service.trackEvent = function(category, action, opt_label, opt_value, opt_noninteraction) {
            _gaq.push(['_trackEvent', category, action, opt_label, opt_value, opt_noninteraction]);
        }

        return service;
    }).factory('AngularyticsGoogleUniversalHandler', function () {
        var service = {};

        service.trackPageView = function (url) {
            ga('set', 'page', url);
            ga('send', 'pageview', url);
        };

        service.trackEvent = function (category, action, opt_label, opt_value, opt_noninteraction) {
            ga('send', 'event', category, action, opt_label, opt_value, {'nonInteraction': opt_noninteraction});
        };

        return service;
    }).factory('AngularyticsGoogleTagManagerHandler', function () {
        var service = {};
        var dataLayer = window.dataLayer = window.dataLayer || [];

        service.trackPageView = function (url) {
            dataLayer.push({
                'event': 'virtualPageview',
                'vpPath': url
            });
        };
        service.trackEvent = function (category, action, opt_label, opt_value, opt_noninteraction) {
            dataLayer.push({
                'eventCategory': category,
                'eventAction': action,
                'eventLabel': opt_label,
                'eventValue': opt_value,
                'event': 'analyticsEvent'
            });
        };
        return service;
    });
})();
