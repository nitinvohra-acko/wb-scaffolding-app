import { useState } from 'react';
import telemerStore from '../store/telemer';

const useTelemer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const { hoist } = telemerStore();

  const fetchTelemerConfig = async () => {
    try {
      setLoading(true);
      const resp = await fetch('');
      if (!resp.ok) {
        throw new Error('Failed to fetch telemer config');
      }
      const data = await resp.json();
      console.log(data);
      hoist(data);
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
