// Application State
let currentFlashcardIndex = 0;
let currentQuestionIndex = 0;
let quizScore = 0;
let userAnswers = [];
let selectedAnswer = null;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    showSection('mainMenu');
});

// Section Navigation
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

function backToMenu() {
    showSection('mainMenu');
    resetQuiz();
}

// ==================== FLASHCARDS ====================

function startFlashcards() {
    currentFlashcardIndex = 0;
    showSection('flashcardsSection');
    displayFlashcard();
}

function displayFlashcard() {
    const flashcard = document.getElementById('flashcard');
    const questionEl = document.getElementById('flashcardQuestion');
    const answerEl = document.getElementById('flashcardAnswer');
    const counterEl = document.getElementById('flashcardCounter');
    const progressEl = document.getElementById('flashcardProgress');
    
    // Remove flipped class
    flashcard.classList.remove('flipped');
    
    // Update content
    const currentCard = flashcardsData[currentFlashcardIndex];
    questionEl.textContent = currentCard.question;
    answerEl.textContent = currentCard.answer;
    
    // Update counter and progress
    counterEl.textContent = `Karte ${currentFlashcardIndex + 1} von ${flashcardsData.length}`;
    const progress = ((currentFlashcardIndex + 1) / flashcardsData.length) * 100;
    progressEl.style.width = progress + '%';
}

function flipCard() {
    const flashcard = document.getElementById('flashcard');
    flashcard.classList.toggle('flipped');
}

function previousFlashcard() {
    if (currentFlashcardIndex > 0) {
        currentFlashcardIndex--;
        displayFlashcard();
    }
}

function nextFlashcard() {
    if (currentFlashcardIndex < flashcardsData.length - 1) {
        currentFlashcardIndex++;
        displayFlashcard();
    }
}

// ==================== QUIZ ====================

function startQuiz() {
    resetQuiz();
    showSection('quizSection');
    displayQuestion();
}

function resetQuiz() {
    currentQuestionIndex = 0;
    quizScore = 0;
    userAnswers = [];
    selectedAnswer = null;
}

function displayQuestion() {
    const question = quizData[currentQuestionIndex];
    const questionTextEl = document.getElementById('questionText');
    const questionPointsEl = document.getElementById('questionPoints');
    const answersContainer = document.getElementById('answersContainer');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const progressEl = document.getElementById('quizProgress');
    const submitBtn = document.getElementById('submitAnswer');
    
    // Update question text and points
    questionTextEl.textContent = `Frage ${currentQuestionIndex + 1}: ${question.question}`;
    questionPointsEl.textContent = `⭐ ${question.points} Punkte`;
    
    // Update score display
    scoreDisplay.textContent = `Punkte: ${quizScore} / 100`;
    
    // Update progress bar
    const progress = (currentQuestionIndex / quizData.length) * 100;
    progressEl.style.width = progress + '%';
    
    // Clear and populate answers
    answersContainer.innerHTML = '';
    selectedAnswer = null;
    submitBtn.disabled = true;
    
    question.answers.forEach((answer, index) => {
        const answerDiv = document.createElement('div');
        answerDiv.className = 'answer-option';
        answerDiv.textContent = answer.text;
        answerDiv.onclick = () => selectAnswer(index);
        answerDiv.dataset.index = index;
        answersContainer.appendChild(answerDiv);
    });
}

function selectAnswer(index) {
    // Remove previous selection
    const allAnswers = document.querySelectorAll('.answer-option');
    allAnswers.forEach(answer => answer.classList.remove('selected'));
    
    // Mark new selection
    allAnswers[index].classList.add('selected');
    selectedAnswer = index;
    
    // Enable submit button
    document.getElementById('submitAnswer').disabled = false;
}

function submitAnswer() {
    if (selectedAnswer === null) return;
    
    const question = quizData[currentQuestionIndex];
    const isCorrect = question.answers[selectedAnswer].correct;
    
    // Save user answer
    userAnswers.push({
        questionIndex: currentQuestionIndex,
        selectedAnswer: selectedAnswer,
        correct: isCorrect,
        points: isCorrect ? question.points : 0
    });
    
    // Update score if correct
    if (isCorrect) {
        quizScore += question.points;
    }
    
    // Visual feedback
    const allAnswers = document.querySelectorAll('.answer-option');
    allAnswers.forEach((answer, index) => {
        answer.classList.add('disabled');
        if (question.answers[index].correct) {
            answer.classList.add('correct');
        } else if (index === selectedAnswer && !isCorrect) {
            answer.classList.add('incorrect');
        }
    });
    
    // Disable submit button
    document.getElementById('submitAnswer').disabled = true;
    
    // Move to next question or show results after a delay
    setTimeout(() => {
        if (currentQuestionIndex < quizData.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
        } else {
            showResults();
        }
    }, 2000);
}

// ==================== RESULTS ====================

function showResults() {
    showSection('resultsSection');
    
    // Update final score
    document.getElementById('finalScore').textContent = `${quizScore} / 100`;
    
    // Calculate and display grade
    const grade = calculateGrade(quizScore);
    document.getElementById('gradeDisplay').textContent = grade.text;
    
    // Display detailed feedback
    displayDetailedFeedback();
    
    // Generate AI feedback
    generateAIFeedback();
}

function calculateGrade(score) {
    if (score >= 90) return { text: "Ausgezeichnet! 🏆", class: "excellent" };
    if (score >= 75) return { text: "Sehr gut! 🌟", class: "good" };
    if (score >= 60) return { text: "Gut 👍", class: "satisfactory" };
    if (score >= 50) return { text: "Befriedigend ✓", class: "passing" };
    return { text: "Noch Übung nötig 📚", class: "needs-improvement" };
}

