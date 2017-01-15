/**
 * Created by thanh huyền on 11-Jan-17.
 */
'use strict';

angular
    .module('dashboard')
    .controller('inboxCtrl', function ($scope, $rootScope, pageService,$stateParams ) {
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
            getPost();
        }
        init();
        
        function getPost(){
            var page_token ="EAADKzAi0HZBEBALIMZBkOy3Xe4UEAtFLVZBknlZB1OXkcmIIvGSZCfuMucF1oN6OxjOYoEOFyK2FuebKV384hCw7OuYc7iwv5Vw4lgWD4iETHsJ9mfqIBal3HwGPBZAZAvJBX5DvsLprRuhBhsa3TH8xkzy2DR3WLUZD";
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
                                id: feed[i].id,
                                clicked: false,
                                index: i
                            };
                            $scope.listPost.push(post);
                        }
                        console.log($scope.listPost);
                    }
                }
            );
            $scope.expand = false;
            $scope.postDetail ='';

            $scope.click = function (item) {
              angular.forEach($scope.listPost,function (i) {
                 if (i === item){
                     i.clicked = !i.clicked; console.log(i.clicked);
                     $scope.expand = i.clicked; console.log($scope.expand);
                     $scope.postDetail = i.message; console.log(i.message);
                 }
                  else {
                     i.clicked = false;
                 }
              });
            };
        }
    });
