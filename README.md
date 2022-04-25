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
1. Установите на сервер NodeJs. Проект разрабатывался на версии 14.17.3.
`curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -`  
`sudo apt-get install -y nodejs`
2. Установите MongoDB версии 4.2
`wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -`  
`echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list`  
`sudo apt-get update`  
`sudo apt-get install -y mongodb-org`  
Запустите Mongo  
`sudo service mongod start`  
Не забудьте добавить сервер Mongo в автозапуск  
`sudo systemctl enable mongod.service`  
3. Установите GIT
`sudo apt install git`
4. Клонируйте проект на свой ПК командой  
`git clone https://github.com/mun-dmitry/news-explorer-api.git`
4. Установите зависимости  
`npm install`
5. Работайте с проектом
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
