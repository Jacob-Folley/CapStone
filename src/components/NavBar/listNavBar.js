import React from "react"
import { useHistory, Link } from "react-router-dom"

export const ListNavBar = () => {
    const history = useHistory()

    let darkMode = localStorage.getItem('darkMode')

    //check if dark mode is enabled
    //if enabled, turn it off
    //if enabled turn it onClick

    const enableDarkMode = () => {
        document.body.classList.add('darkmode');
        localStorage.setItem('darkMode', 'enabled')
    }

    const disableDarkMode = () => {
        document.body.classList.remove('darkmode');
        localStorage.setItem('darkMode', null)
    }

    if (darkMode === "enabled") {
        enableDarkMode();
    }



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

            <button className="dark-mode-toggle" onClick={() => { 
                darkMode = localStorage.getItem("darkMode");
                console.log(darkMode)
                if (darkMode !== 'enabled'){
                enableDarkMode();
            } else {
                disableDarkMode();
            }}}>
                dark
            </button>

                <button className="listprofileButton" onClick={() => { history.push("/profile") }}>
                    J
                </button>
            </section>

        </article>
    )
}