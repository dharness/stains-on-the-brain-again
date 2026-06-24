myapp.controller('signupController', function($scope, $location) {

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

        db.createUser(user);
        $location.path("/login")
    }
})