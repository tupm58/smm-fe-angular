/**
 * Created by MinhTu on 1/17/2017.
 */
/**
 * Created by thanh huyền on 10-Jan-17.
 */
(function () {
    'use strict';

    angular
        .module('services')
        .factory('ruleService', ruleService);

    function ruleService($rootScope, $http, $cookies, $q, $location, $state) {

        return {
            getRule: getRule,
            addRule: addRule,
            editRule: editRule,
            deleteRule: deleteRule
        };
        function getRule(pageId) {
            return $http({
                url: config.basicUrl + "rule/page/" + pageId,
                method: 'GET'
            })
        }

        function editRule(ruleId, opts) {
            return $http({
                url: config.basicUrl + "rule/" + ruleId,
                method: 'PUT',
                data: opts
            })
        }

        function addRule(opts) {
            return $http({
                url: config.basicUrl + "rule",
                method: 'POST',
                data: opts
            });
        }


        function deleteRule(rule) {
            return $http({
                url: config.basicUrl + "/delete/rule/" + rule.ruleId,
                method: 'DELETE'
            })
        }

    }
})();