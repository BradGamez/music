angular.module('shiffman').controller('p5Controller',['$scope', '$http', '$routeParams', '$window', function($scope, $http, $routeParams, $window){
	console.log("p5 Controller loaded...");
	
		$scope.play = true;
		play= true
	
		$scope.playDetect = function() {
			$scope.play = !$scope.play;
			play = !play;
		}

		$scope.deleteSong = function(id) {
			$http.delete('/api/music/id=' + id, $scope.song).then(function (response) {
	
				window.location.href='#!/music/success';
				shiffman.remove();
			});
		}

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
	
		$scope.getSongById = function() {
			var id= $routeParams.id;
			$http.get('/api/music/id=' + id).then(function(response){ //All client logic goes in then
				$scope.song = response.data;
				songPath = response.data.path;
	
				var sketch = function(shiffman) {
	
					var song;
					var url;
					var currentTime;
					var slider;
			
					shiffman.preload = function() {
						shiffman.soundFormats('mp3');
						song = shiffman.loadSound(songPath);
					}
	
					shiffman.setup = function() {
						url = shiffman.getURL();
						shiffman.noCanvas();
						console.log(song.isLoaded());
						song.play();
					}
			
					shiffman.draw = function() {
						//the trick to stop p5 process if controller has changed.
						var current_url = shiffman.getURL()
						if(current_url != url) {
						shiffman.remove();
						}
					}
	
					shiffman.mouseClicked = function() {	
						//Fires only if playButton is clicked
						if(!$scope.play && song.isPlaying()) {
							song.pause();
						}
	
						if($scope.play && !song.isPlaying()) {
							song.play();
						}
					}
				}
	
				var myP5 = new p5(sketch);
			
			});
		}
	
}]);