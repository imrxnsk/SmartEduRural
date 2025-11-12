import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'smartedurural_tests';

const DEFAULT_AVAILABLE_TESTS = [
  {
    id: 1,
    title: 'Mathematics - Algebra Test',
    subject: 'mathematics',
    subjectLabel: 'Mathematics',
    duration: 60,
    difficulty: 'Medium',
    description: 'Test your understanding of algebraic expressions and equations.',
    date: '2024-01-20',
    time: '10:00 AM',
    maxAttempts: 3,
    totalParticipants: 156,
    instructions: 'Solve each problem carefully. Show your working on paper before choosing the answer.',
    questionsData: [
      {
        id: 'alg-1',
        question: 'What is the solution to 2x + 5 = 17?',
        type: 'multiple-choice',
        options: ['x = 12', 'x = 6', 'x = -6', 'x = -12'],
        correctAnswer: 1,
        marks: 2,
        explanation: 'Subtract 5 from both sides to get 2x = 12, then divide by 2.'
      },
      {
        id: 'alg-2',
        question: 'Simplify: (3x^2 - 2x + 4) - (x^2 + 5x - 1)',
        type: 'multiple-choice',
        options: ['2x^2 - 7x + 5', '2x^2 - 3x + 3', '4x^2 + 3x + 5', '2x^2 - 7x - 3'],
        correctAnswer: 0,
        marks: 3,
        explanation: 'Subtract coefficients term by term: 3x^2 - x^2 = 2x^2, -2x - 5x = -7x, 4 - (-1) = 5.'
      },
      {
        id: 'alg-3',
        question: 'If y varies directly with x and y = 18 when x = 6, what is y when x = 9?',
        type: 'multiple-choice',
        options: ['21', '24', '27', '30'],
        correctAnswer: 2,
        marks: 2,
        explanation: 'Find the constant of variation k = 3, then y = 3 × 9 = 27.'
      },
      {
        id: 'alg-4',
        question: 'Which of the following is the factored form of x^2 - 9x + 18?',
        type: 'multiple-choice',
        options: ['(x - 6)(x - 3)', '(x - 9)(x + 2)', '(x - 3)(x - 6)', '(x - 2)(x - 9)'],
        correctAnswer: 2,
        marks: 3,
        explanation: 'Find two numbers that multiply to 18 and add to -9: -3 and -6.'
      }
    ]
  },
  {
    id: 2,
    title: 'Science - Physics Quiz',
    subject: 'science',
    subjectLabel: 'Science',
    duration: 45,
    difficulty: 'Easy',
    description: 'Check your understanding of basic motion, force, and energy concepts.',
    date: '2024-01-22',
    time: '2:00 PM',
    maxAttempts: 2,
    totalParticipants: 89,
    instructions: 'Choose the best answer for each question using fundamental physics concepts.',
    questionsData: [
      {
        id: 'phy-1',
        question: 'What is the SI unit of force?',
        type: 'multiple-choice',
        options: ['Joule', 'Newton', 'Pascal', 'Watt'],
        correctAnswer: 1,
        marks: 2,
        explanation: 'Force is measured in Newtons (N).'
      },
      {
        id: 'phy-2',
        question: 'Which law states that for every action there is an equal and opposite reaction?',
        type: 'multiple-choice',
        options: ['Newton’s First Law', 'Newton’s Second Law', 'Newton’s Third Law', 'Law of Gravitation'],
        correctAnswer: 2,
        marks: 2,
        explanation: 'Newton’s Third Law describes action-reaction pairs.'
      },
      {
        id: 'phy-3',
        question: 'A car travels 60 km in 1.5 hours. What is its average speed?',
        type: 'multiple-choice',
        options: ['30 km/h', '40 km/h', '45 km/h', '60 km/h'],
        correctAnswer: 1,
        marks: 2,
        explanation: 'Average speed = distance ÷ time = 60 ÷ 1.5 = 40 km/h.'
      },
      {
        id: 'phy-4',
        question: 'What form of energy is stored in a stretched rubber band?',
        type: 'multiple-choice',
        options: ['Kinetic energy', 'Thermal energy', 'Elastic potential energy', 'Chemical energy'],
        correctAnswer: 2,
        marks: 2,
        explanation: 'Stretching a rubber band stores elastic potential energy.'
      },
      {
        id: 'phy-5',
        question: 'Which instrument is used to measure electric current?',
        type: 'multiple-choice',
        options: ['Voltmeter', 'Ammeter', 'Thermometer', 'Hygrometer'],
        correctAnswer: 1,
        marks: 2,
        explanation: 'An ammeter measures electric current in amperes.'
      }
    ]
  },
  {
    id: 3,
    title: 'English - Grammar Assessment',
    subject: 'english',
    subjectLabel: 'English',
    duration: 30,
    difficulty: 'Easy',
    description: 'Test your knowledge of fundamental grammar rules and usage.',
    date: '2024-01-25',
    time: '11:00 AM',
    maxAttempts: 1,
    totalParticipants: 203,
    instructions: 'Pick the grammatically correct option for each sentence.',
    questionsData: [
      {
        id: 'eng-1',
        question: 'Choose the correctly punctuated sentence.',
        type: 'multiple-choice',
        options: ['Its raining outside.', 'It’s raining outside.', 'Its’ raining outside.', 'Its raining, outside.'],
        correctAnswer: 1,
        marks: 2,
        explanation: '“It’s” is the contraction for “it is.”'
      },
      {
        id: 'eng-2',
        question: 'Select the sentence with correct subject-verb agreement.',
        type: 'multiple-choice',
        options: ['The list of items are on the desk.', 'The list of items is on the desk.', 'The lists of item is on the desk.', 'The lists of item are on the desk.'],
        correctAnswer: 1,
        marks: 2,
        explanation: '“List” is singular, so use “is.”'
      },
      {
        id: 'eng-3',
        question: 'Identify the correct usage of the word “their.”',
        type: 'multiple-choice',
        options: ['Their going to the market.', 'The dog wagged it’s tail at their owner.', 'The students submitted their assignments.', 'The cat picked up there toy.'],
        correctAnswer: 2,
        marks: 2,
        explanation: '“Their” shows possession, as in “their assignments.”'
      },
      {
        id: 'eng-4',
        question: 'Which sentence uses the correct tense?',
        type: 'multiple-choice',
        options: ['I seen the movie yesterday.', 'I have saw the movie yesterday.', 'I saw the movie yesterday.', 'I have see the movie yesterday.'],
        correctAnswer: 2,
        marks: 2,
        explanation: 'Past simple tense “saw” is correct with “yesterday.”'
      }
    ]
  }
];

