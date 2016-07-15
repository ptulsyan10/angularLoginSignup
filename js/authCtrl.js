app.controller('authCtrl', function ($scope, $rootScope, $routeParams, $location, $http, toaster) {
    $scope.login = {};
    $scope.signup = {};
    $scope.doLogin = function () {
        var request = $http({
            method: "POST",
            url: "api/login.php",
            data: $scope.login,
            headers: { 'Content-Type': 'application/json' }
        });
        request.success(function (data) {
            if(data.status == "success") {
                toaster.pop(data.status, "", data.message, 10000, 'trustedHtml');
                $location.path('dashboard');
            } else {
                toaster.pop(data.status, "", data.message, 10000, 'trustedHtml');
                $location.path('login');
            }
        });
    };
    $scope.logout = function () {
        var request = $http({
            method: "get",
            url: "api/logout.php",
        });
        request.success(function (data) {
            toaster.pop(data.status, "", data.message, 10000, 'trustedHtml');
            $location.path('login');
        });
    };
    $scope.signup = {email:'',password:'',name:'',phone:'',address:''};
    $scope.signUp = function () {
        var request = $http({
            method: "POST",
            url: "api/signup.php",
            data: $scope.signup,
            headers: { 'Content-Type': 'application/json' }
        });
        request.success(function (data) {
            if(data.status == "success") {
                toaster.pop(data.status, "", data.message, 10000, 'trustedHtml');
                $location.path('login');
            } else {
                toaster.pop(data.status, "", data.message, 10000, 'trustedHtml');
                $location.path('signup');
            }
        });
    };

    $scope.todos = [];
    var request = $http({
        method: "POST",
        url: "api/users.php",
        headers: { 'Content-Type': 'application/json' }
    });
    request.success(function (data) {
        angular.forEach(data, function(value) {
          $scope.todos.push({
              id: value.id,
              email: value.email,
            });
        });
    });
    /*for (var i = 0; i < 15; i++) {
        $scope.todos.push({
          //face: imagePath,
          what: "Brunch this weekend?",
          who: "Min Li Chan",
          notes: "I'll be in your neighborhood doing errands."
        });
    }*/
});