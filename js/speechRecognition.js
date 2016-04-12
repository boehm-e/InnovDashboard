var Socket = new WebSocket("ws://localhost:8080");
function voice(){
    (function($){

        if ('webkitSpeechRecognition' in window) {
            var recognition = new webkitSpeechRecognition();
            var text = '';

            recognition.lang = "fr-FR";
            recognition.continuous = false;
            recognition.interimResults = true;

            $('#launchSpeechRecognition').click(function(){
        		recognition.abort();
                recognition.start();
                $('#result').text('Dites quelque chose');
                $('#launchSpeechRecognition').removeClass('passive').addClass('active');
            });
            $('#h1').hide();
            recognition.onresult = function (event) {
                $('#result').text('');
                for (var i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {                 // si l'enregistrement est fini
                        $('#launchSpeechRecognition').removeClass('active').addClass('passive');
                    var transcript = event.results[i][0].transcript;
			//recognition.abort();
			console.log(transcript);
			Socket.send(transcript);
			//                voice();
		    }else{
			$('#result').text($('#result').text() + event.results[i][0].transcript);
		    }
		}
	    };
	}else{
	    //                $('#btn').hide();
	}
	
	
    })(jQuery);
}
voice();


/* HANDLE SOCKET EVENT */
Socket.onmessage = function(data){
    var string = data.data;

    if (string[0] == '[') {
        var data = JSON.parse(string);
        console.log(string);
        if (data[0] == "notif") {
            Materialize.toast(data[2], 15000) 
        }
    }

    if (string == "onmusic") {
        console.log("onmusic");
        loadSongs();
    }
}

Socket.onclose = function() {
   // $("#header").append('<div class="progress"> <div class="indeterminate"></div> </div>');
    Materialize.toast("Connexion perdue (socket)", 5000); 
}

Socket.onopen = function() {
    console.log("SOCKET OPENNN");
}