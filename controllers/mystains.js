myapp.controller('mystainsController', function($scope) {

     $scope.isActive = function(viewLocation) {
        // return viewLocation === $location.path();
        return true
    };

    $scope.pageClass = 'page-about';

    var mystainCount = 1;

    currentUser.getMystains(function(data) {
        //do things with mystains
        $('#Container').append("<img src='../images/raw_stains/" + 1 + ".png'/>"); // TODO - for testing, remove
    })

});