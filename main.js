!function(window,document) {
        var music
    ,   scrubLeft
    ,   scrubRight
    ,   volUp
    ,   volDown
    ,   skipRight
    ,   skipLeft
    ,   path        = "/vscode/main/music/"
    ,   xhttp       = new XMLHttpRequest()
    ,   songRegex   = /\.(?:wav|mp3)$/i;



    music = document.getElementById("player");

    xhttp.open("GET", "songs.txt");
    xhttp.onload = function(e) {
        if(xhttp.readyState === 4) {
            if (xhttp.status === 200) {
                start(xhttp.responseText, 0);
            } else {
                console.error(xhttp.statusText);
    }}};
    xhttp.onerror = function(e) {
        console.error(xhttp.statusText);
    };
    xhttp.send(null);
    var start = function (songs, track) {

        var list            = JSON.parse(songs)
        ,   player          = music
        ,   playerPromise   = player.play();

        console.log(track)
        list.forEach(function(x) {
            console.log(x);
        });
            console.log(list);
            player.src = path + list[track];
        
            if(playerPromise !== undefined) {
                playerPromise.then(()=> {
                    console.log("asdasd")
                    document.getElementById("status").innerHTML = "playing! " + list[track];
                    player.play();
                    
                }).catch (error => {
                    console.error("Error loading music. Trying again.")
                    setTimeout(function() {
                        document.getElementById("status").innerHTML = "loading..";
                        start(songs, track);
                    },1000)
                })
            }
            
            document.getElementById("pause").onclick = function () {
                if(!player.paused) {
                    player.pause();
                } else{
                    player.play();
                };
            };
            document.getElementById("play").onclick = function() {
                start(songs, track)
            }
            document.getElementById("next").onclick = function() {
                if(track === list.length-1) {
                    start(songs, 0)
                } else {
                    start(songs, track+1)
                }
            }
            document.getElementById("prev").onclick = function() {
                if (track === 0) {
                    start(songs, list.length-1);
                } else {
                    start(songs, track-1);
                }
            }

    };

}(this, document);
