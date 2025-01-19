// QADoc.js
import React, { useState } from 'react';

const QADoc = ({ pdfText }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAskQuestion = async () => {
    if (!question.trim()) {
      return;
    }
    setLoading(true);
    setAnswer('');

    try {
      const apiKey = "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"; // Replace with your OpenAI API key
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4', // or 'gpt-3.5-turbo'
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant that answers questions based on the provided PDF text.',
            },
            {
              role: 'user',
              content: `
              Here is the PDF content:

              "${pdfText}"

              Please answer the following question based *only* on the PDF content above. 
              Question: "${question}"
              `,
            },
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`OpenAI request failed: ${res.status} ${errorText}`);
      }

      const data = await res.json();
      const choiceText = data.choices[0]?.message?.content?.trim() ?? '';
      setAnswer(choiceText);
    } catch (error) {
      console.error('Error from OpenAI:', error.message);
      setAnswer('An error occurred while trying to answer your question.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <h2>Ask a Question About the Document</h2>
      <textarea
        rows={3}
        style={{ width: '100%', marginBottom: '0.5rem' }}
        placeholder="Type your question here..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <br />
      <button onClick={handleAskQuestion} disabled={loading}>
        {loading ? 'Thinking...' : 'Ask Question'}
      </button>

      {answer && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Answer:</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default QADoc;
