// Імпорт необхідних бібліотек
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
document.addEventListener("DOMContentLoaded", () => {
  // Отримання посилань на елементи DOM
  const form = document.querySelector(".searchForm");
  const searchInput = document.querySelector(".searchInput");
  const loader = document.querySelector(".loader");
  const gallery = document.querySelector(".gallery");
  const loadButton = document.querySelector(".load-more-button");

  // Ключ та URL API Pixabay
  const apiKey = "42055816-5ec499474650eadfc6b07a02f";
  const apiUrl = "https://pixabay.com/api/";

  // Ініціалізація Lightbox
  const lightbox = new SimpleLightbox(".gallery a");

  // Змінні для пагінації
  let currentPage = 1;
  const perPage = 15; // Змінено кількість елементів на сторінці

  // Додавання слухача подій для форми пошуку
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const searchTerm = searchInput.value.trim();

    if (searchTerm === "") {
      // Вивід повідомлення про помилку, якщо поле пошуку порожнє
      iziToast.error({
        title: "Error",
        position: "topRight",
        message: "Please enter a search term.",
      });
      return;
    }

    loader.classList.remove("hidden");
    gallery.innerHTML = "";
    loadButton.classList.add("hidden");
   
    try {
      // Запит до API Pixabay для отримання зображень з пагінацією
      const response = await axios.get(`${apiUrl}?key=${apiKey}&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=${perPage}`);

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = response.data;

      if (data.hits.length === 0) {
        // Вивід повідомлення, якщо немає результатів
        iziToast.warning({
          title: "No Results",
          position: "topRight",
          message: "Sorry, there are no images matching your search query. Please try again!",
        });
      } else {
        // Формування масиву об'єктів із зображеннями та їх відображення
        const images = data.hits.map((hit) => ({
          webformatURL: hit.webformatURL,
          largeImageURL: hit.largeImageURL,
          tags: hit.tags,
          likes: hit.likes,
          views: hit.views,
          comments: hit.comments,
          downloads: hit.downloads,
        }));

        displayImages(images);

        // Перевірка, чи є ще зображення для завантаження
        if (data.totalHits > currentPage * perPage) {
          loadButton.classList.remove("hidden");
        } else {
          loadButton.classList.add("hidden");
        }

        currentPage++;
      }
    } catch (error) {
      // Вивід повідомлення про помилку
      console.error("Error fetching data:", error);
      iziToast.error({
        title: "Error",
        position: "topRight",
        message: "An error occurred while fetching data. Please try again.",
      });
    } finally {
      // Приховання індикатора завантаження після завершення запиту
      loader.classList.add("hidden");
    }
  });

  // Додавання слухача подій для кнопки "Load more"
  loadButton.addEventListener("click", () => {
    loader.classList.remove("hidden");
    loadButton.classList.add("hidden");

    fetchData();
  });

  // Функція для отримання додаткових зображень
  async function fetchData() {
    try {
      const response = await axios.get(`${apiUrl}?key=${apiKey}&q=${searchInput.value.trim()}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=${perPage}`);

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = response.data;

      if (data.hits.length === 0) {
        // Приховання кнопки, якщо досягнуто кінець колекції
        loadButton.classList.add("hidden");
        iziToast.info({
          title: "End of Collection",
          position: "topRight",
          message: "We're sorry, but you've reached the end of search results.",
        });
      } else {
        // Формування масиву об'єктів із зображеннями та їх відображення
        const images = data.hits.map((hit) => ({
          webformatURL: hit.webformatURL,
          largeImageURL: hit.largeImageURL,
          tags: hit.tags,
          likes: hit.likes,
          views: hit.views,
          comments: hit.comments,
          downloads: hit.downloads,
        }));

        displayImages(images);

        // Перевірка, чи є ще зображення для завантаження
        if (data.totalHits > currentPage * perPage) {
          loadButton.classList.remove("hidden");
        } else {
          loadButton.classList.add("hidden");
        }
      }
    } catch (error) {
      // Вивід повідомлення про помилку
      console.error("Error fetching data:", error);
      iziToast.error({
        title: "Error",
        position: "topRight",
        message: "An error occurred while fetching data. Please try again.",
      });
    } finally {
      // Приховання індикатора завантаження після завершення запиту
      loader.classList.add("hidden");
    }
  }

  // Функція для відображення зображень у галереї
  function displayImages(images) {
    const galleryHTML = images
      .map(
        (image) => `
          <div class="gallery-item">
            <a href="${image.largeImageURL}" data-lightbox="gallery" data-title="${image.tags}">
              <img src="${image.webformatURL}" alt="${image.tags}" class="image-thumbnail">
            </a>
            <div class="image-details">
              <p><b>Likes:</b> ${image.likes}</p>
              <p><b>Views:</b> ${image.views}</p>
              <p><b>Comments:</b> ${image.comments}</p>
              <p><b>Downloads:</b> ${image.downloads}</p>
            </div>
          </div>
        `
      )
      .join("");

    gallery.innerHTML += galleryHTML;

    lightbox.refresh();

    // Плавне прокручування після завантаження нових зображень
    const cardHeight = document.querySelector('.gallery-item')?.getBoundingClientRect().height;
    if (cardHeight) {
      smoothScrollBy(cardHeight * images.length, 300);
    }
  }

  // Функція для плавного прокручування сторінки
  function smoothScrollBy(distance, duration) {
    const initialY = window.scrollY;
    const targetY = initialY + distance;

    let startTime = null;

    function scrollAnimation(currentTime) {
      if (!startTime) {
        startTime = currentTime;
      }

      const progress = currentTime - startTime;
      const elapsedTime = Math.min(progress, duration);

      const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      window.scrollTo(0, initialY + easeInOutQuad(elapsedTime / duration) * distance);

      if (progress < duration) {
        requestAnimationFrame(scrollAnimation);
      }
    }

    requestAnimationFrame(scrollAnimation);
  }


});