/**
 * Created by thanh huyền on 10-Jan-17.
 */
(function () {
    'use strict';

    angular
        .module('services')
        .factory('postService', postService);

    function postService($rootScope, $http, $cookies, $q, $location, $state) {

        return {
            getPage : getPage
        };

        function getPage(opts){
            return $http({
                url: "http://192.168.1.22:8080/pageSave",
                method: 'POST',
                data: opts
            });
        }
    }
})();