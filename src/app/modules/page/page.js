// /**
//  * Created by thanh huyền on 09-Jan-17.
//  */
// 'use strict';
//
// angular.module('dashboard', [])
//    
// .config(['$stateProvider', function ($stateProvider) {
//     $stateProvider
//         .state('app.dashboard.page', {
//         url: '/page',
//         templateUrl: 'src/app/modules/page/page-list.html',
//         controller: 'pageCtrl',
//         resolve: {
//             initialPageFirst: ['pageService', function (pageService) {
//                 return pageService.getPageFB()
//                     .then(function (response) {
//                         return response.data;
//                     });
//             }]
//         }
//     });
// }]);