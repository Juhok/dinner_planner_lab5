// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,$routeParams,Dinner) {

  $scope.numberOfGuests = Dinner.getNumberOfGuests();
  //$scope.menu = Dinner.getFullMenu();

  $scope.menu = function(){
    return Dinner.getFullMenu();
  }

  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
  }

  $scope.getPrice = function(id){
    return Dinner.getFoodPriceFromMenu(id);
  }

  $scope.deleteDish = function(id){
    Dinner.removeDishFromMenu(id);
  }

  $scope.totalMenuPrice = function(){
    return Dinner.getTotalMenuPrice();
  }

  // $scope.getPreparedDish = function(){
  //   return Dinner.getPreparedDish();
  // }


  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

});