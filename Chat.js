
import React, { useEffect, useState } from 'react';

const Chat = ({ pdfText }) => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const summarizeText = async () => {
      if (!pdfText || !pdfText.trim()) return;

      setLoading(true);
      setResponse('');

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
                content: 'You are a helpful assistant that summarizes text.'
              },
              {
                role: 'user',
                content: `Summarize the following text in 100 words and then list all the risky clauses, penalties and most import clauses with sub titles after summarizing:\n\n${pdfText}\n\nYour summary: `,
              },
            ],
            max_tokens: 200,
            temperature: 0.7,
          }),
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`OpenAI request failed: ${res.status} ${errorText}`);
        }

        const data = await res.json();
        // Now we get the text from data.choices[0].message.content
        const choiceText = data.choices[0]?.message?.content?.trim() ?? '';
        setResponse(choiceText);
      } catch (error) {
        console.error('Error from OpenAI:', error.message);
        setResponse('An error occurred while summarizing the text.');
      } finally {
        setLoading(false);
      }
    };

    summarizeText();
  }, [pdfText]);

  return (
    <div className="chat-container">
        <div className="response">
        <h2>Report</h2>
        

        </div>
      
      {loading ? (
        <p>Summarizing text, please wait...</p>
      ) : (
        <div className="response">
          
          <p>{response || 'No summary available yet.'}</p>
        </div>
      )}
    </div>
  );
};

export default Chat;
