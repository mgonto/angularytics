#Angularytics

Angularytics is the solution to tracking PageViews and Events on your app.

## Main Features
This are Angularytics main features:

* **It automatically tracks a new page view** with all of the connected providers (For now Google Analytics and console.log) **once you change the URL in your SPA**
* **It gives you the ability to track events** either by calling the **Angularytics service or by using the trackEvent filter**.

#How do I add this to my project?

You can download this by:

* Using bower and running `bower install angularytics`
* Using npm and running `npm install angularytics`
* Downloading it manually by clicking [here to download development unminified version](https://raw.github.com/mgonto/angularytics/master/dist/angularytics.js) or [here to download minified production version](https://raw.github.com/mgonto/angularytics/master/dist/angularytics.min.js)

#Dependencies

Angularytics depends on Angular and (Underscore or Lodash).

#Starter Guide

## TL;DR Basic configuration on your app.
This is the quick configuration to bootstrap all. Read the rest of the documentation for further configuration and understanding. After doing this, Angularytics will automatically track all of the page views in the app for you. 

````javascript
angular.module('sample-app', ['angularytics'])
  .config(function(AngularyticsProvider) {
    AngularyticsProvider.setEventHandlers(['Console', 'Google']);
  }).run(function(Angularytics) {
    Angularytics.init();
  });
````

## Tracking Page Views
This is easy :). You don't need to do anything. By configuring Angularytics with your app like in the step before, all pages will start being tracked.

## Tracking events
The trackEvent function in service and filter has the same parameters in the same order as Google Analytics. [Click here to check the Google Analytics documentation](https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide).
There're 2 ways of tracking events. Either using Angularytics service, or using the filter.

### Using the filter
This is the most common way of tracking events. Suppose that you have a button which calls some function on your scope and you want to track when that button is clicked. This is the example:

````html
<input type="submit" ng-click="doSomething() | trackEvent:'Home Category':'Button clicked'" />
````

### Using the service
You just need to inject the service and call the trackEvent function.

Let's see an example:

````javascript
angular.controller('MainCtrl', function(Angularytics, $scope) {
    $scope.click = function() {
        Angularytics.trackEvent("Home Category", "Button clicked");
    }
});
````

# Releases Notes

[Click here to see Releases Notes](https://github.com/mgonto/angularytics/blob/master/CHANGELOG.md)

# License

The MIT License

Copyright (c) 2013 Martin Gontovnikas http://www.gon.to/

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.




