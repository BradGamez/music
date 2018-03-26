angular.module('shiffman').controller('p5Controller',['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
	console.log("p5 Controller loaded...");
	
		$scope.play = true;
		play= true
	
		$scope.playDetect = function() {
			$scope.play = !$scope.play;
			play = !play;
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
	
		$scope.sliderDetected = false;
	
		$scope.sliderDetect = function() {
			$scope.sliderDetected = true;
		}
	
		convertInPercent = function(total, current) {
			percent = Math.floor((100 * current) / total);
			return percent;
		}
	
		backInSeconds = function(total, percent) {
			seconds = Math.floor((total * percent) / 100);
			return seconds;
		}
	
		changePlayTime = function(val) {
			song.currentTime() = val;
		}
	
		$scope.getSongById = function() {
			var id= $routeParams.id;
			$http.get('/api/music/id=' + id).then(function(response){ //All client logic goes in then
				$scope.song = response.data;
				songPath = response.data.path;
				console.log(songPath);
	
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
						slider = shiffman.select('#slider-color');
						url = shiffman.getURL();
						shiffman.noCanvas();
						//console.log(song.isLoaded());
						fullTime = Math.floor(song.duration());
						song.play();
	
						slider.jump = function() {
							if(song.isPlaying) {
							song.jump(backInSeconds(slider.value(), fullTime));
							}
						}
					}
			
					shiffman.draw = function() {
						//the trick to stop p5 process if controller has changed.
						var fullTime = Math.floor(song.duration());
						var currentTime = Math.floor(song.currentTime())
						var current_url = shiffman.getURL()
						if(current_url != url) {
						shiffman.remove();
						}
	
						songInPercent = convertInPercent(fullTime, currentTime);
						//slider.value(songInPercent);
						
						//val = slider.value();
	
					}
	
					shiffman.mouseClicked = function() {
						//Fires only if slider is clicked.
						if ($scope.sliderDetected) {
						slider.jump();
						$scope.sliderDetected = false;
						}
	
						//Fires only if playButton is clicked
						if(!$scope.play && song.isPlaying()) {
							song.pause();
						}
	
						if($scope.play && !song.isPlaying()) {
							song.play();
							slider.jump();
						}
					}
				}
	
				var myP5 = new p5(sketch);
			
			});
		}
	
}]);