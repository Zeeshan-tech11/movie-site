let search = document.querySelector(".search input");
let long = document.querySelector(".long-box");
let url = "http://www.omdbapi.com/?i=tt3896198&apikey=e8a8b26b";


let fvtdata = [
  {
    Poster:
      "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    Title: "Batman Begins",
    Type: "movie",
    Year: "2005",
    imdbID: "tt0372784",
  },
  {
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    Title: "Batman v Superman: Dawn of Justice",
    Type: "movie",
    Year: "2016",
    imdbID: "tt2975590",
  },
  {
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_SX300.jpg",
    Title: "The Batman",
    Type: "movie",
    Year: "2022",
    imdbID: "tt1877830",
  },
  {
    Poster:
      "https://m.media-amazon.com/images/M/MV5BOGZmYzVkMmItM2NiOS00MDI3LWI4ZWQtMTg0YWZkODRkMmViXkEyXkFqcGdeQXVyODY0NzcxNw@@._V1_SX300.jpg",
    Title: "Batman Returns",
    Type: "movie",
    Year: "1992",
    imdbID: "tt0103776",
  },
];
// setting local storage

window.localStorage.setItem("fvtdata",JSON.stringify(fvtdata))

 //removing from favourite list
const removedata = (event) => {
  let fvtdata=JSON.parse(localStorage.getItem('fvtdata'))
  let idx=event.target.value
  let res=[];
  for(let i=0;i<fvtdata.length;i++){
    if(fvtdata[i].imdbID!=idx)
    res.push(fvtdata[i])
  }
  window.localStorage.setItem("fvtdata",JSON.stringify(res))
  displayfvt()

};

// adding to favoutite list
const addData=(event)=>{
  let id=event.target.value
  let copy=false;
  let fvtdata=JSON.parse(localStorage.getItem('fvtdata'))
    let res=[];
     for(let i=0;i<fvtdata.length;i++){
       res.push(fvtdata[i])
       if(id==fvtdata[i].imdbID){
        copy=true
        return;
       }
     }
  if(!copy){
  fetch(`http://www.omdbapi.com/?apikey=e8a8b26b&i=${event.target.value}`)
  .then((res) => res.json())
  .then((data) => {
    let response = data.Response;
    if(response){
     res.unshift(data)
     window.localStorage.setItem("fvtdata",JSON.stringify(res))

     displayfvt()
    }
  })
  .catch((e)=>console.log('errror agya'));

}
}

// rendering page on loading
window.onload = function () {

  //to fetch comedy
  fetch(`http://www.omdbapi.com/?apikey=e8a8b26b&s=comedy`)
    .then((res) => res.json())
    .then((data) => {
      let response = data.Response;
      if (response) {
        displayside(data.Search, "c");
      }
    })
    .catch((err) => console.log("error agya "));

  //to fetch thriller
  fetch(`http://www.omdbapi.com/?apikey=e8a8b26b&s=thriller`)
    .then((res) => res.json())
    .then((data) => {
      let response = data.Response;
      if (response) {
        displayside(data.Search, "t");
      }
    })
    .catch((err) => console.log("error agya "));

  // to show initial favourite list data
  displayfvt();
};

// displaying fvt page
const displayfvt = () => {
  let fvt=JSON.parse(localStorage.getItem('fvtdata'))
  
  let gtit = document.querySelector(".gtitle2");
  
  gtit.innerHTML=""
  for(let i=0;i<fvt.length;i++) {
    let movie=fvt[i]
    let div = document.createElement("div");
    div.innerHTML = `<div class="box">
        <div class="box-left">
            <img src=${movie.Poster}>
        </div>
        <div class="box-right">
            <div class="title">${movie.Title}</div>
            <div class="year">${movie.Year}</div>
        </div>
        <button class="add-fvt unfvt" value=${movie.imdbID}>REMOVE FAVOURITE</button>
    </div>

        `;
    gtit.appendChild(div);
  };
  let unfvt=document.querySelectorAll('.unfvt')
  unfvt.forEach((ele)=>{
    ele.addEventListener('click',removedata)
  })
};


// display gener page
const displayside = (data, type) => {
  
  for (let i = 0; i < 4 && i < data.length; i++) {
    fetch(`http://www.omdbapi.com/?apikey=e8a8b26b&i=${data[i].imdbID}`)
      .then((res) => res.json())
      .then((data) => {
        let response = data.Response;
        if (response) {
          // console.log(data);
          if (type == "t") displayCardThriller(data);
          // console.log(data.Search);
          // displayside(data.Search)
          else {
            displayCardComedy(data);
          }
        }
      })
      .catch((err) => console.log("error agya "));
  }
};


