let app=angular.module('myapp',["ngRoute"]);

// app.factory('MyFactoryService', function() {
//   var factory = {};
//   factory.userData = function(name,age,Address) {
//       this.name=name;
//       this.age=age;
//       this.Address=Address
//   };
  
//   return factory;
// });


app.directive("blockclicked", function() {
  return {
      template : `<div ng-repeat="data in blogData" style="text-align:center">
      <h2 style="color:red">Hello you Clicked this blog</h2>
      <h4 style="color:blue">ID : {{data.id}}</h4>
      <h3 style="color:green">Title : {{data.title}}</h3>
      </div>`
  };
});


app.controller('myctrl',function($scope,$http,$location){

 $scope.fetchedData=[];
 $scope.userArray=[];
 $scope.blogData=[];
 $scope.currentLocation=$location;
 $scope.user={
   name:"",
   age:'',
   Address:""
 }




//  $scope.userData=function($name,$age,$Address){

//       this.name=$name;
//       this.age=$age;
//       this.Address=$Address;

//  }


$scope.userboxclicked=($index)=>{
  
   $scope.userArray.splice($index,1);
   
}


 $scope.blogClicked=($id)=>{

  $scope.blogData[0]=$scope.fetchedData[$id-1];
  $location.path('/blogClicked');
  // console.log($scope.blogData)
  // console.log($location.path())
}


$scope.formSubmit=()=>{
  temp1=$scope.user; 
  if(temp1.name!=''&&temp1.age!=''&&temp1.Address!=''){
  let temp={...temp1};
  $scope.userArray.push(temp);
  $scope.user.name='';
  $scope.user.age='';
  $scope.user.Address='';
  // console.log($scope.userArray)
  }
  else{
    alert("Please fill all input fields")
  }

}




 $http.get('https://jsonplaceholder.typicode.com/todos/')
.then(res=>$scope.fetchedData=res.data)});



app.config(function($routeProvider) {

$routeProvider
// .when("/", {
//   template : '<h2  style="text-align: center; color: blue;font-weight: bolder;">Welcome</h2>'
// })
.when("/",{
  templateUrl:'./home/home.html'
})
.when("/api",{
  templateUrl:"./main/main.htm"
})
.when("/hang", {
  templateUrl : "./hangmanGame/hangmanGame.html"
})
.when("/blogClicked",{

  template:'<blockclicked></blockclicked>'
            
})



});

