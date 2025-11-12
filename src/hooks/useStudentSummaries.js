import { useMemo } from 'react';
import { useTests } from '../contexts/TestContext';

const loadRegisteredStudents = () => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('smartedurural_registered_users');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((user) => user?.type === 'student')
      : [];
  } catch (error) {
    console.error('Failed to load registered students', error);
    return [];
  }
};

const getResourcesAccessed = (key) => {
  if (typeof window === 'undefined' || !key) return 0;
  try {
    const stored = localStorage.getItem(`smartedurural_resources_accessed_${key}`);
    return stored ? parseInt(stored, 10) || 0 : 0;
  } catch (error) {
    return 0;
  }
};

const normalizeStudent = (entry) => {
  const attempts = entry.attempts || [];
  const testsCompleted = attempts.length;
  const avg = testsCompleted
    ? Math.round(
        (attempts.reduce((sum, attempt) => {
          if (!attempt.maxScore) return sum;
          return sum + attempt.score / attempt.maxScore;
        }, 0) / testsCompleted) * 100
      )
    : 0;

  const sortedAttempts = [...attempts].sort(
    (a, b) => new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime()
  );
  const lastAttempt = sortedAttempts[sortedAttempts.length - 1];
  const prevAttempt = sortedAttempts[sortedAttempts.length - 2];
  const trend = !lastAttempt || !prevAttempt
    ? 'steady'
    : (lastAttempt.score / lastAttempt.maxScore) >= (prevAttempt.score / prevAttempt.maxScore)
      ? 'up'
      : 'down';

  const subjects = Array.from(
    new Set(
      attempts
        .map((attempt) => attempt.subjectLabel)
        .filter(Boolean)
    )
  );

  const lastActive = lastAttempt
    ? new Date(lastAttempt.submittedAt).toLocaleString()
    : null;

  const resourcesAccessed = getResourcesAccessed(entry.storageKey);

  return {
    ...entry,
    testsCompleted,
    averageScore: avg,
    subjects,
    trend,
    lastActive,
    resourcesAccessed
  };
};

export const useStudentSummaries = () => {
  const { submissions } = useTests();

  return useMemo(() => {
    const registered = loadRegisteredStudents();
    const studentMap = new Map();

    registered.forEach((student) => {
      const key = String(student.id ?? student.email ?? student.name ?? Math.random());
      studentMap.set(key, {
        id: student.id ?? key,
        storageKey: student.id ?? student.email ?? key,
        name: student.name || 'Student',
        email: student.email || '',
        phone: student.phone || '',
        grade: student.grade || student.classLevel || 'Unknown',
        school: student.school || '—',
        joinDate: student.createdAt ? new Date(student.createdAt).toLocaleDateString() : '—',
        attempts: []
      });
    });

    submissions.forEach((submission) => {
      const key = String(
        submission.studentId ?? submission.studentEmail ?? submission.studentName ?? `submission-${submission.id}`
      );

      if (!studentMap.has(key)) {
        studentMap.set(key, {
          id: submission.studentId ?? key,
          storageKey: submission.studentId ?? submission.studentEmail ?? key,
          name: submission.studentName || 'Student',
          email: submission.studentEmail || '',
          phone: submission.studentPhone || '',
          grade: submission.studentGrade || 'Unknown',
          school: submission.studentSchool || '—',
          joinDate: submission.submittedAt ? new Date(submission.submittedAt).toLocaleDateString() : '—',
          attempts: []
        });
      }

      studentMap.get(key).attempts.push(submission);
    });

    const normalized = Array.from(studentMap.values()).map(normalizeStudent);

    const sorted = normalized.sort((a, b) => b.averageScore - a.averageScore);
    sorted.forEach((student, index) => {
      student.rank = student.testsCompleted > 0 ? index + 1 : null;
      student.status = student.testsCompleted > 0 ? 'active' : 'inactive';
    });

    return sorted;
  }, [submissions]);
};


