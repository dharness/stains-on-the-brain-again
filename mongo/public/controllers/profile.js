// create the controller and inject Angular's $scope
var user_id;
var currentUser;
var allMatchs = [];
var currentMatchIndex = 0; //default is the first match in the array



myapp.controller('profileController', function($scope, $http) {


    /* USE THIS BEFORE ENTERING ANY USER-SPECIFIC PAGE */
    $http.get("/authorize").success(function(res) {

        if (res) { //if res is false, nobody is logged in
            currentUser = res; //otherwise, res stores the current user
        }

    });


    //left button
    $scope.previousMatch = function() { //make the decrements circular

        if (currentMatchIndex > 0) { //make the increments circular
            currentMatchIndex--;
        } else {
            currentMatchIndex = 9; //put the index at the end
        }

        updateMatchDisplay($scope);
    }

    //right button
    $scope.nextMatch = function() {

        if (currentMatchIndex < allMatchs.length - 1) { //make the increments circular
            currentMatchIndex++;
        } else {
            currentMatchIndex = 0; //put the index at start
        }

        updateMatchDisplay($scope);
    }

    //get the account info for the currently logged in user
    $http.get("/user/" + currentUser.username).success(function(data) {
        user_id = data[0].user_id;
        $scope.firstname = data[0].firstname;
        $scope.lastname = data[0].lastname;
        $scope.username = data[0].username;
        $scope.email = data[0].email;
        $scope.gender = data[0].gender;
        $scope.preference = data[0].preference;
        $scope.country = data[0].country;

        //get the currently logged in user's matches
        $http.get("/matches/" + currentUser.username).success(function(matches) {

            //loop thru first 10 matches
            matches.forEach(function(match) {
                if (user_id == match.user1_id) { //if the first user in the match is current user
                    //get the data about each match
                    $http.get("/user_id/" + match.user2_id).success(function(user) {
                        allMatchs.push(user[0]);
                        if (allMatchs.length >= 10) {
                            updateMatchDisplay($scope);
                        }
                    });

                } else if (user_id == match.user2_id) { //if the second user in the match is current user

                    $http.get("/user_id/" + match.user1_id).success(function(user) {
                        allMatchs.push(user[0]);
                        if (allMatchs.length >= 10) {
                            updateMatchDisplay($scope);
                        }
                    });

                }
            });


        });

    });

});


//updates the current matched user's data 
function updateMatchDisplay($scope) {
    $scope.matchFirstname = allMatchs[currentMatchIndex].firstname;
    $scope.matchEmail = allMatchs[currentMatchIndex].email;
    $scope.matchGender = allMatchs[currentMatchIndex].gender;
    $scope.matchPreference = allMatchs[currentMatchIndex].preference;
    $scope.matchCountry = allMatchs[currentMatchIndex].country
}