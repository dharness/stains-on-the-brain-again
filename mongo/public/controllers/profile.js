// create the controller and inject Angular's $scope
var user_id;
var currentUser;
var allMatchs = [];
var currentMatchIndex = 0; //default is the first match in the array



myapp.controller('profileController', function($scope, $location) {

    if (!currentUser) {
        $location.path('/login');
        return;
    }

    //left button
    $scope.previousMatch = function() { //make the decrements circular

        if (currentMatchIndex > 0) { //make the increments circular
            currentMatchIndex--;
        } else {
            currentMatchIndex = allMatchs.length - 1; //put the index at the end
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
    var data = db.getUser(currentUser.username);
    user_id = data[0].user_id;
    $scope.firstname = data[0].firstname;
    $scope.lastname = data[0].lastname;
    $scope.username = data[0].username;
    $scope.email = data[0].email;
    $scope.gender = data[0].gender;
    $scope.preference = data[0].preference;
    $scope.country = data[0].country;

    //get the currently logged in user's matches
    allMatchs = [];
    db.getMatches(currentUser.username).forEach(function(match) {
        //the other user in the match (whichever id isn't this user's)
        var otherId = (user_id == match.user1_id) ? match.user2_id : match.user1_id;
        var user = db.getUserById(otherId);
        if (user[0]) allMatchs.push(user[0]);
    });

    if (allMatchs.length) {
        updateMatchDisplay($scope);
    }

});


//updates the current matched user's data 
function updateMatchDisplay($scope) {
    $scope.matchFirstname = allMatchs[currentMatchIndex].firstname;
    $scope.matchEmail = allMatchs[currentMatchIndex].email;
    $scope.matchGender = allMatchs[currentMatchIndex].gender;
    $scope.matchPreference = allMatchs[currentMatchIndex].preference;
    $scope.matchCountry = allMatchs[currentMatchIndex].country
}