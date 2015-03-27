'use strict';

angular.module('bconfApp')
    .controller('VoiceCall', function ($scope, $mdToast, constant, state, contactId, incomingCall, ChatModel) {
        $scope.state = state;

        switch (state){
           case constant.CALL_STATE.DIALLING:
               startCall(contactId);
               //play tone
                break;
            case constant.CALL_STATE.INCOMING:
                //play alert
                break;
            default:
                console.log('some error');
                $mdToast.hide();
        }

        $scope.$on('closedCall', function(){
            $scope.state = constant.CALL_STATE.NONE;
            $mdToast.hide();
        });
        $scope.$on('connectedCall', function(){
            $scope.state = constant.CALL_STATE.CONNECTED;
        });

        function connected(){
            $scope.state = constant.CALL_STATE.CONNECTED;
        }

        function startCall(id){
            ChatModel.startCall(id).then(function () {
                console.log('connecting...');
            }, function () {
                console.log('error');
            });
        }

        $scope.handUp = function () {
            ChatModel.hangUp();
            $mdToast.hide();
        };

        $scope.answerCall = function(){
            ChatModel.answerCall(incomingCall);
            //connected();
        };


    });

