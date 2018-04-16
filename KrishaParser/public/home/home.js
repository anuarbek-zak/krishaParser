angular.module('myApp').controller('homeCtrl',function ($http,$cookies,$state,$localStorage,authService) {
    var vm = this;
    vm.html = "";

    authService.isLoggedIn();

    $http.get("/api/users")
        .success(function(response){
           console.log(response);
        })
        .error(function(err){
            console.log(err);
        });
    vm.titles = [];
    vm.links = [];

    var checkDuplicates = function (arr) {
        var map = {};
        for(var i in arr){
             if(map[i]) return false;
             map[i]=true;
        }
        return true;
    };

    vm.getKrisha = function () {

        console.log("lal");
        $http.get("/api/krisha/")
            .success(function(response){
               if(vm.links.length>0){
                   vm.titles = vm.titles.concat(response.titles);
                   vm.links = vm.links.concat(response.links);
               }else{
                   vm.titles = response.titles;
                   vm.links = response.links;
               }
                console.log(checkDuplicates(vm.links));
            })
            .error(function(err){
                console.log(err);
            });
    };

    vm.logout = function () {
      authService.logout();
    };

});
