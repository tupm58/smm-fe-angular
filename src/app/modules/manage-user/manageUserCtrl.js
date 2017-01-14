/**
 * Created by thanh huyền on 11-Jan-17.
 */
'use strict';

angular
    .module('dashboard')
    .controller('manageUserCtrl', function ($scope, $rootScope,$window,$mdDialog,$location,$cookies,$cookieStore, pageService) {
        console.log('inside dashboard controller');

        $scope.customFullscreen = false;
        $scope.editUser = {};
        $scope.userList = [];
        $cookieStore.put('pageID', '170949620053038');
        $cookieStore.put('HostName', 'Hung Pham');
        $scope.filterStr = {};

        pageService.getAllUserWithPage().then(function (response) {
            $scope.userList = response.data;
        })

        $scope.deleteUser = function (index) {
            pageService.deleteUserWithPage($scope.userList[index]).then(function (response) {
                if(response.data == "success"){
                    $scope.userList.splice(index, 1);
                    alert("OK");
                }else{
                    alert("Don't Delete This User");
                }
            })
        }

        $scope.editRole = function(ev, user) {
            // alert(user.name);
            $mdDialog.show({
                locals:{editUser: user},
                controller: DialogController,
                templateUrl: 'edit-role.html',
                parent: angular.element(document.body),
                controllerAs: 'modal',
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
                .then(function(answer) {
                    if(user.role != answer){
                        alert("Khac");
                        $scope.tmp = user;
                        $scope.tmp.role = answer;
                        pageService.editRole ($scope.tmp).then(function (response) {
                            user.role = answer;
                            alert("Update Role Success");
                        })
                    }
                   // $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                   // $scope.status = 'You cancelled the dialog.';
                });
        };

        function DialogController($scope, $mdDialog, editUser) {
            var vm = this;
            vm.editUser = {};
            vm.editUser = editUser;

            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };
        }

        $scope.inviteUser = function (ev) {
            $mdDialog.show({
                 // locals:{role: $scope.role},
                controller: InviteCtrl,
                templateUrl: 'invite-user.html',
                parent: angular.element(document.body),
                bindToController: true,
                controllerAs: 'modal',
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            }).then(function (answer, role) {
                alert(answer );
                var str = answer.split('-');
                $scope.invite = {};
                $scope.invite.pageId = $cookieStore.get('pageID');
                $scope.invite.invitedByName = $cookieStore.get('HostName');
                $scope.invite.emailDes = str[0];
                $scope.invite.role = str[1];
               // alert($scope.invite.invitedByName + $scope.invite.emailDes + $scope.invite.role );
                pageService.inviteUser($scope.invite).then(function (response) {
                    if(response.data == 'success'){
                        alert('Send Email Successly!');
                    }else {
                        alert('Have Error! Try Again');
                    }
                })
                    // $scope.status = 'You said the information was "' + answer + '".';
                }, function(role) {
                    // $scope.status = 'You cancelled the dialog.';
                });
        }

        function InviteCtrl($scope, $mdDialog) {
            // var vm = this;
            // vm.inviteUser = {};
            // vm.inviteUser = inviteUser;

            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };
        }
        
        // $scope.filterUser = function () {
        //     switch($scope.filterStr){
        //        
        //     }
        // }
    });