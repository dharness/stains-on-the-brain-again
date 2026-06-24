var myStainCount = 100; // create the controller and inject Angular's $scope
myapp.controller('loginController', function($scope, $location) {

$scope.pageClass = 'page-login'
// $scope.showNav = true

    // pre-fill for demo purposes - any value works, see db.login() in data.js
    $scope.usr = 'demo'
    $scope.pwd = 'Tr0ub4dor&3xQ!9zM7'

    //submit the login request
    $scope.submit = function() {

        var username = $scope.usr;
        var password = $scope.pwd;

        var res = db.login(username, password);

        if (res) {
            currentUser = new User(res)
            $location.path("/gameplay");
        } else {
            alert('sorry, that username sucks or something');
        }
    }
});