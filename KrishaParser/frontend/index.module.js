var myApp = angular.module('myApp', ['ui.router','ngAnimate','ngMaterial','ngCookies','ngStorage'])
    .run(function ($rootScope,$localStorage,authService,$state) {
    console.log('app started');
    $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams) {
            if($localStorage.user){
                if(toState.name=='login'||toState.name=='signup'){
                    event.preventDefault();
                    window.history.forward();
                }
            }
        }
    );
});
