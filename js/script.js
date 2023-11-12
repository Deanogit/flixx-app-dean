const global = {
  currentPage: window.location.pathname,
  // setting up an object in the global scope to store the url data from the URLSearchParams method
  search: {
    term: '',
    type: '',
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
  api: {
    whatsThis: 'd1d13de9cd6e9b2b547262bc432f43af',
    apiUrl: 'https://api.themoviedb.org/3/',
  },
};

console.log(global.currentPage);
console.log(window.location.pathname);

// Display Movie Details
async function displayMovieDetails() {
  const movieId = window.location.search.split('=')[1];

  const movie = await fetchAPIData(`movie/${movieId}`);

  // Overlay for background Image
  displayBackgroundImage('movie', movie.backdrop_path);

  console.log(movieId);
  console.log(movie);

  // Details Top

  const detailsTop = document.createElement('div');
  detailsTop.classList.add('details-top');

  const imgDiv = document.createElement('div');

  const img = document.createElement('img');
  img.setAttribute(
    'src',
    `https://image.tmdb.org/t/p/w500${movie.poster_path}`
  );
  img.classList.add('card-img-top');
  img.setAttribute('alt', `${movie.title}`);

  imgDiv.appendChild(img);
  detailsTop.appendChild(imgDiv);

  const titleDiv = document.createElement('div');

  const h2 = document.createElement('h2');
  h2.textContent = `${movie.title}`;

  const ratingP = document.createElement('p');
  ratingP.innerHTML = `<i class="fas fa-star text-primary"></i> ${movie.vote_average.toFixed(
    1
  )} / 10`;

  const textMuted = document.createElement('p');
  textMuted.textContent = `Released Date: ${movie.release_date}`;

  const desc = document.createElement('p');
  desc.textContent = `${movie.overview}`;

  const genres = document.createElement('h5');
  genres.textContent = `Genres`;

  const ul = document.createElement('ul');
  ul.classList.add('list-group');

  movie.genres.forEach((genre) => {
    const li = document.createElement('li');
    li.textContent = `${genre.name}`;
    ul.append(li);
  });

  // Brad using map();
  // movie.genres.map((genre => `<li>${genre.name}</li>`).join(''))

  const homepage = document.createElement('a');
  homepage.setAttribute('href', `${movie.homepage}`);
  homepage.setAttribute('target', '_blank');
  homepage.classList.add('btn');
  homepage.textContent = `Visit Movie Homepage`;

  titleDiv.appendChild(h2);
  titleDiv.appendChild(ratingP);
  titleDiv.appendChild(textMuted);
  titleDiv.appendChild(desc);
  titleDiv.appendChild(genres);
  titleDiv.appendChild(ul);
  titleDiv.appendChild(homepage);

  detailsTop.appendChild(titleDiv);

  // Details Bottom

  const detailsBottom = document.createElement('div');
  detailsBottom.classList.add('details-bottom');

  const movieInfo = document.createElement('h2');
  movieInfo.textContent = `Movie Info`;

  const infoUl = document.createElement('ul');

  const li1 = document.createElement('li');
  li1.innerHTML = `<span class="text-secondary">Budget:</span> $${addCommasToNumber(
    movie.budget
  )}`;
  const li2 = document.createElement('li');
  li2.innerHTML = `<span class="text-secondary">Revenue:</span> $${addCommasToNumber(
    movie.revenue
  )}`;
  const li3 = document.createElement('li');
  li3.innerHTML = `<span class="text-secondary">Runtime:</span> ${movie.runtime} minutes`;
  const li4 = document.createElement('li');
  li4.innerHTML = `<span class="text-secondary">Status:</span> ${movie.status}`;

  infoUl.append(li1, li2, li3, li4);

  const prod = document.createElement('h4');
  prod.textContent = `Production Companies`;

  const compList = document.createElement('div');
  compList.classList.add('list-group');

  const arr = [];
  movie.production_companies.forEach((comp) => {
    arr.push(comp.name);
    compList.textContent = arr.join(', ');
  });

  detailsBottom.appendChild(movieInfo);
  detailsBottom.appendChild(infoUl);
  detailsBottom.appendChild(prod);
  detailsBottom.appendChild(compList);

  const div = document.querySelector('#movie-details');

  div.appendChild(detailsTop);
  div.appendChild(detailsBottom);
}

// Display TV details
async function displayTVDetails() {
  const showId = window.location.search.split('=')[1];
  console.log(showId);

  const show = await fetchAPIData(`tv/${showId}`);

  // Overlay for background Image
  displayBackgroundImage('show', show.backdrop_path);

  console.log(show);

  const detailsTop = document.createElement('div');
  detailsTop.classList.add('details-top');

  const imgDiv = document.createElement('div');

  const img = document.createElement('img');
  img.setAttribute('src', `https://image.tmdb.org/t/p/w500${show.poster_path}`);
  img.classList.add('card-img-top');
  img.setAttribute('alt', `${show.name}`);

  imgDiv.appendChild(img);

  const textDiv = document.createElement('div');

  const h2 = document.createElement('h2');
  h2.textContent = `${show.name}`;

  const p1 = document.createElement('p');
  p1.innerHTML = `<icon class="fas fa-star text-primary"></icon>
    ${show.vote_average.toFixed(1)} / 10`;

  const textMuted = document.createElement('p');
  textMuted.classList.add('text-muted');
  textMuted.textContent = `Release Date: ${show.first_air_date}`;

  const desc = document.createElement('p');
  desc.textContent = `${show.overview}`;

  const h5 = document.createElement('h5');
  h5.textContent = 'Genres';

  const listGroup = document.createElement('ul');
  listGroup.classList.add('list-group');

  console.log(show.genres[0].name);

  show.genres.forEach((genre) => {
    const li = document.createElement('li');
    li.textContent = `${genre.name}`;
    listGroup.append(li);
  });

  const showHomepage = document.createElement('a');
  showHomepage.setAttribute('href', `${show.homepage}`);
  showHomepage.setAttribute('target', '_blank');
  showHomepage.classList.add('btn');
  showHomepage.textContent = 'Visit Show Homepage';

  textDiv.append(h2, p1, textMuted, desc, h5, listGroup, showHomepage);

  //   Bottom div

  const detailsBottom = document.createElement('div');
  detailsBottom.classList.add('details-bottom');

  const showInfo = document.createElement('h2');
  showInfo.textContent = 'Show Info';

  const ul = document.createElement('ul');

  const li1 = document.createElement('li');
  li1.innerHTML = `<span class="text-secondary">Number Of Episodes:</span> ${show.number_of_episodes}`;
  const li2 = document.createElement('li');
  li2.innerHTML = `<span class="text-secondary">Last Episode To Air:</span> ${show.last_air_date}`;
  const li3 = document.createElement('li');
  li3.innerHTML = `<span class="text-secondary">Status:</span> ${show.status}`;

  ul.append(li1, li2, li3);

  const production = document.createElement('h4');
  production.textContent = 'Production Companies';

  const companiesDiv = document.createElement('div');
  companiesDiv.classList.add('list-group');

  const arr = [];
  show.production_companies.forEach((comp) => {
    arr.push(comp.name);
    companiesDiv.textContent = arr.join(', ');
    // so I want to loop through these and render them onto the div, and remove the last comma from the last entry
    // companiesDiv.innerHTML = `${comp.name}`;
    // The method array.toString() actually calls array.join() which result in a string concatenated by commas. ref
  });

  //   Append all together;

  detailsTop.append(imgDiv, textDiv);

  detailsBottom.append(showInfo, ul, production, companiesDiv);

  // Append to parent
  document.querySelector('#show-details').append(detailsTop, detailsBottom);
}

// Display 20 most popular movies
async function displayPopluarMovies() {
  const { results } = await fetchAPIData('movie/popular');
  //   console.log(results);
  results.forEach((movie) => {
    const movieEl = document.createElement('div');
    movieEl.classList.add('card');

    const linkEl = document.createElement('a');
    linkEl.setAttribute('href', `movie-details.html?id=${movie.id}`);

    const linkImg = document.createElement('img');
    linkImg.classList.add('card-img-top');
    if (movie.poster_path) {
      linkImg.setAttribute(
        'src',
        `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      );
    } else {
      linkImg.setAttribute('src', 'images/no-image.jpg');
    }
    linkImg.setAttribute('alt', `${movie.title}`);

    linkEl.appendChild(linkImg);

    const cardBodyEl = document.createElement('div');
    cardBodyEl.classList.add('card-body');

    const cardTitleEl = document.createElement('h5');
    cardTitleEl.classList.add('card-title');
    cardTitleEl.textContent = `${movie.title}`;

    const cardTextEl = document.createElement('p');
    cardTextEl.classList.add('card-text');

    const textMutedEl = document.createElement('small');
    textMutedEl.classList.add('text-muted');
    textMutedEl.textContent = `Release Date: ${movie.release_date}`;

    cardTextEl.appendChild(textMutedEl);

    cardBodyEl.append(cardTitleEl, cardTextEl);

    movieEl.append(linkEl, cardBodyEl);

    const popularMovies = document.querySelector('#popular-movies');

    popularMovies.appendChild(movieEl);
  });
}

// Display 20 most popular TV shows
async function displayPopularTV() {
  const { results } = await fetchAPIData('tv/popular');
  results.forEach((tv) => {
    const tvEl = document.createElement('div');
    tvEl.classList.add('card');

    const linkEl = document.createElement('a');
    linkEl.setAttribute('href', `tv-details.html?id=${tv.id}`);

    const linkImg = document.createElement('img');
    linkImg.classList.add('card-img-top');
    if (tv.poster_path) {
      linkImg.setAttribute(
        'src',
        `https://image.tmdb.org/t/p/w500${tv.poster_path}`
      );
    } else {
      linkImg.setAttribute('src', 'images/no-image.jpg');
    }
    linkImg.setAttribute('alt', `${tv.name}`);

    linkEl.appendChild(linkImg);

    const cardBodyEl = document.createElement('div');
    cardBodyEl.classList.add('card-body');

    const cardTitleEl = document.createElement('h5');
    cardTitleEl.classList.add('card-title');
    cardTitleEl.textContent = `${tv.name}`;

    const cardTextEl = document.createElement('p');
    cardTextEl.classList.add('card-text');

    const textMutedEl = document.createElement('small');
    textMutedEl.classList.add('text-muted');
    textMutedEl.textContent = `Air Date: ${tv.first_air_date}`;

    cardTextEl.appendChild(textMutedEl);

    cardBodyEl.appendChild(cardTitleEl);
    cardBodyEl.appendChild(cardTextEl);

    tvEl.appendChild(linkEl);
    tvEl.appendChild(cardBodyEl);

    const popularShows = document.querySelector('#popular-shows');

    popularShows.appendChild(tvEl);
  });
}

// Display Backdrop On Details Pages
function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
}

