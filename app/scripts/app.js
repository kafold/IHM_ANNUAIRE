'use strict';

/**
 * @ngdoc overview
 * @name pooIhmExemplesApp
 * @description
 * # pooIhmExemplesApp
 *
 * Main module of the application.
 */
angular
    .module('pooIhmExemplesApp', [
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngTouch'
    ])
    .config(function ($routeProvider) {
      $routeProvider
          .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
          })
          .when('/users' , {
            templateUrl: '../views/users/users.html',
            controller: 'UsersCtrl'
          })
          .when('/projets' , {
            templateUrl: '../views/projects/projects.html',
            controller: 'ProjetsCtrl'
          })
          .otherwise({
            redirectTo: '/'
          });
    });
