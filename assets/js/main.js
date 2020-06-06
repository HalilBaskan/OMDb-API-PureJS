function movieRate() {
    axios.get('https://www.omdbapi.com/?s=game&apikey=ef866b1b').then((response) => {
        var movies = response.data.Search;
        movies.forEach((movie, index) => {
            var movieId = `${movie.imdbID}`;
            axios.get('https://www.omdbapi.com/?i=' + movieId + '&apikey=ef866b1b').then((response) => {
                var rate = response.data;
                document.getElementsByClassName("scoreCount")[index].innerHTML = `${rate.imdbRating}`;
                document.getElementsByClassName("movie-info")[index].innerHTML = `${rate.Plot}`;
            })
        });
    }).catch((err) => {
        console.log(err);
    });
}

function getAllMovie() {
    axios.get('https://www.omdbapi.com/?s=game&apikey=ef866b1b').then((response) => {
        var movies = response.data.Search;
        var output = '';

        movies.forEach(movie => {
            output += ` 
            <div class="block__card">
                <div class="card__header mb-10">
                    <div class="card__title">
                        ${movie.Title}
                    </div>
                    <div class="card__title card__title--score">
                        <span class="scoreCount"></span><br>puan
                    </div>
                </div>
                <div class="card__content">
                    <img class="card__poster" src="${movie.Poster}" />
                    <div class="card__movie-info">
                        <span class="movie-info">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dictum varius ultricies.
                            Ut malesuada lobortis hendrerit. Aenean tincidunt cursus orci in auctor.
                        </span>
                        <button class="card__movie-button mt-10" onclick="movieSelected('${movie.imdbID}')">
                            detay
                        </button>
                    </div>
                </div>
            </div>
        `;
        });
        document.getElementById("list").innerHTML = output;
    }).catch((err) => {
        console.log(err);
    });

    movieRate();
    getSession();
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'detail.html';
    return false;
}

function getMovie() {
    var movieId = sessionStorage.getItem('movieId');

    axios.get('https://www.omdbapi.com/?i=' + movieId + '&apikey=ef866b1b').then((response) => {
        var movie = response.data;
        var movieTime = parseInt(response.data.Runtime)
        function timeConvert(n) {
            var num = n;
            var hours = (num / 60);
            var rhours = Math.floor(hours);
            var minutes = (hours - rhours) * 60;
            var rminutes = Math.round(minutes);
            if (movieTime < 59) {
                return rminutes + " dakika";
            }
            else {
                return rhours + " saat " + rminutes + " dakika";
            }
        }
        var title = `
            <p class="banner__title--detail">${movie.Title}</p>
        `;
        var output = `
            <div class="block__detail-content">
                <img class="detail__poster" src="${movie.Poster}" style="height: auto; width: 100%;" />
            </div>
            <div class="block__detail-content block__detail-content--info">
                <p><b>Vizyon Yılı:</b> ${movie.Year}</p>
                <p><b>Film Süresi:</b> `+ timeConvert(movieTime) + `</p>
                <p><b>Dil:</b> ${movie.Language}</p>
                <p><b>Tür:</b> ${movie.Genre}</p>
                <p><b>Aktörler:</b> ${movie.Actors}</p>
            </div>
        `;
        document.getElementById("title").innerHTML = title;
        document.getElementById("detail").innerHTML = output;

    }).catch((err) => {
        console.log(err);
    });
    
    getSession();
}

function getSession() {
    var date = new Date();
    var beforeDate1 = window.localStorage.getItem("hours");
    var beforeDate2 = window.localStorage.getItem("minutes");
    window.localStorage.setItem("hours", ("0" + date.getHours()).slice(-2));
    window.localStorage.setItem("minutes", ("0" + date.getMinutes()).slice(-2));
    var date1 = window.localStorage.getItem("hours");
    var date2 = window.localStorage.getItem("minutes");
    document.getElementsByClassName("footer__breadcrumb")[0].innerHTML = "Anlık girilen saat: " + date1 + ":" + date2 + "<br>Son girilen saat: " + beforeDate1 + ":" + beforeDate2;
}