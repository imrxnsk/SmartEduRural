import React, { useMemo } from 'react';
import { useTests } from '../../contexts/TestContext';
import { Users, Trophy } from 'lucide-react';

const Sessions = () => {
  const { submissions } = useTests();

  const byStudent = useMemo(() => {
    const map = new Map();
    submissions.forEach((s) => {
      const key = s.studentId || 'unknown';
      const entry = map.get(key) || { studentId: s.studentId, studentName: s.studentName || 'Student', attempts: [] };
      entry.attempts.push(s);
      map.set(key, entry);
    });
    return Array.from(map.values()).map((e) => ({
      ...e,
      attempts: e.attempts.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
    })).sort((a, b) => (b.attempts[0]?.submittedAt || '').localeCompare(a.attempts[0]?.submittedAt || ''));
  }, [submissions]);

  const avgPct = (attempts) => {
    if (!attempts.length) return 0;
    const total = attempts.reduce((sum, a) => sum + (a.maxScore ? (a.score / a.maxScore) : 0), 0);
    return Math.round((total / attempts.length) * 100);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">1:1 Sessions</h1>
        <p className="text-gray-600 mt-1">Student progress based on latest test results</p>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-gray-700">
            <Users className="w-5 h-5 text-primary-600" />
            <span className="font-semibold">Students</span>
          </div>
          <span className="text-sm text-gray-500">{byStudent.length} total</span>
        </div>

        {byStudent.length === 0 ? (
          <div className="text-sm text-gray-600">No submissions yet.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {byStudent.map((stu) => {
              const latest = stu.attempts[0];
              const pct = latest?.maxScore ? Math.round((latest.score / latest.maxScore) * 100) : 0;
              return (
                <div key={stu.studentId || 'unknown'} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{stu.studentName}</div>
                    {latest && (
                      <div className="text-xs text-gray-600">Latest: {latest.testTitle} • {new Date(latest.submittedAt).toLocaleString()}</div>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    {latest && (
                      <div className="text-xs text-gray-700 flex items-center gap-1">
                        <Trophy className="w-4 h-4 text-yellow-500" />
                        {latest.score}/{latest.maxScore}
                      </div>
                    )}
                    <div className="text-right">
                      <div className="text-xs text-gray-600">Avg</div>
                      <div className="font-semibold text-gray-900 text-sm">{avgPct(stu.attempts)}%</div>
                    </div>
                    <div className="w-40 bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div className="bg-green-500 h-2" style={{ width: `${avgPct(stu.attempts)}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sessions;


