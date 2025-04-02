import { useState } from 'react';
import telemerStore from '../store/telemer';
import { question_Data4 } from '../constant4';

const useTelemer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const { hoist, hoistResponse } = telemerStore();

  const fetchTelemerConfig = async () => {
    try {
      setLoading(true);
      console.log('calling config');
      const resp = await fetch('/questions/assessment-questions/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          journey: 'rap',
          source: 'health',
          ruleId: 'assessment_question_config',
          proposalId: 'a9e283d2-aebf-4fdf-8e4c-6f62d02660e34',
        }),
      });
      if (!resp.ok) {
        throw new Error('Failed to fetch telemer config');
      }
      const data = await resp.json();
      // console.log('data >>', data);
      hoist(question_Data4);
      hoistResponse(question_Data4);
      setLoading(false);
    } catch (e: any) {
      console.error(e);
      setLoading(false);
      setError(e.message);
    }
  };
  return { fetchTelemerConfig, loading, error };
};
export default useTelemer;
