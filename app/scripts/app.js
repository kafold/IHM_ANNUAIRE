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
            templateUrl: '../views/Users/afficherUsers.html',
            controller: 'UsersCtrl'
          })
          .when('/projets' , {
            templateUrl: '../views/Users/afficherProjets.html',
            controller: 'ProjetsCtrl'
          })
          .otherwise({
            redirectTo: '/'
          });
    });
