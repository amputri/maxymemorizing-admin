import React from 'react';
import { useParams } from 'react-router-dom';
import Detail from './modules/Detail';
import Kategori from './modules/Kategori';
import Menu from './modules/Menu';
import Order from './modules/Order';
import Pelanggan from './modules/Pelanggan';
import User from './modules/User';

const Content = () => {
    const { isi } = useParams();

    let tampil;

    if (isi === 'kategori') {
        tampil = <Kategori />
    }
    if (isi === 'menu') {
        tampil = <Menu />
    }
    if (isi === 'pelanggan') {
        tampil = <Pelanggan />
    }
    if (isi === 'order') {
        tampil = <Order />
    }
    if (isi === 'detail') {
        tampil = <Detail />
    }
    if (isi === 'user') {
        tampil = <User />
    }

    return (
        <>
            {tampil}
        </>
    );
}

export default Content;
