import { movies } from "./data.js";

// Devolver n movies o todas
const findMoviesRandom = (cantMoviesToFind) => {
  let result = [];
  if (cantMoviesToFind == 1000) {
    return movies
  } else {
    result = getMultipleRandom(movies, cantMoviesToFind)
    return result;
  }
}

// Armar html para row / columns / cards
const generateMoviesHtml = (filteredMovies) => {

  let innerHTML = `<div class="row gx-5 gy-3 mx-auto">`

  filteredMovies.forEach(function (movieItem) {
    let imgsrc = "./assets/images/" + movieItem.img
    let title = movieItem.title
    let year = movieItem.year
    let director = movieItem.director
    let duration = movieItem.duration
    
    innerHTML +=  `<div class="col-12 col-xs-6 col-sm-6 col-md-4 col-lg-3 d-flex">
                    <div class="card">
                      <img src="${imgsrc}" class="card-img-top" alt="...">
                        <div class="card-body text-center flex-fill">
                          <h5 class="card-title">${title}</h5>
                          <p class="card-text">${year}</p>
                          <p class="card-text">${director}</p>
                          <p class="card-text">${duration}</p>
                        </div>
                        <a href="#" class="btn btn-primary mx-auto mb-2">Do Something</a>
                    </div>
                  </div>`
  })
  innerHTML += `</div>`
  //console.log(innerHTML)
  return innerHTML

}


function wait(waitTime) {
  // implementa un wait

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true); // resolve the promise con el waitTime
    }, waitTime); // waitTime (miliseconds)
  });
}

const PlayWithElements = async (title, name) => {
  // ** IDEA  - que el titulo vaya cambiando de texto
  // - We are searching your movies !! orange
  // - You take care of Popcorn !! yellow
  // - OK {name}, here it is !!  green like table ?

  //console.log(title);

  title.innerHTML = "We are searching your movies...";

  await wait(1500);

  title.innerHTML = "You can take care of Popcorn !!";

  await wait(1500);

  title.innerHTML = `OK ${name}, enjoy !!`;
};

// Obtener n elementos de un array
function getMultipleRandom(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}



window.addEventListener("DOMContentLoaded", () => {
  // obtener elementos de la pantalla

  const findButton = document.querySelector("#find-movies");
  const divShowMovies = document.getElementById("variable-div");
  const mainTitle = document.getElementById("maintitle");
  const name = document.getElementById("name-input");
  const cantMoviesList = document.getElementById("countDataList");


  // listener para el boton de findMovies
  findButton.addEventListener("click", async (event) => {
    event.preventDefault();

    // inicializar
    let okToFind = true;

    name.classList.remove('is-invalid')
    cantMoviesList.classList.remove("is-invalid")

    divShowMovies.innerHTML = "";

    const genreToFind = "Sci-Fi";
    const cantMoviesToFind = Number(cantMoviesList.value);

    // Chequear datos ingresados
    if (name.value === "") {
      name.classList.add('is-invalid')
      okToFind = false;
    }


    if (cantMoviesToFind == 0) {
      cantMoviesList.classList.add("is-invalid");
      okToFind = false;
    }

    // Todo Ok, buscar
    if (okToFind) {


      await PlayWithElements(mainTitle, name.value)

      let moviesResult = findMoviesRandom(cantMoviesToFind)

      // Agregar data al div container
      let moviesHtml = generateMoviesHtml(moviesResult);

      /*
      moviesTable.classList.add("movie-table"); // aspecto
      moviesTable.classList.add("mx-auto"); // margenes
      moviesTable.style.overflowX = "auto"; // responsive
      */

      divShowMovies.innerHTML = moviesHtml
    }
  });

});
