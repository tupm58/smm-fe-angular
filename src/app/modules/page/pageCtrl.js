/**
 * Created by thanh huyền on 09-Jan-17.
 */
'use strict';
angular
    .module('dashboard')
    .controller('pageCtrl', function ($scope, $rootScope,$location, $cookies,pageService) {
        console.log('inside page list controller');
        $scope.todos = [];
        $scope.getPage =function() {
            FB.api (
                "/me/accounts?fields=picture,name,id,access_token&access_token=" + $cookies.get('auth-token'),
                function (response) {
                    if (response && !response.error) {
                        console.log(response.data[0]);
                        for (var i=0; i<response.data.length;i++) {
                            $scope.todos.push(response.data[i]);
                        }
                    }
                }
            );
        };
        $scope.addPage = function (todo) {

            var request = {
                pageId:   todo.id,
                pageName: todo.name,
                accessToken: todo.access_token,
                avatarPageUrl: todo.picture.data.url
            };
            console.log(request);
            pageService.addPage(request)
                .then(function(){
                    console.log("success");
                })
        };

    });