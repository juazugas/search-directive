'use strict';

var view3App = angular.module('myApp.view3', ['ngRoute']);

view3App.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl',
    controllerAs: 'v3ctrl'
  });
}])

var view3Ctrl = view3App.controller('View3Ctrl', ['$scope','$http', function($scope, $http) {

  $scope.documents_json = "documents.json";

  var self = this;

  self._scope = $scope;
  self._http = $http;

  $scope.getFileResults = function getFileResults () {
    $http.get($scope.documents_json, {})
        .success(function (data) {
            $scope.results = data.content;
        });
  };

  $scope.clearResults = function clearResults () {
    $scope.results = undefined;
  };

  $scope.addToFavourite = function addFav (fileResult) {
    $log.info(fileResult.metanode.documentName + 'to favourite');
  };

}]);

view3Ctrl.prototype.extractMetanode = function extractMetanode (fileResult) {
  if (!angular.isObject(fileResult) || !angular.isObject(fileResult.metanode)) {
    return undefined;
  }

  return fileResult.metanode;
};

view3Ctrl.prototype.getResults = function getFileResults () {
  self._http.get(self._scope.documents_json, {})
      .success(function (data) {
        self._scope.results = data.content;
      });
};
