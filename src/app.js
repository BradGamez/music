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
        .when('/music/add', {
            templateUrl: 'views/add_song.html',
            controller: 'appController'
        })
        .when('/music/success', {
            templateUrl: 'views/success.html',
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

    
    $scope.getSongs = function(){

       $http.get('/api/music').then(function(response){
        $scope.songs = response.data;
        });
    }

    $scope.getSongById = function() {
        var id= $routeParams.id;
        $http.get('/api/music/id=' + id).then(function(response){ //All client logic goes in then
        $scope.song = response.data;
        });
    }

    $scope.addSong = function() {
        $http.post('/api/music/', $scope.song).then(function (response) {

            window.location.href='#!/music/success';
        });
    }

    $scope.updateSong = function() {
        var id= $routeParams.id;
        $http.put('/api/music/id=' + id, $scope.song).then(function (response) {
                
            window.location.href='#!/music/success';
        });
    }

    $scope.deleteRecipe = function(id) {
        $http.delete('/api/music/id=' + id, $scope.song).then(function (response) {

            window.location.href='#!/music/success';
        });
    }


}]);

