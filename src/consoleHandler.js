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

          //addons for ecommerce order tracking
        service.trackEcommerceTrans = function (transactionID, affiliation, total, tax, shipping, city, state, country) {
            $log.log('Transaction tracked', transactionID, affiliation, total, tax, shipping, city, state, country);
        };
        //addons for ecommerce item tracking
        service.trackEcommerceItem = function (transactionID, sku, name, category, price, quantity) {
            $log.log('Items tracked',transactionID, sku, name, category, price, quantity);
        };
        //addons for ecommerce
        service.pushTransaction = function () {
            $log.log('Transaction pushed', 'Success!!');
        };

        return service;
    });
})();
