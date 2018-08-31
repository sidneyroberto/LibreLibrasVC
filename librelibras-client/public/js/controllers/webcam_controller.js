var app = angular.module('librelibrasvc');
app.controller('WebCamController', function ($scope, $http) {

    /**
     * Configurações
     */

    $scope.config = {
        delay: 0,
        flashFallbackUrl: 'vendors/webcamjs/webcam.swf',
        shutterUrl: 'media/shutter.mp3',
        outputWidth: 640,
        outputHeight: 480,
        flashNotDetectedText: 'Seu browser não atende os requisitos mínimos para utilização da camera. ' +
            'Instale o ADOBE Flash player ou utilize os browsers (Google Chrome, Firefox ou Edge)'
    };

    $scope.showButtons = false;
    $scope.captureButtonEnable = false;
    $scope.progress = 0;
    $scope.showProgress = false;
    $scope.cameraOn = false;
    var enderecoServidor = 'https://librelibras-server.herokuapp.com/classificador';

    /**
     * Fim das configurações
     */



    /**
     * Envia a imagem pro servidor
     * @param {*} imagem 
     */
    $scope.onCaptureComplete = function (imagem) {
        $scope.sucesso = false;
        $scope.erro = false;
        $scope.resultado = '';
        $scope.progress = 100;
        $scope.showProgress = false;

        $http({
            url: enderecoServidor,
            method: 'POST',
            headers: { 'Content-Type': undefined },
            data: imagem[0]
        })
            .then(
                function (resposta) {
                    $scope.resultado = resposta.data.resultado;
                    $scope.resultado = $scope.resultado.split('?')[1];
                    $scope.sucesso = true;
                },
                function (erro) {
                    $scope.resultado = 'Ocorreu um erro ao tentar processar a imagem';
                    console.log(erro);
                    $scope.erro = true;
                }
            );

        $scope.$broadcast('ngWebcam_off');
        $scope.$broadcast('ngWebcam_on');
        $scope.captureButtonEnable = true;
    };

    $scope.onError = function (err) {
        console.log('webcamController.onError : ', err);
        $scope.showButtons = false;
    };

    $scope.onLoad = function () {
        console.log('webcamController.onLoad');
        $scope.showButtons = true;
        $scope.cameraOn = true;
    };

    $scope.onLive = function () {
        console.log('webcamController.onLive');
        $scope.captureButtonEnable = true;
    };

    $scope.onCaptureProgress = function (src, progress) {
        $scope.progress = progress;
        var result = {
            src: src,
            progress: progress
        }
        console.log(progress + '%');
        console.log('webcamController.onCaptureProgress : ', result);
    };

    $scope.capture = function () {
        $scope.$broadcast('ngWebcam_capture');
        $scope.showProgress = true;
        $scope.captureButtonEnable = false;
        $scope.progress = 0;
    };

    $scope.on = function () {
        $scope.$broadcast('ngWebcam_on');
        $scope.cameraOn = true;
    };

    $scope.off = function () {
        $scope.$broadcast('ngWebcam_off');
        $scope.captureButtonEnable = false;
        $scope.cameraOn = false;
    };
});
