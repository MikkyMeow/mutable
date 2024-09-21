import { Dialog, TextField } from "@mui/material"
import { FC, useState } from "react";
import { supabase } from "./supabaseClient";

interface IProps {
    updateText: { id: number; name: string };
    onClose: () => void;
}

export const UpdateItem: FC<IProps> = ({ updateText, onClose }) => {
    const [text, setText] = useState(updateText.name);

    const updateItem = async () => {
        const { data, error } = await supabase
            .from('test') // Замените 'your_table_name' на имя вашей таблицы
            .update({ name: text }) // Устанавливаем новое значение для поля 'name'
            .match({ id: updateText.id }); // Замените id на соответствующее поле, по которому нужно обновить

        if (error) {
            console.error('Ошибка обновления элемента:', error);
        } else {
            console.log('Элемент успешно обновлён:', data);
        }
    };

    return (
        <Dialog open={!!updateText} onClose={() => {
            updateItem();
            onClose();
        }}>
            <TextField value={text} onChange={(e) => setText(e.target.value)} />
        </Dialog>
    )
}