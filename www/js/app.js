// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
    .controller('HomeCtrl', function ($scope, $cordovaFile, $cordovaFileTransfer) {
        $scope.downloadImage = function () {
            var url = encodeURI("http://ec2-35-154-106-170.ap-south-1.compute.amazonaws.com/plant-identification/public/img/filterValue/fv_icon_352.jpg"),
                filename = "fv_icon_352.jpg",
                targetPath = encodeURI(cordova.file.externalRootDirectory + 'Android/data/io.ionic.starter/files/' +filename),
                options = {},
                trustHosts = true;
            var permissions = cordova.plugins.permissions;
            permissions.hasPermission(permissions.READ_EXTERNAL_STORAGE, checkPermissionCallback, null);

            function checkPermissionCallback(status) {
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

                                var fileDir = cordova.file.externalRootDirectory + 'Android/data/io.ionic.starter/files/';
                                var fileName = "hello.txt";
                                var fileData = "Hello written in text file";

                                //Create New text file
                                $cordovaFile.writeFile(fileDir, fileName, fileData, true).then(function (success) {

                                    //Read content of newly create file
                                    $cordovaFile.readAsText(fileDir, fileName)
                                        .then(function (success) {
                                            window.plugins.toast.showShortTop("Newly created file content:  "+success, function (a) {
                                            }, function (b) {
                                                alert('toast error: ' + JSON.stringify(b));
                                            });
                                        }, function (error) {
                                            // error
                                            window.plugins.toast.showShortTop("Error in reading file " + JSON.stringify(error), function (a) {
                                            }, function (b) {
                                                alert('toast error: ' + JSON.stringify(b));
                                            });
                                        });

                                }, function (error) {
                                    window.plugins.toast.showShortTop("Error in writing file " + JSON.stringify(error), function (a) {
                                    }, function (b) {
                                        alert('toast error: ' + JSON.stringify(b));
                                    });
                                });
                            }
                        },
                        errorCallback);
                }
            }

        };
    });

