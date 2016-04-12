// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource, $cookieStore) {
  

  if ($cookieStore.get("guest")){
    var guest = $cookieStore.get("guest");
    console.log("cookie guest = "+guest);
  } else{
    var guest = 1;
    $cookieStore.put("guest", guest);
     console.log("NO cookie guest = "+guest);
  }

  var selectedMenu = [];  

  var selectedDish = 0;

  var preparedDish;

  var self = this;

  this.apiKey = "F088t4s6QGI5T92W3Nwiju8jFU52J8SP";


  this.setNumberOfGuests = function(num) {
    guest = num;
    $cookieStore.put("guest", guest);
    return guest;
  }
  
  this.getNumberOfGuests = function() {
    return guest;
  }


  //Returns all the dishes on the menu.
  this.getFullMenu = function() {
    return selectedMenu;
  }

  this.getDishFromMenu = function(id){
    // console.log("getDishFromMenu // selectedMenu.length = "+selectedMenu.length);
    for (var i = 0; i < selectedMenu.length ; i++){
      if(selectedMenu[i].RecipeID == id){
        return selectedMenu[i];
      }
    }
  }
  
  this.getDishIngredientsFromMenu = function(id){
    var dish = this.getDishFromMenu(id);
    return dish.Ingredients;
  }
  this.getFoodPriceFromMenu = function(id){

    var allIngredients = this.getDishIngredientsFromMenu(id);
    var foodPrice = 0;

    // console.log("getFoodPriceFromMenu // allIngredients = vvv");
    // console.log(allIngredients);

    for (var i = 0 ; i < allIngredients.length; i++){
      var a =allIngredients[i].Quantity*1;

      foodPrice += a;
    }
    return foodPrice;
  }
  

  this.getDishIngredients = function(){
    var dish = this.getPreparedDish();
    return dish.Ingredients;
  }


  this.getFoodPrice = function(){ //FOR PENDING DISH ONLY

    var allIngredients = this.getDishIngredients();
    var foodPrice = 0;
    //console.log("getFoodPrice // allIngredients = vvv");
    //console.log(allIngredients);

    for (var i = 0 ; i < allIngredients.length; i++){
      var a =allIngredients[i].Quantity*1;
      foodPrice += a;
    }
    return foodPrice;
  }

  
  //Returns all ingredients for all the dishes on the menu.
  this.getAllIngredients = function() {
    // console.log("allIngredients // selectedMenu.length = "+selectedMenu.length);

    var allIngredients =[];

    //fullMenu[i]["ingredients"].length
    for (var i = 0; i < selectedMenu.length ; i++){
      allIngredients.push(selectedMenu[i]["ingredients"]);
      // console.log("allIngredients // selectedMenu["+i+"].ingredients = "+selectedMenu[i]["ingredients"]);
    }
    return allIngredients;
  }
    
    
  //Returns the total price of the menu (all the ingredients multiplied by number of guests).
  this.getTotalMenuPrice = function() {
    var totalPrice = 0;
   
    for (var i=0; i<selectedMenu.length; i++){
      // console.log("getTotalMenuPrice // selectedMenu["+i+"].id = "+selectedMenu[i].RecipeID);
      totalPrice += this.getFoodPriceFromMenu(selectedMenu[i].RecipeID);
    }
    
    var grandPrice = totalPrice * this.getNumberOfGuests();
    //console.log("grandPrice = "+grandPrice+" = totalPrice "+totalPrice+" * numberofGuests "+this.getNumberOfGuests());
    return grandPrice;

  }

  //Adds the passed dish to the menu. If the dish of that type already exists on the menu
  //it is removed from the menu and the new one added.
  this.addDishToMenu = function() {
    if(selectedMenu.length>0){
      for (var i=0 ;  i < selectedMenu.length ; i++ ){
        if(this.getPreparedDish().Category == selectedMenu[i].Category){
          selectedMenu.splice(i, 1); 
        }
      }
    }
    selectedMenu.push(this.getPreparedDish()); //add the new dish

    var temp_arr = [];
    for (var j=0; j<selectedMenu.length; j++){
      //console.log("addDishToMenu // RecipeID = "+selectedMenu[j].RecipeID);
      temp_arr.push(selectedMenu[j].RecipeID);

    }
    //console.log("addDishToMenu // temp_arr = "+temp_arr);
    selectedMenuId = temp_arr;
    //console.log("addDishToMenu // selectedMenuId = "+selectedMenuId);
    $cookieStore.put("selectedMenuId", selectedMenuId);
    
  }
  this.getSelectedMenuId = function(){
    return selectedMenuId;
  }

  this.removeDishFromMenu = function(id) {
    for (var i=0 ; i < selectedMenu.length ; i++){
      if (selectedMenu[i].RecipeID == id){
        selectedMenu.splice(i, 1);
      }
    }

    var temp_arr = [];
    for (var j=0; j<selectedMenu.length; j++){
      temp_arr.push(selectedMenu[j].RecipeID);
    }
    selectedMenuId = temp_arr;
    $cookieStore.put("selectedMenuId", selectedMenuId);
  }


  //function that returns the ID from the picture that is clicked in mainView
  this.addPicId = function(id){
    selectedDish = id;
  }
  
  this.getPicId = function(){
    return selectedDish;
  }

  this.keepPreparedDish = function(data){
    preparedDish = data;
  }

  this.getPreparedDish = function(){
    return preparedDish;
  }
  
  this.getFullObjectMenu = function(){
    for (var i=0 ;  i < selectedMenuId.length ; i++){
      var obj = this.Dish.get({id:selectedMenuId[i]}).$promise.then(function (data) {
        selectedMenu.push(data);
      })
      //console.log("Hello");
      //console.log(obj);
    }
  }

  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details

  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:self.apiKey});
  this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:self.apiKey}); 
  //in the controller, if we want to search for dishes we can call Dinner.DishSearch.get({title_kw:'chicken'}) 
  //or to get a single dish we would do Dinner.Dish.get({id:12345}).


  if ($cookieStore.get("selectedMenuId")){
    var selectedMenuId = $cookieStore.get("selectedMenuId");
    this.getFullObjectMenu();
    console.log("cookie selectedMenuId = "+selectedMenuId);
  } else{
    var selectedMenuId =[];
    //$cookieStore.put("selectedMenuId", selectedMenuId);
    console.log("NO cookie selectedMenuId = "+selectedMenuId);
  }
  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});