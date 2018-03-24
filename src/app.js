var myApp = angular.module('myApp', ['ngRoute', 'shiffman']);


myApp.config(['$routeProvider', function($routeProvider){
    
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'appController'
        })
        .when('/music', {
            templateUrl: 'views/all_songs.html',
            controller: 'appController'
        })
        .when('/music/read/:id', {
            templateUrl: 'views/player.html',
            controller: 'p5Controller'
        })
        .when('/auth/login', {
            templateUrl: 'views/home.html',
            controller: 'appController'
        })
        .otherwise({
            redirecTo: '/'
        });
}]);
//use to init

//Load module here
angular.module('shiffman', []);

myApp.run(function(){
//use during app runs
});

myApp.controller('appController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
    console.log("appController is working")

    
    //For Musics //
    $scope.getSongs = function(){

       $http.get('/api/music').then(function(response){
        $scope.songs = response.data;
        });
    }

}]);

