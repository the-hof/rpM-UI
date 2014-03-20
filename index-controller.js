var rpmApp = angular.module('rpmApp', []);

rpmApp.controller('IndexCtrl', function ($scope, $http) {
  $scope.results = [];
  $scope.userid = '572';
  $scope.itemid = '7';
  $scope.numitems = '25';

  $scope.item_description = '';

  $scope.lookupItem = function (itemid) {
    var api_url = 'http://127.0.0.1:5000/getItem?callback=JSON_CALLBACK&item_id=';

    if (itemid) {
      if (itemid.charAt(0) != 'I')
        api_url += 'I';
      api_url += itemid;
      $http.jsonp(api_url).success(function (data) {
        $scope.item_description = data[0].name;
      });
    }
  }

  $scope.getRecommendations = function (userid, itemid, numitems) {
    var api_url = 'http://127.0.0.1:5000/recommenderitems/'
    api_url += userid + '/';
    api_url += itemid + '/';
    api_url += numitems
    api_url += '?callback=JSON_CALLBACK';

    $http.jsonp(api_url).success(function (data) {
      var api_results = data;
      $scope.results = [];
      var recommendationResults = [];

      $scope.results = api_results;
      console.log(data);
      /*
      for (var key in api_results) {
        if (api_results.hasOwnProperty(key)) {
          var recommendationItem = {
            'itemid': key,
            'score' : api_results[key],
            'item_description': ''
          }
          recommendationResults.push(recommendationItem);
        }
      }

      recommendationResults.sort(function(a, b) {
        return b.score - a.score;
      });

      $scope.results = recommendationResults;
      */
    });
  }
});