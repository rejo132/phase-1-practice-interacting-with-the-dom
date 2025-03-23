// js/challenge.js

// DOM Elements
const counter = document.getElementById('counter');
const minusBtn = document.getElementById('minus');
const plusBtn = document.getElementById('plus');
const heartBtn = document.getElementById('heart');
const pauseBtn = document.getElementById('pause');
const likesList = document.getElementById('likes');
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');
const commentList = document.getElementById('list');

// State
let count = 0;
let isPaused = false;
let timerId = null;
const likes = {}; // Tracks likes per number

// Timer: Increment every second
function startTimer() {
  timerId = setInterval(() => {
    if (!isPaused) {
      count++;
      updateCounter();
    }
  }, 1000);
}

// Update counter display
function updateCounter() {
  counter.textContent = count;
}

// Increment/Decrement
function increment() {
  count++;
  updateCounter();
}

function decrement() {
  count--;
  updateCounter();
}

// Like feature
function addLike() {
  if (!likes[count]) {
    likes[count] = 0;
  }
  likes[count]++;
  updateLikes();
}

function updateLikes() {
  likesList.innerHTML = ''; // Clear existing likes
  for (const num in likes) {
    const li = document.createElement('li');
    li.textContent = `${num} has been liked ${likes[num]} time${likes[num] === 1 ? '' : 's'}`;
    likesList.appendChild(li);
  }
}

// Pause/Resume toggle
function togglePause() {
  isPaused = !isPaused;
  pauseBtn.textContent = isPaused ? 'resume' : 'pause';
  toggleButtons();
}

function toggleButtons() {
  minusBtn.disabled = isPaused;
  plusBtn.disabled = isPaused;
  heartBtn.disabled = isPaused;
  // Pause button remains enabled
}

// Add comment
function addComment(event) {
  event.preventDefault();
  const commentText = commentInput.value.trim();
  if (commentText) {
    const p = document.createElement('p');
    p.textContent = commentText;
    commentList.appendChild(p);
    commentInput.value = ''; // Clear input
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  startTimer(); // Start timer on page load

  minusBtn.addEventListener('click', () => {
    if (!isPaused) decrement();
  });

  plusBtn.addEventListener('click', () => {
    if (!isPaused) increment();
  });

  heartBtn.addEventListener('click', () => {
    if (!isPaused) addLike();
  });

  pauseBtn.addEventListener('click', togglePause);

  commentForm.addEventListener('submit', addComment);
});