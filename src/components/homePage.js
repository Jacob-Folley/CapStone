import { MainNavBar } from './NavBar/mainNavBar'
import React from "react"
import { useHistory } from "react-router-dom"

export const HomePage = () => {
    const history = useHistory()

    return (
        <>

            <MainNavBar />

            <article className="homeCards">

                <section className="card-body" onClick={() => { history.push("/movie") }}>
                    <h1 className="card-title">Movies</h1>
                    <img src="https://cdn.shopify.com/s/files/1/1057/4964/products/The-Dark-Knight-Vintage-Movie-Poster-Original-1-Sheet-27x41_2c6e8b8f-b309-4db0-9ed6-bb7a837c88ea.jpg?v=1637384602"></img>
                </section>

                <section className="card-body" onClick={() => { history.push("/series") }}>
                    <h1 className="card-title">Series</h1>
                    <img src="https://m.media-amazon.com/images/I/81QDU13hAAL._AC_SL1200_.jpg"></img>
                </section>

                <section className="card-body" onClick={() => { history.push("/anime") }}>
                    <h1 className="card-title">Anime</h1>
                    <img src="https://www.limitedruns.com/media/images/productimage-picture-akira-9-649878.jpg"></img>
                </section>

                <section className="card-body" onClick={() => { history.push("/book") }}>
                    <h1 className="card-title">Books</h1>
                    <img src="https://getliterary.com/app/uploads/2018/07/The-Great-Gatsby-10.jpg"></img>
                </section>

            </article>
        </>
    )
}



