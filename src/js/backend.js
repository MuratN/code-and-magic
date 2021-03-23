'use strict';

(function () {
  var URL = 'http://localhost:8888/code-and-magick/data';

  window.upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;

      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;

        case 400:
          onError('Неверный запрос');
          document.body.append(message);
          break;
        case 401:
          onError('Пользователь не авторизован');
          document.body.append(message);
          break;
        case 404:
          onError('Ничего не найдено');
          document.body.append(message);
          break;

        default:
          onError('Статус ответа: :' + xhr.status + ' ' + xhr.statusText);
          var message = document.createElement('div');
          message.style.position = 'absolute';
          message.style.left = 410 + 'px';
          message.style.top = 15 + 'px';
          message.style.width = 200 + 'px';
          message.style.height = 50 + 'px';
          message.style.backgroundColor = '#5c98d0';
          message.style.borderRadius = 20 + 'px';
          message.style.textAlign = 'center';
          message.style.lineHeight = 50 + 'px';
          message.innerHTML = error;
          document.body.append(message);
      }
      if (error) {
        onError(error);
      }
    });

    xhr.open('GET', URL);
    xhr.send();
  };
})();
