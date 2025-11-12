import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Trash2, Save, Eye, Clock, Users, FileText, Info, CheckCircle2, AlertCircle, Trophy } from 'lucide-react';
import { useTests } from '../../contexts/TestContext';

const INITIAL_TEST_DATA = {
  title: '',
  description: '',
  subject: '',
  duration: 60,
  totalQuestions: 0,
  difficulty: 'medium',
  instructions: '',
  startDate: '',
  endDate: '',
  maxAttempts: 1
};

const INITIAL_QUESTION = {
  question: '',
  type: 'multiple-choice',
  options: ['', '', '', ''],
  correctAnswer: 0,
  marks: 1,
  explanation: ''
};

const CreateTest = () => {
  const [testData, setTestData] = useState({ ...INITIAL_TEST_DATA });
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({ ...INITIAL_QUESTION });
  const [showPreview, setShowPreview] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const { publishTest, submissions, availableTests } = useTests();
  const submissionsByTest = useMemo(() => {
    const grouped = new Map();
    submissions.forEach((submission) => {
      const test = availableTests.find((item) => item.id === submission.testId);
      const entry = grouped.get(submission.testId) || {
        testId: submission.testId,
        testTitle: submission.testTitle,
        subjectLabel: submission.subjectLabel,
        attempts: []
      };
      entry.attempts.push(submission);
      grouped.set(submission.testId, entry);
    });
    return Array.from(grouped.values()).map((entry) => ({
      ...entry,
      attempts: entry.attempts.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
    }));
  }, [submissions, availableTests]);

  const recentAttempts = useMemo(() =>
    [...submissions]
      .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
      .slice(0, 5),
  [submissions]);

  const subjects = [
    'Mathematics', 'Science', 'English', 'History', 'Geography', 'Physics', 'Chemistry', 'Biology'
  ];

  const difficulties = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ];

  const questionTypes = [
    { value: 'multiple-choice', label: 'Multiple Choice' },
    { value: 'true-false', label: 'True/False' },
    { value: 'short-answer', label: 'Short Answer' },
    { value: 'essay', label: 'Essay' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTestData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === 'marks') {
      updatedValue = Number(value);
    }

    if (name === 'correctAnswer') {
      updatedValue = Number(value);
    }

    setCurrentQuestion(prev => ({
      ...prev,
      [name]: updatedValue
    }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion(prev => ({
      ...prev,
      options: newOptions
    }));
  };

  const addQuestion = () => {
    if (currentQuestion.question.trim()) {
      const newQuestion = {
        id: Date.now(),
        ...currentQuestion
      };
      setQuestions(prev => [...prev, newQuestion]);
      setCurrentQuestion({
        question: '',
        type: 'multiple-choice',
        options: ['', '', '', ''],
        correctAnswer: 0,
        marks: 1,
        explanation: ''
      });
      setTestData(prev => ({
        ...prev,
        totalQuestions: prev.totalQuestions + 1
      }));
    }
  };

  const removeQuestion = (id) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
    setTestData(prev => ({
      ...prev,
      totalQuestions: prev.totalQuestions - 1
    }));
  };

  useEffect(() => {
    if (!feedback) return;
    const timeout = setTimeout(() => setFeedback(null), 4000);
    return () => clearTimeout(timeout);
  }, [feedback]);

  const handleSaveDraft = () => {
    console.log('Test saved:', { ...testData, questions });
    setFeedback({ type: 'info', message: 'Draft saved locally. Remember to publish when ready.' });
  };

  const resetForm = () => {
    setTestData({ ...INITIAL_TEST_DATA });
    setQuestions([]);
    setCurrentQuestion({ ...INITIAL_QUESTION });
    setShowPreview(false);
  };

  const handlePublish = () => {
    if (!testData.title.trim()) {
      setFeedback({ type: 'error', message: 'Please add a test title before publishing.' });
      return;
    }
    if (!testData.subject) {
      setFeedback({ type: 'error', message: 'Please select a subject for the test.' });
      return;
    }

    const payload = {
      ...testData,
      difficulty: testData.difficulty,
      questions: questions.length || testData.totalQuestions,
      questionsData: questions,
      totalParticipants: 0
    };

    publishTest(payload);
    console.log('Test published:', payload);
    setFeedback({ type: 'success', message: `${testData.title} has been published for students.` });
    resetForm();
  };

  const feedbackStyles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-700',
    info: 'bg-blue-50 border-blue-200 text-blue-700'
  };

  const feedbackIcons = {
    success: CheckCircle2,
    error: AlertCircle,
    info: Info
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create Test</h1>
          <p className="text-gray-600 mt-1">Design and configure assessments for your students</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="btn-secondary flex items-center space-x-2"
          >
            <Eye className="w-4 h-4" />
            <span>{showPreview ? 'Edit' : 'Preview'}</span>
          </button>
          <button
            onClick={handleSaveDraft}
            className="btn-secondary flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Draft</span>
          </button>
          <button
            onClick={handlePublish}
            className="btn-primary flex items-center space-x-2"
          >
            <FileText className="w-4 h-4" />
            <span>Publish Test</span>
          </button>
        </div>
      </div>

      {feedback && (
        <div className={`flex items-center space-x-3 border rounded-lg px-4 py-3 text-sm ${feedbackStyles[feedback.type]}`}>
          {React.createElement(feedbackIcons[feedback.type] || Info, { className: 'w-4 h-4' })}
          <span>{feedback.message}</span>
        </div>
      )}

      {availableTests.length > 0 && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Current Published Tests</h2>
            <span className="text-sm text-gray-500">{availableTests.length} active</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">Title</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">Subject</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">Difficulty</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">Questions</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">Duration</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">Max Attempts</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">Participants</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {availableTests.map((test) => (
                  <tr key={test.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-900">{test.title}</td>
                    <td className="px-4 py-2 text-gray-700">{test.subjectLabel}</td>
                    <td className="px-4 py-2 text-gray-700 capitalize">{test.difficulty}</td>
                    <td className="px-4 py-2 text-gray-700">{test.questions}</td>
                    <td className="px-4 py-2 text-gray-700">{test.duration} min</td>
                    <td className="px-4 py-2 text-gray-700">{test.maxAttempts}</td>
                    <td className="px-4 py-2 text-gray-700">{test.totalParticipants || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {recentAttempts.length > 0 && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Student Attempts</h2>
            <span className="text-sm text-gray-500">Last {recentAttempts.length} submissions</span>
          </div>
          <div className="space-y-3">
            {recentAttempts.map((attempt) => (
              <div key={attempt.id} className="border border-gray-100 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <div className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    {attempt.studentName}
                    <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
                      {attempt.testTitle}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Attempt #{attempt.attempt} • {new Date(attempt.submittedAt).toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1 text-gray-700">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span>{attempt.score}/{attempt.maxScore}</span>
                  </div>
                  {attempt.needsReview && (
                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Needs review</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!showPreview ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Test Configuration */}
          <div className="lg:col-span-1 space-y-6">
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Test Configuration</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Test Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={testData.title}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter test title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={testData.description}
                    onChange={handleInputChange}
                    className="input-field"
                    rows="3"
                    placeholder="Describe what this test covers"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={testData.subject}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="">Select subject</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={testData.duration}
                    onChange={handleInputChange}
                    className="input-field"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Difficulty Level
                  </label>
                  <select
                    name="difficulty"
                    value={testData.difficulty}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    {difficulties.map(difficulty => (
                      <option key={difficulty.value} value={difficulty.value}>
                        {difficulty.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Attempts
                  </label>
                  <input
                    type="number"
                    name="maxAttempts"
                    value={testData.maxAttempts}
                    onChange={handleInputChange}
                    className="input-field"
                    min="1"
                    max="5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="datetime-local"
                    name="startDate"
                    value={testData.startDate}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="datetime-local"
                    name="endDate"
                    value={testData.endDate}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            {/* Test Statistics */}
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Test Statistics</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Questions</span>
                  <span className="text-sm font-medium text-gray-900">{testData.totalQuestions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Marks</span>
                  <span className="text-sm font-medium text-gray-900">
                    {questions.reduce((sum, q) => sum + q.marks, 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Duration</span>
                  <span className="text-sm font-medium text-gray-900">{testData.duration} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Difficulty</span>
                  <span className="text-sm font-medium text-gray-900 capitalize">{testData.difficulty}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Question Builder */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Add Questions</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Question
                  </label>
                  <textarea
                    name="question"
                    value={currentQuestion.question}
                    onChange={handleQuestionChange}
                    className="input-field"
                    rows="3"
                    placeholder="Enter your question here"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Question Type
                    </label>
                    <select
                      name="type"
                      value={currentQuestion.type}
                      onChange={handleQuestionChange}
                      className="input-field"
                    >
            {questionTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Marks
                    </label>
                    <input
                      type="number"
                      name="marks"
                      value={currentQuestion.marks}
                      onChange={handleQuestionChange}
                      className="input-field"
                      min="1"
                    />
                  </div>
                </div>

                {/* Options for Multiple Choice */}
                {currentQuestion.type === 'multiple-choice' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Options
                    </label>
                    <div className="space-y-2">
                      {currentQuestion.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="correctAnswer"
                            value={index}
                            checked={currentQuestion.correctAnswer === index}
                            onChange={handleQuestionChange}
                            className="text-primary-600"
                          />
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            className="input-field flex-1"
                            placeholder={`Option ${index + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Explanation (Optional)
                  </label>
                  <textarea
                    name="explanation"
                    value={currentQuestion.explanation}
                    onChange={handleQuestionChange}
                    className="input-field"
                    rows="2"
                    placeholder="Explain the correct answer"
                  />
                </div>

                <button
                  onClick={addQuestion}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Question</span>
                </button>
              </div>
            </div>

            {/* Questions List */}
            {questions.length > 0 && (
              <div className="card">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Questions ({questions.length})</h2>
                <div className="space-y-3">
                  {questions.map((question, index) => (
                    <div key={question.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-sm font-medium text-gray-600">Q{index + 1}</span>
                            <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                              {question.marks} mark{question.marks > 1 ? 's' : ''}
                            </span>
                          </div>
                          <p className="text-sm text-gray-900 mb-2">{question.question}</p>
                          {question.type === 'multiple-choice' && (
                            <div className="text-xs text-gray-600">
                              Correct: {question.options[question.correctAnswer]}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => removeQuestion(question.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Preview Mode */
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Test Preview</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-xl font-bold text-gray-900">{testData.title || 'Untitled Test'}</h3>
              <p className="text-gray-600 mt-1">{testData.description}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{testData.duration} minutes</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FileText className="w-4 h-4" />
                  <span>{testData.totalQuestions} questions</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{testData.maxAttempts} attempt{testData.maxAttempts > 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>

            {questions.map((question, index) => (
              <div key={question.id} className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-3">
                  <span className="text-sm font-medium text-gray-600 mt-1">Q{index + 1}</span>
                  <div className="flex-1">
                    <p className="text-gray-900 mb-3">{question.question}</p>
                    {question.type === 'multiple-choice' && (
                      <div className="space-y-2">
                        {question.options.map((option, optIndex) => (
                          <div key={optIndex} className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name={`preview-${question.id}`}
                              className="text-primary-600"
                              disabled
                            />
                            <span className="text-sm text-gray-700">{option}</span>
                            {optIndex === question.correctAnswer && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                Correct
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    {question.explanation && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Explanation:</strong> {question.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {submissionsByTest.length > 0 && (
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">All Attempts by Test</h2>
          <div className="space-y-4">
            {submissionsByTest.map((entry) => (
              <div key={entry.testId} className="border border-gray-100 rounded-lg">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 p-4 bg-gray-50 rounded-t-lg">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{entry.testTitle}</h3>
                    <p className="text-xs text-gray-500">{entry.subjectLabel}</p>
                  </div>
                  <div className="text-xs text-gray-500">{entry.attempts.length} attempt(s)</div>
                </div>
                <div className="divide-y divide-gray-100">
                  {entry.attempts.map((attempt) => (
                    <div key={attempt.id} className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{attempt.studentName}</div>
                        <div className="text-xs text-gray-500">Attempt #{attempt.attempt} • {new Date(attempt.submittedAt).toLocaleString()}</div>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="text-gray-700">
                          Score: <span className="font-semibold">{attempt.score}/{attempt.maxScore}</span>
                        </div>
                        {attempt.needsReview && (
                          <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Needs review</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTest;