// Search Movies/Shows
async function search() {
  // get the data from the url (this returns the url containing the search type and search value written in the url when the search button is fired and the search page is rendered)
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term');

  // Check term is not equal to empty string or null
  if (global.search.term !== '' && global.search.term !== null) {
    // @todo - make request and display results
    // These results needs to be destructured
    const { results, total_pages, page, total_results } = await searchAPIData();

    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;

    // check if there are results
    if (results.length === 0) {
      showAlert('No results found');
      return;
    }
    displaySearchResults(results);

    document.querySelector('#search-term').value = '';
  } else {
    showAlert('Please enter a search term');
  }
}

function displaySearchResults(results) {
  // Clear previous results
  document.querySelector('#search-results').innerHTML = '';
  document.querySelector('#search-results-heading').innerHTML = '';
  document.querySelector('#pagination').innerHTML = '';

  console.log(results);
  results.forEach((result) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardLink = document.createElement('a');
    cardLink.setAttribute(
      'href',
      `${global.search.type}-details.html?id=${result.id}`
    );

    const cardLinkImg = document.createElement('img');
    cardLinkImg.classList.add('card-img-top');
    if (result.poster_path) {
      cardLinkImg.setAttribute(
        'src',
        `https://image.tmdb.org/t/p/w500/${result.poster_path}`
      );
    } else {
      cardLinkImg.setAttribute('src', 'images/no-image.jpg');
    }
    cardLinkImg.setAttribute(
      'alt',
      `${global.search.type === 'movie' ? result.title : result.name}`
    );

    cardLink.appendChild(cardLinkImg);
    card.appendChild(cardLink);

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');

    cardTitle.textContent = `${
      global.search.type === 'movie' ? result.title : result.name
    }`;

    const cardText = document.createElement('p');
    cardText.classList.add('card-text');

    const textMuted = document.createElement('small');
    textMuted.classList.add('text-muted');
    textMuted.textContent = `Release: ${
      global.search.type === 'movie'
        ? result.release_date
        : result.first_air_date
    }`;

    cardText.appendChild(textMuted);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);

    card.appendChild(cardBody);

    document.querySelector('#search-results').appendChild(card);
  });
  const heading = document.createElement('h2');
  heading.textContent = `${results.length} of ${global.search.totalResults} results for ${global.search.term}`;

  document.querySelector('#search-results-heading').appendChild(heading);

  displayPagination();
}

