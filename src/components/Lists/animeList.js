import React, { useEffect, useState } from "react"
import { getAnime, getAnimeInfo } from "../Fetch/anime"
import { ListNavBar } from "../NavBar/listNavBar"
import { useHistory } from "react-router-dom"


export const AnimeList = () => {
    const history = useHistory()

    // Use States
    //-------------------------------------------------------------------------------------------------------------------
    const [anime, setAnime] = useState([])
    const [sorted, setSorted] = useState([])
    const [search, setSearch] = useState('')

    // Use Effects
    //-------------------------------------------------------------------------------------------------------------------

    useEffect(
        () => {
            getAnimeInfo()
                .then((data) => {
                    setAnime(data)
                })
        },
        []
    )

    useEffect(
        () => {
            setSorted(anime)
        },
        [anime]
    )

    useEffect(
        () => {
            search === "" ? getAnimeInfo().then((data) => { setAnime(data) }) :
                setAnime(anime.filter((movie) => {
                    return movie.title.toLowerCase().includes(search.toLowerCase())
                }))

        },
        [search]
    )

    // Functions/Objects
    //-------------------------------------------------------------------------------------------------------------------

    const topRated = () => {
        let animeCopy = anime.map(movie => ({ ...movie }))
        animeCopy.sort((a, b) => { return a.imDbRating - b.imDbRating })
        return setSorted(animeCopy)

    }

    const newest = () => {
        let animeCopy = anime.map(movie => ({ ...movie }))
        animeCopy.sort((a, b) => { return b.year - a.year })
        setSorted(animeCopy)
    }


    const searchFunction = () => {
        const foundAnime = anime.find((anime) => {
            return anime.title === search
        })
        if (foundAnime) {
            history.push(`/anime/${foundAnime.id}`)

        }
    }
  

    const AnimeId = anime.map((show) => { return show.id })
    console.log(AnimeId)
    
    // const information = anime.map((show) => {
    //    return getInfo(show.id)
       
       
    // })



    // information.map((obj) => {
    //     postInfo(obj)
    // })


    //-------------------------------------------------------------------------------------------------------------------


    return (
        <>
            <article className="MovieModule">
                <ListNavBar />

                {/* <section className="listSideBar">

                    <h3 class="sideBarTop">Type</h3>
                    <div className="listType">
                        <Link to={`/movie`}>Movies</Link>
                        <Link to={`/series`}>Series</Link>
                        <Link to={`/anime`}>Anime</Link>
                        <Link to={`/book`}>Books</Link>
                        <hr></hr>
                    </div>

                    <h3 className="sideHeader">Category</h3>
                    <div className="listCategory">
                        <button className="filter" onClick={() => { topRated() }}>Rating</button>
                        <button className="filter" onClick={() => { newest() }}>Date</button>
                        <button className="filter">Genre</button>
                    </div>

                </section> */}

                <section className="mainPage">

                    <div className="filterSearch">

                        <section className="categoryName">
                            <section className="titleSection">
                                <h2>Anime</h2>
                            </section>

                            <div className="listCategory">
                                <div><button className="filter" onClick={() => { topRated() }}>Rating</button></div>
                                <div><button className="filter" onClick={() => { newest() }}>Date</button></div>
                                <div><button className="filter">Genre</button></div>
                            </div>
                        </section>

                        <div className="searchContainer">

                            <input className="searchBar" onChange={(e) => {
                                const searchItem = e.target.value
                                setSearch(searchItem);
                            }} type="text" placeholder="search..."></input>
                            <button className="submit" type="submit" onClick={() => { searchFunction() }}>go</button>

                        </div>
                    </div>
                    <hr />

                    <div className="listList">
                        {
                            sorted.map((anime) => { return <div className="listObj" onClick={() => { history.push(`/anime/${anime.id}`) }}> <div className="listTitle">{anime.title}</div> <img src={anime.image}></img> </div> })
                        }
                    </div>





                </section>
            </article>
        </>

    )
}
