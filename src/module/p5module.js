angular.module('shiffman').controller('p5Controller',['$scope', '$http', '$routeParams', '$window', function($scope, $http, $routeParams, $window){
	console.log("p5 Controller loaded...");
	
		$scope.play = false;
		play= false
		var audio;
		$scope.loadState = true;
	

		$scope.playDetect = function() {
			if(play) {
				audio.pause();
			}
			if(!play) {
				audio.play();
			} 
			$scope.play = !$scope.play;
			play = !play;
		}

		$scope.deleteSong = function(id) {
			$http.delete('/api/music/id=' + id, $scope.song).then(function (response) {
	
				window.location.href='#!/music/success';
			});
		}

		$scope.switchBack = function(id) {
			audio.load();
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
			audio.load();
			$http.get('/api/music/count').then(function(response){
				count = response.data;
				if(id + 1 > count) {
					$window.location.href = '#!/music/read/' + 1;
				} else {
				$window.location.href = '#!/music/read/' + (id + 1);
				}
			});
		}
	
		$scope.getSongById = function() {
			var id= $routeParams.id;
			$http.get('/api/music/id=' + id).then(function(response){ //All client logic goes in then

				$scope.song = response.data;
				songPath = response.data.path;
				
				audio = new Audio(songPath);
				console.log(audio.readyState);
				if(audio.readyState == 0) {
					$scope.loadState = false;
					audio.play();
					play = true;
					$scope.play = true;
				}
				
			});
		}
	
}]);