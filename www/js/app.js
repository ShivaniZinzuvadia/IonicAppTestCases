// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

            //Call coolMethod of custom plugin
            //Method defined in js file in plugin
            //Js method call coolMethod defined in java
            window.cordova.plugins.customPlugin.coolMethod("This is the Message that passed to java code through javascript", function (res) {
                window.plugins.toast.showShortTop(res, function (a) {
                    /*alert('toast success: ' + JSON.stringify(a));*/
                }, function (b) {
                    alert('toast error: ' + JSON.stringify(b));
                });
            }, function (err) {
                window.plugins.toast.showShortTop(err, function (a) {
                   /* alert('toast success: ' + JSON.stringify(a));*/
                }, function (b) {
                    alert('toast error: ' + JSON.stringify(b));
                });
            });
        });
    })
