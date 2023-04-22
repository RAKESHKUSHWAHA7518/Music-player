const image = document.querySelector('img');
const title =document.getElementById('title');
const artist =document.getElementById('artist');
const music= document.querySelector('audio');
const progressContainer= document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl=  document.getElementById('current-time');
const durationEl =document.getElementById('duration');
const prevBtn= document.getElementById('prev');
const playBtn= document.getElementById('play');
const nextBtn= document.getElementById('next');


// music
const songs=[
    {
        name: 'jacinto-1',
        displayName:' Electric Chill Machine',
        artist: 'jacinto Design',
    },
    {
        name: 'jacinto-2',
        displayName:' Seven Nation Army (Remix)',
        artist: 'jacinto Design',
    },
    {
        name: 'jacinto-3',
        displayName:' Electric Chill Machine',
        artist: 'jacinto Design',
    },
    {
        name: 'metric-1',
        displayName:' Electric Chill Machine',
        artist: 'jacinto Design',
    },
];

// check if playing
let isPlaying = false;
// play
function playSong(){
    isPlaying= true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','pause');
    music.play();
}
// pause
function pauseSong(){
    isPlaying= false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','play');
    music.pause();
}
// play or pause event 
playBtn.addEventListener('click',()=> (isPlaying ? pauseSong() : playSong()));

//  Update DOM
function loadSong(song){
    title.textContent= song.displayName;
    artist.textContent=song.artist;
    music.src=  `music/${song.name}.mp3`;
    image.src=  `img/${song.name}.jpg`;
}

// Current songs
let songIndex =0;


// previous song
function prevSong(){
    songIndex--;
    if(songIndex<0){
        songIndex= songs.length -1;
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}
// next song
function nextSong(){
    songIndex++;
    if(songIndex>songs.length-1){
        songIndex=0;
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}


//  On Loading select first song 
loadSong(songs[songIndex]);

// update progressbar
function updateProgressBar(e){
    if(isPlaying){
       const{ duration,currentTime} = e.srcElement;
       console.log(duration,currentTime);
    //    Update progress bar width
    const progressPercent = (currentTime/duration)*100;
    progress.style.width=`${progressPercent}%`;
    // console.log(progressPercent);
    // calculate display for duration
    const durationMinutes = Math.floor(duration/60);
   
    
    let durationSeconds= Math.floor(duration % 60);
   
    if(durationSeconds<10){
        durationSeconds = `0${durationSeconds}`;
    }
   
    durationEl.textContent=`${durationMinutes}:${durationSeconds}`;
    //  deley swiching duration element to avoid NaN
    if(durationSeconds){
        durationEl.textContent=`${durationMinutes}: ${durationSeconds}`;
        // durationEl.textContent =`${durationMinutes}:${durationSeconds}`;
    }
     // calculate display for duration
     const currentMinutes = Math.floor(currentTime/60);
    
     let  currentSeconds= Math.floor( currentTime % 60);
    
     if (currentSeconds<10){
        currentSeconds = `0${ currentSeconds}`;
     }
    
     
     currentTimeEl.textContent=`${currentMinutes}: ${currentSeconds}`;
    }
}

// set progress bar
function setProgressBar(e){
    
    const width= this.clientWidth;
    console.log('width',width);
    const clickX = e.offsetX;
    console.log('click',clickX);
}
//  EVENT listeners
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click',setProgressBar);