// Create & Display Pagination For Search
function displayPagination() {
  const div = document.createElement('div');
  div.classList.add('pagination');

  const prevBtn = document.createElement('button');
  prevBtn.classList.add('btn', 'btn-primary');
  prevBtn.setAttribute('id', 'prev');
  prevBtn.textContent = 'Prev';

  const nextBtn = document.createElement('button');
  nextBtn.classList.add('btn', 'btn-primary');
  nextBtn.setAttribute('id', 'next');
  nextBtn.textContent = 'Next';

  const counter = document.createElement('div');
  counter.classList.add('page-counter');
  counter.textContent = `Page ${global.search.page} of ${global.search.totalPages}`;

  div.appendChild(prevBtn);
  div.appendChild(nextBtn);
  div.appendChild(counter);

  document.querySelector('#pagination').appendChild(div);

  // Disable prev button if on first page
  if (global.search.page === 1) {
    document.querySelector('#prev').disabled = true;
  }

  // Disable last button if on last page
  if (global.search.page === global.search.totalPages) {
    document.querySelector('#next').disabled = true;
  }

  // Next Page
  document.querySelector('#next').addEventListener('click', async () => {
    global.search.page++;
    const { results, total_pages } = await searchAPIData();
    displaySearchResults(results);
  });

  // Prev Page
  document.querySelector('#prev').addEventListener('click', async () => {
    global.search.page--;
    const { results, total_pages } = await searchAPIData();
    displaySearchResults(results);
  });
}

