import React from 'react';
import Footer from './layouts/Footer';
import Main from './layouts/Main';
import Nav from './layouts/Nav';
import Side from './layouts/Side';

const Front = () => {
    return (
        <div>
            <div className="row">
                <div>
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
    );
}

export default Front;
