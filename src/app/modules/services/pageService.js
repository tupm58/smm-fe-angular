/**
 * Created by thanh huyền on 10-Jan-17.
 */
(function () {
    'use strict';

    angular
        .module('services')
        .factory('pageService', pageService);

    function pageService($rootScope, $http, $cookies, $q, $location, $state) {

        return {
            addPage : addPage,
            getPage: getPage
        };
        
        function addPage(opts){
            return $http({
                url:  config.basicUrl + "page",
                method: 'POST',
                data: opts
            });
        }
        function getPage() {
            return $http ({
                url: config.basicUrl + "page",
                method: 'GET'
            })
        }
    }
})();