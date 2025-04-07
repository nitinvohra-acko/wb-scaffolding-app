import { useState } from 'react';
import telemerStore from '../store/telemer';
import { question_Data4 } from '../constant4';
import { apiClient } from '@/utils/interceptor';
import { QuestionsType } from '../detail/type';

const useTelemer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const { hoist, hoistResponse, hoistAnswer } = telemerStore();

  const fetchTelemerConfig = async (id: string) => {
    try {
      setLoading(true);
      const resp: QuestionsType[] = await apiClient(
        '/questions/assessment-questions/config',
        'POST',
        {
          body: {
            journey: 'rap',
            source: 'health',
            ruleId: 'assessment_question_config',
            proposalId: id,
          },
        },
      );
      hoist(resp);
      hoistResponse(resp);
      setLoading(false);
    } catch (e: any) {
      console.error(e);
      setLoading(false);
      setError(e.message);
    }
  };

  const fetchTelemerAnswers = async (id: string) => {
    try {
      setLoading(true);
      const resp: QuestionsType[] = await apiClient(
        '/questions/getAnswers',
        'POST',
        {
          body: {
            journey: 'rap',
            source: 'health',
            reference_id: id,
          },
        },
      );
      hoistAnswer(resp);
      setLoading(false);
    } catch (e: any) {
      console.error(e);
      setLoading(false);
      setError(e.message);
    }
  };
  return { fetchTelemerConfig, loading, error, fetchTelemerAnswers };
};
export default useTelemer;
