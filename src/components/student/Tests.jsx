import React, { useEffect, useMemo, useState } from 'react';
import { Clock, Users, Trophy, Play, CheckCircle, XCircle, Calendar, Filter, Info, Send } from 'lucide-react';
import { useTests } from '../../contexts/TestContext';
import { useAuth } from '../../contexts/AuthContext';

const Tests = () => {
  const { user } = useAuth();
  const studentId = user?.id ?? 'guest';
  const studentName = user?.name || 'Anonymous Student';

  const { availableTests, completedTests, submissions, subjects, startTest, submitTest } = useTests();
  const [activeTab, setActiveTab] = useState('available');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [feedback, setFeedback] = useState(null);
  const [activeTestId, setActiveTestId] = useState(null);
  const [activeAttempt, setActiveAttempt] = useState(1);
  const [activeAnswers, setActiveAnswers] = useState({});
  const [activeSubmitting, setActiveSubmitting] = useState(false);
  const [viewingResultId, setViewingResultId] = useState(null);

  useEffect(() => {
    if (selectedSubject === 'all') return;
    const exists = subjects.some((subject) => subject.value === selectedSubject);
    if (!exists) {
      setSelectedSubject('all');
    }
  }, [selectedSubject, subjects]);

  const activeTest = useMemo(
    () => availableTests.find((test) => test.id === activeTestId) || null,
    [availableTests, activeTestId]
  );

  useEffect(() => {
    if (!activeTestId) return;
    const stillAvailable = availableTests.some((test) => test.id === activeTestId);
    if (!stillAvailable) {
      setActiveTestId(null);
    }
  }, [availableTests, activeTestId]);

  useEffect(() => {
    if (!feedback) return;
    const timeout = setTimeout(() => setFeedback(null), 4000);
    return () => clearTimeout(timeout);
  }, [feedback]);

  useEffect(() => {
    if (!activeTest) {
      setActiveAnswers({});
      return;
    }

    const initialAnswers = {};
    activeTest.questionsData.forEach((question) => {
      if (question.type === 'multiple-choice' || question.type === 'true-false') {
        initialAnswers[question.id] = null;
      } else {
        initialAnswers[question.id] = '';
      }
    });
    setActiveAnswers(initialAnswers);
  }, [activeTest]);

  const studentAttemptsByTest = useMemo(() => {
    const attemptMap = new Map();
    submissions.forEach((submission) => {
      if (submission.studentId !== studentId) return;
      attemptMap.set(submission.testId, (attemptMap.get(submission.testId) || 0) + 1);
    });
    return attemptMap;
  }, [submissions, studentId]);

  const handleStartTest = (test) => {
    const result = startTest(test.id, studentId);
    if (!result.allowed) {
      setFeedback({ type: 'error', message: 'You have reached the maximum number of attempts for this test.' });
      return;
    }

    setFeedback({ type: 'success', message: `${test.title} is ready. Good luck!` });
    setActiveTestId(test.id);
    setActiveAttempt(result.attempt);
    setActiveTab('available');
  };

  const handleViewResults = (test) => {
    // Find the submission for this completed test
    const submission = submissions.find(
      (s) => s.testId === test.testId && s.studentId === studentId && s.attempt === test.attempt
    );
    if (submission) {
      setViewingResultId(submission.id);
    } else {
      setFeedback({
        type: 'info',
        message: `You scored ${test.score}/${test.maxScore} in ${test.title}.`
      });
    }
  };

  const handleAnswerChange = (question, value) => {
    setActiveAnswers((prev) => ({
      ...prev,
      [question.id]: value
    }));
  };

  const validateAnswers = () => {
    if (!activeTest) return { valid: false, missing: [] };
    const missing = activeTest.questionsData
      .filter((question) => {
        const answer = activeAnswers[question.id];
        if (question.type === 'multiple-choice' || question.type === 'true-false') {
          return answer === null || answer === undefined;
        }
        return answer === '' || answer === undefined || answer === null;
      })
      .map((question) => question.id);

    return { valid: missing.length === 0, missing };
  };

  const handleSubmitAnswers = async () => {
    const { valid, missing } = validateAnswers();
    if (!valid) {
      setFeedback({
        type: 'error',
        message: `Please answer all questions before submitting. Unanswered: ${missing.length}`
      });
      return;
    }

    if (!activeTest) return;

    setActiveSubmitting(true);

    const answerPayload = activeTest.questionsData.map((question) => ({
      questionId: question.id,
      response: activeAnswers[question.id]
    }));

    const result = submitTest(activeTest.id, {
      studentId,
      studentName,
      answers: answerPayload,
      attempt: activeAttempt
    });

    setActiveSubmitting(false);

    if (!result.success) {
      setFeedback({ type: 'error', message: result.error || 'Submission failed. Try again.' });
      return;
    }

    setFeedback({
      type: 'success',
      message: `Submitted! Score ${result.submission.score}/${result.submission.maxScore}.`
    });
    setActiveTestId(null);
    setActiveAnswers({});
    setActiveTab('completed');
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScheduleLabel = (test) => {
    if (test.date || test.time) {
      if (test.date && test.time) return `${test.date} at ${test.time}`;
      return test.date || test.time;
    }
    if (test.startDate) {
      const start = new Date(test.startDate);
      if (!Number.isNaN(start.getTime())) {
        return `${start.toLocaleDateString()} at ${start.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
      }
    }
    return 'Flexible schedule';
  };

  const feedbackStyles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-700',
    info: 'bg-blue-50 border-blue-200 text-blue-700'
  };

  const feedbackIcons = {
    success: CheckCircle,
    error: XCircle,
    info: Info
  };

  const handleCloseActiveTest = () => {
    setActiveTestId(null);
    setActiveAnswers({});
  };

  const completedTestsForStudent = useMemo(() => {
    if (!user) return [];
    return completedTests.filter((test) => !test.studentId || test.studentId === studentId);
  }, [completedTests, studentId, user]);

  const getRankInfo = (completedItem) => {
    if (!completedItem?.testId) return null;
    const allForTest = submissions.filter((s) => s.testId === completedItem.testId);
    if (allForTest.length === 0) return null;
    const sorted = [...allForTest].sort((a, b) => b.score - a.score);
    const index = sorted.findIndex((s) => s.studentId === completedItem.studentId && s.attempt === completedItem.attempt);
    const rank = index >= 0 ? index + 1 : (sorted.findIndex((s) => s.studentId === completedItem.studentId) + 1 || null);
    return { rank, total: sorted.length };
  };

  const availableTestsWithAttempts = useMemo(
    () =>
      availableTests.map((test) => {
        const attempts = studentAttemptsByTest.get(test.id) || 0;
        return {
          ...test,
          studentAttempts: attempts,
          attemptsRemaining: Math.max(test.maxAttempts - attempts, 0)
        };
      }),
    [availableTests, studentAttemptsByTest]
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tests & Assessments</h1>
        <p className="text-gray-600 mt-1">Take tests, track your progress, and compete with peers</p>
      </div>

      {feedback && (
        <div className={`flex items-center space-x-3 border rounded-lg px-4 py-3 text-sm ${feedbackStyles[feedback.type]}`}>
          {React.createElement(feedbackIcons[feedback.type] || Info, { className: 'w-4 h-4' })}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('available')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'available'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Available Tests
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'completed'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Completed Tests
        </button>
      </div>

      {/* Filter */}
      <div className="card">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filter by subject:</span>
          </div>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="input-field w-48"
          >
            {subjects.map(subject => (
              <option key={subject.value} value={subject.value}>
                {subject.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {(activeTab === 'available' ? availableTestsWithAttempts : completedTestsForStudent)
          .filter((test) => selectedSubject === 'all' || test.subject === selectedSubject)
          .map((test) => (
          <div key={test.id} className="card hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{test.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{test.description}</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(test.difficulty)}`}>
                  {test.difficulty}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{test.duration} minutes</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <span>{test.questions} questions</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{getScheduleLabel(test)}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{test.totalParticipants || 0} participants</span>
                </div>
              </div>

              {activeTab === 'available' && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Attempts: {test.studentAttempts}/{test.maxAttempts}</span>
                  {test.attemptsRemaining === 0 && (
                    <span className="text-red-600 text-xs">Max attempts reached</span>
                  )}
                </div>
              )}

              {activeTab === 'completed' && (
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      <span className="text-gray-600">Attempt #{test.attempt}</span>
                    </div>
                    {getRankInfo(test) && (
                      <div className="text-xs text-gray-600">
                        Rank #{getRankInfo(test).rank} of {getRankInfo(test).total}
                      </div>
                    )}
                  </div>
                  <div className="text-right w-40">
                    <div className={`font-semibold ${getScoreColor(test.score)}`}>
                      {test.score}/{test.maxScore}
                    </div>
                    <div className="mt-1 w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-green-500 h-2"
                        style={{ width: `${Math.round((test.score / Math.max(test.maxScore || 1, 1)) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              {activeTab === 'available' ? (
                <button
                  className={`flex-1 btn-primary flex items-center justify-center space-x-2 ${
                    test.attemptsRemaining === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={test.attemptsRemaining === 0}
                  onClick={() => handleStartTest(test)}
                >
                  <Play className="w-4 h-4" />
                  <span>Start Test</span>
                </button>
              ) : (
                <button
                  className="flex-1 btn-secondary flex items-center justify-center space-x-2"
                  onClick={() => handleViewResults(test)}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>View Results</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {activeTest && (
        <div className="card border border-primary-100 bg-white/60">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2 text-sm text-primary-700 font-medium uppercase tracking-wide">
                <CheckCircle className="w-4 h-4" />
                <span>Test In Progress</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mt-1">{activeTest.title}</h2>
              <p className="text-gray-600 mt-2 max-w-3xl">{activeTest.description}</p>
            </div>
            <button
              onClick={handleCloseActiveTest}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Exit Test Preview
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
            <div className="space-y-3">
              <div className="bg-primary-50 border border-primary-100 rounded-lg p-3 text-sm text-primary-800">
                <p className="font-semibold">Instructions</p>
                <p className="mt-1 whitespace-pre-line">
                  {activeTest.instructions?.trim() || 'Review each question carefully before moving on to the next.'}
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-3 text-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="text-gray-900 font-medium">{activeTest.duration} minutes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Attempt</span>
                  <span className="text-gray-900 font-medium">#{activeAttempt} of {activeTest.maxAttempts}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Difficulty</span>
                  <span className="text-gray-900 font-medium">{activeTest.difficulty}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 border border-gray-200 rounded-lg p-4 space-y-4 max-h-[400px] overflow-y-auto">
              {activeTest.questionsData && activeTest.questionsData.length > 0 ? (
                activeTest.questionsData.map((question, index) => (
                  <div key={question.id || index} className="border border-gray-100 rounded-lg p-4 bg-white">
                    <div className="flex items-start space-x-3">
                      <span className="text-sm font-semibold text-primary-600">Q{index + 1}</span>
                      <div className="flex-1 space-y-3">
                        <p className="text-gray-900">{question.question}</p>
                        {question.type === 'multiple-choice' && question.options && (
                          <ul className="space-y-2 text-sm text-gray-700">
                            {question.options.map((option, optionIndex) => (
                              <li key={optionIndex} className={`flex items-center space-x-3 rounded-md p-2 border ${
                                activeAnswers[question.id] === optionIndex
                                  ? 'border-primary-300 bg-primary-50' : 'border-transparent hover:bg-gray-50'
                              }`}>
                                <input
                                  type="radio"
                                  name={`answer-${question.id}`}
                                  value={optionIndex}
                                  checked={activeAnswers[question.id] === optionIndex}
                                  onChange={() => handleAnswerChange(question, optionIndex)}
                                  className="text-primary-600"
                                />
                                <span>{option || 'Not provided'}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {question.type === 'true-false' && (
                          <div className="flex items-center space-x-4 text-sm text-gray-700">
                            {['True', 'False'].map((label, optionIndex) => (
                              <label key={label} className="inline-flex items-center space-x-2">
                                <input
                                  type="radio"
                                  name={`answer-${question.id}`}
                                  value={optionIndex}
                                  checked={activeAnswers[question.id] === optionIndex}
                                  onChange={() => handleAnswerChange(question, optionIndex)}
                                  className="text-primary-600"
                                />
                                <span>{label}</span>
                              </label>
                            ))}
                          </div>
                        )}
                        {(question.type === 'short-answer' || question.type === 'essay') && (
                          <textarea
                            value={activeAnswers[question.id] || ''}
                            onChange={(event) => handleAnswerChange(question, event.target.value)}
                            rows={question.type === 'essay' ? 4 : 2}
                            className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Type your answer"
                          />
                        )}
                        {question.explanation && (
                          <div className="text-xs text-blue-700 bg-blue-50 border border-blue-100 rounded p-2">
                            <strong>Teacher Tip:</strong> {question.explanation}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-gray-600 text-sm">
                  <Info className="w-6 h-6 mb-2" />
                  <p>The teacher hasn’t added detailed questions for this test yet. Please check back later.</p>
                </div>
              )}
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-sm text-gray-600">
              Submit your answers to record this attempt. You can review feedback in the Completed Tests tab.
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleSubmitAnswers}
                disabled={activeSubmitting}
                className={`btn-primary flex items-center space-x-2 ${activeSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                <Send className="w-4 h-4" />
                <span>{activeSubmitting ? 'Submitting...' : 'Submit Answers'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {viewingResultId && (() => {
        const submission = submissions.find((s) => s.id === viewingResultId);
        if (!submission) {
          setViewingResultId(null);
          return null;
        }
        const questionsData = submission.questionsData || [];
        if (questionsData.length === 0) {
          setFeedback({
            type: 'info',
            message: `Test questions are no longer available. Your score: ${submission.score}/${submission.maxScore}`
          });
          setViewingResultId(null);
          return null;
        }
        const answerMap = new Map();
        submission.answers.forEach((ans) => {
          answerMap.set(ans.questionId, ans);
        });

        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Test Results</h2>
                  <p className="text-gray-600 mt-1">{submission.testTitle}</p>
                  <div className="mt-2 flex items-center space-x-4 text-sm">
                    <span className="text-gray-600">Score: <span className="font-semibold text-gray-900">{submission.score}/{submission.maxScore}</span></span>
                    <span className="text-gray-600">Attempt #{submission.attempt}</span>
                    <span className="text-gray-600">{new Date(submission.submittedAt).toLocaleString()}</span>
                  </div>
                </div>
                <button
                  onClick={() => setViewingResultId(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {questionsData && questionsData.length > 0 ? (
                  questionsData.map((question, index) => {
                    const answerData = answerMap.get(question.id);
                    const isCorrect = answerData?.isCorrect === true;
                    const studentResponse = answerData?.response;
                    const marksAwarded = answerData?.marksAwarded || 0;
                    const marksPossible = answerData?.marksPossible || question.marks || 1;

                    return (
                      <div
                        key={question.id || index}
                        className={`border-2 rounded-lg p-4 ${
                          isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-semibold text-gray-700">Q{index + 1}</span>
                            {isCorrect ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-600" />
                            )}
                            <span className={`text-sm font-medium ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                              {isCorrect ? 'Correct' : 'Incorrect'}
                            </span>
                          </div>
                          <span className="text-sm text-gray-600">
                            {marksAwarded}/{marksPossible} marks
                          </span>
                        </div>

                        <p className="text-gray-900 font-medium mb-3">{question.question}</p>

                        {question.type === 'multiple-choice' && question.options && (
                          <div className="space-y-2">
                            {question.options.map((option, optIndex) => {
                              const isStudentAnswer = Number(studentResponse) === optIndex;
                              const isCorrectAnswer = Number(question.correctAnswer) === optIndex;
                              let bgColor = 'bg-white';
                              let borderColor = 'border-gray-200';
                              let textColor = 'text-gray-700';

                              if (isCorrectAnswer) {
                                bgColor = 'bg-green-100';
                                borderColor = 'border-green-300';
                                textColor = 'text-green-800';
                              } else if (isStudentAnswer && !isCorrectAnswer) {
                                bgColor = 'bg-red-100';
                                borderColor = 'border-red-300';
                                textColor = 'text-red-800';
                              }

                              return (
                                <div
                                  key={optIndex}
                                  className={`border-2 rounded-md p-3 ${bgColor} ${borderColor} ${textColor}`}
                                >
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium">{String.fromCharCode(65 + optIndex)}.</span>
                                    <span>{option}</span>
                                    {isCorrectAnswer && (
                                      <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
                                    )}
                                    {isStudentAnswer && !isCorrectAnswer && (
                                      <XCircle className="w-4 h-4 text-red-600 ml-auto" />
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {question.type === 'true-false' && (
                          <div className="space-y-2">
                            {['True', 'False'].map((label, optIndex) => {
                              const isStudentAnswer = Number(studentResponse) === optIndex;
                              const isCorrectAnswer = Number(question.correctAnswer) === optIndex;
                              let bgColor = 'bg-white';
                              let borderColor = 'border-gray-200';
                              let textColor = 'text-gray-700';

                              if (isCorrectAnswer) {
                                bgColor = 'bg-green-100';
                                borderColor = 'border-green-300';
                                textColor = 'text-green-800';
                              } else if (isStudentAnswer && !isCorrectAnswer) {
                                bgColor = 'bg-red-100';
                                borderColor = 'border-red-300';
                                textColor = 'text-red-800';
                              }

                              return (
                                <div
                                  key={label}
                                  className={`border-2 rounded-md p-3 ${bgColor} ${borderColor} ${textColor}`}
                                >
                                  <div className="flex items-center space-x-2">
                                    <span>{label}</span>
                                    {isCorrectAnswer && (
                                      <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
                                    )}
                                    {isStudentAnswer && !isCorrectAnswer && (
                                      <XCircle className="w-4 h-4 text-red-600 ml-auto" />
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {(question.type === 'short-answer' || question.type === 'essay') && (
                          <div className="space-y-2">
                            <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
                              <p className="text-sm text-gray-600 mb-1">Your Answer:</p>
                              <p className="text-gray-900">{studentResponse || 'No answer provided'}</p>
                            </div>
                            {question.correctAnswer !== null && (
                              <div className="bg-green-50 border border-green-200 rounded-md p-3">
                                <p className="text-sm text-green-700 mb-1">Expected Answer:</p>
                                <p className="text-green-900">
                                  {question.type === 'short-answer'
                                    ? question.options?.[question.correctAnswer] || 'N/A'
                                    : 'See teacher feedback'}
                                </p>
                              </div>
                            )}
                          </div>
                        )}

                        {question.explanation && (
                          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                            <p className="text-sm font-medium text-blue-900 mb-1">Explanation:</p>
                            <p className="text-sm text-blue-800">{question.explanation}</p>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-gray-600">
                    No question details available for this test.
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {(activeTab === 'available' ? availableTestsWithAttempts : completedTestsForStudent)
        .filter((test) => selectedSubject === 'all' || test.subject === selectedSubject)
        .length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {activeTab === 'available' ? (
              <Play className="w-8 h-8 text-gray-400" />
            ) : (
              <CheckCircle className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {activeTab === 'available' ? 'No tests available' : 'No completed tests'}
          </h3>
          <p className="text-gray-600">
            {activeTab === 'available' 
              ? 'Check back later for new tests and assessments'
              : 'Complete some tests to see your results here'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default Tests;
