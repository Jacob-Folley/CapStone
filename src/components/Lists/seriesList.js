import React, { useEffect, useState } from "react"
import { getSeries } from "../Fetch/imdb"
import { ListNavBar } from "../NavBar/listNavBar"
import { useHistory, Link } from "react-router-dom"


export const SeriesList = () => {
    const history = useHistory()

    // Use States
    //-------------------------------------------------------------------------------------------------------------------
    const [series, setSeries] = useState([])
    const [sorted, setSorted] = useState([])
    const [search, setSearch] = useState('')

    // Use Effects
    //-------------------------------------------------------------------------------------------------------------------

    useEffect(
        () => {
            getSeries()
                .then((data) => {
                    setSeries(data)
                })
        },
        []
    )

    useEffect(
        () => {
            setSorted(series)
        },
        [series]
    )

    useEffect(
        () => {
            search === "" ? getSeries().then((data) => { setSeries(data) }) :
                setSeries(series.filter((show) => {
                    return show.title.toLowerCase().includes(search.toLowerCase())
                }))

        },
        [search]
    )

    // Functions/Objects
    //-------------------------------------------------------------------------------------------------------------------


    const topRated = () => {
        let seriesCopy = series.map(movie => ({ ...movie }))
        seriesCopy.sort((a, b) => { return a.rank - b.rank })
        return setSorted(seriesCopy)

    }

    const newest = () => {
        let seriesCopy = series.map(movie => ({ ...movie }))
        seriesCopy.sort((a, b) => b.year - a.year)
        setSorted(seriesCopy)
    }


    const searchFunction = () => {
        const foundSeries = series.find((series) => {
            return series.title === search
        })
        if (foundSeries) {
            history.push(`/series/${foundSeries.id}`)

        }
    }


    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }


    //-------------------------------------------------------------------------------------------------------------------


    return (
        <>
            <article className="MovieModule">

                <ListNavBar />

                <section className="mainPage">

                    <div className="filterSearch">

                        <section className="categoryName">

                            <section className="titleSection">
                                <h2>Series</h2>
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
                            sorted.map((series) => { return <div className="listObj" onClick={() => { history.push(`/series/${series.id}`) }}> <div className="listTitle">{series.title}</div> <img src={series.image}></img> </div> })
                        }
                    </div>

                </section>
            </article>
        </>

    )
}
