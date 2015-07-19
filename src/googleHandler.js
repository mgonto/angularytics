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

        //addons for ecommerce tracking
        service.trackEcommerceTrans = function (transactionID, affiliation, total, tax, shipping, city, state, country) {
            _gaq.push(['_addTrans', transactionID, affiliation, total, tax, shipping, city, state, country]);
        };
        service.trackEcommerceItem = function (transactionID, sku, name, category, price, quantity) {
            _gaq.push(['_addItem', transactionID, sku, name, category, price, quantity]);
        };
        service.pushTransaction = function () {
            _gaq.push(['_trackTrans']);
        };

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

        service.trackTiming = function (category, variable, value, opt_label) {
            ga('send', 'timing', category, variable, value, opt_label);
        };
        service.trackEcommerceTrans = function (transactionID, affiliation, total, tax, shipping, city, state, country) {
            ga('require', 'ecommerce');
            ga('ecommerce:addTransaction', {
                'id': transactionID,            // Transaction ID. Required
                'affiliation': affiliation,    // Affiliation or store name
                'revenue': total,              // Grand Total
                'shipping': shipping,          // Shipping
                'tax': tax                     // Tax
            });
        };
        service.trackEcommerceItem = function(transactionID, sku, name, category, price, quantity) {
            ga('require', 'ecommerce');
            ga('ecommerce:addItem', {
                'id': transactionID,        // Transaction ID. Required
                'name': name,               // name
                'sku': sku,                 // SKU
                'category': category,       // category
                'price': price,             // price
                'quantity': quantity        //quantity
            });
        };
        service.pushTransaction = function () {
            ga('ecommerce:send');
        }

        return service;
    });
})();
