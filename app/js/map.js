'use strict';

angular.module('schlengr.map',
               [
                 'ngRoute',
                 'leaflet-directive'
               ])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/map', {
    templateUrl: 'templates/map/view.html',
    controller: 'MapController',
    reloadOnSearch: false
  });
}])

.controller('MapController', [
  '$scope', '$http', '$routeParams', '$route', '$location', '$timeout', 'leafletData', 'leafletBoundsHelpers',
function($scope, $http, $routeParams, $route, $location, $timeout, leafletData, leafletBoundsHelpers) {

  $scope.schlengrsToMarker = function(schlengrs) {
    return schlengrs.map(function(schlengr) {
      return {
        schlengr: schlengr,
        lat: schlengr['lat'],
        lng: schlengr['lon'],
        message: "<h3>" + schlengr.name + "</h3>" +
                 "<p>" + schlengr.description + "</p>" +
                 "<div class=\"marker-image\">" +
                 "<a href=\"" + schlengr.img + "\" target=\"_blank\">" +
                 "<img src=\"" + schlengr.img + "\"/></a>" +
                 "</div>"
      };
    });
  };


  $scope.loadSchlengrs = function() {
    $scope.markers = {};
    $http({
        url: "/schlengrs.json",
        method: "GET",
      }).success(function(data) {
        $scope.markers = $scope.schlengrsToMarker(data['schlengrs']);
      }).error(function(data) {
      });
  };

  angular.extend($scope, {
    layers: {
      baselayers: {
        osm: {
          name: 'OSM',
          type: 'xyz',
          url: 'http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.jpg',
          layerParams: {
            noWrap: true,
            subdomains: '1234',
            attribution: "© <a href=\"http://www.openstreetmap.org/copyright\" target=\"_blank\">OpenStreetMap</a> contributors | Tiles Courtesy of <a href=\"http://www.mapquest.com/\" target=\"_blank\">MapQuest</a> <img src=\"http://developer.mapquest.com/content/osm/mq_logo.png\">",
            prefix: false
          }
        }
      },
    },
    defaults: {
      zoomControlPosition: 'topright',
      controls: {
        layers: {
          visible: false,
        }
      },
      center: {
        lat: 0,
        lng: 0,
        autoDiscover: false
      }
    },
    center: {
      zoom: 3,
      lat: 48.13722,
      lng: 11.575556,
      autoDiscover: false
    }
  });
  $scope.loadSchlengrs();
}]);

