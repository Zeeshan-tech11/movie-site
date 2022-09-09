let search=document.querySelector('input')
let long=document.querySelector('.long-box')
let url='http://www.omdbapi.com/?i=tt3896198&apikey=e8a8b26b'

search.addEventListener('keyup',(e)=>{
    let t=e.target.value
    console.log(t);
    fetch(`http://www.omdbapi.com/?apikey=e8a8b26b&s=${t}`)
    .then((res)=>res.json())
    .then((data)=>{
        let response=data.Response
        if(response){
            console.log(data.Search);
            display(data.Search)
        }
    })
    .catch((err)=>console.log('error agya '))
})

const display=(movies)=>{
    let list="";
    for(let i=0;i< movies.length;i++){
        let movie=movies[i];
        let one=`<div class="box">
        <div class="box-left">
            <img src=${movie.Poster}>
        </div>
        <div class="box-right">
            <div class="title">${movie.Title}</div>
            <div class="year">${movie.Year}</div>
        </div>
        <button class="add-fvt">ADD TO FAVOURITE</button>
    </div>

        `
    list+=one
    }
   long.innerHTML=list
}