const displayCardComedy = (obj) => {
  const gl = document.querySelector(".comedy");
  let divinner = document.createElement("div");
  divinner.innerHTML = `<div class="card" style="width: 14rem;">
     <img src=${obj.Poster} class="card-img-top" alt="poster">
     <div class="card-body">
       <h5 class="card-title">${obj.Title}</h5>
       <button href="#" class=" btn add-fvt fvt btn-primary" value=${obj.imdbID}>Add to Favourite</button>
     </div>
   </div>
     `;

  gl.appendChild(divinner);
  let fvt=document.querySelectorAll('.fvt')
  fvt.forEach((ele)=>{
    ele.addEventListener('click',addData)
  })
};
const displayCardThriller = (obj) => {
  const gl = document.querySelector(".thriller");
  let divinner = document.createElement("div");
  divinner.innerHTML = `<div class="card" style="width: 14rem;">
         <img src=${obj.Poster} class="card-img-top" alt="poster">
         <div class="card-body">
           <h5 class="card-title">${obj.Title}</h5>
           <button href="#" class=" btn add-fvt fvt btn-primary"value=${obj.imdbID}>Add to Favourite</button>
         </div>
       </div>
         `;
         let fvt=document.querySelectorAll('.fvt')
         // console.log(fvt);
         fvt.forEach((ele)=>{
           ele.addEventListener('click',addData)
         })
  gl.appendChild(divinner);
};
search.addEventListener("keyup", (e) => {
  let t = e.target.value;
  if (t == "") location.reload();
  // console.log(t);
  fetch(`http://www.omdbapi.com/?apikey=e8a8b26b&s=${t}`)
    .then((res) => res.json())
    .then((data) => {
      let response = data.Response;
      if (response) {
        // console.log(data.Search);
        display(data.Search);
      }
    })
    .catch((err) => console.log("error agya "));
});

const display = (movies) => {
  let list = "";
  for (let i = 0; i < movies.length; i++) {
    let movie = movies[i];
    let one = `<div class="box">
        <div class="box-left">
            <img src=${movie.Poster}>
        </div>
        <div class="box-right">
            <div class="title">${movie.Title}</div>
            <div class="year">${movie.Year}</div>
        </div>
        <button class="add-fvt fvt" value=${movie.imdbID}>ADD TO FAVOURITE</button>
    </div>

        `;
    list += one;
  }
  long.innerHTML = list;
  let fvt=document.querySelectorAll('.fvt')

  fvt.forEach((ele)=>{
    ele.addEventListener('click',addData)
  })
};

const displayMoviePage = (movie) => {
  const moviedata = {
    Title: "Batman",
    Year: "1989",
    Rated: "PG-13",
    Released: "23 Jun 1989",
    Runtime: "126 min",
    Genre: "Action, Adventure",
    Director: "Tim Burton",
    Writer: "Bob Kane, Sam Hamm, Warren Skaaren",
    Actors: "Michael Keaton, Jack Nicholson, Kim Basinger",
    Plot: "Gotham City. Crime boss Carl Grissom (Jack Palance) effectively runs the town but there's a new crime fighter in town - Batman (Michael Keaton). Grissom's right-hand man is Jack Napier (Jack Nicholson), a brutal man who is not entirely sane... After falling out between the two Grissom has Napier set up with the Police and Napier falls to his apparent death in a vat of chemicals. However, he soon reappears as The Joker and starts a reign of terror in Gotham City. Meanwhile, reporter Vicki Vale (Kim Basinger) is in the city to do an article on Batman. She soon starts a relationship with Batman's everyday persona, billionaire Bruce Wayne.",
    Language: "English, French, Spanish",
    Country: "United States, United Kingdom",
    Awards: "Won 1 Oscar. 9 wins & 26 nominations total",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZDNjOGNhN2UtNmNhMC00YjU4LWEzMmUtNzRkM2RjN2RiMjc5XkEyXkFqcGdeQXVyMTU0OTM5ODc1._V1_SX300.jpg",
    Ratings: [
      { Source: "Internet Movie Database", Value: "7.5/10" },
      { Source: "Rotten Tomatoes", Value: "73%" },
      { Source: "Metacritic", Value: "69/100" },
    ],
    Metascore: "69",
    imdbRating: "7.5",
    imdbVotes: "374,877",
    imdbID: "tt0096895",
    Type: "movie",
    DVD: "22 Aug 1997",
    BoxOffice: "$251,409,241",
    Production: "N/A",
    Website: "N/A",
    Response: "True",
  };
};
