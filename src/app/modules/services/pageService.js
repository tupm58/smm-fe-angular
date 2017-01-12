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
                url: "http://192.168.1.22:8080/page",
                // url: "http://localhost:8080/page",
                method: 'POST',
                data: opts
            });
        }
        function getPage() {
            return $http ({
                url: "http://192.168.1.22:8080/page",
                method: 'GET'
            })
        }
    }
})();