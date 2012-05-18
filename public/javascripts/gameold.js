paper.install(window);

$(document).ready(function(){
	paper.setup('gameScreen');
	
	now.name = prompt("What's your name ?", "");
	
	function onMouseMove(event) {
	    var point = event.point - segments[0].point;
	    point = point / point.length * 10;
	    
	    path.insert(0, segments[0].point + point);
	    path.segments[path.segments.length - 1].remove();
	    path.smooth();
	}
    
});

