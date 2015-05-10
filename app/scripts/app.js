'use strict';

/**
 * @ngdoc overview
 * @name IHM_Service_Rest
 * @description
 * # pooIhmExemplesApp
 *
 * Main module of the application.
 */
angular
    .module('IHMAnnuaire', [
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
            .when('/projects' , {
                templateUrl: '../views/projects/projects.html',
                controller: 'ProjectsCtrl'
            })
            .when('/createUserORProject' , {
                templateUrl: '../views/createUserORProjet.html',
                controller: 'CreateUserORProjectCtrl'
            })


            .otherwise({
                redirectTo: '/'
            });
    });
