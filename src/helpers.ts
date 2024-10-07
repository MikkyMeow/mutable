export function getRandomHash(): string {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < 7; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters[randomIndex];
  }

  return result;
}

export function formatDateToDDMMYYYY(dateString: string): string {
  // Создаем объект даты из строки
  const date = new Date(dateString);

  // Получаем день, месяц и год
  const day = String(date.getUTCDate()).padStart(2, "0"); // Добавляем ноль перед числом, если необходимо
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0, поэтому добавляем 1
  const year = date.getUTCFullYear();

  // Формируем строку в формате DD.MM.YYYY
  return `${day}.${month}.${year}`;
}
