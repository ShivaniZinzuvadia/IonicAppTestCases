// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var example = angular.module('starter', ['ionic', 'ngCordova']);

example.run(function ($ionicPlatform, $cordovaSQLite) {
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

        if (window.plugins.sqlDB) {
            window.plugins.sqlDB.copy('plant_identification.sqlite', 0, copysuccess, copyerror);
            function copysuccess() {
                alert("Copy success");
                db = $cordovaSQLite.openDB({name: 'plant_identification.sqlite', location: 'default'});
                alert("Open DB done");
            }

            function copyerror(error) {
                alert("Copy error" + JSON.stringify(error));
                db = $cordovaSQLite.openDB({name: 'plant_identification.sqlite', location: 'default'});
                alert("Open DB done in error");
            }
        }
        else {
            alert("No SqlDB");
        }
    });
})
example.controller('HomeCtrl', function ($scope, $cordovaSQLite) {
    $scope.downloadImage = function () {
        /*db.executeSql('SELECT count(*) AS mycount FROM plant_parts', [], function (rs) {
            alert(rs.rows.item(0).mycount);
            //console.log('Record count (expected to be 2): ' + rs.rows.item(0).mycount);
        }, function (error) {
            alert(error.message);
            //console.log('SELECT SQL statement ERROR: ' + error.message);
        });*/

        var query = "SELECT * FROM plant_parts";
        $cordovaSQLite.execute(db, query, []).then(function (result) {
            if (result.rows.length > 0) {
                for (var i = 0; i < result.rows.length; i++) {
                    alert(result.rows.item(i).value);
                }
            }
            else {
                alert("No result found");
            }
        }, function (error) {
            alert("No result found" + JSON.stringify(error));
        });

    }
});
