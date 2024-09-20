import { useCallback, useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import AddItem from './AddItem';

const App = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

const fetchData = useCallback(async () => {
  const { data: fetchedData, error } = await supabase.from('test').select('*');
  if (error) {
    console.error('Ошибка загрузки данных:', error);
  } else {
    setData(fetchedData);
  }
  setLoading(false);
}, [])

  useEffect(() => {
    fetchData();
  }, []);

  const deleteItem = async (id: number) => {
    const { data, error } = await supabase
        .from('test') // Замените 'your_table_name' на имя вашей таблицы
        .delete()
        .match({ id }); // Замените id на соответствующее поле, по которому нужно удалить

    if (error) {
        console.error('Ошибка удаления элемента:', error);
    } else {
        console.log('Элемент успешно удалён:', data);
        fetchData();
    }
};


  if (loading) return <div>Загрузка...</div>;

  return (
    <div>
      <h1>Данные из Supabase</h1>
      <ul>
        {data.map((item) => (
          <li>{JSON.stringify(item)} <button onClick={() => deleteItem(item.id)}>remove</button></li>
        ))}
      </ul>
      <AddItem fetchData={fetchData} />
    </div>
  );
};

export default App;
