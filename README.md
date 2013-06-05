#Angularytics

Angularytics is the solution to tracking PageViews and Events on your Single Page App. 

All analytics frameworks are based on browser refreshes to track page views. I've created this service wrapper so that we can track page views in our WebApp without a page refresh and without too much configuration.

## Main Features
This are Angularytics main features:

* **It automatically tracks a new page view** with all of the connected providers (For now Google Analytics and console.log) **once you change the URL in your SPA**
* **It gives you the ability to track events** either by calling the **Angularytics service or by using the trackEvent filter**.

#How do I add this to my project?

You can download this by:

* Using bower and running `bower install angularytics`
* Using npm and running `npm install angularytics`
* Downloading it manually by clicking [here to download development unminified version](https://raw.github.com/mgonto/angularytics/master/dist/angularytics.js) or [here to download minified production version](https://raw.github.com/mgonto/angularytics/master/dist/angularytics.min.js)

#Prerequisites

Angularytics depends on AngularJS.

You need to add the needed Analytics code (Google Analytics) in your app. I though of adding this in the service, but if you just add it in the body, it'd load MUCH faster than if we loaded this in the init. If everybody wants to move this to the service's init, then please submit an issue.

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

## Event Handlers (Available providers)

There're now 3 event handlers: `Console` and `Google` and `GoogleUniversal`. The last one of this uses `ga` instead of `_gaq`

Console will log all page views and events.
Google will track using Google Analytics all page views and events.

### Adding your own event handler

You can add your own event handler in 3 wasy steps:

#### Create your service.

You need to create a service with the following name format: `Angularytics[EventHandlerName]Handler`. For example AngularyticsKissmetricsHandler.

This service must have the following methods and signatures:

* **trackPageView(url)**: Tracks a page view to the given URL
* **trackEvent(category, action, opt_label, opt_value, opt_noninteraction)**: Tracks a new event with the given parameters

#### Use this service by changing the AngularyticsProvider
Use this newly created service by setting the name in the AngularyticsProvider.
For example:

````javascript
// Considering the service is named AngularyticsKissmetricsHandler
AngularyticsProvider.setEventHandlers(['Console', 'Kissmetrics']);
````

#### Have fun using it
This is easy, right?

# Releases Notes

[Click here to see Releases Notes](https://github.com/mgonto/angularytics/blob/master/CHANGELOG.md)

# License

The MIT License

Copyright (c) 2013 Martin Gontovnikas http://www.gon.to/

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.




