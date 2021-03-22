'use strict';

(function () {
  var URL = 'http://localhost:8888/code-and-magick/data';

  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.load = function (onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);
    var onError = function (message) {
      // console.error(message);
    };
    xhr.addEventListener('load', function () {
      var error;

      switch (xhr.status) {
        case 200:
          error = '11';
          onSuccess(xhr.response);
          break;

        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;

        default:
          error = 'Статус ответа: :' + xhr.status + ' ' + xhr.statusText;

      }
      if (error) {
        onError(error);
      }
      console.log(error);

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
    });


    xhr.send();
  };
})();
