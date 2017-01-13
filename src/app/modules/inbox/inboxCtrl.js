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
        $scope.getPost = function(){
            var page_token = $rootScope.pageAccessToken;
            FB.api (
                "me?fields=feed{comments{comment_count},message}&access_token=" + page_token,
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
                        }
                    }
                }
            );
        }
    });