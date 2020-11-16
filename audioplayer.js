/**
 * xceldeveloper (ov)
 * 06/07/2020 - 07/07/2020
 * 

 */

var AudioPlayer = {
    player: null,
    isPlaying: false,
    current: {
        duration: -1,
        time: 0,
        percentage: -1,
        position: -1
    },
    duration: 0,
    currentDuration: 0,
    totalTime: 0,
    isMuted: false,
    volume: 1,
    path: '',
    size: '',
    thumbnail: 'logo.jpg',
    name: '',
    artist:'--',
    isLooping: false,
    scope: this,

    onReadyListener: null,
    onBufferListener: null,
    onErrorListener: null,
    onPlayListener: null,
    onEndListener: null,
    isPlayingListener: null,
    onPauseListener: null,

    controls:null,
    seekbar:null,
    songsLength:0,
    playIndex:0,
    songs:null,

    initAudio(path) {
        this.player = null;

        this.player = new Audio();
        this.player.src = path;
        this.isPlaying = false;
        this.current = {
            duration: -1,
            time: -1,
            percentage: -1,
            position: -1
        },
            this.duration = '--:--';
        this.currentDuration = 0;
        this.totalTime = 0;
        this.isMuted = false;
        this.volume = 1;
        this.path = path;
        this.size = '';
        this.isLooping = false;

        //audio player native
        this.player.onloadeddata = function () {
            this.duration = this.convertTime(this.player.duration);
            this.totalTime = this.player.duration;
         //   this.name = this.path.slice(this.path.lastIndexOf('/') == -1 ? 0 : this.path.lastIndexOf('/'), this.path.lastIndexOf('.'));
            try {
                this.onReadyListener();
            } catch (error) {
            }
        }.bind(this);

        //audio player native
        this.player.ontimeupdate = function () {
            this.current = {
                duration: this.convertTime(this.player.duration),
                time: this.player.currentTime,
                percentage: (this.player.currentTime / this.player.duration) * 100,
                position: this.convertTime(this.player.currentTime)
            }
            try {

                this.seekbar.thumb.style.left = 'calc(' + this.current.percentage + '% - 5px)'
                this.seekbar.fill.style.width = this.current.percentage + '%';
                this.controls.duration.innerHTML = this.current.position;
                this.controls.duration.innerHTML = this.current.position 

                this.isPlayingListener(this.current);
                
            } catch (error) {

            }
            this.currentDuration = this.player.currentTime;

        }.bind(this);

        //audio player native
        this.player.onended = function () {
            this.isPlaying = false;
            try {
                this.onEndListener();
                this.controls.playPause.innerHTML = '<span class="mdi mdi-play"></span>'
            } catch (error) {
            }

        }.bind(this);

        //audio player native
        this.player.onerror = function (error) {
            try {
                this.onErrorListener(error)
               
            } catch (error) {
                console.log(error)
            }

        }.bind(this)

        //audio player native 
        this.player.onBuffer = function () {
            try {
                this.onBufferListener()
            } catch (error) {
            }
        }.bind(this)
    },

    onReady(callback) {
      this.setPlayerDetails()

       // this.controls.duration.innerHTML = player.duration

     
        this.onReadyListener = callback || function () { }
    },

    onPlay(callback) {
        this.onPlayListener = callback || function () { }

    },

    onPause(callback) {
        this.onPauseListener = callback || function () { }
    },

    onCompleted(callback) {
        this.onEndListener = callback || function () { }

    },

    onError(callback) {
        this.controls.playPause.innerHTML = '<span class="mdi mdi-play"></span>'
        this.onErrorListener = callback || function (error) { }

    },

    onBuffer(callback) {
        this.onBufferListener = callback || function () { }

    },


    whenPlaying(callback) {
       
        this.isPlayingListener = callback || function (currentx) { }
        
    },

    setAudio(audio){
      
      this.songs = audio
      this.songsLength = this.songs.length
      this.initAudio(this.songs[this.playIndex].path);

      this.setAudioInfo()
    },

    setAudioInfo(){
      this.player.src = this.songs[this.playIndex].path
   
      this.name = this.songs[this.playIndex].name
      this.thumbnail = this.songs[this.playIndex].art
      this.artist = this.songs[this.playIndex].artist

      try{
        this.controls.name.innerHTML = this.name
        this.controls.artist.innerHTML = this.artist
        this.controls.thumbnail.src = this.thumbnail
        this.controls.artist.src = this.artist
        this.setNav()
      }catch(error){}
    },

    bindElem(seekbar,audioControl){
      this.controls = audioControl
      this.seekbar = seekbar
      this.setButtonlistensers()
    },

    setButtonlistensers(){
       this.controls.playPause.addEventListener('click', ()=> {
       console.log('pressed')
            if (this.isPlaying) {
                this.pause();
            } else {
                this.play();
            }
        })

        this.controls.skipFwrd.addEventListener('click', ()=> {
            var time = this.player.currentTime;
            this.player.currentTime = time + 10;
        
        })

        this.controls.skipPrev.addEventListener('click', ()=> {
            var time = this.player.currentTime;
            this.player.currentTime = time - 10;
        
        })

        this.controls.next.addEventListener('click', ()=> {
           this.playNext()
        })

        this.controls.previous.addEventListener('click', ()=> {
           this.playPrevious()
        })



        document.addEventListener('keydown',(event)=>{
            if (event.keyCode == 32) { 
       
                if (this.isPlaying) {
                    this.pause();  
                } else {
                    this.play();
                }
    } else if (event.key == "ArrowUp") {
        this.player.volume += 0.1;
      
    } else if (event.key == "ArrowDown") {
        this.player.volume -= 0.1;
       
    } else if (event.key == "n") {
        this.playNext()
    } else if (event.key == "p") {
        this.playPrevious()
    } else if (event.key == "m") {
        this.toggleMutex();
    } else if (event.key == "ArrowRight") {
        this.skipForward()
    } else if (event.key == "ArrowLeft") {
        this.skipPrevious();
    }
        })

        
    },

    init(songs,seekbar,audioControl){
        this.setAudio(songs)
        this.bindElem(seekbar,audioControl)
        

    },

    setPlayerDetails(){
        this.controls.name.innerHTML = this.name
        this.controls.artist.innerHTML = this.artist
        this.controls.thumbnail.src = this.thumbnail
        this.controls.artist.src = this.artist
    },




    play() {
     
        if (this.player.paused) {
            this.player.play();
            this.controls.playPause.innerHTML = '<span class="mdi mdi-pause"></span>'
            this.isPlaying = true;
            try {
                this.onPlayListener();
            } catch (error) {

            }
        }
    },

    pause() {
        if (!this.player.paused) {
            this.player.pause();
            this.controls.playPause.innerHTML = '<span class="mdi mdi-play"></span>'
            this.isPlaying = false;
            try {
                this.onPauseListener();
            } catch (error) {

            }

        }
    },

    setVolume(vol = 1) {
        if (vol < 1 && vol > 0) {
            this.player.volume = vol
            this.volume = vol;
        }
    },

    mute() {
        if (!this.player.isMuted) {
            this.player.mute = true
            this.isMuted = true
        }
    },

    unMute() {
        if (this.player.isMuted) {
            this.player.mute = false
            this.isMuted = false
        }
    },

    setLooping(state) {
        this.isLooping = state
    },

    destroy() {
        this.player = null;
        this.isPlaying = false;
        this.current = '';
        this.duration = 0;
        this.currentDuration = 0;
        this.totalTime = 0,
            this.isMuted = false;
        this.volume = 1;
        this.path = '';
        this.name = '';
        this.artist = '';
        this.size = '';
        this.thumbnail = 'default.jpg'
        this.isLooping = false;
        this.scope = this;
    },

    skipForward(pos = 10) {
        var t = this.player.currentTime

        this.player.currentTime = t + pos;
    },

    skipPrevious(pos = 10) {
        var t = this.player.currentTime
        this.player.currentTime = t - pos;
    },


    skipTo(pos) {
        this.player.currentTime = pos;
    },

    playNext(){
        if (this.playIndex < this.songs.length) {
            this.playIndex++;
           this.setAudioInfo();
            this.player.play()
        }
    },

    playPrevious(){
        if (this.playIndex > 0) {
            this.playIndex--;
           this.setAudioInfo()
           this.player.play()
        }
    
    },


    convertTime(t) {
        var Full_Dutaion = "";
        var second_string;
        var mins = "";
        var hours = Math.floor(t / (60 * 60));
        var minutes = Math.floor(t / 60);
        var seconds = Math.floor(t % 60);

        if (seconds < 10) {
            second_string = "0" + seconds
        } else {
            second_string = "" + seconds;
        }

        if (minutes < 10) {
            mins = "0" + minutes;
        } else {
            mins = "" + minutes;
        }

        if (hours > 0 && hours > 10) {
            Full_Dutaion = hours + ":";
        } else if (hours > 0 && hours < 10) {
            Full_Dutaion = "0" + hours + ":";
        }
        Full_Dutaion = Full_Dutaion + mins + ":" + second_string;
        return Full_Dutaion;
    },
      
    setNav() {
        songsLength = this.songs.length;
        if (this.songsLength == 1) {
            
            this.controls.next.style.color = 'lightgrey'
        } else {
            if (this.playIndex < this.songs.length - 1) {
              

                this.controls.next.style.color = 'white'
                this.controls.previous.style.color = 'white'
            }
            if (this.playIndex == this.songs.length - 1) {
              

                this.controls.next.style.color = 'lightgrey'
                this.controls.previous.style.color = 'white'
            }
    
            if (this.playIndex == 0) {
                

                this.controls.next.style.color = 'white'
                this.controls.previous.style.color = 'lightgrey'
            }
        }
    
    }
}


