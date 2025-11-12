import React, { useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTests } from '../../contexts/TestContext';
import { Trophy, Clock } from 'lucide-react';

const Sessions = () => {
  const { user } = useAuth();
  const { submissions } = useTests();
  const studentId = user?.id;

  const mySubs = useMemo(() => submissions.filter(s => s.studentId === studentId), [submissions, studentId]);

  const summary = useMemo(() => {
    if (mySubs.length === 0) return { attempts: 0, avg: 0 };
    const total = mySubs.reduce((sum, s) => sum + (s.maxScore ? (s.score / s.maxScore) : 0), 0);
    return { attempts: mySubs.length, avg: Math.round((total / mySubs.length) * 100) };
  }, [mySubs]);

  const rankFor = (sub) => {
    const group = submissions.filter(s => s.testId === sub.testId);
    const sorted = [...group].sort((a, b) => b.score - a.score);
    const index = sorted.findIndex(s => s.id === sub.id);
    return { rank: index + 1, total: sorted.length };
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">1:1 Sessions</h1>
        <p className="text-gray-600 mt-1">Your latest test progress for mentor sessions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <div className="text-sm text-gray-600">Total Attempts</div>
          <div className="text-2xl font-bold text-gray-900">{summary.attempts}</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Average Score</div>
          <div className="text-2xl font-bold text-gray-900">{summary.avg}%</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Last Updated</div>
          <div className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary-600" />
            {mySubs.length ? new Date(mySubs[mySubs.length - 1].submittedAt).toLocaleString() : '—'}
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Results</h2>
        {mySubs.length === 0 ? (
          <div className="text-sm text-gray-600">No submissions yet.</div>
        ) : (
          <div className="space-y-3">
            {[...mySubs].reverse().slice(0, 8).map(sub => {
              const r = rankFor(sub);
              const pct = sub.maxScore ? Math.round((sub.score / sub.maxScore) * 100) : 0;
              return (
                <div key={sub.id} className="border border-gray-100 rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{sub.testTitle}</div>
                    <div className="text-xs text-gray-600 capitalize">{sub.subjectLabel}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{sub.score}/{sub.maxScore}</div>
                      <div className="mt-1 w-40 bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div className="bg-green-500 h-2" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <div className="text-xs text-gray-700 flex items-center gap-1">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      Rank #{r.rank} of {r.total}
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


