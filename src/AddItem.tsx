import { FC, useState } from 'react';
import { supabase } from './supabaseClient';

interface IProps {
    fetchData: () => void;
}

const AddItem: FC<IProps> = ({ fetchData }) => {
    const [text, setText] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async () => {

        // Сброс предыдущих сообщений
        setError('');
        setSuccess('');

        // Выполнение запроса на добавление элемента
        const { data, error } = await supabase
            .from('test') // Замените на имя вашей таблицы
            .insert([{ text }]);

        if (error) {
            setError('Ошибка добавления элемента: ' + error.message);
        } else {
            setSuccess('Элемент успешно добавлен: ' + JSON.stringify(data));
            fetchData();
            setText(''); // Сбросить поле ввода
        }
    };

    return (
        <div>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Введите имя"
                required
            />
            <button onClick={handleSubmit}>Добавить</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default AddItem;
