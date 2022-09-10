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
    Poster: "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
,Title: "Batman v Superman: Dawn of Justice",
Type: "movie",
Year: "2016",
imdbID: "tt2975590"
  },
  {
    Poster: "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_SX300.jpg"
,Title: "The Batman",
Type: "movie",
Year: "2022",
imdbID: "tt1877830"

  },
  {
    Poster: "https://m.media-amazon.com/images/M/MV5BOGZmYzVkMmItM2NiOS00MDI3LWI4ZWQtMTg0YWZkODRkMmViXkEyXkFqcGdeQXVyODY0NzcxNw@@._V1_SX300.jpg"
    ,Title: "Batman Returns",
    Type: "movie",
    Year: "1992",
    imdbID: "tt0103776"
  }
];
window.onload = function () {
  //to fetch comedy
  fetch(`http://www.omdbapi.com/?apikey=e8a8b26b&s=comedy`)
    .then((res) => res.json())
    .then((data) => {
      let response = data.Response;
      if (response) {
        // console.log(data);
        // console.log(data.Search);
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
        // console.log(data);
        // console.log(data.Search);
        displayside(data.Search, "t");
      }
    })
    .catch((err) => console.log("error agya "));

    // to populate data

    displayfvt(fvtdata)
};
const displayfvt=(fvtdata)=>{
    let gtit=document.querySelector('.gtitle');
    fvtdata.forEach((movie,idx)=>{
        let div=document.createElement('div');
        div.innerHTML=`<div class="box">
        <div class="box-left">
            <img src=${movie.Poster}>
        </div>
        <div class="box-right">
            <div class="title">${movie.Title}</div>
            <div class="year">${movie.Year}</div>
        </div>
        <button class="add-fvt unfvt" onclick="removedata(${idx})">REMOVE FAVOURITE</button>
    </div>

        `
        gtit.appendChild(div)
    })
}
const displayside = (data, type) => {
  // data.forEach(ele => {
  //     fetch(`http://www.omdbapi.com/?apikey=e8a8b26b&i=${ele.imdbID}`)
  // .then((res)=>res.json())
  // .then((data)=>{
  //     let response=data.Response
  //     if(response){
  //         console.log(data);
  //         displayCard(data)
  //         // console.log(data.Search);
  //         // displayside(data.Search)
  //     }
  // })
  // .catch((err)=>console.log('error agya '))

  // });
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
       <a href="#" class=" btn fvt btn-primary">Add to Fvt</a>
     </div>
   </div>
     `;

  gl.appendChild(divinner);
};
const displayCardThriller = (obj) => {
  const gl = document.querySelector(".thriller");
  let divinner = document.createElement("div");
  divinner.innerHTML = `<div class="card" style="width: 14rem;">
         <img src=${obj.Poster} class="card-img-top" alt="poster">
         <div class="card-body">
           <h5 class="card-title">${obj.Title}</h5>
           <a href="#" class=" btn fvt btn-primary">Add to Fvt</a>
         </div>
       </div>
         `;

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
  console.log(movies);
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
        <button class="add-fvt fvt">ADD TO FAVOURITE</button>
    </div>

        `;
    list += one;
  }
  long.innerHTML = list;
};
const removedata=(movie)=>{
  console.log(movie);
  fvtdata.pop()
  location.reload()
  //   displayfvt(fvtdata)
  // console.log('.....deleting');

  // let idx=fvtdata.indexOf(movie)
  // console.log('.....deleting');

  // if(idx!=-1){
  //   console.log('.....deleting');
  //   fvtdata.splice(idx,1)
  //   displayfvt(fvtdata)
  // }
}
