import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [date, setDate] = useState('');
  const [mood, setMood] = useState('');
  const [notes, setNotes] = useState('');
  const [entries, setEntries] = useState([]);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/entries');
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !mood) {
      setFeedback('Please fill out the required fields (date and mood).');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/entries', { date, mood, notes });
      setFeedback('Entry saved successfully!');
      
      setDate('');
      setMood('');
      setNotes('');
     
      fetchEntries();
    } catch (error) {
      setFeedback('Error saving entry.');
      console.error('Error posting entry:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col">
    
      <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-6 shadow-lg transition-all duration-300">
        <h1 className="text-center text-3xl font-extrabold uppercase tracking-wider drop-shadow-lg">
          Mental Health &amp; Wellness Tracker
        </h1>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        
        <section id="tracker" className="mb-8 bg-white p-6 rounded-2xl shadow-lg transition-shadow duration-300 hover:shadow-2xl">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Daily Tracker</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">
                Date:
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </label>
            </div>
            <div>
              <label className="block text-gray-700 font-medium">
                Mood:
                <select
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <option value="">Select your mood</option>
                  <option value="happy">😊 Happy</option>
                  <option value="neutral">😐 Neutral</option>
                  <option value="sad">😢 Sad</option>
                </select>
              </label>
            </div>
            <div>
              <label className="block text-gray-700 font-medium">
                Notes:
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="How are you feeling today?"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 rounded transition-all duration-300 hover:brightness-110 shadow-xl"
            >
              Submit
            </button>
          </form>
          {feedback && (
            <p className="mt-4 text-center text-red-500 font-bold animate-pulse">{feedback}</p>
          )}
        </section>

       
        <section id="history" className="bg-white p-6 rounded-2xl shadow-lg transition-shadow duration-300 hover:shadow-2xl">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600">History</h2>
          {entries.length === 0 ? (
            <p className="text-gray-600">No entries yet.</p>
          ) : (
            <ul className="space-y-4">
              {entries.map((entry) => (
                <li key={entry._id} className="border-b pb-2 transition-colors duration-300 hover:bg-gray-50">
                  <p className="text-lg font-medium text-gray-800">
                    {new Date(entry.date).toLocaleDateString()} - {entry.mood}
                  </p>
                  {entry.notes && <p className="text-gray-700">{entry.notes}</p>}
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="bg-gray-800 text-white text-center py-4 shadow-inner">
        <p className="text-sm">This project is built by Karthik Raja</p>
      </footer>
    </div>
  );
}

export default App;
