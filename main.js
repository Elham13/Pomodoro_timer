// General Variables
const bell = document.querySelector('audio');
const mindiv = document.querySelector('.mins')
const secdiv = document.querySelector('.secs')
const startBtn = document.querySelector('.start')
let initial, totalSecs, percent, paused, mins, seconds;

// progress bar variables
const circle = document.querySelector('.progress-ring_circle');
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

// Settings variables
const focusTimeInput = document.querySelector('#focusTime');
const breakTimeInput = document.querySelector('#breakTime');
const pauseBtn = document.querySelector('.pause');

const timerFunction = () => {
  localStorage.setItem('btn', 'focus');

   startBtn.addEventListener('click', () => {
      let focusTime = localStorage.getItem('focusTime');
      let breakTime = localStorage.getItem('breakTime');
      if(focusTime === null && breakTime === null){
         alert("Please set Focus time and break time before starting");
      }else{
         let btn = localStorage.getItem('btn');
         if(btn === 'focus'){
            mins = +localStorage.getItem('focusTime');
         }else{
            mins = +localStorage.getItem('breakTime');
         }

         seconds = mins * 60;
         totalSecs = mins * 60;
         setTimeout(decrement, 60);
         startBtn.style.transform = "scale(0)";
         paused = false;
      }
   });

   // ------------------------Progress bar----------------
   circle.style.strokeDasharray = circumference;
   circle.style.strokeDashoffset = circumference;
   // ------------------------Progress bar----------------


   // --------------------------------Settings--------------------------------
   document.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      localStorage.setItem('focusTime', focusTimeInput.value);
      localStorage.setItem('breakTime', breakTimeInput.value);
      alert("You have set the focus time and break time succesfully. \nStart your time")
   });
   document.querySelector('.reset').addEventListener('click', () => {
      startBtn.style.transform = 'scale(1)';
      clearTimeout(initial);
      setProgress(0);
      mindiv.textContent = 0;
      secdiv.textContent = 0;
   });
   pauseBtn.addEventListener('click', () => {
      if(paused == undefined){
         return
      }
      if(paused){
         paused = false;
         initial = setTimeout(decrement, 60);
         pauseBtn.textContent = "Pause";
         pauseBtn.classList.remove('resume')
      }else{
         clearTimeout(initial);
         pauseBtn.textContent = "Resume";
         pauseBtn.classList.add('resume');
         paused = true;
      }
   });
   // --------------------------------Settings--------------------------------
}

const decrement = () => {
   mindiv.textContent = Math.floor(seconds / 60);
   secdiv.textContent = seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`;
   if(circle.classList.contains('danger')){
      circle.classList.remove('danger');
   }

   if(seconds > 0){
      if(seconds < 10){
         circle.classList.add("danger");
      }
      percent = Math.ceil(((totalSecs - seconds) / totalSecs) * 100);
      setProgress(percent);
      seconds--;
      initial = setTimeout(decrement, 1000);
   }else{
      mins = 0;
      seconds = 0;
      bell.play();
      let btn = localStorage.getItem('btn');

      if(btn === 'focus'){
         startBtn.textContent = "Start Break";
         startBtn.classList.add('break');
         localStorage.setItem('btn', 'break');
      }else{
         startBtn.classList.remove('break');
         startBtn.textContent = "Start Focus";
      }
      startBtn.style.transform = 'scale(1)';
   }
}

const setProgress = (percent) => {
   const offset = circumference - (percent / 100) * circumference;
   circle.style.strokeDashoffset = offset;
}

timerFunction();