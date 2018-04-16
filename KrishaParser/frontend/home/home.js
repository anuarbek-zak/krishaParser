angular.module('myApp').controller('homeCtrl',function ($http,$cookies,$state,$localStorage,authService) {
    var vm = this;

    authService.isLoggedIn();

    $http.get("/api/users")
        .success(function(response){
           console.log(response);
            vm.users = response;
            vm.user = $localStorage.user;
            console.log("home",$localStorage.user);
        })
        .error(function(err){
            console.log(err);
        });

    vm.logout = function () {
      authService.logout();
    };

});
