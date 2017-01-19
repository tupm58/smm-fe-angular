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
            // getPost : getPost,
            getComments: getComments
        };
        function getComments(postId) {
            return $http({
                url: config.basicUrl + "post/" + postId,
                method: 'GET'
            })
        }
    }
})();