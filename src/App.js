import React, { useState } from 'react';

function App() {
  const questions = [
    { question: "5 + 7 = ?", options: [10, 11, 12, 13], answer: 12 },
    { question: "9 - 3 = ?", options: [5, 6, 7, 8], answer: 6 },
    { question: "4 x 2 = ?", options: [6, 7, 8, 9], answer: 8 },
    { question: "15 ÷ 5 = ?", options: [2, 3, 4, 5], answer: 3 }
  ];

  const [answers, setAnswers] = useState({});
  const [whatsapp, setWhatsapp] = useState('');
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    let s = 0;
    questions.forEach((q, idx) => {
      if (Number(answers[idx]) === q.answer) s++;
    });
    setScore(s);
    setSubmitted(true);
  };

  const whatsappLink = () => {
    let num = whatsapp.replace(/\D/g, '');
    let msg = encodeURIComponent(`hi mom i got that result: ${score}/${questions.length}`);
    return `https://wa.me/${num}?text=${msg}`;
  };

  return (
    <div style={{maxWidth: 500, margin: "auto", fontFamily: "sans-serif"}}>
      <h2>Grade 3 Math Test</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <label>
            Mom's WhatsApp Number (with country code):<br />
            <input
              type="tel"
              required
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
              placeholder="e.g. +919876543210"
              style={{ marginBottom: "1em" }}
            />
          </label>
          {questions.map((q, idx) =>
            <div key={idx} style={{margin: "1em 0"}}>
              <div>{q.question}</div>
              {q.options.map(opt =>
                <label key={opt} style={{marginRight: "1em"}}>
                  <input
                    type="radio"
                    required
                    name={`q${idx}`}
                    value={opt}
                    checked={answers[idx] === String(opt)}
                    onChange={e => setAnswers({...answers, [idx]: e.target.value})}
                  />
                  {opt}
                </label>
              )}
            </div>
          )}
          <button type="submit" style={{marginTop: "1em"}}>Submit Test</button>
        </form>
      ) : (
        <div>
          <h3>Your score: {score}/{questions.length}</h3>
          <p>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              Click here to send your result to mom on WhatsApp
            </a>
          </p>
          <p>
            <small>
              If WhatsApp doesn’t open, copy this link and open it in your browser:<br />
              <code>{whatsappLink()}</code>
            </small>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;