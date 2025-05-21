let currentQuestion = 0;
let score = 0;
let questions = [];
let answered = [];
let wrongAnswers = [];

const controlButtons = document.getElementById('control-bottons');

async function loadQuestions() {
  const res = await fetch('questions.json');
  let data = await res.json();
  data.forEach(q => {
    q.originalOptions = [...q.options];
  });
  questions = shuffleArray(data);
  answered = new Array(questions.length).fill(false);
  showQuestion();
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function showQuestion() {
  const questionBox = document.getElementById('question-box');
  const scoreBox = document.getElementById('score-box');
  scoreBox.innerHTML = '';

  if (currentQuestion >= questions.length) {
    const date = new Date().toLocaleString();
    const entry = { date, score: `${score}/${questions.length}` };
    let scores = JSON.parse(localStorage.getItem('quizScores')) || [];
    scores.push(entry);
    localStorage.setItem('quizScores', JSON.stringify(scores));

    const messages = [
      "Excellent work!",
      "Well done! You nailed it!",
      "Nice job!",
      "Good job! Keep studying.",
      "Not bad, keep practicing!",
      "Don't worry, keep trying and improving!"
    ];
    let message;
    if (score === questions.length) message = messages[0];
    else if (score >= questions.length * 0.8) message = messages[1];
    else if (score >= questions.length * 0.6) message = messages[2];
    else if (score >= questions.length / 2) message = messages[3];
    else if (score >= questions.length * 0.3) message = messages[4];
    else message = messages[5];

    questionBox.innerHTML = `
          <h3 class="text-center text-success">🎉 Test Completed 🎉</h3>
          <h1 class="text-center display-3">${score} / ${questions.length}</h1>
          <p class="text-center fs-4">${message}</p>
          <div class="text-center">
            <button class="btn btn-warning" onclick="restartQuiz()">Restart Test</button>
          </div>
        `;
    document.getElementById('prevBtn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
    controlButtons.classList.remove('d-none');
    return;
  }

  const q = questions[currentQuestion];
  document.getElementById('question').innerText = `Q${currentQuestion + 1}. ${q.question}`;
  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';
  document.getElementById('feedback').innerText = '';

  const randomizedOptions = shuffleArray(q.originalOptions.map((opt, index) => ({
    text: opt,
    index: index
  })));

  randomizedOptions.forEach(({ text, index }) => {
    const btn = document.createElement('button');
    btn.classList.add('option');
    btn.innerText = text;
    btn.onclick = () => handleAnswer(index, btn);
    optionsDiv.appendChild(btn);
  });

  updateButtons();
}

function handleAnswer(selectedIndex) {
  if (answered[currentQuestion]) return;
  answered[currentQuestion] = true;
  const q = questions[currentQuestion];
  const correctIndex = q.answer;
  const buttons = document.querySelectorAll('.option');

  buttons.forEach((btn, index) => {
    const text = btn.innerText;
    if (text === q.originalOptions[correctIndex]) {
      btn.classList.add('correct');
    }
    if (text === q.originalOptions[selectedIndex] && selectedIndex !== correctIndex) {
      btn.classList.add('wrong');
      wrongAnswers.push(q);
    }
    btn.disabled = true;
  });

  if (selectedIndex === correctIndex) {
    score++;
    document.getElementById('feedback').innerText = 'Correct!';
  } else {
    document.getElementById('feedback').innerText = `Wrong! Correct answer: ${q.originalOptions[correctIndex]}`;
  }
}

function updateButtons() {
  const nextBtn = document.getElementById('nextBtn');
  nextBtn.innerText = currentQuestion === questions.length - 1 ? 'Submit' : 'Next';
  document.getElementById('prevBtn').disabled = currentQuestion === 0;
  nextBtn.disabled = currentQuestion > questions.length - 1;
}

function togglePreviousScores() {
  const history = document.getElementById('history');
  if (history.style.display === 'none') {
    const scores = JSON.parse(localStorage.getItem('quizScores')) || [];
    history.innerHTML = '<h5 class="mt-3">Previous Scores</h5>';
    if (scores.length === 0) {
      history.innerHTML += '<p>No previous scores recorded.</p>';
    } else {
      history.innerHTML += '<ul class="list-group">' +
        scores.map(s => `<li class="list-group-item bg-dark text-white">${s.date}: ${s.score}</li>`).join('') +
        '</ul>';
    }
    history.style.display = 'block';
  } else {
    history.style.display = 'none';
  }
}

const wrongAnswersContainer = document.getElementById('wrong-answers');
function toggleWrongAnswers() {
  console.log('I was clicked')
  if (wrongAnswers.length === 0) {
    wrongAnswersContainer.innerHTML = "<p>No questions answered incorrectly yet!</p>";
    return;
  }

  wrongAnswersContainer.innerHTML = ''; // Clear any previous content

  wrongAnswers.forEach((q, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'mb-4 p-3 border rounded'; // Add some styling classes

    const questionText = document.createElement('p');
    questionText.innerHTML = `Q${index + 1}: ${q.question}`;
    questionText.style.textAlign = 'left';
    questionDiv.appendChild(questionText);

    const optionsList = document.createElement('ul');
    optionsList.className = 'list-unstyled'; // Remove default list styling

    q.options.forEach((option, optionIndex) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = option;
      listItem.className = 'option';
      if (optionIndex === q.answer) {
        listItem.className += ' correct'; // Highlight correct answer
      }
      optionsList.appendChild(listItem);
    });
    questionDiv.appendChild(optionsList);

    console.log(questionDiv)

    wrongAnswersContainer.appendChild(questionDiv);
    wrongAnswersContainer.classList.toggle('d-none');
  });
}



function restartQuiz() {
  window.location.reload();
}

document.getElementById('nextBtn').onclick = () => {
  if (currentQuestion <= questions.length) {
    currentQuestion++;
    showQuestion();
  }
};

document.getElementById('prevBtn').onclick = () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
};

loadQuestions();