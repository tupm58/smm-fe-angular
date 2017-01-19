/**
 * Created by thanh huyền on 11-Jan-17.
 */
'use strict';

angular
    .module('dashboard')
    .controller('inboxCtrl', function ($scope, $rootScope, pageService, $stateParams, postService) {
        console.log('inside inbox controller');
        $scope.pageId = $stateParams.pageId;
        $scope.pageName = $rootScope.pageName;
        $scope.avatarPageUrl = $rootScope.avatarPageUrl;

        $scope.listPost = [];

        function init() {
            var page_token = $rootScope.pageAccessToken;
            console.log(page_token);
            getPost(page_token);
        }

        init();

        function getPost(page_token) {
            console.log(page_token);
            FB.api(
                "me?fields=posts{comments{comment_count},message,created_time,story}&access_token=" + page_token,
                function (response) {
                    if (response && !response.error) {
                        console.log(response.posts.data);
                        var feed = response.posts.data;
                        for (var i = 0; i < feed.length; i++) {
                            var count = 0;  
                            if (feed[i].comments) {
                                var count_comment = 0;
                                for (var j = 0; j < feed[i].comments.data.length; j++) {
                                    count_comment += feed[i].comments.data[j].comment_count;
                                }
                                count = count_comment + feed[i].comments.data.length;
                                console.log("post_id" + i + ": " + count);
                            } else {
                                count = count + 1;
                                console.log("post_id" + i + ": " + count);
                            }
                            var post = {
                                message: feed[i].message,
                                story: feed[i].story,
                                created_time: feed[i].created_time,
                                totalCmt: count,
                                postId: feed[i].id,
                                comments: feed[i].comments
                            };
                            $scope.listPost.push(post);

                        }
                    }
                }
            );

        }

        $scope.expand = false;
        $scope.postDetail = [];
        $scope.Comments = [];
        $scope.getComments = function (post) {
            FB.api(
                post.postId + "?fields=message,full_picture,type,actions,permalink_url,comments{from,message,comments{message,from}}&access_token=" + $rootScope.pageAccessToken,
                function (response) {
                    if (response && !response.error) {
                        $scope.postDetail = response;
                    }
                }
            );

            postService.getComments(post.postId)
                .then(function (response) {
                    $scope.Comments = response.data.comments;
                    console.log($scope.Comments);
                });

            angular.forEach($scope.listPost, function (i) {
                if (i === post) {
                    i.clicked = !i.clicked;
                    // console.log(i.clicked);
                    $scope.expand = i.clicked;
                }
                else {
                    i.clicked = false;
                }
            });
        };
        $scope.deleteComment = function () {
            postService.deleteComment();
        };
        $scope.hideComment = function () {
            postService.hideComment();
        };

        $scope.assignComment = function () {
            postService.assignComment();
        }

    });