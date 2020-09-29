# news-explorer-api
## Актуальная версия проекта
0.0.1
## Описание проекта
Backend часть дипломной работы по курсу веб-разработки [Яндекс.Практикума](https://praktikum.yandex.ru/)
## Использованные технологии
- JS
- MongoDB
- GIT
## Инструкция по запуску проекта
1. Клонируйте проект на свой ПК командой  
`git clone https://github.com/mun-dmitry/news-explorer-api.git`
2. Установите зависимости  
`npm install`
3. Работайте с проектом
- Запуск сервера  
`npm run start`
- Запуск сервера в режиме разработки  
`npm run dev`
## Взаимодействие с API
- POST /signup  
создаёт пользователя с переданными в теле `email, password, name`
- POST /signin  
проверяет переданные в теле `email, password` и возвращает JWT
- GET /users/me  
возвращает информацию о пользователе (email и имя)
-  GET /articles  
возвращает все сохранённые пользователем статьи
- POST /articles  
создаёт статью с переданными в теле `keyword, title, text, date, source, link, image`
- DELETE /articles/articleId  
удаляет сохранённую статью  по _id
## Сайт проекта
IP сервера `130.193.50.208`
API сервера `https://api.yapr-news-explorer.tk`  
[News-explorer](https://yapr-news-explorer.tk)
