var timerset = false, timer,count=0,webcam;
var video,photo,stop,container,sender;
var WebCamVideo = function(video, callback) {
    this.videoElement = video;

    var self = this;
    if (navigator.getUserMedia) {
        navigator.getUserMedia({ video: true }, function(stream) {
            self.videoElement.src = stream;
            self.videoElement.play();
			inited();
			
        }, callback);
    } else if (navigator.webkitGetUserMedia) {
        navigator.webkitGetUserMedia({ video: true }, function(stream) {
            self.videoElement.src = window.webkitURL.createObjectURL(stream);
            self.videoElement.play();
			inited();

        }, callback);
    }
};

WebCamVideo.prototype.getImage = function(type, width, height) {
    var type   = type || 'image/png',
        width  = width || this.videoElement.width,
        height = height || this.videoElement.height;

    var canvas  = document.createElement('canvas'),
        context = canvas.getContext('2d');
		canvas.width  = width;
		canvas.height = height;
		context.drawImage(this.videoElement, 0, 0, width, height);

    var image = new Image;
		image.src = canvas.toDataURL(type);
    return image;
};


window.addEventListener('DOMContentLoaded', function() {
	video     = document.getElementById('video');
	webcam = new WebCamVideo(video, function(error) { 
		console.alert('Video Capture Error: ' + error.code);
		$("#count").html(error.code);
    });

});

	$(document).ready(function(){
	
		$("#start").click(function(){
			t();
		});

	});//DocReady
	
function inited(){
	$("#start").show();
	var picInfo = prompt("Please, type a word, this will be used for image names.");
	if(picInfo){
		sender = picInfo;
		$("#count").html("Ready to capture.");
	}else{
		inited();
	}
}

function snap(){
    var image = webcam.getImage();
		count++;
		uploadPhoto(webcam.getImage().src);
		
		$(".snaps").prepend(image);			
		$("#count").html(count);
}
function t(){
	if(!timerset){
		timerset = true;
		timer = setInterval(snap, 4000);
		$("#count").html("Starting");
	}else{
		timerset = false;
		$("#count").html("Paused");
		clearInterval(timer);
	}
}

function uploadPhoto(file){
	var oMyForm = new FormData();
	oMyForm.append("phototime", Date());
	oMyForm.append("photoinfo", sender);
//  oMyForm.append("userfile", file);
	oMyForm.append("file", file);

	var oReq = new XMLHttpRequest();
	oReq.open("POST", "savefile.php");
	oReq.send(oMyForm);
}