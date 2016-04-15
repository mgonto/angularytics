/**
 * The solution to tracking page views and events in a SPA with AngularJS
 * @version v0.4.0 - 2016-04-15
 * @link https://github.com/mgonto/angularytics
 * @author Martin Gontovnikas <martin@gonto.com.ar>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function () {
  angular.module('angularytics', []).provider('Angularytics', function () {
    var eventHandlersNames = ['Google'];
    this.setEventHandlers = function (handlers) {
      if (angular.isString(handlers)) {
        handlers = [handlers];
      }
      eventHandlersNames = [];
      angular.forEach(handlers, function (handler) {
        eventHandlersNames.push(capitalizeHandler(handler));
      });
    };
    var capitalizeHandler = function (handler) {
      return handler.charAt(0).toUpperCase() + handler.substring(1);
    };
    var pageChangeEvent = '$locationChangeSuccess';
    this.setPageChangeEvent = function (newPageChangeEvent) {
      pageChangeEvent = newPageChangeEvent;
    };
    var pageViewTrackingEnabled = true;
    this.disablePageViewTracking = function () {
      pageViewTrackingEnabled = false;
    };
    this.$get = [
      '$injector',
      '$rootScope',
      '$location',
      function ($injector, $rootScope, $location) {
        // Helper methods
        var eventHandlers = [];
        angular.forEach(eventHandlersNames, function (handler) {
          eventHandlers.push($injector.get('Angularytics' + handler + 'Handler'));
        });
        var forEachHandlerDo = function (action) {
          angular.forEach(eventHandlers, function (handler) {
            action(handler);
          });
        };
        var service = {};
        // Just dummy function so that it's instantiated on app creation
        service.init = function () {
        };
        service.trackEvent = function (category, action, opt_label, opt_value, opt_noninteraction) {
          forEachHandlerDo(function (handler) {
            if (category && action) {
              handler.trackEvent(category, action, opt_label, opt_value, opt_noninteraction);
            }
          });
        };
        service.trackPageView = function (url) {
          forEachHandlerDo(function (handler) {
            if (url) {
              handler.trackPageView(url);
            }
          });
        };
        service.trackTiming = function (category, variable, value, opt_label) {
          forEachHandlerDo(function (handler) {
            if (category && variable && value) {
              handler.trackTiming(category, variable, value, opt_label);
            }
          });
        };
        // Event listening
        if (pageViewTrackingEnabled) {
          $rootScope.$on(pageChangeEvent, function () {
            service.trackPageView($location.url());
          });
        }
        //addons for ecommerce order tracking
        service.trackEcommerceTrans = function (transactionID, affiliation, total, tax, shipping, city, state, country, currency) {
          forEachHandlerDo(function (handler) {
            if (transactionID) {
              handler.trackEcommerceTrans(transactionID, affiliation, total, tax, shipping, city, state, country, currency);
            }
          });
        };
        //addons for ecommerce item tracking
        service.trackEcommerceItem = function (transactionID, sku, name, category, price, quantity, currency) {
          forEachHandlerDo(function (handler) {
            if (transactionID) {
              handler.trackEcommerceItem(transactionID, sku, name, category, price, quantity, currency);
            }
          });
        };
        //addons for ecommerce item tracking
        service.pushTransaction = function () {
          forEachHandlerDo(function (handler) {
            handler.pushTransaction();
          });
        };
        return service;
      }
    ];
  });
}());
(function () {
  angular.module('angularytics').factory('AngularyticsConsoleHandler', [
    '$log',
    function ($log) {
      var service = {};
      service.trackPageView = function (url) {
        $log.log('URL visited', url);
      };
      service.trackEvent = function (category, action, opt_label, opt_value, opt_noninteraction) {
        $log.log('Event tracked', category, action, opt_label, opt_value, opt_noninteraction);
      };
      service.trackTiming = function (category, variable, value, opt_label) {
        $log.log('Timing tracked', category, variable, value, opt_label);
      };
      //addons for ecommerce order tracking
      service.trackEcommerceTrans = function (transactionID, affiliation, total, tax, shipping, city, state, country, currency) {
        $log.log('Transaction tracked', transactionID, affiliation, total, tax, shipping, city, state, country, currency);
      };
      //addons for ecommerce item tracking
      service.trackEcommerceItem = function (transactionID, sku, name, category, price, quantity, currency) {
        $log.log('Items tracked', transactionID, sku, name, category, price, quantity, currency);
      };
      //addons for ecommerce
      service.pushTransaction = function () {
        $log.log('Transaction pushed', 'Success!!');
      };
      return service;
    }
  ]);
}());
(function () {
  angular.module('angularytics').factory('AngularyticsGoogleHandler', function () {
    var service = {};
    service.trackPageView = function (url) {
      _gaq.push([
        '_set',
        'page',
        url
      ]);
      _gaq.push([
        '_trackPageview',
        url
      ]);
    };
    service.trackEvent = function (category, action, opt_label, opt_value, opt_noninteraction) {
      _gaq.push([
        '_trackEvent',
        category,
        action,
        opt_label,
        opt_value,
        opt_noninteraction
      ]);
    };
    service.trackTiming = function (category, variable, value, opt_label) {
      _gaq.push([
        '_trackTiming',
        category,
        variable,
        value,
        opt_label
      ]);
    };
    //addons for ecommerce tracking
    service.trackEcommerceTrans = function (transactionID, affiliation, total, tax, shipping, city, state, country, currency) {
      _gaq.push([
        '_addTrans',
        transactionID,
        affiliation,
        total,
        tax,
        shipping,
        city,
        state,
        country,
        currency
      ]);
    };
    service.trackEcommerceItem = function (transactionID, sku, name, category, price, quantity, currency) {
      _gaq.push([
        '_addItem',
        transactionID,
        sku,
        name,
        category,
        price,
        quantity,
        currency
      ]);
    };
    service.pushTransaction = function () {
      _gaq.push(['_trackTrans']);
    };
    return service;
  }).factory('AngularyticsGoogleUniversalHandler', function () {
    var service = {};
    service.trackPageView = function (url) {
      var trackers = ga.getAll ? ga.getAll() : [];
      angular.forEach(trackers, function (tracker) {
        ga(tracker.get('name') + '.set', 'page', url);
        ga(tracker.get('name') + '.send', 'pageview', url);
      });
    };
    service.trackEvent = function (category, action, opt_label, opt_value, opt_noninteraction) {
      var trackers = ga.getAll ? ga.getAll() : [];
      angular.forEach(trackers, function (tracker) {
        ga(tracker.get('name') + '.send', 'event', category, action, opt_label, opt_value, { 'nonInteraction': opt_noninteraction });
      });
    };
    service.trackTiming = function (category, variable, value, opt_label) {
      var trackers = ga.getAll ? ga.getAll() : [];
      angular.forEach(trackers, function (tracker) {
        ga(tracker.get('name') + '.send', 'timing', category, variable, value, opt_label);
      });
    };
    service.trackEcommerceTrans = function (transactionID, affiliation, total, tax, shipping, city, state, country, currency) {
      var trackers = ga.getAll ? ga.getAll() : [];
      angular.forEach(trackers, function (tracker) {
        ga(tracker.get('name') + '.require', 'ecommerce');
        ga(tracker.get('name') + '.ecommerce:addTransaction', {
          'id': transactionID,
          'affiliation': affiliation,
          'revenue': total,
          'shipping': shipping,
          'tax': tax,
          'currency': currency
        });
      });
    };
    service.trackEcommerceItem = function (transactionID, sku, name, category, price, quantity, currency) {
      var trackers = ga.getAll ? ga.getAll() : [];
      angular.forEach(trackers, function (tracker) {
        ga(tracker.get('name') + '.require', 'ecommerce');
        ga(tracker.get('name') + '.ecommerce:addItem', {
          'id': transactionID,
          'name': name,
          'sku': sku,
          'category': category,
          'price': price,
          'quantity': quantity,
          'currency': currency
        });
      });
    };
    service.pushTransaction = function () {
      var trackers = ga.getAll ? ga.getAll() : [];
      angular.forEach(trackers, function (tracker) {
        ga(tracker.get('name') + '.ecommerce:send');
      });
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
}());
(function () {
  angular.module('angularytics').filter('trackEvent', [
    'Angularytics',
    function (Angularytics) {
      return function (entry, category, action, opt_label, opt_value, opt_noninteraction) {
        Angularytics.trackEvent(category, action, opt_label, opt_value, opt_noninteraction);
        return entry;
      };
    }
  ]);
}());