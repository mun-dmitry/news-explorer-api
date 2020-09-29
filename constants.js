const messages = {
  userNotFound: 'Запрашиваемый пользователь не найден',
  passwordValidationRules: 'Пароль должен содержать не менее 8 символов, включая по меньшей мере 1 цифру, 1 букву нижнего регистра и 1 букву верхнего регистра. Пароль может состоять только из цифр и букв латинского алфавита',
  unauthorized: 'Для доступа к требуемому ресурсу необходима авторизация',
  articleNotFound: 'Запрашиваемая статья не найдена',
  articleDeleteForbidden: 'Удалять записи может только их владелец',
  invalidObjectId: 'Ошибка ввода ObjectId',
  internalError: 'Ошибка сервера',
  invalidUrl: 'Ошибка ввода URL',
  invalidEmail: 'Ошибка ввода e-mail',
  wrongCredentials: 'Неверный пароль или e-mail',
  duplicatingEmail: 'Пользователь с введённым почтовым адресом уже зарегистрирован. Пожалуйста, введите другой адрес электронной почты',
};

const regExps = {
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
  url: /^(ftp|http|https):\/\/(([^ "]+)\.)+([^ "]+)$/,
};

const dirs = {
  log: 'logs',
};

module.exports = {
  messages,
  regExps,
  dirs,
};
