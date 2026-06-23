// create the controller and inject Angular's $scope
myapp.controller('loginController', function($scope, $http, $location) {

    //submit the login request
    $scope.submit = function() {

        var username = $scope.usr;
        var password = $scope.pwd;

        $http.get("/login/" + username + '/' + password).success(function(res) {

            if (res) {
                console.log(res);
                $location.path("/profile");
            } else {
                alert('sorry, that username sucks or sometjing');
            }

        });

    }

});