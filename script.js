function sendMessage() {
  const input = document.getElementById('message-input');
  const message = input.value.trim();
  if (message === '') return;

  createMessage(message, 'customer');
  input.value = '';
  playSound();

  simulateRiderReply();
}

function chooseImage() {
  document.getElementById('image-input').click();
}

document.getElementById('image-input').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      createImageMessage(e.target.result, 'customer');
      playSound();
      simulateRiderReply();
    };
    reader.readAsDataURL(file);
  }
});

function createMessage(text, sender) {
  const chatBox = document.getElementById('chat-box');
  const message = document.createElement('div');
  message.className = `message ${sender}`;
  message.innerHTML = `<div>${text}</div><div class="timestamp">${getCurrentTime()}</div>`;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function createImageMessage(imgSrc, sender) {
  const chatBox = document.getElementById('chat-box');
  const message = document.createElement('div');
  message.className = `message ${sender}`;
  message.innerHTML = `<img src="${imgSrc}" class="message-image"/><div class="timestamp">${getCurrentTime()}</div>`;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function simulateRiderReply() {
  const typingIndicator = document.getElementById('typing-indicator');
  typingIndicator.style.display = 'block';

  setTimeout(() => {
    typingIndicator.style.display = 'none';
    const reply = getRandomReply();
    createMessage(reply, 'rider');
    playSound();
  }, 1500);
}

function getCurrentTime() {
  const now = new Date();
  return now.getHours().toString().padStart(2, '0') + ':' +
         now.getMinutes().toString().padStart(2, '0');
}

function getRandomReply() {
  const replies = [
    '您好，已经到达门口！',
    '马上送到！',
    '我在小区门口等您。',
    '请接一下电话哦。',
    '天气有点热，小心中暑。',
    '需要帮您带其他东西吗？'
  ];
  return replies[Math.floor(Math.random() * replies.length)];
}

function playSound() {
  const sound = document.getElementById('send-sound');
  sound.play();
}