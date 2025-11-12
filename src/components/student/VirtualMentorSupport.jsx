import React, { useState, useContext } from 'react';
import { LanguageContext } from '../../contexts/AuthContext';
import i18n from '../../i18n';

const studyTips = [
  'Set clear goals for each study session.',
  'Take regular breaks to improve focus.',
  'Practice active recall and spaced repetition.',
  'Ask questions when you are stuck.',
  'Teach others to reinforce your learning.'
];

const subjects = ['Math', 'Science', 'English', 'History', 'Computer Science'];

function VirtualMentorSupport() {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showDownload, setShowDownload] = useState(false);
  const [selectedLang, setSelectedLang] = useState('');
  const availableLangs = Object.keys(i18n.options.resources || { en: {} });

  const handleSend = () => {
    if (input.trim()) {
      setChatMessages([...chatMessages, { from: 'student', text: input }]);
      setInput('');
      // Simulate mentor reply
      setTimeout(() => {
        setChatMessages(msgs => [...msgs, { from: 'mentor', text: 'A mentor will respond soon!' }]);
      }, 1000);
    }
  };

  const handleDownload = () => {
    if (!selectedLang) return;
    // Simulate download
    alert(`Downloading material in ${selectedLang}`);
    setShowDownload(false);
  };

  return (
    <div className="p-4 border rounded shadow bg-white max-w-lg mx-auto mt-6">
      <h2 className="text-xl font-bold mb-2">Virtual Mentor Support</h2>
      <div className="mb-4">
        <h3 className="font-semibold">Study Tips</h3>
        <ul className="list-disc ml-6 text-sm">
          {studyTips.map((tip, idx) => <li key={idx}>{tip}</li>)}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Subject Help</h3>
        <select value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)} className="border p-1 rounded">
          <option value="">Select Subject</option>
          {subjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
        </select>
        {selectedSubject && <button className="ml-2 px-2 py-1 bg-blue-500 text-white rounded" onClick={() => setShowChat(true)}>Ask Mentor</button>}
      </div>
      <div className="mb-4">
        <button className="px-2 py-1 bg-green-500 text-white rounded" onClick={() => setShowDownload(true)}>Download Study Material</button>
      </div>
      {showChat && (
        <div className="border p-2 rounded mb-2 bg-gray-50">
          <div className="h-32 overflow-y-auto mb-2">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={msg.from === 'student' ? 'text-right' : 'text-left'}>
                <span className={msg.from === 'student' ? 'text-blue-600' : 'text-green-600'}>{msg.text}</span>
              </div>
            ))}
          </div>
          <input value={input} onChange={e => setInput(e.target.value)} className="border p-1 rounded w-3/4" placeholder="Type your message..." />
          <button className="ml-2 px-2 py-1 bg-blue-500 text-white rounded" onClick={handleSend}>Send</button>
        </div>
      )}
      {showDownload && (
        <div className="border p-2 rounded bg-gray-50">
          <label className="block mb-1">Select Language:</label>
          <select value={selectedLang} onChange={e => setSelectedLang(e.target.value)} className="border p-1 rounded">
            <option value="">Choose language</option>
            {availableLangs.map(lang => <option key={lang} value={lang}>{lang}</option>)}
          </select>
          <button className="ml-2 px-2 py-1 bg-green-500 text-white rounded" onClick={handleDownload} disabled={!selectedLang}>Download</button>
          <button className="ml-2 px-2 py-1 bg-gray-300 rounded" onClick={() => setShowDownload(false)}>Cancel</button>
        </div>
      )}
      <div className="mt-4 text-xs text-gray-500">24/7 Mentor Support Available</div>
    </div>
  );
}

export default VirtualMentorSupport;
import React, { useState, useContext } from 'react';
import { LanguageContext } from '../../contexts/AuthContext';
import i18n from '../../i18n';

const studyTips = [
  'Set clear goals for each study session.',
  'Take regular breaks to improve focus.',
  'Practice active recall and spaced repetition.',
  'Ask questions when you are stuck.',
  'Teach others to reinforce your learning.'
];

const subjects = ['Math', 'Science', 'English', 'History', 'Computer Science'];

function VirtualMentorSupport() {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showDownload, setShowDownload] = useState(false);
  const [selectedLang, setSelectedLang] = useState('');
  const availableLangs = Object.keys(i18n.options.resources || { en: {} });

  const handleSend = () => {
    if (input.trim()) {
      setChatMessages([...chatMessages, { from: 'student', text: input }]);
      setInput('');
      // Simulate mentor reply
      setTimeout(() => {
        setChatMessages(msgs => [...msgs, { from: 'mentor', text: 'A mentor will respond soon!' }]);
      }, 1000);
    }
  };

  const handleDownload = () => {
    if (!selectedLang) return;
    // Simulate download
    alert(`Downloading material in ${selectedLang}`);
    setShowDownload(false);
  };

  return (
    <div className="p-4 border rounded shadow bg-white max-w-lg mx-auto mt-6">
      <h2 className="text-xl font-bold mb-2">Virtual Mentor Support</h2>
      <div className="mb-4">
        <h3 className="font-semibold">Study Tips</h3>
        <ul className="list-disc ml-6 text-sm">
          {studyTips.map((tip, idx) => <li key={idx}>{tip}</li>)}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Subject Help</h3>
        <select value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)} className="border p-1 rounded">
          <option value="">Select Subject</option>
          {subjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
        </select>
        {selectedSubject && <button className="ml-2 px-2 py-1 bg-blue-500 text-white rounded" onClick={() => setShowChat(true)}>Ask Mentor</button>}
      </div>
      <div className="mb-4">
        <button className="px-2 py-1 bg-green-500 text-white rounded" onClick={() => setShowDownload(true)}>Download Study Material</button>
      </div>
      {showChat && (
        <div className="border p-2 rounded mb-2 bg-gray-50">
          <div className="h-32 overflow-y-auto mb-2">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={msg.from === 'student' ? 'text-right' : 'text-left'}>
                <span className={msg.from === 'student' ? 'text-blue-600' : 'text-green-600'}>{msg.text}</span>
              </div>
            ))}
          </div>
          <input value={input} onChange={e => setInput(e.target.value)} className="border p-1 rounded w-3/4" placeholder="Type your message..." />
          <button className="ml-2 px-2 py-1 bg-blue-500 text-white rounded" onClick={handleSend}>Send</button>
        </div>
      )}
      {showDownload && (
        <div className="border p-2 rounded bg-gray-50">
          <label className="block mb-1">Select Language:</label>
          <select value={selectedLang} onChange={e => setSelectedLang(e.target.value)} className="border p-1 rounded">
            <option value="">Choose language</option>
            {availableLangs.map(lang => <option key={lang} value={lang}>{lang}</option>)}
          </select>
          <button className="ml-2 px-2 py-1 bg-green-500 text-white rounded" onClick={handleDownload} disabled={!selectedLang}>Download</button>
          <button className="ml-2 px-2 py-1 bg-gray-300 rounded" onClick={() => setShowDownload(false)}>Cancel</button>
        </div>
      )}
      <div className="mt-4 text-xs text-gray-500">24/7 Mentor Support Available</div>
    </div>
  );
}

export default VirtualMentorSupport;
