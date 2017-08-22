// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

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
        });
    })

    .controller('HomeCtrl', function ($scope, $cordovaFile, $cordovaFileTransfer) {
        $scope.downloadImage = function () {
            //url : URL of image to download
            //Filename : Name of the file
            //targetPath : Save location
            var url = encodeURI("http://ec2-35-154-106-170.ap-south-1.compute.amazonaws.com/plant-identification/public/img/filterValue/fv_icon_352.jpg"),
                filename = url.split("/").pop(),
                targetPath = encodeURI(cordova.file.externalRootDirectory + 'Android/data/io.ionic.starter/files/' + filename),
                options = {},
                trustHosts = true;

            //Assign permission to access mobile external storage
            var permissions = cordova.plugins.permissions;
            permissions.hasPermission(permissions.READ_EXTERNAL_STORAGE, checkPermissionCallback, null);

            function checkPermissionCallback(status) {
                if (!status.hasPermission) {
                    var errorCallback = function () {
                        window.plugins.toast.showShortTop('Storage permission is not turned on', function (a) {
                        }, function (b) {
                            alert('toast error: ' + JSON.stringify(b));
                        });
                    }
                    //Request permission for external storage
                    permissions.requestPermission(
                        permissions.READ_EXTERNAL_STORAGE,
                        function (status) {
                            if (!status.hasPermission) {
                                errorCallback();
                            } else {
                                //continue with downloading/ Accessing operation
                                $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                                    .then(
                                        function (result) {
                                            refreshMedia.refresh(targetPath);
                                            window.plugins.toast.showShortTop('Download success', function (a) {
                                                //Set downloaded image in src
                                                document["img1"].src = targetPath;
                                            }, function (b) {
                                                alert('toast error: ' + JSON.stringify(b));
                                            });

                                        },
                                        function (err) {
                                            alert('Error: ' + JSON.stringify(err));
                                        },
                                        function (progress) {
                                            // progressing download...
                                        }
                                    );
                            }
                        },
                        errorCallback);
                }
            }
        };
    });
