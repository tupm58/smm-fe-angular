(function () {
    'use strict';

    angular
        .module('services')
        .factory('verifyService', verifyService);

    function verifyService($rootScope, $http, $cookies, $q, $location, $state) {
        return {
            checkToken:checkToken
        };
        
        function checkToken(opts, token) {
            return $http({
                url : config.basicUrl + '/test/'+token,
                method : 'POST'
                //data : opts
            })
        }
    }
})();