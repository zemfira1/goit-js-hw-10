//Задание - Котопоиск
//Создай фронтенд часть приложения поиска информации о коте по его породе.
//Посмотри демо видео работы приложения, используй его как ориентир на требуемый функционал.

//HTTP-запросы
//Используй публичный The Cat API. Для начала работы необходимо зарегистрироваться и
//получить уникальный ключ доступа, который нужно прикреплять к каждому запросу.
//Заходим на главную страницу и ниже нажимаем кнопку Signup for free, следуем инструкции,
//ключ будет отправлен на указаную почту.Документация по использованию ключа находится здесь.

//Коллекция пород
//При загрузке страницы должен выполняться HTTP-запрос за коллекцией пород.
//Для этого необходимо выполнить
//GET - запрос на ресурс https://api.thecatapi.com/v1/breeds,
// возвращающий массив объектов.При успешном запросе, необходимо наполнить
//select.breed - select опциями так, чтобы value опции содержал id породы,
//а в интерфейсе пользователю отображалось название породы.
//Напиши функцию fetchBreeds() которая делает HTTP-запрос и возвращает промис
//с массивом пород - результатом запроса.Вынеси её в файл cat - api.js и сделай
//именованный экспорт.

//Информация о коте
//Когда пользователь выбирает опцию в селекте, необходимо выполнять запрос за
// полной информацией о коте на ресурс https://api.thecatapi.com/v1/images/search.
//Не забудь указать в этом запросе параметр строки запроса breed_ids
//с идентификатором породы.Ознакомься с документацией ресурса.

//Напиши функцию fetchCatByBreed(breedId) которая ожидает идентификатор породы,
//делает HTTP - запрос и возвращает промис с данными о коте - результатом запроса.
//Вынеси её в файл cat - api.js и сделай именованный экспорт.

//Если запрос был успешный, под селектом, в блоке div.cat-info появляется
// изображение и развернутая информация о коте: название породы, описание и темперамент.

//Обработка состояния загрузки
//Пока идет любой HTTP-запрос, необходимо показывать загрузчик - элемент p.loader.
// Пока запросов нет или когда запрос завершился, загрузчик необходимо скрывать.
//Используй для этого дополнительные CSS классы.

//Пока идет запрос за списком пород, необходимо скрыть select.breed-select
//и показать p.loader.
//Пока идет запрос за инфорацией о коте, необходимо скрыть div.cat-info
// и показать p.loader.
//Когда любой запрос завершился, p.loader необходимо скрыть
//Обработка ошибки
//Если у пользователя произошла ошибка любого HTTP-запроса, например упала сеть,
//была потеря пакетов и т.п., то есть промис был отклонен, необходимо отобразить
//элемент p.error, а при каждом последующем запросе скрывать его.
//Используй для этого дополнительные CSS классы.

//Протестировать работоспособноть отображения ошибки очень просто - измени адрес
//запроса добавив в конец любой символ, например вместо
//https://api.thecatapi.com/v1/breeds используй https://api.thecatapi.com/v1/breeds123.
//Запрос получения списка пород будет отклонен с ошибкой.
//Аналогично для запроса информации о коте по породе.

//Интерфейс
//Добавь минимальное оформление элементов интерфейса.
//Вместо select.breed-select можешь использовать любую библиотеку с красивыми селектом,
// например https://slimselectjs.com/
//Вместо p.loader можешь использовать любую библиотеку с красивыми CSS-загрузчиками,
// например https://cssloaders.github.io/
//Вместо p.error можешь использовать любую библиотеку с красивыми оповещениями,
//например Notiflix
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './fetch.js';

// new SlimSelect({
//   select: '#selectElement'
// })

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorEl = document.querySelector('.error');
let catInfo = document.querySelector('.cat-info');

fetchBreeds()
  .then(data => makeOptions(data))
  .catch(err => {
    Notiflix.Notify.failure(err.message);
    errorEl.classList.remove('hidden');
  })
  .finally(() => loader.classList.add('hidden'));

function makeOptions(items) {
  let listOptions = items.map(item => {
    let cat = document.createElement('option');
    cat.setAttribute('value', item.id);
    cat.textContent = item.name;

    return cat;
  });
  //console.log(listOptions);
  errorEl.classList.add('hidden');
  select.append(...listOptions);
  select.classList.remove('hidden');
}

select.addEventListener('change', changeValue);

function changeValue(event) {
  loader.classList.remove('hidden');
  catInfo.innerHTML = '';
  errorEl.classList.add('hidden');
  fetchCatByBreed(event.target.value)
    .then(data => createMarkup(data))
    .catch(err => {
      Notiflix.Notify.failure(err.message);
      errorEl.classList.remove('hidden');
    })
    .finally(() => loader.classList.add('hidden'));
}

function createMarkup(cat) {
  const url = cat[0].url;
  const { name, temperament, description } = cat[0].breeds[0];
  const markup = `<img width='300' src='${url}'/><div class='description'>
    <h1 class='name'>${name}</h1><p>${description}</p>
    <p class='temperament'><b>Temperament: </b>${temperament}</p></div>`;
  catInfo.innerHTML = markup;
}
