myapp.controller('signupController', function($scope, $http, $location) {

    $scope.submit = function() {

        var user = {
            password: $('#pwd').val(),
            username: $('#username').val(),
            firstname: $('#firstname').val(),
            lastname: $('#lastname').val(),
            email: $('#email').val(),
            level_num: 0,
            country: $('#country').val(),
            gender: $('#gender').val(),
            preference: $('#preference').val()
        }

        $http.post('/user/create', user).success(function(data, status, headers, config) {
            $location.path("/login")
        }).
        error(function(data, status, headers, config) {
            console.log('ERROR: ')
        })
    }
})