const DEFAULT_COMPLETED_TESTS = [
  {
    id: 'default-geometry',
    title: 'Mathematics - Geometry Test',
    subject: 'mathematics',
    subjectLabel: 'Mathematics',
    difficulty: 'Medium',
    score: 92,
    maxScore: 100,
    duration: 55,
    questions: 25,
    completedAt: '2024-01-15T10:00:00.000Z',
    totalParticipants: 156,
    studentId: 1,
    studentName: 'Rahul Kumar',
    attempt: 1,
    needsReview: false
  },
  {
    id: 'default-chemistry',
    title: 'Science - Chemistry Quiz',
    subject: 'science',
    subjectLabel: 'Science',
    difficulty: 'Easy',
    score: 78,
    maxScore: 100,
    duration: 42,
    questions: 20,
    completedAt: '2024-01-12T14:00:00.000Z',
    totalParticipants: 89,
    studentId: 1,
    studentName: 'Rahul Kumar',
    attempt: 1,
    needsReview: false
  }
];

const DEFAULT_SUBMISSIONS = [];

const TestContext = createContext(null);

const capitalizeWords = (value) =>
  value
    ? value
        .toString()
        .split(/\s|-/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(' ')
    : 'General';

const formatDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const formatTime = (value) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit'
  });
};

const normalizeQuestion = (question, index) => {
  const type = question.type || 'multiple-choice';
  const options = Array.isArray(question.options) ? question.options : [];
  let correctAnswer = typeof question.correctAnswer === 'number' ? question.correctAnswer : null;
  if (correctAnswer !== null && (correctAnswer < 0 || correctAnswer >= options.length)) {
    correctAnswer = null;
  }
  return {
    id: question.id || `question-${index}`,
    question: question.question || 'Untitled question',
    type,
    options,
    correctAnswer,
    marks: Number(question.marks) || 1,
    explanation: question.explanation || '',
    autoGrade: question.autoGrade ?? (type === 'multiple-choice' || type === 'true-false')
  };
};

const normalizeAvailableTest = (raw) => {
  const id = raw.id ?? Date.now();
  const subjectRaw = raw.subject || 'general';
  const startDate = raw.startDate || null;
  const normalizedQuestions = Array.isArray(raw.questionsData)
    ? raw.questionsData.map(normalizeQuestion)
    : [];
  const questionCount = normalizedQuestions.length || Number(raw.questions ?? raw.totalQuestions) || 0;

  return {
    id,
    title: raw.title || 'Untitled Test',
    subject: subjectRaw.toString().toLowerCase(),
    subjectLabel: raw.subjectLabel || capitalizeWords(subjectRaw),
    duration: Number(raw.duration) || 0,
    questions: questionCount,
    difficulty: raw.difficulty ? capitalizeWords(raw.difficulty) : 'Medium',
    description: raw.description || 'No description provided.',
    date: raw.date || formatDate(startDate),
    time: raw.time || formatTime(startDate),
    startDate,
    endDate: raw.endDate || null,
    maxAttempts: Number(raw.maxAttempts) || 1,
    totalParticipants: Number(raw.totalParticipants) || 0,
    instructions: raw.instructions || '',
    questionsData: normalizedQuestions,
    createdAt: raw.createdAt || new Date().toISOString()
  };
};

