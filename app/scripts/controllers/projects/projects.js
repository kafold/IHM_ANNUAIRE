'use strict';

angular.module('IHMAnnuaire')
    .controller('ProjectsCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {

        var service = 'http://poo-ihm-2015-rest.herokuapp.com/api/';

        //Affichage des vues
        $scope.affichageModificationProjet = false;
        $scope.affichageProjets = true;

        $scope.selectedChoice = 0;

        $scope.selectChoice = function(variable){
            $scope.selectedChoice = variable;
        };

        $scope.optionChoisit = function(selectedChoice){
            if(selectedChoice === 1){
                return 'Modification';
            }
            else if(selectedChoice === 2){
                return 'Suppression';
            }
            else if(selectedChoice === 0){
                return 'Rien';
            }
        };

        $scope.projetToModify = {};

        $scope.modifierOUsupprimer = function(projet, index){
            if($scope.selectedChoice === 1){
                //Il veut modifier l'utilisateur user
                $scope.clique = true; //POUR DEBUG
                $scope.projetToModify = projet;
                $scope.showWindow(1); //affichage de la vue pour modification d'un utilisateur


            }
            else if($scope.selectedChoice === 2){
                //Il veut supprimer l'utilisateur user
                $scope.supressionProject(projet, index);
                $scope.clique = true; //POUR DEBUG
            }
        };

        $scope.showWindow = function(numero){
            //Si numero = 1 alors affichage de la vue des utilisateurs avec recherche etc
            //Si numero = 2 alors affichage de la vue modifications d'un utilisateurs
            if(numero === 1){
                $scope.affichageProjets = false;
                $scope.affichageModificationProjet = true;
            }
            else if(numero === 2){
                $scope.affichageProjets = true;
                $scope.affichageModificationProjet = false;
            }
        };
        /////////////////////////////////////////
        $scope.unUser = {};

        $scope.supprimeUser = function(user){
            $scope.unUser = user.id;
        };

        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        /* Cette partie sert à pouvoir supprimer un projet en cliquant sur le bouton supprimer
         $scope.projects.splice(index,1) sert à pouvoir rafraichir le tableau une fois que l'element a été supprimé
         */

        $scope.RechercheRoles = function () {
            $http.get(service + '/Roles')
                .success(function (data) {
                    $scope.Roles = data.data; //On obtient ici un tableau contenant des objects

                    success(data);
                });
        };

        $scope.RechercheUsers = function () {
            $http.get(service + '/Users')
                .success(function (data) {
                    $scope.users = data.data; //On obtient ici un tableau contenant des objects

                    success(data);
                });



        };

        $scope.recuperationProject = function(id, title, description, year){
            $scope.id = id;
            $scope.title = title;
            $scope.description = description;
            $scope.year = year;
            $scope.modificationclique = false;

        };

        $scope.modificationProject = function(title, description, year){
            $http.put(service +'Projects/' + $scope.id, {
                "title":title,
                "description":description,
                "year":year
            })
                .success(function(data) {
                    $scope.projects.push({
                        "id":$scope.id,
                        "title":title,
                        "description":description,
                        "year":year
                    });
                    //$scope.users.splice(index,1);
                    console.log(data);
                    console.log(data.data);
                    success(data);
                })
                .error();
        };

        $scope.supressionProject = function(id,index){
            $http.delete(service +'Projects/' + id)
                .success(function(data) {
                    $scope.projects.splice(index,1);
                    console.log(data);
                    console.log(data.data);
                    success(data);
                })
                .error();
        };

        $http.get(service + 'Projects/')
            .success(function(data) {
                $scope.projects = data.data;
                $scope.RechercheRoles();
                $scope.RechercheUsers();
                //Permet de controller l'affichage de la liste avec un bouton
                $scope.myVar = false;
                $scope.hideORShow = 'Cacher';
                $scope.showORHide = function() {
                    $scope.myVar = !$scope.myVar;
                    if($scope.myVar === true){
                        $scope.hideORShow = 'Afficher';
                    }
                    else{
                        $scope.hideORShow = 'Cacher';
                    }
                };

            });

        if($routeParams.userId) {
            $http.get(service +'Projects/' + $routeParams.ProjectId)
                .success(function(data) {
                    if (data.status === 'success') {
                        $scope.currentProject = data.data;
                    }
                });
        }
    }]);
