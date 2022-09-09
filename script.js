let search=document.querySelector('.search input')
let long=document.querySelector('.long-box')
let url='http://www.omdbapi.com/?i=tt3896198&apikey=e8a8b26b'
window.onload=function(){
    fetch(`http://www.omdbapi.com/?apikey=e8a8b26b&s=comedy`)
    .then((res)=>res.json())
    .then((data)=>{
        let response=data.Response
        if(response){
            console.log(data);
            console.log(data.Search);
            displayside(data.Search)
        }
    })
    .catch((err)=>console.log('error agya '))

}
const displayside=(data)=>{
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
    for(let i=0;i<4 && i<data.length;i++){
        fetch(`http://www.omdbapi.com/?apikey=e8a8b26b&i=${data[i].imdbID}`)
    .then((res)=>res.json())
    .then((data)=>{
        let response=data.Response
        if(response){
            console.log(data);
            displayCard(data)
            // console.log(data.Search);
            // displayside(data.Search)
        }
    })
    .catch((err)=>console.log('error agya '))
    }
}
const displayCard=(obj)=>{
const gl=document.querySelector('.glist')
let li=""
let div=document.createElement('div')
     div.innerHTML=`<div class="card" style="width: 14rem;">
     <img src=${obj.Poster} class="card-img-top" alt="poster">
     <div class="card-body">
       <h5 class="card-title">${obj.Title}</h5>
       <a href="#" class=" btn btn-primary">Add to Fvt</a>
     </div>
   </div>
     `

     gl.appendChild(div)
}
search.addEventListener('keyup',(e)=>{
    let t=e.target.value
    if(t=="")
    location.reload()
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