const normalizeCompletedTest = (raw) => {
  const subjectRaw = raw.subject || 'general';
  const completedAt = raw.completedAt || new Date().toISOString();
  return {
    id: raw.id ?? Date.now(),
    testId: raw.testId ?? null,
    title: raw.title || 'Completed Test',
    subject: subjectRaw.toString().toLowerCase(),
    subjectLabel: raw.subjectLabel || capitalizeWords(subjectRaw),
    difficulty: raw.difficulty ? capitalizeWords(raw.difficulty) : 'Medium',
    score: Number(raw.score) || 0,
    maxScore: Number(raw.maxScore) || 100,
    duration: Number(raw.duration) || 0,
    questions: Number(raw.questions ?? raw.totalQuestions) || 0,
    date: raw.date || formatDate(completedAt),
    time: raw.time || formatTime(completedAt),
    status: raw.status || 'completed',
    totalParticipants: Number(raw.totalParticipants) || 0,
    studentId: raw.studentId ?? null,
    studentName: raw.studentName || 'Student',
    attempt: Number(raw.attempt) || 1,
    needsReview: Boolean(raw.needsReview),
    completedAt
  };
};

const normalizeSubmission = (raw) => ({
  id: raw.id ?? Date.now(),
  testId: raw.testId,
  testTitle: raw.testTitle,
  subject: raw.subject,
  subjectLabel: raw.subjectLabel,
  studentId: raw.studentId ?? null,
  studentName: raw.studentName || 'Student',
  answers: Array.isArray(raw.answers) ? raw.answers : [],
  questionsData: Array.isArray(raw.questionsData) ? raw.questionsData : [],
  score: Number(raw.score) || 0,
  maxScore: Number(raw.maxScore) || 0,
  attempt: Number(raw.attempt) || 1,
  submittedAt: raw.submittedAt || new Date().toISOString(),
  needsReview: Boolean(raw.needsReview)
});

const buildSubjects = (availableTests, completedTests) => {
  const subjectMap = new Map();

  [...availableTests, ...completedTests].forEach((test) => {
    if (!test.subject) return;
    if (!subjectMap.has(test.subject)) {
      subjectMap.set(test.subject, test.subjectLabel || capitalizeWords(test.subject));
    }
  });

  const subjects = Array.from(subjectMap.entries())
    .sort((a, b) => a[1].localeCompare(b[1]))
    .map(([value, label]) => ({ value, label }));

  return [{ value: 'all', label: 'All Subjects' }, ...subjects];
};

