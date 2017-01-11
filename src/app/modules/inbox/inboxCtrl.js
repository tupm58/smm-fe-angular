/**
 * Created by thanh huyền on 11-Jan-17.
 */
'use strict';

angular
    .module('dashboard')
    .controller('inboxCtrl', function ($scope, $rootScope, pageService) {
        console.log('inside dashboard controller');
        $scope.getPost = function(){
            var page_token ="EAADKzAi0HZBEBALIMZBkOy3Xe4UEAtFLVZBknlZB1OXkcmIIvGSZCfuMucF1oN6OxjOYoEOFyK2FuebKV384hCw7OuYc7iwv5Vw4lgWD4iETHsJ9mfqIBal3HwGPBZAZAvJBX5DvsLprRuhBhsa3TH8xkzy2DR3WLUZD";
            FB.api (
                "me?fields=feed{comments{comment_count},message}&access_token=" + page_token,
                function (response) {
                    if (response && !response.error) {
                        console.log(response.feed.data);
                        var count = 0;
                        var count_comment =0;
                        console.log(response.feed.data.length);
                        for(var i = 0; i<response.feed.data.length;i++ ){
                           
                        }

                    }
                }
            );
        }
    });