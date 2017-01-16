/**
 * Created by thanh huyền on 11-Jan-17.
 */
'use strict';

angular
    .module('dashboard')
    .controller('inboxCtrl', function (cfpLoadingBar,$scope, $rootScope, pageService,$stateParams ) {
        console.log('inside dashboard controller');
        $scope.pageId = $stateParams.pageId;
        console.log($scope.pageId);
        
        // $scope.clicked = false;
        // $scope.click = function () {
        //   $scope.clicked = !$scope.clicked
        // };

        $scope.listPost = [];
        function init() {
            // console.log(window.FB);
            var page_token = $rootScope.pageAccessToken;
            console.log(page_token);
            getPost(page_token);
        }
        init();
        
        function getPost(page_token){
            cfpLoadingBar.start();
            // var page_token ="EAADKzAi0HZBEBALIMZBkOy3Xe4UEAtFLVZBknlZB1OXkcmIIvGSZCfuMucF1oN6OxjOYoEOFyK2FuebKV384hCw7OuYc7iwv5Vw4lgWD4iETHsJ9mfqIBal3HwGPBZAZAvJBX5DvsLprRuhBhsa3TH8xkzy2DR3WLUZD";
            console.log(page_token);
            FB.api (
                "me?fields=feed{comments{comment_count},message,created_time}&access_token=" + page_token,
                function (response) {
                    if (response && !response.error) {
                        console.log(response.feed.data);
                        var feed = response.feed.data;
                        for(var i = 0; i< feed.length;i++ ){
                            var count = 0;
                            if (feed[i].comments){
                                var count_comment =0;
                                for (var j= 0;j<feed[i].comments.data.length;j++) {
                                    count_comment += feed[i].comments.data[j].comment_count;
                                }
                                count = count_comment+feed[i].comments.data.length;
                                console.log("post_id"+i+": " + count);
                            }else{
                                count = count + 1;
                                console.log("post_id"+i+": "+ count);
                            }
                            var post = {
                                message: feed[i].message,
                                created_time: feed[i].created_time,
                                totalCmt: count,
                                postId: feed[i].id,
                                clicked: false,
                                index: i
                            };
                            $scope.listPost.push(post);
                        }
                        cfpLoadingBar.complete();
                        console.log($scope.listPost);
                    }
                }
            );
            $scope.expand = false;
            $scope.postDetail =[];

            $scope.click = function (post) {
                FB.api(
                    post.postId + "?fields=comments{comments},message,picture&access_token=" + $rootScope.pageAccessToken,
                    function (response) {
                        if (response && !response.error) {
                            $scope.postDetail = response;
                            console.log(response);
                        }
                    }
                );
                  angular.forEach($scope.listPost,function (i) {
                     if (i === post){
                         i.clicked = !i.clicked;
                         $scope.expand = i.clicked;
                     }
                      else {
                         i.clicked = false;
                     }
                  });
            };
        }
    });
