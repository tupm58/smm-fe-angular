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
            // getPageFB : getPageFB
        };
        
        function addPage(opts){
            return $http({
                url:  config.basicUrl + "page",
                // url: '192.168.1.22/localhost:8080/page',
                method: 'POST',
                data: opts
            });
        }
        function getPage() {
            return $http ({
                url: config.basicUrl + "page",
                // url: '192.168.1.22:8080/page',
                method: 'GET'
            })
        }
        // function getPageFB() {
        //     FB.api (
        //         "/me/accounts?fields=picture,name,id,access_token&access_token=" + $cookies.get('auth-token'),
        //         function (response) {
        //             if (response && !response.error) {
        //                 console.log(response.data[0]);
        //                 return response;
        //             }
        //         }
        //     );
        // }
    }
})();