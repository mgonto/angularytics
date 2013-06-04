(function(){
    angular.module('angularytics').filter('trackEvent', function(Angularytics) {
        return function(entry, category, action, opt_label, opt_value, opt_noninteraction) {
            Angularytics.trackEvent(category, action, opt_label, opt_value, opt_noninteraction);
            return entry;
        }
    });
})();
