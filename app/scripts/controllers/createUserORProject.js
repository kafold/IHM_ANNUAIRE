'use strict';

angular.module('IHMAnnuaire')
    .controller('CreateUserORProjectCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {

        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        var REST = 'http://poo-ihm-2015-rest.herokuapp.com/api/';

        $scope.affichageAjoutProjet = false;
        $scope.affichageAjoutUser = true;

        $scope.selectChoice = function(entier){
            if(entier === 1){
                $scope.affichageAjoutProjet = false;
                $scope.affichageAjoutUser = true;
            }
            else{
                $scope.affichageAjoutProjet = true;
                $scope.affichageAjoutUser = false;
            }
        };

        $scope.reussi = function(boolean){
            if(boolean){
                return 'reussi';
            }
            else{
                return 'pas reussi';
            }
        }

        $scope.nom = '';
        $scope.prenom = '';
        $scope.email = '';
        $scope.website = '';
        $scope.roles = [];
        $scope.projects = [];



        $scope.toggleProjet = function(title, description, year) {
            $http.post(REST +'Projects/', {
                "title": title,
                "description":description,
                "year":year
            })
                .success(function(data) {
                    $scope.ajoutProjetReussi = true;
                })
                .error();
        };


        $scope.toggleUser = function(nom, prenom, email, website) {
            $http.post(REST +'Users/', {
                "name":nom,
                "surname":prenom,
                "email":email,
                "website":website
            })
                .success(function(data) {
                    $scope.ajoutProjetReussi = true;
                })
                .error();
        };


    }]);
