/**
 * Created by thanh huyền on 10-Jan-17.
 */
(function () {
    'use strict';

    angular
        .module('services')
        .factory('pageService', pageService);

    function pageService(cfpLoadingBar,$rootScope, $http, $cookies, $q, $location, $state) {

        return {
            addPage : addPage,
            getPage: getPage,
            getPageDetail: getPageDetail
        };
        
        function addPage(opts){
            return $http({
                url:  config.basicUrl + "page",
                method: 'POST',
                data: opts
            });
        }
        function getPage() {
            cfpLoadingBar.start();
            return $http ({
                url: config.basicUrl + "page",
                method: 'GET'
            })
            cfpLoadingBar.complete();
        }
        function getPageDetail(pageId){
            return $http({
                url: config.basicUrl + "page/" + pageId ,
                method: 'GET'
            })
        }
    }
})();