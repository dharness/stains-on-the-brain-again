// create the controller and inject Angular's $scope
myapp.controller('signupController', function($scope, $http) {

    console.log('in signupController');

    $scope.submit = function() {

        // var user = {
        //     password: $('#pwd').val(),
        //     username: $('#username').val(),
        //     firstname: $('#firstname').val(),
        //     lastname: $('#lastname').val(),
        //     email: $('#email').val(),
        //     level_num: 0,
        //     country: $('#country').val(),
        //     gender: $('#gender').val(),
        //     preference: $('#preference').val()
        // };

        var user = {
            password: "pwd",
            username: "username",
            firstname: "firstname",
            lastname: "lastname",
            email: "email",
            level_num: 0,
            country: "country",
            gender: "M",
            preference: "F"
        };

        console.log('user: ' + user.toSource());

        $http.post('/user/create', user).success(function(data, status, headers, config) {

            console.log('in a post');
        }).
        error(function(data, status, headers, config) {

            console.log('ERROR: ');
        });


    };
});