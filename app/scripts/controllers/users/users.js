'use strict';

/**
 * @ngdoc function
 * @name pooIhmExemplesApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the pooIhmExemplesApp
 */
angular.module('IHMAnnuaire')
    .controller('UsersCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {

      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];

      var service = 'http://poo-ihm-2015-rest.herokuapp.com/api/';

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

      $scope.selectChoice = function(variable){
        $scope.selectedChoice = variable;
      };
      $scope.selectedChoice = 0;
      /* Si selectedChoise = 1 alors l'utilisateur veut modifier
       Si selectedChoise = 2 alors l'ulilisateur veut supprimer
       */
      $scope.clique = false; //POUR DEBUG

      $scope.modifierOUsupprimer = function(user, index){
        if($scope.selectedChoice == 1){
          //Il veut modifier l'utilisateur user
          $scope.clique = true; //POUR DEBUG
          $scope.userToModify = user;
          $scope.showWindow(1); //affichage de la vue pour modification d'un utilisateur
        }
        else if($scope.selectedChoice == 2){
          //Il veut supprimer l'utilisateur user
          $scope.supressionUser(user, index);
          $scope.clique = true; //POUR DEBUG
        }
      };

      $scope.affichageUser = true;
      $scope.affichageModificationUser = false;

      $scope.showWindow = function(numero){
        //Si numero = 1 alors affichage de la vue des utilisateurs avec recherche etc
        //Si numero = 2 alors affichage de la vue modifications d'un utilisateurs
        if(numero === 1){
          $scope.affichageUser = false;
          $scope.affichageModificationUser = true;
        }
        else if(numero  === 2){
          $scope.affichageUser = true;
          $scope.affichageModificationUser = false;
        }
      };


      $scope.rechercheRoleEstVrai = false;



      $scope.RechercheRoleForUser = function (id, name, surname, email, website) {
        $http.get(service + 'Users/'+ id+'/Roles')
            .success(function (data) {
              $scope.namesRoles = data.data; //On obtient ici un tableau contenant des objects
              //$scope.RechercheRoleForUserId= namesRoles[0].name;
              $scope.id = id;
              $scope.name = name;
              $scope.surname = surname;
              $scope.email = email;
              $scope.website = website;
              $scope.rechercheRoleEstVrai = true;
              success(data);
            });



      };

      $scope.RechercheRoles = function () {
        $http.get(service + '/Roles')
            .success(function (data) {
              $scope.Roles = data.data;

              success(data);
            });
      };

      $scope.RechercheProjects = function () {
        $http.get(service + '/Projects')
            .success(function (data) {
              $scope.Projects = data.data; //On obtient ici un tableau contenant des objects

              success(data);
            });
      };


      $scope.recuperationUser = function(id, name, surname, email, website){
        $scope.id = id;
        $scope.name = name;
        $scope.surname = surname;
        $scope.email = email;
        $scope.website = website;
        $scope.modificationclique = false;

      };

      $scope.modificationUser = function( nom, prenom, email, website){
        $http.put(service +'Users/' + $scope.id, {
          "name":nom,
          "surname":prenom,
          "email":email,
          "website":website
        })
            .success(function(data) {
              $scope.users.push({
                "id":$scope.id,
                "name":nom,
                "surname":prenom,
                "email":email,
                "website":website
              });
              console.log(data);
              console.log(data.data);
              success(data);
            })
            .error();
      };


      $scope.supressionUser = function(id,index){
        $http.delete(service +'Users/' + id)
            .success(function(data) {
              $scope.users.splice(index,1);
              console.log(data);
              console.log(data.data);
              success(data);
            })
            .error();
      };


      $http.get(service + 'Users/')
          .success(function(data) {
            $scope.users = data.data;
            $scope.RechercheRoles();
            $scope.RechercheProjects();
            $scope.myVar = false;
            $scope.hideORShow = "Cacher";

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
    }]);
