angular.module('myApp')
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'home/home.html',
                controller:'homeCtrl',
                controllerAs:'vm'
            });
        $urlRouterProvider.otherwise('/home');
    });
