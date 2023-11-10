const global = {
  currentPage: window.location.pathname,
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
  const WHATS_THIS = 'd1d13de9cd6e9b2b547262bc432f43af';
  const API_URL = 'https://api.themoviedb.org/3/';

  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${WHATS_THIS}&language=en-US`
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

// Highlight active link
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');

  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage)
      link.classList.add('active');
  });
}
// I thought there might need to be an eventlistener to listen to the clicks, but actually its not required, if the href matches global.currentPage, then it works fine already, placed in the init, which actually has an eventListener, when the DOMContentLoaded fires!

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
      break;
  }

  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
