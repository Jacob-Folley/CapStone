import React, { useEffect, useState } from "react"
import { useHistory, Link } from "react-router-dom"

export const MainNavBar = () => {
    const history = useHistory()

    const [isOpen, setIsOpen] = useState(false);


    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const logout = () => {
        localStorage.clear()
        history.push("/mainReact")
    }

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

    const dark = () => {
        darkMode = localStorage.getItem("darkMode");
        console.log(darkMode)
        if (darkMode !== 'enabled') {
            enableDarkMode();
        }
    }

    const light = () => {
        darkMode = localStorage.getItem("darkMode");
        console.log(darkMode)
        if (darkMode == 'enabled') {
            disableDarkMode();
        }
    }

    const Popup = props => {
        return (
            <div className="popup-box">
                <div className="box">
                    <span className="close-icon" onClick={props.handleClose}></span>
                    {props.content}
                </div>
            </div>
        );
    };


    return (
        <article className="listnavbar">

            <section className="listappLink" onClick={() => { history.push("/") }}>
                <h5 className="listappName">
                    Tsundoku
                </h5>
            </section>

            



            <section className="listprofileLink">

                <input
                    className="react-switch-checkbox"
                    id={`react-switch-new`}
                    type="checkbox"
                    onClick={() => {
                        darkMode = localStorage.getItem("darkMode");
                        console.log(darkMode)
                        if (darkMode !== 'enabled') {
                            enableDarkMode();
                        } else {
                            disableDarkMode();
                        }
                    }}
                />
                <label
                    className="react-switch-label"
                    htmlFor={`react-switch-new`}
                >
                    <span className={`react-switch-button`} />
                </label>

                <button className="listprofileButton" onClick={() => { togglePopup() }}>
                    J
                </button>
                {isOpen && <Popup
                    content={<>
                        <p onClick={() => { history.push("/profile") }}>Profile</p>
                        <p onClick={() => { logout() }}>LogOut</p>
                    </>}
                    handleClose={togglePopup}
                />}
            </section>

        </article>
    )
}