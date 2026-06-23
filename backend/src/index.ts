import 'dotenv/config';

import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  console.log(`Swagger: http://localhost:${PORT}/api/docs`);
});
