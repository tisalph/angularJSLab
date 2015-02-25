'use strict';
athenaModule.controller("ContactController", function($scope, $http, $modal, $rootScope) {
    
    //var encoded = Base64.encode('cnunn:zenith11');
    //$http.defaults.headers.common.Authorization = 'Basic Y251bm46emVuaXRoMTE=';
      
    $scope.search = function() {
        $http.get('/athena_rest/claim/v1/get/unifiedContact/'+$rootScope.sharedVars.claimNumber,
            {withCredentials: true}).
            success(function(data, status, headers, config) {
              $scope.contacts = data;
            }).
            error(function(data, status, headers, config) {
              console.log("Error occured headers: "+headers);
              console.log("Error occured: "+status);
            });
    };
    
    $scope.openModal = function(type, index, size) {
        
        var modalInstance = $modal.open({
            templateUrl: type +'Update.html',
            controller: 'ModalInstanceController',
            size: size,
            scope: $scope,
            backdrop: 'static',
            resolve: {
              index: function () {
                return index;
              } 
            }
        });
    };
});

athenaModule.controller('ModalInstanceController', function($scope, $modalInstance, $http, index, 
    nameSuffixItems, contactUpdateReasons) {
    
    $scope.contact = $scope.contacts[index];
    $scope.contactCopy = angular.copy($scope.contact);
    $scope.alerts = [];
    
    $scope.nameSuffixes = nameSuffixItems.nameSuffixes;
    $scope.$on('nameSuffixItems.update', function($event) {
        $scope.nameSuffixes = nameSuffixItems.nameSuffixes;
    });
    
    $scope.contactUpdateReasons = contactUpdateReasons.reasons;
    $scope.$on('contactUpdateReasons.update', function ($event) {
        $scope.contactUpdateReasons = contactUpdateReasons.reasons;
    });
  
     
    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
  
    $scope.ok = function() {
        delete $scope.contact.contactName.fullName;
        $http.post('/athena_rest/claim/v1/update/contact/injuredWorker', $scope.contact).
            success(function(data, status, headers, config) {
              $scope.contact.editContactFreeFormText = null;
              $scope.contact.changeReasonCode = null;
              $modalInstance.close($scope.contact);
            }).
            error(function(data, status, headers, config) {
                $scope.alerts.push({type: 'danger', msg: 'Ah! Error occured while saving Injured Worker'});
            });
    };
    
    $scope.cancel = function() {
        $scope.contacts[index] = angular.copy($scope.contactCopy);
        $modalInstance.dismiss('cancel');
    };
    
  $scope.today = function() {
    $scope.contact.effectiveDate = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.contact.effectiveDate = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

 
    $scope.openDatePicker  = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };    
  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

    
    $scope.states = {
        "": "",
        "AL": "AL - Alabama",
        "AK": "AK - Alaska",
        "AZ": "AZ - Arizona",
        "AR": "AR - Arkansas",
        "CA": "CA - California",
        "CO": "CO - Colorado",
        "CT": "CT - Connecticut",
        "DC": "DC - District of Columbia",
        "DE": "DE - Delaware",
        "FL": "FL - Florida",
        "GA": "GA - Georgia",
        "HI": "HI - Hawaii",
        "ID": "ID - Idaho",
        "IL": "IL - Illinois",
        "IT": "IT - International",
        "IN": "IN - Indiana",
        "IA": "IA - Iowa",
        "KS": "KS - Kansas",
        "KY": "KY - Kentucky",
        "LA": "LA - Louisiana",
        "LH": "LH - Longshore & Harbor Workers Act",
        "ME": "ME - Maine",
        "MD": "MD - Maryland",
        "MA": "MA - Massachusetts",
        "MI": "MI - Michigan",
        "MN": "MN - Minnesota",
        "MS": "MS - Mississippi",
        "MO": "MO - Misouri",
        "MT": "MT - Montana",
        "NE": "NE - Nebraska",
        "NV": "NV - Nevada",
        "NH": "NH - New Hampshire",
        "NJ": "NJ - New Jersey",
        "NM": "NM - New Mexico",
        "NY": "NY - New York",
        "NC": "NC - North Carolina",
        "ND": "ND - North Dakota",
        "OH": "OH - Ohio",
        "OK": "OK - Oklahoma",
        "OR": "OR - Oregon",
        "PA": "PA - Pennsylvania",
        "RI": "RI - Rhode Island",
        "SC": "SC - South Carolina",
        "SD": "SD - South Dakota",
        "TN": "TN - Tennessee",
        "TX": "TX - Texas",
        "UT": "UT - Utah",
        "VT": "VT - Vermont",
        "VA": "VA - Virginia",
        "WA": "WA - Washington",
        "WV": "WV - West Virginia",
        "WI": "WI - Wisconsin",
        "WY": "WY - Wyoming"
    };
});