{
  /* <div class="pagination">
          <button class="btn btn-primary" id="prev">Prev</button>
          <button class="btn btn-primary" id="next">Next</button>
          <div class="page-counter">Page 1 of 5</div>
        </div> */
}

// Display Slider Movies
async function displaySlider() {
  const { results } = await fetchAPIData('movie/now_playing');

  results.forEach((movie) => {
    const swiperSlider = document.createElement('div');
    swiperSlider.classList.add('swiper-slide');

    const link = document.createElement('a');
    link.setAttribute('href', `movie-details.html?id=${movie.id}`);

    const img = document.createElement('img');
    img.setAttribute(
      'src',
      `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    );
    img.setAttribute('alt', `${movie.title}`);

    link.appendChild(img);

    const swiperRating = document.createElement('h4');
    swiperRating.classList.add('swiper-rating');
    swiperRating.innerHTML = `<i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(
      1
    )}`;

    swiperSlider.appendChild(link);
    swiperSlider.appendChild(swiperRating);

    const wrapper = document.querySelector('.swiper-wrapper');
    wrapper.appendChild(swiperSlider);

    initSwiper();
  });

  function initSwiper() {
    const swiper = new Swiper('.swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      freeMode: true,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      breakpoints: {
        500: {
          slidesPerView: 2,
        },
        700: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
      },
    });
  }

  console.log(results);
}

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  // For production don't put the key in here, should be on a server
  const WHATS_THIS = global.api.whatsThis;
  const API_URL = global.api.apiUrl;

  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${WHATS_THIS}&language=en-US`
  );

  const data = response.json();

  hideSpinner();

  return data;
}

// Make Request To Search
async function searchAPIData() {
  // For production don't put the key in here, should be on a server
  const WHATS_THIS = global.api.whatsThis;
  const API_URL = global.api.apiUrl;

  showSpinner();

  const response = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${WHATS_THIS}&language=en-US&query=${global.search.term}&page=${global.search.page}`
  );

  const data = response.json();

  hideSpinner();

  return data;
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

// Show Alert
function showAlert(message, className = 'error') {
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert', className);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(alertEl);

  setTimeout(() => alertEl.remove(), 3000);
}

// Highlight active link
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');

  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage)
      link.classList.add('active');
  });
}

// add commas to numbers
function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Init App

function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopluarMovies();
      displaySlider();
      break;
    // case 'shows.html':
    case '/shows.html':
      displayPopularTV();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      displayTVDetails();
      break;
    case '/search.html':
      console.log('Search');
      search();
      break;
  }

  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
