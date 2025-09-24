export type Language = 'en' | 'fr'

const frTranslations = {
  // Main App
  appTitle: 'La tour de calcul',
  appSubtitle:
    'Construisez votre tour en résolvant des problèmes de mathématiques !',

  // Game Instructions
  instructionsCorrect: 'Bonnes réponses ajoutent des blocs à votre tour',
  instructionsWrong: 'Mauvaises réponses font tomber des blocs',
  instructionsGoal: 'Construisez la tour la plus haute possible !',

  // Game Modes
  modesAddition: 'Addition',
  modesMultiplication: 'Multiplication',
  modesChooseMode: 'Choisissez le Mode de Jeu',
  modesAdditionDescription: "Pratiquez les problèmes d'addition",
  modesMultiplicationDescription: 'Pratiquez les tables de multiplication!',
  modesChangeMode: 'Changer de Mode',
  modesCurrentMode: 'Mode actuel',

  // Game Stats
  statsScore: 'Score',
  statsLevel: 'Niveau',
  statsLives: 'Vies',

  // Game Over
  gameOverTitle: 'Jeu Terminé !',
  gameOverFinalScore: 'Score Final',
  gameOverPlayAgain: 'Rejouer',
  gameOverMode: 'Mode',

  // High Scores
  highScoresTitle: 'Meilleurs scores',
  highScoresNoScores:
    'Aucun score pour le mode {mode}. Commencez à jouer pour établir des records !',
  highScoresClear: 'Effacer',

  // Tower Display
  towerBlocksBelow: 'blocs ci-dessous',
  towerMoreBlocksBelow: 'autres blocs ci-dessous',

  // Problems
  problemsStartGame: 'Commencez le jeu pour voir les problèmes !',
  problemsEasy: 'facile',
  problemsMedium: 'moyen',
  problemsHard: 'difficile',

  // Table Selection
  tablesAddition: "Choisissez les tables pour l'addition",
  tablesMultiplication: 'Choisissez les tables de multiplication',
  tablesSelectInstructions: 'Sélectionnez une ou plusieurs tables à pratiquer',
  tablesSelectAll: 'Tout sélectionner',
  tablesClear: 'Effacer',
  tablesSelected: 'Tables sélectionnées',
  tablesAll: 'toutes les tables',
  gameStart: 'Commencer le jeu',

  // Difficulty levels
  difficultyEasy: 'Facile',
  difficultyMedium: 'Moyen',
  difficultyHard: 'Difficile',

  // Header
  headerHome: 'Accueil',
}

const enTranslations = {
  // Main App
  appTitle: 'CalcuLearn Tower',
  appSubtitle: 'Build your tower by solving math problems!',

  // Game Instructions
  instructionsCorrect: 'Correct answers add blocks to your tower',
  instructionsWrong: 'Wrong answers make blocks fall',
  instructionsGoal: 'Build the highest tower possible!',

  // Game Modes
  modesAddition: 'Addition',
  modesMultiplication: 'Multiplication',
  modesChooseMode: 'Choose Game Mode',
  modesAdditionDescription: 'Practice addition problems',
  modesMultiplicationDescription: 'Practice multiplication tables!',
  modesChangeMode: 'Change Mode',
  modesCurrentMode: 'Current Mode',

  // Game Stats
  statsScore: 'Score',
  statsLevel: 'Level',
  statsLives: 'Lives',

  // Game Over
  gameOverTitle: 'Game Over!',
  gameOverFinalScore: 'Final Score',
  gameOverPlayAgain: 'Play Again',
  gameOverMode: 'Mode',

  // High Scores
  highScoresTitle: 'High Scores',
  highScoresNoScores:
    'No scores for {mode} mode. Start playing to set records!',
  highScoresClear: 'Clear',

  // Tower Display
  towerBlocksBelow: 'blocks below',
  towerMoreBlocksBelow: 'more blocks below',

  // Problems
  problemsStartGame: 'Start the game to see problems!',
  problemsEasy: 'easy',
  problemsMedium: 'medium',
  problemsHard: 'hard',

  // Table Selection
  tablesAddition: 'Choose tables for addition',
  tablesMultiplication: 'Choose multiplication tables',
  tablesSelectInstructions: 'Select one or more tables to practice',
  tablesSelectAll: 'Select All',
  tablesClear: 'Clear',
  tablesSelected: 'Selected tables',
  tablesAll: 'all tables',
  gameStart: 'Start Game',

  // Difficulty levels
  difficultyEasy: 'Easy',
  difficultyMedium: 'Medium',
  difficultyHard: 'Hard',

  // Header
  headerHome: 'Home',
}

export const translations = {
  en: enTranslations,
  fr: frTranslations,
}

let currentLanguage: Language = 'en'

export const setLanguage = (lang: Language): void => {
  currentLanguage = lang
  localStorage.setItem('calculearn-language', lang)
}

export const getLanguage = (): Language => {
  const saved = localStorage.getItem('calculearn-language') as Language
  if (saved && (saved === 'en' || saved === 'fr')) {
    currentLanguage = saved
    return saved
  }

  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('fr')) {
    currentLanguage = 'fr'
    return 'fr'
  }

  currentLanguage = 'en'
  return 'en'
}

// Initialize language on module load
currentLanguage = getLanguage()

export const t = (
  key: string,
  replacements?: Record<string, string | number>
): string => {
  const currentTranslations = translations[currentLanguage] as Record<
    string,
    string
  >
  const value = currentTranslations[key]

  if (!value) return key

  if (replacements) {
    return Object.entries(replacements).reduce(
      (text, [placeholder, replacement]) => {
        return text.replace(
          new RegExp(`{${placeholder}}`, 'g'),
          String(replacement)
        )
      },
      value
    )
  }

  return value
}

export const toggleLanguage = (): Language => {
  const newLang: Language = currentLanguage === 'en' ? 'fr' : 'en'
  setLanguage(newLang)
  return newLang
}
