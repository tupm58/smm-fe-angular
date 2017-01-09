'use strict';

angular
    .module('dashboard')
    .controller('dashboardCtrl', function ($scope, $rootScope) {
        console.log('inside dashboard controller');

        $scope.todos = [];
        for (var i = 0; i < 15; i++) {
            $scope.todos.push({
                what: "Brunch this weekend?",
                who: "Min Li Chan",
                notes: "I'll be in your neighborhood doing errands."
            });
        }
    });