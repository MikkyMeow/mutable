import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const App = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: fetchedData, error } = await supabase.from('test').select('*');
      if (error) {
        console.error('Ошибка загрузки данных:', error);
      } else {
        setData(fetchedData);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div>
      <h1>Данные из Supabase</h1>
      <ul>
        {data.map((item) => (
          <li>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