/***
 * 
 * PLEASE IF YOU WANNA USE IT FOR ULTIPLE AUDIO PLAYERS IN THE SAME PAGE PLEASE CONVERT AUDIOPLAYER OBJECT TO CLASS
 */

///////////////////VARIABLES///////////////////can be acces via variable obj.key
// player: null,//audio player
// isPlaying: false, //check if audio is playing
// current: {duration: -1, time: 0, percentage: -1, position: -1 },//formatted duration, time in milliseconds ,percentage 1 - 100, formatted current position
// duration: 0, // formatted duration 
// currentDuration: 0, // current duration in milliseconds
// totalTime:0,// total duration in milliseconds
// isMuted: false, //if audio player is muted or not
// volume: 1, //volume 0 - 1
// path: '', //audio path
// size: '', // audio size ....its not dynamic oooh
// thumbnail:'default.jpg',// thumbnail
// name:'',//audio name, default gotten from path
// isLooping: false,//if audio is lopping or not





// ////////////////////////METHODS///////////////can be acced variabe obj.func
// player.play();
// player.pause();
// player.destroy();

// player.skipForward(int..default == 10);
// player.skipPrevious(int...default == 10);

// player.setVolume(int < 1 && int > 0)


// player.mute(Boolean)
// player.unmute(Boolean)

// //when player meta data is loaded 
// player.onReady(function(){

// })

// //when audio is playing
// player.whenPlaying(function({ duration:'formated duration',time: 'current time in millisecond',percentage:'1 - 100', position:'formaated current position'}){

// })

// //when error occurs
// player.onError(function(Object){

// })

// //when paused
// player.onPause(function () {

// })
// //when play
// player.onPlay(function () {

// })

// //when audio finish playing
// player.onCompleted(function(){

// })