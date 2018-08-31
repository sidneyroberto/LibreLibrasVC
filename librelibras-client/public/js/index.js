var app = angular.module('librelibrasvc', ['ngRoute', 'ng-webcam']);

app.config(function ($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: 'partials/webcam.html',
        controller: 'WebCamController'
    });

    $routeProvider.otherwise('/');
});