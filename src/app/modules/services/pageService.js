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
            getPageDetail: getPageDetail,
            getAllUserWithPage : getAllUserWithPage,
            deleteUserWithPage : deleteUserWithPage,
            editRole: editRole,
            inviteUser:inviteUser,
            verifyUser: verifyUser
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

        function getAllUserWithPage(opts) {
            return $http({
                url : config.basicUrl + "users/" + opts,
                method : 'POST'
            })
        }

        function deleteUserWithPage(opts) {
            return $http({
                url : config.basicUrl + "deleteUser",
                method : 'POST',
                data : opts
            })
        }

        function editRole(opts) {
            return $http({
                url: config.basicUrl + "updateRole",
                method : 'POST',
                data : opts
            })
        }

        function inviteUser(opts) {
            return $http({
                url: config.basicUrl + "user",
                method : 'POST',
                data : opts
            })
        }

        function verifyUser(opts) {
            return $http({
                url : config.basicUrl + "test/" + opts,
                method : 'POST'
            })
        }
    }
})();