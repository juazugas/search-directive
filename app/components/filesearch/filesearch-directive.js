'use strict'

var searchDve = angular.module('myApp.filesearch', ['myApp.filesearch-service']);

searchDve.directive('seedFileSearch', [ 'searchService', function (searchService) {
  return {
    restrict  : 'EA',
    scope : {},
    require : 'seedFileSearch',
    transclude : true,
    templateUrl: 'components/filesearch/filesearch-tmpl.html',
    controller: 'FileSearchCtrl',
    link : function (scope, element, attrs, controller, transcludeFn) {
      scope.fileSearchTranscludeFn = transcludeFn;
    }
  }
}]);
searchDve.controller('FileSearchCtrl', [ '$scope', 'searchService', '$log', function ($scope, searchService, $log) {

  $log.debug('init FileSearchCtrl '+$scope.$parent);
  $scope.queryresults = undefined;
  $scope.fileSearchParentScope = $scope.$parent;


  $scope.searchQuery = function search () {
    $log.debug("query" +$scope.query)
    var params = {};
    params.q = $scope.query;
    searchService.search(params)
      .success(function(data) {
        $scope.queryresults = data.content;
      })
      .error(function (status, data) {
        $scope.queryresults = undefined;
      });
  };

  $scope.clearResults = function clear () {
    $scope.queryresults = undefined;
  };

}]);
searchDve.directive('fileSearchTransclude', [ '$log', function ($log) {
  return {
    require: '^seedFileSearch',
    link: function (scope, element, attrs, controller) {
      $log.debug('linking fsTransclude' +scope.fileSearchParentScope);
      // create a scope for the transclusion, whos parent is the parent of the tree control
      scope.fsTranscludeScope = scope.fileSearchParentScope.$new();
      scope.fsTranscludeScope.fileResult = scope.result;
      scope.fsTranscludeScope.$index = scope.$index;
      scope.fsTranscludeScope.$first = scope.$first;
      scope.fsTranscludeScope.$middle = scope.$middle;
      scope.fsTranscludeScope.$last = scope.$last;
      scope.fsTranscludeScope.$odd = scope.$odd;
      scope.fsTranscludeScope.$even = scope.$even;
      scope.$on('$destroy', function() {
        scope.fsTranscludeScope.$destroy();
      });

      scope.fileSearchTranscludeFn(scope.fsTranscludeScope, function(clone) {
        $log.debug("clone : " + clone);
        element.empty();
        element.append(clone);
      });

    }
  }
}]);
