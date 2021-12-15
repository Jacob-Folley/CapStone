import {ListNavBar} from './NavBar/listNavBar'
import React from "react"
import { useHistory } from "react-router-dom"

export const HomePage = () => {
    const history = useHistory()

    return (
        <>

        <ListNavBar />
    
        <article className="homeCards">
            
            <section className="card-body" onClick={() => { history.push("/movie") }}>
                
            </section>
            
            <section className="card-body" onClick={() => { history.push("/series") }}>
                <h5 className="card-title">
                    
                </h5>
            </section>
    
            <section className="card-body" onClick={() => { history.push("/anime") }}>
                <h5 className="card-title">
                    
                </h5>
            </section>
    
            <section className="card-body" onClick={() => { history.push("/book") }}>
                <h5 className="card-title">
                    
                </h5>
            </section>     
    
        </article>
        </>
    )
}



