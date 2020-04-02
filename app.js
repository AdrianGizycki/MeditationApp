const app = () => {
  const song =document.querySelector('.song');
  const play= document.querySelector('.play');
  const outline = document.querySelector('.moving-outline circle');
  const video = document.querySelector('.video-container video');
  // Sounds
  const sounds = document.querySelectorAll('.sound-picker button');
  
  // Time Display
  const timeDisplay = document.querySelector('.time-display');
  const timeSelect = document.querySelectorAll('.time-select button');
  
  //Get the Length of the outline
  const outlineLength = outline.getTotalLength();
  console.log(outlineLength);
  //Duration

  let fakeDuration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  // Pick different sound

  sounds.forEach(sound => {
    sound.addEventListener('click', function(){
      song.src = this.getAttribute('data-sound');
      video.src = this.getAttribute('data-video');
    });
  });

  //play sound 
  play.addEventListener('click', () => {
    checkPlaying(song);
  });

  //Select sound
  timeSelect.forEach(option => {
    option.addEventListener('click', function(){
      fakeDuration = this.getAttribute('data-time');
      let minutes = Math.floor(fakeDuration / 60);
      let seconds = Math.floor(fakeDuration % 60); 
      if (minutes < 10 ) {
        minutes = "0" + minutes
      }
      if (seconds < 10) {
        seconds = "0" + seconds
      }
      timeDisplay.textContent = `${minutes}:${seconds}`
    });
  });




  //Create a function specific to stop and play sounds
  const checkPlaying = song => song.paused ? (song.play(), video.play(), play.src = "./svg/pause.svg") : (song.pause(), video.pause(), play.src = "./svg/play.svg"); 

  //We can animated the circle
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    if (minutes < 10 ) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    

    //Animated the circle 
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;
    //Animated the text
    timeDisplay.textContent = `${minutes}:${seconds}`;

    if(currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = "./svg/play.svg";
      video.pause();
    }
  };

};

app();