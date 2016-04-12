dinnerPlannerApp.controller('PreparationCtrl', function ($scope,Dinner) {

	$scope.numberOfGuests = Dinner.getNumberOfGuests();
	$scope.menu = Dinner.getFullMenu();

	// console.log("menu = vvv");
	// console.log($scope.menu);

});