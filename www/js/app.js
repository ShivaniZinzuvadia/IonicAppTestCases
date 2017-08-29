// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
//var destimation_path = cordova.file.dataDirectory;
var destimation_path = "";
var folder_name = "";

var test = angular.module('starter', ['ionic', 'ngCordova']);

test.run(function ($ionicPlatform) {
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
        destimation_path = cordova.file.externalRootDirectory + 'Android/data/io.ionic.starter/files/';
        folder_name = "filterValue";

    });
})

test.controller('HomeCtrl', function ($scope, $cordovaFile) {
    $scope.copyFolder = function () {
        function listDir(path) {
            window.resolveLocalFileSystemURL(path,
                function (fileSystem) {
                    var reader = fileSystem.createReader();
                    reader.readEntries(
                        function (entries) {
                            var destination = destimation_path + folder_name + "/";
                            var source = path + "/";
                            for (i = 0; i < entries.length; i++) {
                                alert("source" + source + entries[i].name);
                                alert("destination" + destination + entries[i].name);
                                $cordovaFile.moveFile(source, entries[i].name, destination).then(function (success) {
                                    alert("file moved" + JSON.stringify(success));
                                }, function (error) {
                                    alert("Error in move " + JSON.stringify(error));
                                })
                            }
                        },
                        function (err) {
                            alert(JSON.stringify(err));
                        }
                    );
                }, function (err) {
                    alert(JSON.stringify(err));
                }
            );
        }


        var permissions = cordova.plugins.permissions;
        permissions.hasPermission(permissions.WRITE_EXTERNAL_STORAGE, checkPermissionCallback, null);

        function checkPermissionCallback(status) {
            alert(JSON.stringify(status));
            if (!status.hasPermission) {
                var errorCallback = function () {
                    console.warn('Storage permission is not turned on');
                }
                permissions.requestPermission(
                    permissions.READ_EXTERNAL_STORAGE,
                    function (status) {
                        if (!status.hasPermission) {
                            errorCallback();
                        } else {
                            $cordovaFile.checkDir(destimation_path, folder_name)
                                .then(function (success) {
                                    alert("Success" + JSON.stringify(success));
                                    listDir(cordova.file.applicationDirectory + "www/img/" + folder_name);
                                }, function (error) {
                                    $cordovaFile.createDir(destimation_path, folder_name, false)
                                        .then(function (success) {
                                            alert("Directory created");
                                            listDir(cordova.file.applicationDirectory + "www/img/" + folder_name);
                                        }, function (error) {
                                            alert("Error in directory creation");
                                        });
                                });
                        }
                    },
                    errorCallback);
            }
            else {
                $cordovaFile.checkDir(destimation_path, folder_name)
                    .then(function (success) {
                        alert("Success" + JSON.stringify(success));
                        listDir(cordova.file.applicationDirectory + "www/img/" + folder_name);
                    }, function (error) {
                        $cordovaFile.createDir(destimation_path, folder_name, false)
                            .then(function (success) {
                                alert("Directory created");
                                listDir(cordova.file.applicationDirectory + "www/img/" + folder_name);
                            }, function (error) {
                                alert("Error in directory creation");
                            });
                    });
            }
        }
    }
});
