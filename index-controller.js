var rpmApp = angular.module('rpmApp', []);

rpmApp.controller('IndexCtrl', function ($scope, $http) {
  $scope.results = [];
  $scope.userid = '572';
  $scope.itemid = '7';
  $scope.numitems = '25';

  $scope.getRecommendations = function (userid, itemid, numitems) {
    var api_url = 'http://127.0.0.1:5000/recommender/'
    api_url += userid + '/';
    api_url += itemid + '/';
    api_url += numitems
    api_url += '?callback=JSON_CALLBACK';

    $http.jsonp(api_url).success(getRecommendationsCallback);

    function getRecommendationsCallback(data) {
      var api_results = data;
      $scope.results = [];

      for (var key in api_results) {
        if (api_results.hasOwnProperty(key)) {
          $scope.results.push({
            'itemid': key,
            'score' : api_results[key]
          })
        }
      }
    }
  }
});