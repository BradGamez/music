var myApp = angular.module('myApp', ['ngRoute']);


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

myApp.controller('appController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams, ngAudio){
    console.log("appController is working")

    //Player stuff
    $scope.play = true;
        play= true;
        
        $scope.switchBack = function(id) {
			$http.get('/api/music/count').then(function(response){
				count = response.data;
				if(id - 1 == 0) {
					$window.location.href = '#!/music/read/' + count;
				} else {
				$window.location.href = '#!/music/read/' + (id - 1);
				}
			});
		}

		$scope.switchNext = function(id) {
			$http.get('/api/music/count').then(function(response){
				count = response.data;
				if(id + 1 > count) {
					$window.location.href = '#!/music/read/' + 1;
				} else {
				$window.location.href = '#!/music/read/' + (id + 1);
				}
			});
		}
	
	$scope.playDetect = function() {
		$scope.play = !$scope.play;
		play = !play;
	}
    
    $scope.getSongs = function(){

       $http.get('/api/music').then(function(response){
        $scope.songs = response.data;
        });
    }

    //Data from api

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

    $scope.playSong = function() {
        var id= $routeParams.id;
        $http.get('/api/music/id=' + id).then(function(response){ //All client logic goes in then
            $scope.song = response.data;
            console.log(response.data.path);
            var audio = new Audio(response.data.path);
            console.log(audio.duration);
            audio.play();
        });
    }



}]);

