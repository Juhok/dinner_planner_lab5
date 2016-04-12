dinnerPlannerApp.controller('OverviewCtrl', function ($scope,Dinner) {
	$scope.numberOfGuests = Dinner.getNumberOfGuests();
	$scope.menu = Dinner.getFullMenu();

	// console.log("menu = vvv");
	// console.log($scope.menu);

	$scope.getPrice = function(id){
    	return Dinner.getFoodPriceFromMenu(id);
  	}

  	$scope.totalMenuPrice = function(){
    	return Dinner.getTotalMenuPrice();
  	}

});