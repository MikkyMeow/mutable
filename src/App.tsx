import { useCallback, useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import AddItem from './AddItem';
import { Chip, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { UpdateItem } from './UpdateItem';
import { formatDateToDDMMYYYY } from './helpers';
import { TProgress } from './types';

interface ITodo {
  created_at: string;
  id: number;
  progress: TProgress;
  tags: string[];
  text: string;
}

const App = () => {
  const [data, setData] = useState<ITodo[]>([]);
  const [loading, setLoading] = useState(true);
  const [updateText, setUpdateText] = useState<{ id: number; text: string } | null>(null);

  const fetchData = useCallback(async () => {
    const { data: fetchedData, error } = await supabase.from('test').select('*').order('created_at', { ascending: true });
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
      <Table>
        <TableHead>
          <TableCell>Name</TableCell>
          <TableCell>Created at</TableCell>
          <TableCell>Progress</TableCell>
          <TableCell></TableCell>
        </TableHead>
        <TableBody>
          {data.map(({ id, text, created_at, progress }) => (
            <TableRow>
              <TableCell onClick={() => setUpdateText({ id, text })}>{text}</TableCell>
              <TableCell>{formatDateToDDMMYYYY(created_at)}</TableCell>
              <TableCell><Chip label={progress} /></TableCell>
              <TableCell><button onClick={() => deleteItem(id)}>remove</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddItem fetchData={fetchData} />
      {updateText && (
        <UpdateItem updateText={updateText} onClose={() => {
          setUpdateText(null)
          fetchData();
        }} />
      )}
    </div>
  );
};

export default App;
