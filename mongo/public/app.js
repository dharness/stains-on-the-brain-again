 var myapp = angular.module('myapp', ['ngRoute', 'ngAnimate']);
 currentUser = null;

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