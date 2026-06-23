var myStainCount = 100; // create the controller and inject Angular's $scope
myapp.controller('loginController', function($scope, $http, $location) {

$scope.pageClass = 'page-login'
// $scope.showNav = true

    //submit the login request
    $scope.submit = function() {

        var username = $scope.usr;
        var password = $scope.pwd;

        $http.get("/login/" + username + '/' + password).success(function(res) {

            if (res) {
                console.log(res);
                currentUser = new User(res, $http)
                $location.path("/mystains");
            } else {
                alert('sorry, that username sucks or something');
            }

        });

    }
});