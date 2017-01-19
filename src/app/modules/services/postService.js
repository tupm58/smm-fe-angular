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
            // getPost : getPost
            getComments: getComments,
            deleteComment : deleteComment,
            hideComment: hideComment,
            assignComment: assignComment
        };
        function getComments(postId) {
            return $http({
                url: config.basicUrl + "comment/api/" + postId ,
                method: 'GET'
            })
        }
        function deleteComment() {
            return $http({
                url: config.basicUrl + "comment/api/" + postId ,
                method: 'GET'
            })
        }
        function hideComment() {
            return $http({
                url: config.basicUrl + "comment/api/" + postId ,
                method: 'GET'
            })
        }
        function assignComment() {
            return $http({
                url: config.basicUrl + "comment/api/" + postId ,
                method: 'GET'
            })
        }
    }
})();