# Web Audio Player

## Screenshot 
[screnshot](screenshot.png)


[demo url](https://xcelaudioplayer-web.netlify.app/)
[developer's website](https://xceldeveloper.com)

### Built with HTML CSS, Vanilla JS 
###### controls input
* Mouse
* Touch 
* Keyoard
  * **N** => *Play Next Track*
  * **P** => *Play Previous Track*
  * **M** => *Mute Player*
  * **SPACE** => *Toggle between Play and Pause*
  * **ArrowLeft** => *Fast-rewind*
  * **ArrrowRight** => *Fast-forward*
  * **ArrowUp** => *Increase Volume*
  * **ArrowDown** => *Decrease Volume*

### USAGE
    
```javascript
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





// ////////////////////////METHODS///////////////can be accessed variabe obj.func
player.play();
player.pause();
player.destroy();

player.skipForward(int..default == 10);
player.skipPrevious(int...default == 10);

player.setVolume(int < 1 && int > 0)


player.mute(Boolean)
player.unmute(Boolean)

//when player meta data is loaded 
player.onReady(function(){

})

//when audio is playing
player.whenPlaying(function({ duration:'formated duration',time: 'current time in millisecond',percentage:'1 - 100', position:'formaated current position'}){

})

//when error occurs
player.onError(function(Object){

})

//when paused
player.onPause(function () {

})

//when play
player.onPlay(function () {

})

// //when audio finish playing
player.onCompleted(function(){

})
