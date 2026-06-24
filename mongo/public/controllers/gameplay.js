 // create the controller and inject Angular's $scope
 myapp.controller('gameplayController', function($scope, $location) {

     if (!currentUser) {
         $location.path('/login');
         return;
     }

     //============================== LOAD THE CURRENT STAIN AND ITS 4 CLEANING PRODUCTS ================================
     function loadLevel() {
         var res = db.getCpToShow(currentUser.username);

         if (!res || !res[0]) return;

         $scope.image_path = "images/" + res[0].img_url;

         $scope.cp1 = db.getCpName(res[0].cp1_id)[0].product_name;
         $scope.cp2 = db.getCpName(res[0].cp2_id)[0].product_name;
         $scope.cp3 = db.getCpName(res[0].cp3_id)[0].product_name;
         $scope.cp4 = db.getCpName(res[0].cp4_id)[0].product_name;
     }

     loadLevel();

     //====================== USER CHOOSES A CLEANING PRODUCT: ADVANCE TO THE NEXT STAIN =============================
     $scope.choose = function(cp_chosen) {
         currentUser.levelUp(cp_chosen, loadLevel);
     }

 });
