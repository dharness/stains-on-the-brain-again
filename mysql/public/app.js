 var myapp = angular.module('myapp', ['ngRoute']);

 // configure our routes
 myapp.config(function($routeProvider) {

     $routeProvider

     // home page
     .when('/', {
         templateUrl: 'pages/login.html',
         controller: 'loginController'
     })

     // about page
     .when('/about', {
         templateUrl: 'pages/about.html',
         controller: 'aboutController'
     })

     // contact page
     .when('/gameplay', {
         templateUrl: 'pages/gameplay.html',
         controller: 'gameplayController'
     })

     // contact page
     .when('/login', {
         templateUrl: 'pages/login.html',
         controller: 'loginController'
     })

     // contact page
     .when('/mystains', {
         templateUrl: 'pages/mystains.html',
         controller: 'mystainsController'
     })
     // contact page
     .when('/profile', {
         templateUrl: 'pages/profile.html',
         controller: 'profileController'
     })
     //signup page
     .when('/signup', {
         templateUrl: 'pages/signup.html',
         controller: 'signupController'
     });

 });
 // create the controller and inject Angular's $scope
 myapp.controller('mainController', function($scope) {
     // create a message to display in our view
     $scope.message = 'Everyone come and see how good I look!';
 });