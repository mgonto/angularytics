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
        service.trackEcommerceTrans = function (transactionID, affiliation, total, tax, shipping, city, state, country, currency) {
            _gaq.push(['_addTrans', transactionID, affiliation, total, tax, shipping, city, state, country, currency]);
        };
        service.trackEcommerceItem = function (transactionID, sku, name, category, price, quantity, currency) {
            _gaq.push(['_addItem', transactionID, sku, name, category, price, quantity, currency]);
        };
        service.pushTransaction = function () {
            _gaq.push(['_trackTrans']);
        };

        return service;
    }).factory('AngularyticsGoogleUniversalHandler', function () {
        var service = {};

        service.trackPageView = function (url) {
            var trackers = ga.getAll() || [];

            angular.forEach(trackers, function(tracker) {
                ga(tracker.get('name') + '.set', 'page', url);
                ga(tracker.get('name') + '.send', 'pageview', url);
            });
        };

        service.trackEvent = function (category, action, opt_label, opt_value, opt_noninteraction) {
            var trackers = ga.getAll() || [];

            angular.forEach(trackers, function(tracker) {
                ga(tracker.get('name') + '.send', 'event', category, action, opt_label, opt_value, {'nonInteraction': opt_noninteraction});
            });
        };

        service.trackTiming = function (category, variable, value, opt_label) {
            var trackers = ga.getAll() || [];

            angular.forEach(trackers, function(tracker) {
                ga(tracker.get('name') + '.send', 'timing', category, variable, value, opt_label);
            });
        };
        service.trackEcommerceTrans = function (transactionID, affiliation, total, tax, shipping, city, state, country, currency) {
            var trackers = ga.getAll() || [];

            angular.forEach(trackers, function(tracker) {
                ga(tracker.get('name') + '.require', 'ecommerce');
                ga(tracker.get('name') + '.ecommerce:addTransaction', {
                    'id': transactionID,            // Transaction ID. Required
                    'affiliation': affiliation,    // Affiliation or store name
                    'revenue': total,              // Grand Total
                    'shipping': shipping,          // Shipping
                    'tax': tax,                     // Tax
                    'currency': currency
                });
            });
        };
        service.trackEcommerceItem = function(transactionID, sku, name, category, price, quantity, currency) {
            var trackers = ga.getAll() || [];

            angular.forEach(trackers, function(tracker) {
                ga(tracker.get('name') + '.require', 'ecommerce');
                ga(tracker.get('name') + '.ecommerce:addItem', {
                    'id': transactionID,        // Transaction ID. Required
                    'name': name,               // name
                    'sku': sku,                 // SKU
                    'category': category,       // category
                    'price': price,             // price
                    'quantity': quantity,       //quantity
                    'currency': currency
                });
            });
        };
        service.pushTransaction = function () {
            var trackers = ga.getAll() || [];

            angular.forEach(trackers, function(tracker) {
                ga(tracker.get('name') + '.ecommerce:send');
            });
        }

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
