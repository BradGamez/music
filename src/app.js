var myApp = angular.module('myApp', ['ngRoute', 'angularSoundManager']);


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
            controller: 'appController'
        })
        .when('/auth/login', {
            templateUrl: 'views/home.html',
            controller: 'appController'
        })
        .when('/music/add', {
            templateUrl: 'views/add_song.html',
            controller: 'appController'
        })
        .when('/success', {
            templateUrl: 'views/success.html',
            controller: 'appController'
        })
        .when('/error', {
            templateUrl: 'views/error.html',
            controller: 'appController'
        })
        .otherwise({
            redirecTo: '/'
        });
}]);
//use to init

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

            window.location.href='#!/success';
        });
    }

    $scope.deleteSong = function(id) {
        $http.delete('/api/music/id=' + id, $scope.song).then(function (response) {

            window.location.href='#!/success';
            shiffman.remove();
        });
    }

}]);

