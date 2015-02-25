'use strict';
var athenaModule = angular.module('Athena', ['ui.bootstrap']);

athenaModule.run(function($rootScope, $http) {
    $http.defaults.headers.common.Authorization = 'Basic Y251bm46emVuaXRoMTE=';
    $rootScope.sharedVars = {};
});

athenaModule.directive('capitalize', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                var capitalize = function (inputValue) {
                    if (angular.isUndefined(inputValue))
                        return;
 
                    var capitalized = inputValue.toUpperCase();
                    if (capitalized !== inputValue) {
                        modelCtrl.$setViewValue(capitalized);
                        modelCtrl.$render();
                    }
                    return capitalized;
                };
                modelCtrl.$formatters.push(capitalize);
                modelCtrl.$parsers.push(capitalize);
                capitalize(scope[attrs.ngModel]);  // capitalize initial value
            }
        };
    });
athenaModule.service('nameSuffixItems', ['$http','$rootScope', function($http, $rootScope){
        var _this = this;
    $http.get('/athena_rest/claim/v1/getSuffixItems',
        {withCredentials: true}).
        success(function(data, status, headers, config) {
            _this.nameSuffixes = data;
          $rootScope.$broadcast( 'nameSuffixItems.update');
        }).
        error(function(data, status, headers, config) {
          console.log("Error occured headers: "+headers);
          console.log("Error occured: "+status);
        });
}]);

athenaModule.service('contactUpdateReasons', ['$http','$rootScope', function($http, $rootScope){
        var _this = this;
    $http.get('/athena_rest/claim/v1/getContactsReason',
        {withCredentials: true}).
        success(function(data, status, headers, config) {
          _this.reasons = data;
          $rootScope.$broadcast( 'contactUpdateReasons.update');
        }).
        error(function(data, status, headers, config) {
          console.log("Error occured headers: "+headers);
          console.log("Error occured: "+status);
        }); 
}]);


/*athenaModule.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/contacts', {
        templateUrl: 'partials/index.html',
        controller: 'ContactController'
      }).
      when('/contacts/:contactId', {
        templateUrl: 'partials/contact-update.html',
        controller: 'ContactController'
      }).
      otherwise({
        redirectTo: '/index.html'
      });
  }]); */

