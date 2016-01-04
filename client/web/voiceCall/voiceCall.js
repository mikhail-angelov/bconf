'use strict';

export default function ($scope, constant, ChatModel) {

    switch ($scope.callInfo.state) {
      case constant.CALL_STATE.DIALLING:
        //play tone
        break;
      case constant.CALL_STATE.INCOMING:
        //play alert
        break;
      default:
        console.log('some error');
    }

    $scope.handUp = function () {
      ChatModel.hangUp();
      $scope.closeCall();
    };

    $scope.answerCall = function () {
      ChatModel.answerCall($scope.callInfo.incomingCall);
      $scope.connectedCall();
    };

    $scope.isIncoming = function(){
      return $scope.callInfo.state == constant.CALL_STATE.INCOMING;
    };
    $scope.isDialing = function(){
      return $scope.callInfo.state == constant.CALL_STATE.DIALLING;
    };
    $scope.isConnected = function(){
      return $scope.callInfo.state == constant.CALL_STATE.CONNECTED;
    };
  };

