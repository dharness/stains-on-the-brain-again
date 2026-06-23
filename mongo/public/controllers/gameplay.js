myapp.controller('gameplayController', function($scope, $http) {

    //====================== USER CHOOSES A CLEANING PRODUCT=============================

    gotoLevel(currentUser.level_num + 1, $scope)

    //HACK - but a small one
    $scope.cp1 = "Button 1"
    $scope.cp2 = "Button 2"
    $scope.cp3 = "Button 3"
    $scope.cp4 = "Button 4"

    $('.cleaningProduct').click(function() {

        if (currentUser.level_num < 100) {
            currentUser.levelUp($(this).text())
            currentUser.updateMatches($(this).text())
            gotoLevel(currentUser.level_num, $scope)

        } else alert('Busted your cap sailor!');
    })
});

function gotoLevel(level_num, $scope) {
    $scope.image_path = "../images/raw_stains/" + level_num + ".png"
}