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
            review: review,
            deleteComment: deleteComment,
            hideComment: hideComment
        };
        function getComments(postId) {
            return $http({
                url: config.basicUrl + "do-in-post/" + postId,
                method: 'GET'
            })
        }

        function review(commentId) {
            return $http({
                url: config.basicUrl + "comment/api/" + commentId,
                method: 'GET'
            })
        }

        function deleteComment(commentId) {
            return $http({
                url: config.basicUrl + "comment/" + commentId,
                method: 'DELETE'
            })
        }

        function hideComment(commentId) {
            return $http({
                url: config.basicUrl + "comment/hide/" + commentId,
                method: 'POST'
            })
        }
    }
})();