import React, { useEffect, useState } from "react"
import { getMovies } from "../Fetch/imdb"
import { ListNavBar } from "../NavBar/listNavBar"
import { useHistory } from "react-router-dom"

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100&family=Red+Hat+Mono:wght@300&family=Zen+Old+Mincho&display=swap" rel="stylesheet"></link>

export const BookList = () => {
    // const history = useHistory()

    // // Use States
    // //-------------------------------------------------------------------------------------------------------------------
    // const [books, setBooks] = useState([])
    // const [sorted, setSorted] = useState([])
    // const [search, setSearch] = useState('')

    // // Use Effects
    // //-------------------------------------------------------------------------------------------------------------------

    // useEffect(
    //     () => {
    //         getMovies()
    //             .then((data) => {
    //                 setMovies(data)
    //             })
    //     },
    //     []
    // )

    // useEffect(
    //     () => {
    //         setSorted(movies)
    //     },
    //     [movies]
    // )

    // useEffect(
    //     () => {
    //         search === "" ? getMovies().then((data) => { setMovies(data) }) :
    //             setMovies(movies.filter((movie) => {
    //                 return movie.title.toLowerCase().includes(search.toLowerCase())
    //             }))

    //     },
    //     [search]
    // )

    // // Functions/Objects
    // //-------------------------------------------------------------------------------------------------------------------


    // const topRated = () => {
    //     let movieCopy = movies.map(movie => ({ ...movie }))
    //     movieCopy.sort((a, b) => { return a.rank - b.rank })
    //     return setSorted(movieCopy)

    // }

    // const newest = () => {
    //     let movieCopy = movies.map(movie => ({ ...movie }))
    //     movieCopy.sort((a, b) => b.year - a.year)
    //     setSorted(movieCopy)
    // }


    // const searchFunction = () => {
    //     const foundMovie = movies.find((movie) => {
    //         return movie.title.toLowerCase() === search.toLowerCase()
    //     })
    //     if (foundMovie) {
    //         history.push(`/movie/${foundMovie.id}`)

    //     }
    // }



    // //-------------------------------------------------------------------------------------------------------------------


    // return (
    //     <>
    //         <article className="MovieModule">

    //             <ListNavBar />

    //             <section className="mainPage">

    //                 <div className="filterSearch">

    //                     <section className="categoryName">

    //                         <section className="titleSection">
    //                             <h2>Movies</h2>
    //                         </section>

    //                         <div className="listCategory">
    //                             <div><button className="filter" onClick={() => { topRated() }}>Rating</button></div>
    //                             <div><button className="filter" onClick={() => { newest() }}>Date</button></div>
    //                             <div><button className="filter">Genre</button></div>
    //                         </div>
    //                     </section>

    //                     <div className="searchContainer">

    //                         <input className="searchBar" onChange={(e) => {
    //                             const searchItem = e.target.value
    //                             setSearch(searchItem);
    //                         }} type="text" placeholder="search..."></input>
    //                         <button className="submit" type="submit" onClick={() => { searchFunction() }}>go</button>

    //                     </div>
    //                 </div>

    //                 <hr />
    //                 <div className="listList">
    //                     {
    //                         sorted.map((movie) => { return <div className="listObj" onClick={() => { history.push(`/movie/${movie.id}`) }}> <div className="listTitle">{movie.title}</div> <img src={movie.image}></img> </div> })
    //                     }
    //                 </div>

    //             </section >
    //         </article >
    //     </>

    // )
}
