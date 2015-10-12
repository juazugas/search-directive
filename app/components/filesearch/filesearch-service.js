'use strict'

var searchSrv = angular.module('myApp.filesearch-service', []);

searchSrv.factory('searchService', ['$http', function ($http) {

  var json_url = "documents.json";
  var factory = {};

  factory.search = function search (params) {
    return $http.get(json_url, params);
  };

  return factory;

}]);