export const TestProvider = ({ children }) => {
  const [availableTests, setAvailableTests] = useState([]);
  const [completedTests, setCompletedTests] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const storedAvailable = Array.isArray(parsed?.availableTests)
          ? parsed.availableTests.map(normalizeAvailableTest)
          : [];
        const storedCompleted = Array.isArray(parsed?.completedTests)
          ? parsed.completedTests.map(normalizeCompletedTest)
          : [];
        const storedSubmissions = Array.isArray(parsed?.submissions)
          ? parsed.submissions.map(normalizeSubmission)
          : [];

        setAvailableTests(storedAvailable.length ? storedAvailable : DEFAULT_AVAILABLE_TESTS.map(normalizeAvailableTest));
        setCompletedTests(storedCompleted.length ? storedCompleted : DEFAULT_COMPLETED_TESTS.map(normalizeCompletedTest));
        setSubmissions(storedSubmissions.length ? storedSubmissions : DEFAULT_SUBMISSIONS.map(normalizeSubmission));
      } else {
        setAvailableTests(DEFAULT_AVAILABLE_TESTS.map(normalizeAvailableTest));
        setCompletedTests(DEFAULT_COMPLETED_TESTS.map(normalizeCompletedTest));
        setSubmissions(DEFAULT_SUBMISSIONS.map(normalizeSubmission));
      }
    } catch (error) {
      console.error('Failed to load stored tests', error);
      setAvailableTests(DEFAULT_AVAILABLE_TESTS.map(normalizeAvailableTest));
      setCompletedTests(DEFAULT_COMPLETED_TESTS.map(normalizeCompletedTest));
      setSubmissions(DEFAULT_SUBMISSIONS.map(normalizeSubmission));
    }
  }, []);

  useEffect(() => {
    try {
      const snapshot = JSON.stringify({ availableTests, completedTests, submissions });
      localStorage.setItem(STORAGE_KEY, snapshot);
    } catch (error) {
      console.error('Failed to persist tests', error);
    }
  }, [availableTests, completedTests, submissions]);

  const publishTest = useCallback((test) => {
    const normalized = normalizeAvailableTest(test);
    setAvailableTests((prev) => [...prev.filter((item) => item.id !== normalized.id), normalized]);
    return normalized;
  }, []);

  const startTest = useCallback(
    (testId, studentId) => {
      const test = availableTests.find((item) => item.id === testId);
      if (!test) {
        return { allowed: false, reason: 'not_found', attempt: 0 };
      }

      const previousAttempts = submissions.filter(
        (submission) => submission.testId === testId && submission.studentId === studentId
      ).length;

      if (previousAttempts >= test.maxAttempts) {
        return { allowed: false, reason: 'max_attempts', attempt: previousAttempts };
      }

      return { allowed: true, attempt: previousAttempts + 1 };
    },
    [availableTests, submissions]
  );

  const submitTest = useCallback(
    (testId, submissionData) => {
      const test = availableTests.find((item) => item.id === testId);
      if (!test) {
        return { success: false, error: 'Test not found' };
      }

      const { studentId, studentName, answers } = submissionData;
      const previousAttempts = submissions.filter(
        (submission) => submission.testId === testId && submission.studentId === studentId
      ).length;

      if (previousAttempts >= test.maxAttempts) {
        return { success: false, error: 'Maximum attempts reached' };
      }

      const attemptNumber = submissionData.attempt ?? previousAttempts + 1;
      const questionBank = test.questionsData || [];
      const answerMap = new Map();
      (answers || []).forEach((answer) => {
        if (answer?.questionId) {
          answerMap.set(answer.questionId, answer.response);
        }
      });

      let score = 0;
      let maxScore = 0;
      let needsReview = false;

      const evaluatedAnswers = questionBank.map((question) => {
        const response = answerMap.has(question.id) ? answerMap.get(question.id) : null;
        const marksPossible = Number(question.marks) || 1;
        maxScore += marksPossible;

        let isCorrect = null;
        let marksAwarded = 0;

        if (question.autoGrade && question.correctAnswer !== null) {
          isCorrect = Number(response) === Number(question.correctAnswer);
          if (isCorrect) {
            marksAwarded = marksPossible;
            score += marksPossible;
          }
        } else {
          // No auto-grading for this question type; award 0 now and do not block progress
          // needsReview remains false to avoid gating the student's progress
        }

        return {
          questionId: question.id,
          response,
          isCorrect,
          marksAwarded,
          marksPossible
        };
      });

      const submission = normalizeSubmission({
        id: Date.now(),
        testId,
        testTitle: test.title,
        subject: test.subject,
        subjectLabel: test.subjectLabel,
        studentId,
        studentName,
        answers: evaluatedAnswers,
        questionsData: test.questionsData || [],
        score,
        maxScore,
        attempt: attemptNumber,
        needsReview: false
      });

      setSubmissions((prev) => [...prev, submission]);

      const completedEntry = normalizeCompletedTest({
        id: `${testId}-${submission.id}`,
        testId,
        title: test.title,
        subject: test.subject,
        subjectLabel: test.subjectLabel,
        difficulty: test.difficulty,
        score: submission.score,
        maxScore: submission.maxScore,
        duration: test.duration,
        questions: test.questions,
        studentId,
        studentName,
        attempt: submission.attempt,
        needsReview: false,
        completedAt: submission.submittedAt,
        totalParticipants: test.totalParticipants + 1
      });

      setCompletedTests((prev) => [...prev, completedEntry]);

      setAvailableTests((prev) =>
        prev.map((item) =>
          item.id === testId
            ? {
                ...item,
                totalParticipants: item.totalParticipants + 1
              }
            : item
        )
      );

      return { success: true, submission, completed: completedEntry };
    },
    [availableTests, submissions]
  );

  const resetTests = useCallback(() => {
    setAvailableTests(DEFAULT_AVAILABLE_TESTS.map(normalizeAvailableTest));
    setCompletedTests(DEFAULT_COMPLETED_TESTS.map(normalizeCompletedTest));
    setSubmissions(DEFAULT_SUBMISSIONS.map(normalizeSubmission));
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const contextValue = useMemo(
    () => ({
      availableTests,
      completedTests,
      submissions,
      subjects: buildSubjects(availableTests, completedTests),
      publishTest,
      startTest,
      submitTest,
      resetTests
    }),
    [availableTests, completedTests, submissions, publishTest, startTest, submitTest, resetTests]
  );

  return <TestContext.Provider value={contextValue}>{children}</TestContext.Provider>;
};

export const useTests = () => {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error('useTests must be used within a TestProvider');
  }
  return context;
};

