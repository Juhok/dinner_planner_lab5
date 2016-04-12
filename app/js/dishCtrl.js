// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {
  
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case
  	//console.log($routeParams.dishId);

	$scope.status = "Searching...";

	Dinner.Dish.get({id:$routeParams.dishId},function(data){
		//console.log("get data");
		//console.log(data);
		$scope.dish=data;
	    $scope.status = "";
	    Dinner.keepPreparedDish(data);
	    $scope.foodPrice = Dinner.getFoodPrice();

	},function(data){
	    $scope.status = "There was an error";
	});

	$scope.add = function(id){
		Dinner.addDishToMenu();
	}

	// $scope.totalFoodPrice = function(){
	// 	console.log("totalFoodPrice");
	// 	return Dinner.getFoodPrice();
	// }
	
});