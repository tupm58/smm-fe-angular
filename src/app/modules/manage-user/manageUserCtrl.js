/**
 * Created by thanh huyền on 11-Jan-17.
 */
'use strict';
// long
angular
    .module('dashboard')
    .controller('manageUserCtrl', function ($scope, $rootScope,$window,$mdDialog,$location,$cookies,$cookieStore, pageService, $stateParams) {
        console.log('inside dashboard controller');

        $scope.customFullscreen = false;
        $scope.editUser = {};
        $scope.userList = [];
        
        $scope.filterStr = {};
       
        pageService.getAllUserWithPage($stateParams.pageId).then(function (response) {
            $scope.userList = response.data;
        })

        $scope.deleteUser = function (index) {
            pageService.deleteUserWithPage($scope.userList[index]).then(function (response) {
                if(response.data == "success"){
                    $scope.userList.splice(index, 1);
                    $scope.showAlert = showAlert('Delete User Successfully');
                }else{
                    showAlert("Don't Delete This User");
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
                        $scope.tmp = {};
                       angular.copy(user, $scope.tmp);
                        $scope.tmp.role = answer;
                        pageService.editRole ($scope.tmp).then(function (response) {
                            var messageEdit = response.data;

                            if(messageEdit == 'success'){
                                user.role = answer;
                                showAlert('Edit Role Successfully');
                            }else{
                                showAlert("Don't edit role of this User");
                            }

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
                //alert(answer );
                var str = answer.split('-');
                $scope.invite = {};
                $scope.invite.pageId = $stateParams.pageId;
                $scope.invite.invitedByName = $cookies.get('display-name');
                $scope.invite.emailDes = str[0];
                $scope.invite.role = str[1];
               // alert($scope.invite.invitedByName + $scope.invite.emailDes + $scope.invite.role );
                pageService.inviteUser($scope.invite).then(function (response) {
                    if(response.data == 'success'){
                        showAlert('Send Email Successly!');
                    }else {
                        showAlert('Do not use this email! Try Again');                    }
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

        function showAlert(message) {
            // Appending dialog to document.body to cover sidenav in docs app
            // Modal dialogs should fully cover application
            // to prevent interaction outside of dialog
            $mdDialog.show(
                $mdDialog.alert()
                // .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Message From SMM Tool')
                    .textContent(message)
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Got it!')
                // .targetEvent(ev)
            );
        }
    });