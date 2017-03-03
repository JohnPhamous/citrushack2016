(function(){
    'use strict';

    /**
     * Judging View controller
     */

     function judgeCtrl ($scope) {
         // Name of the view
         $scope.pageView = 'judging-view';
     }

     /**
      * Register controller
      */

     angular.module('CitrusHack.controllers')
         .controller('JudgeCtrl', ['$scope', judgeCtrl])

})();
