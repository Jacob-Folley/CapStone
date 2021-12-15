import React from "react"
import { useHistory, Link } from "react-router-dom"

export const ListNavBar = () => {
    const history = useHistory()

    return (
        <article className="listnavbar">

            <section className="listappLink" onClick={() => { history.push("/") }}>
                <h5 className="listappName">
                    App Name
                </h5>
            </section>

            <div className="navType">
                <div><Link to={`/movie`}>Movies</Link></div>
                <div><Link to={`/series`}>Series</Link></div>
                <div><Link to={`/anime`}>Anime</Link></div>
                <div><Link to={`/book`}>Books</Link></div>
            </div>

            <section className="listprofileLink">
                <button className="listprofileButton" onClick={() => { history.push("/profile") }}>
                    J
                </button>
            </section>

        </article>
    )
}