function displayDetailedFeedback() {
    const feedbackContainer = document.getElementById('detailedFeedback');
    feedbackContainer.innerHTML = '';
    
    userAnswers.forEach((answer, index) => {
        const question = quizData[answer.questionIndex];
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = `question-feedback ${answer.correct ? 'correct' : 'incorrect'}`;
        
        const title = document.createElement('div');
        title.className = 'question-feedback-title';
        title.textContent = `Frage ${index + 1}: ${answer.correct ? '✓ Richtig' : '✗ Falsch'} (${answer.points}/${question.points} Punkte)`;
        
        const text = document.createElement('div');
        text.className = 'question-feedback-text';
        text.textContent = question.explanation;
        
        feedbackDiv.appendChild(title);
        feedbackDiv.appendChild(text);
        feedbackContainer.appendChild(feedbackDiv);
    });
}

function generateAIFeedback() {
    const aiFeedbackContainer = document.getElementById('aiFeedback');
    const correctAnswers = userAnswers.filter(a => a.correct).length;
    const totalQuestions = quizData.length;
    const percentage = (quizScore / 100) * 100;
    
    let feedback = '';
    
    // Performance analysis
    if (percentage >= 90) {
        feedback += '<div class="ai-feedback-text">';
        feedback += '<p><strong>Hervorragende Leistung!</strong> Sie haben ein ausgezeichnetes Verständnis der Thematik gezeigt.</p>';
        feedback += '<p><strong>Was gut war:</strong></p><ul>';
        feedback += '<li>Sie haben fast alle oder alle Fragen richtig beantwortet</li>';
        feedback += '<li>Ihr Wissen in diesem Bereich ist sehr solide</li>';
        feedback += '<li>Sie verstehen die Konzepte auf einem fortgeschrittenen Niveau</li>';
        feedback += '</ul>';
        feedback += '<p><strong>Empfehlung:</strong> Sie können mit weiterführenden Themen fortfahren.</p>';
        feedback += '</div>';
    } else if (percentage >= 75) {
        feedback += '<div class="ai-feedback-text">';
        feedback += '<p><strong>Sehr gute Leistung!</strong> Sie haben ein gutes Verständnis der meisten Konzepte.</p>';
        feedback += '<p><strong>Was gut war:</strong></p><ul>';
        feedback += '<li>Sie haben die Mehrheit der Fragen korrekt beantwortet</li>';
        feedback += '<li>Ihr Grundwissen ist sehr gut</li>';
        feedback += '</ul>';
        
        // Find topics that need improvement
        const incorrectTopics = userAnswers.filter(a => !a.correct).map(a => `Frage ${a.questionIndex + 1}`);
        if (incorrectTopics.length > 0) {
            feedback += '<p><strong>Verbesserungspotential:</strong></p><ul>';
            feedback += `<li>Überprüfen Sie noch einmal: ${incorrectTopics.join(', ')}</li>`;
            feedback += '</ul>';
        }
        feedback += '<p><strong>Empfehlung:</strong> Wiederholen Sie die Themen der falsch beantworteten Fragen kurz mit den Flashcards.</p>';
        feedback += '</div>';
    } else if (percentage >= 50) {
        feedback += '<div class="ai-feedback-text">';
        feedback += '<p><strong>Solide Grundlage!</strong> Sie haben grundlegendes Verständnis, aber es gibt Raum für Verbesserung.</p>';
        feedback += '<p><strong>Was gut war:</strong></p><ul>';
        feedback += '<li>Sie haben die Hälfte oder mehr der Fragen richtig beantwortet</li>';
        feedback += '<li>Sie haben Grundkenntnisse in diesem Bereich</li>';
        feedback += '</ul>';
        feedback += '<p><strong>Was verbessert werden könnte:</strong></p><ul>';
        feedback += '<li>Vertiefen Sie Ihr Verständnis der Konzepte</li>';
        feedback += '<li>Nutzen Sie die Flashcards für gezieltes Lernen</li>';
        feedback += '<li>Wiederholen Sie das Quiz nach dem Lernen</li>';
        feedback += '</ul>';
        feedback += '<p><strong>Empfehlung:</strong> Gehen Sie die Flashcards durch und versuchen Sie das Quiz erneut.</p>';
        feedback += '</div>';
    } else {
        feedback += '<div class="ai-feedback-text">';
        feedback += '<p><strong>Noch Übung nötig!</strong> Keine Sorge, jeder fängt irgendwo an!</p>';
        feedback += '<p><strong>Was verbessert werden sollte:</strong></p><ul>';
        feedback += '<li>Grundlegendes Verständnis der Konzepte noch nicht gefestigt</li>';
        feedback += '<li>Mehrere wichtige Konzepte wurden nicht verstanden</li>';
        feedback += '</ul>';
        feedback += '<p><strong>Empfehlung:</strong></p><ul>';
        feedback += '<li>Beginnen Sie mit den Flashcards und nehmen Sie sich Zeit für jede Karte</li>';
        feedback += '<li>Versuchen Sie, die Konzepte wirklich zu verstehen, nicht nur auswendig zu lernen</li>';
        feedback += '<li>Wiederholen Sie das Quiz mehrmals, bis Sie sich sicher fühlen</li>';
        feedback += '<li>Suchen Sie bei Bedarf zusätzliche Lernressourcen</li>';
        feedback += '</ul>';
        feedback += '</div>';
    }
    
    aiFeedbackContainer.innerHTML = feedback;
}

function restartQuiz() {
    startQuiz();
}
