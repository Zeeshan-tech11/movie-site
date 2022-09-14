let search = document.querySelector(".search input");
let long = document.querySelector(".long-box");
let url = "http://www.omdbapi.com/?i=tt3896198&apikey=e8a8b26b";
let longb=document.querySelector(".box")
window.addEventListener('click',(e)=>{
  if(!long.contains(e.target)){
    long.classList.add('hide')
  }
})
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
  fetch(`https://www.omdbapi.com/?apikey=e8a8b26b&i=${event.target.value}`)
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
  fetch(`https://www.omdbapi.com/?apikey=e8a8b26b&s=comedy`)
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
    div.innerHTML = `<div class="box" id=${movie.imdbID}>
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
        div.addEventListener('click',(e)=>{
          moviePage(`${movie.imdbID}`)
          window.scrollTo(0, 0);

        })
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
  divinner.innerHTML = `<div class="card" id=${obj.imdbID} style="width: 14rem;">
     <img src=${obj.Poster} class="card-img-top" alt="poster">
     <div class="card-body">
       <h5 class="card-title">${obj.Title}</h5>
       <button href="#" class=" btn add-fvt fvt btn-primary" value=${obj.imdbID}>Add to Favourite</button>
     </div>
   </div>
     `;
     divinner.addEventListener('click',(e)=>{
      moviePage(`${obj.imdbID}`)
      window.scrollTo(0, 0);

    })
  gl.appendChild(divinner);
  let fvt=document.querySelectorAll('.fvt')
  fvt.forEach((ele)=>{
    ele.addEventListener('click',addData)
  })
  
};
const displayCardThriller = (obj) => {
  const gl = document.querySelector(".thriller");
  let divinner = document.createElement("div");
  divinner.innerHTML = `<div class="card" id=${obj.imdbID} style="width: 14rem;">
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
         divinner.addEventListener('click',(e)=>{
          moviePage(`${obj.imdbID}`)
          window.scrollTo(0, 0);

        })
  gl.appendChild(divinner);
};

// ...to search for movie..........

search.addEventListener("keyup", (e) => {
  long.classList.remove('hide')
  let t = e.target.value;
  console.log(e);
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
// display search result
const display = (movies) => {
  
  for (let i = 0; i < movies.length; i++) {
    let movie = movies[i];
    let div=document.createElement('div')
    div.setAttribute('class','box')
    div.setAttribute('id',`${movie.imdbID}`)
    div.innerHTML= `
        <div class="box-left">
            <img src=${movie.Poster}>
        </div>
        <div class="box-right">
            <div class="title">${movie.Title}</div>
            <div class="year">${movie.Year}</div>
        </div>
        <button class="add-fvt fvt" value=${movie.imdbID}>ADD TO FAVOURITE</button>
        `;
        div.addEventListener('click',(e)=>{
          moviePage(`${movie.imdbID}`)
          long.classList.add('hide')
          window.scrollTo(0, 0);

        })
    long.appendChild(div)
  }
  let fvt=document.querySelectorAll('.fvt')


  fvt.forEach((ele)=>{
    ele.addEventListener('click',addData)
  })
  // let boxes=document.querySelectorAll('.box')
  // boxes.forEach((box)=>{
  //   box.addEventListener(('click'),(e)=>{
  //     console.log(e);
  //   })
  // })
  
//   let addbutton=document.querySelectorAll('.add-fvt')

// addbutton.forEach((ele)=>{
//   ele.addEventListener('click',(e)=>{
//     console.log(e.target.parentElement,'...');

//   })
// })
};

const moviePage=(e)=>{
console.log(e,);
  fetch(`http://www.omdbapi.com/?apikey=e8a8b26b&i=${e}&plot=full`)
      .then((res) => res.json())
      .then((data) => {
        let response = data.Response;
        if (response) {
          displayMoviePage(data) 
        }
      })
      .catch((err) => console.log("error agya "));

}
const displayMoviePage = (movie) => {
 
  let moviep=document.querySelector('.movie-page')
  moviep.innerHTML=`
  <div class="mhead">
        <div class="title">${movie.Title}</div>
        <div class="year">${movie.Year}</div>
      </div>
      <div class="mmid flex">
        <div class="left">
          <img
            src=${movie.Poster}
            alt="poster"
          />
        </div>
        <div class="right">
          <div class="plot">
          ${movie.Plot}
            </div>
        </div>
        </div>
        <div class="mfoot">
          
        <div class="rating">IMDB: ${movie.imdbRating}</div>
        <button class="add-fvt fvt" value=${movie.imdbID}>ADD TO FAVOURITE</button>

    </div>

  `
  let fvt=document.querySelector('.mfoot .fvt')
  fvt.addEventListener('click',addData)

  
};
