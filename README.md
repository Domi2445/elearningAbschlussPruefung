# E-Learning Plattform

Eine interaktive E-Learning Plattform mit Flashcards und Quiz-Funktionalität. Die Plattform bietet Lernkarten zum Durchgehen und ein Quiz-System mit intelligenter KI-Bewertung.

## Features

### 📚 Flashcards
- 8 interaktive Lernkarten zu Webentwicklung-Themen
- Flip-Animation zum Anzeigen von Fragen und Antworten
- Navigation zwischen Karten (Zurück/Weiter)
- Fortschrittsanzeige

### ✍️ Quiz-System
- 4 Multiple-Choice-Fragen
- Jede Frage ist 25 Punkte wert (gesamt 100 Punkte)
- Visuelles Feedback für richtige/falsche Antworten
- Echtzeit-Punkteanzeige
- Automatischer Übergang zwischen Fragen

### 📊 Bewertung & Feedback
- Finale Punktzahl-Anzeige
- Notensystem (Ausgezeichnet, Sehr gut, Gut, Befriedigend, Noch Übung nötig)
- Detailliertes Feedback für jede Frage mit Erklärungen
- Farbcodierte Ergebnisse (grün für richtig, rot für falsch)

### 🤖 KI-Bewertung
- Intelligente Analyse basierend auf der Leistung
- Personalisiertes Feedback für verschiedene Punktebereiche (90+, 75+, 50+, <50)
- Identifizierung von Stärken
- Hinweise auf Verbesserungspotenziale
- Spezifische Empfehlungen
- Vorschläge für nächste Schritte

## Verwendung

1. Öffnen Sie `index.html` in einem Webbrowser
2. Wählen Sie zwischen Flashcards lernen oder Quiz starten
3. Bei Flashcards: Klicken Sie auf die Karte, um sie zu drehen
4. Bei Quiz: Wählen Sie eine Antwort und bestätigen Sie
5. Am Ende erhalten Sie detailliertes Feedback und eine KI-Bewertung

## Technische Details

- **Reine HTML/CSS/JavaScript** - Keine Abhängigkeiten, funktioniert in jedem Browser
- **Responsive Design** - Funktioniert auf Desktop und Mobil
- **Smooth Animations** - CSS Transitions und Transforms
- **Modulare Architektur** - Separate Dateien für Daten, Logik und Präsentation
- **Einfach erweiterbar** - Fügen Sie weitere Flashcards und Fragen in `data.js` hinzu

## Dateien

- `index.html` - Hauptseite mit HTML-Struktur
- `styles.css` - Styling und Animationen
- `app.js` - Anwendungslogik
- `data.js` - Flashcards und Quiz-Daten

## Erweiterung

Um neue Inhalte hinzuzufügen, bearbeiten Sie `data.js`:

```javascript
// Neue Flashcard hinzufügen
const flashcardsData = [
    ...
    {
        question: "Ihre Frage hier",
        answer: "Ihre Antwort hier"
    }
];

// Neue Quiz-Frage hinzufügen
const quizData = [
    ...
    {
        question: "Ihre Frage hier",
        points: 25,
        answers: [
            { text: "Option 1", correct: false },
            { text: "Option 2", correct: true },
            { text: "Option 3", correct: false },
            { text: "Option 4", correct: false }
        ],
        explanation: "Erklärung hier"
    }
];
```

## Lizenz

Dieses Projekt ist für Bildungszwecke erstellt.
