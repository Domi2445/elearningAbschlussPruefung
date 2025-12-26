// Sample Flashcards Data
const flashcardsData = [
    {
        question: "Was ist HTML?",
        answer: "HTML (HyperText Markup Language) ist die Standard-Auszeichnungssprache für die Erstellung von Webseiten."
    },
    {
        question: "Was ist CSS?",
        answer: "CSS (Cascading Style Sheets) ist eine Stylesheet-Sprache, die verwendet wird, um das Aussehen und die Formatierung von HTML-Dokumenten zu beschreiben."
    },
    {
        question: "Was ist JavaScript?",
        answer: "JavaScript ist eine Programmiersprache, die hauptsächlich für die Erstellung von interaktiven Webseiten verwendet wird."
    },
    {
        question: "Was bedeutet API?",
        answer: "API steht für Application Programming Interface - eine Schnittstelle, die es verschiedenen Softwareanwendungen ermöglicht, miteinander zu kommunizieren."
    },
    {
        question: "Was ist ein Array?",
        answer: "Ein Array ist eine Datenstruktur, die mehrere Werte in einer einzigen Variablen speichern kann."
    },
    {
        question: "Was ist eine Funktion?",
        answer: "Eine Funktion ist ein wiederverwendbarer Codeblock, der eine bestimmte Aufgabe ausführt."
    },
    {
        question: "Was ist ein Loop (Schleife)?",
        answer: "Eine Schleife ist eine Programmierstruktur, die es ermöglicht, einen Codeblock mehrmals auszuführen."
    },
    {
        question: "Was ist ein Objekt in der Programmierung?",
        answer: "Ein Objekt ist eine Sammlung von zusammengehörigen Daten und Funktionen (Eigenschaften und Methoden)."
    }
];

// Quiz Questions Data - 4 questions with 25 points each (total 100 points)
const quizData = [
    {
        question: "Welches HTML-Tag wird verwendet, um einen Hyperlink zu erstellen?",
        points: 25,
        answers: [
            { text: "<a>", correct: true },
            { text: "<link>", correct: false },
            { text: "<href>", correct: false },
            { text: "<url>", correct: false }
        ],
        explanation: "Das <a> Tag (Anchor) wird verwendet, um Hyperlinks in HTML zu erstellen."
    },
    {
        question: "Welche CSS-Eigenschaft wird verwendet, um die Textfarbe zu ändern?",
        points: 25,
        answers: [
            { text: "text-color", correct: false },
            { text: "font-color", correct: false },
            { text: "color", correct: true },
            { text: "text-style", correct: false }
        ],
        explanation: "Die CSS-Eigenschaft 'color' wird verwendet, um die Farbe des Textes zu ändern."
    },
    {
        question: "Welche JavaScript-Methode wird verwendet, um ein Element aus dem DOM auszuwählen?",
        points: 25,
        answers: [
            { text: "getElement()", correct: false },
            { text: "querySelector()", correct: true },
            { text: "selectElement()", correct: false },
            { text: "findElement()", correct: false }
        ],
        explanation: "querySelector() ist eine moderne Methode, um Elemente aus dem DOM auszuwählen. Auch getElementById() wäre korrekt, aber querySelector() ist vielseitiger."
    },
    {
        question: "Was ist der Unterschied zwischen '==' und '===' in JavaScript?",
        points: 25,
        answers: [
            { text: "Es gibt keinen Unterschied", correct: false },
            { text: "'==' prüft nur den Wert, '===' prüft Wert und Typ", correct: true },
            { text: "'===' ist langsamer als '=='", correct: false },
            { text: "'==' kann nur für Zahlen verwendet werden", correct: false }
        ],
        explanation: "'==' führt eine Typumwandlung durch und vergleicht nur Werte, während '===' (strict equality) sowohl Wert als auch Typ vergleicht."
    }
];
