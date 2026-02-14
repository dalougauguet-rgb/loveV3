const btnYes = document.getElementById('btnYes');
const btnNo1 = document.getElementById('btnNo1');
const btnNo2 = document.getElementById('btnNo2');
const questionCard = document.getElementById('questionCard');
const envelopeContainer = document.getElementById('envelopeContainer');
const envelopeFlap = document.getElementById('envelopeFlap');
const heartSeal = document.getElementById('heartSeal');
const letter = document.getElementById('letter');
const letterText = document.getElementById('letterText');

let escapeCount = 0;
let maxEscapes = 3;

// YES
btnYes.addEventListener('click', () => {
  transitionToScene2();
});

// NO escape
function moveNoButton(btn) {
  const directions = [
    { x: 0, y: -80 }, { x: 0, y: 80 },
    { x: -100, y: 0 }, { x: 100, y: 0 },
    { x: -70, y: -70 }, { x: 70, y: -70 },
    { x: -70, y: 70 }, { x: 70, y: 70 }
  ];

  const randomDir = directions[Math.floor(Math.random() * directions.length)];
  btn.style.transform = `translate(${randomDir.x}px, ${randomDir.y}px)`;

  escapeCount++;
  const scale = 1 + (escapeCount * 0.15);
  btnYes.style.transform = `scale(${scale})`;

  if (escapeCount >= maxEscapes) {
    btnNo1.classList.add('hide');
    btnNo2.classList.add('hide');
    setTimeout(() => {
      questionCard.classList.add('glow');
      btnYes.style.transform = `scale(${scale * 1.3})`;
    }, 300);
  }
}

// Mouse + Touch
[btnNo1, btnNo2].forEach(btn => {
  btn.addEventListener('mouseenter', () => moveNoButton(btn));
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height && escapeCount < maxEscapes) {
      moveNoButton(btn);
    }
  });
  btn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (escapeCount < maxEscapes) moveNoButton(btn);
  }, { passive: false });
});

// Scene 2
function transitionToScene2() {
  questionCard.classList.add('fade-out');
  setTimeout(() => {
    questionCard.style.display = 'none';
    envelopeContainer.classList.add('show');
    setTimeout(openEnvelope, 800);
  }, 600);
}

function openEnvelope() {
  heartSeal.classList.add('fade');
  if (navigator.vibrate) navigator.vibrate(50);

  setTimeout(() => {
    envelopeFlap.classList.add('open');
    setTimeout(() => {
      letter.classList.add('slide-out');
      setTimeout(typeMessage, 900);
    }, 600);
  }, 400);
}

// Typewriter
function typeMessage() {
  const message = "Joyeuse Saint-Valentin Ma Chlo, profites bien de ta journée avec oscar, je t'aime très fort !! 💖";
  let index = 0;
  letterText.textContent = "";
  letterText.classList.add('typing');

  function type() {
    if (index < message.length) {
      letterText.textContent += message[index++];
      setTimeout(type, 50);
    } else {
      startHeartRain();
    }
  }
  type();
}

// Hearts rain
function startHeartRain() {
  const hearts = ['💖', '💗', '💓', '💕'];
  const container = document.querySelector('.container');

  setInterval(() => {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';

    container.appendChild(heart);
    setTimeout(() => heart.remove(), 7000);
  }, 300);
}