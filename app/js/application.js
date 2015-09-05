'use strict';

var app = angular.module('schlengr',
                         [
                            'ngRoute',
                            'schlengr.map',
                         ])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.otherwise({redirectTo: '/map'});
  $locationProvider.hashPrefix('!');
  $locationProvider.html5Mode(true);
}]);
