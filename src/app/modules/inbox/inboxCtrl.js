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
            FB.api(
                "me?fields=feed{comments{comment_count},message}&access_token=" + page_token,
                function (response) {
                    if (response && !response.error) {
                        console.log(response.feed.data);
                        var feed = response.feed.data;
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
                                created_time: feed[i].created_time,
                                totalCmt: count,
                                postId: feed[i].id,
                                comments: feed[i].comments
                            };
                            $scope.listPost.push(post);
                            console.log($scope.listPost);

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
                        console.log(response);
                    }
                }
            );

            postService.getComments(post.postId)
                .then(function (response) {
                    $scope.Comments = response;
                    console.log($scope.Comments);
                    console.log(response);
                });

            angular.forEach($scope.listPost, function (i) {
                if (i === post) {
                    i.clicked = !i.clicked;
                    $scope.expand = i.clicked;
                }
                else {
                    i.clicked = false;
                }
            });
        }
        $scope.review = function (comment) {
            postService.review(comment.id);
        }
        $scope.hideComment = function (comment) {
            postService.hideComment(comment.id)
                .then(function (response) {
                    if (response.data != null){
                        if(comment.is_hidden == false){
                            comment.is_hidden  = true;
                        }else{
                            comment.is_hidden = false;
                        }
                    }
                    console.log(response);
                    console.log(comment.id);
                });
            console.log(comment.is_hidden );

        }
    })
