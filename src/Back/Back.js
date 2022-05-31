import React from 'react'
import Footer from './layouts/Footer'
import Main from './layouts/Main'
import Nav from './layouts/Nav'
import Side from './layouts/Side'
import { Redirect } from 'react-router-dom'

const Back = () => {
    if (sessionStorage.getItem('token') === null) {
        return <Redirect to='/login' />
    }

    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <Nav />
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <Side />
                </div>
                <div className="col-8">
                    <Main />
                </div>
            </div>
            <div className="row">
                <div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default Back
