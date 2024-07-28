import './comicsList.scss';

import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newLoading, setNewLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);



    const { loading, error, getAllComics } = useMarvelService();


    useEffect(() => {
        onRequest(offset, true);
    }, []);


    const onRequest = (offset, initial) => {
        initial ? setNewLoading(false) : setNewLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)

    };

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 9) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewLoading(newLoading => false);
        setOffset(offset => offset + 9);
        setComicsEnded(comicsEnded => ended);


    }

    function renderItem(arr) {
        const items = arr.map((item, i) => {
            return (
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img" />
                        <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item-price">9.99$</div>
                    </Link>
                </li>
            )
        })


        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItem(comicsList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newLoading ? <Spinner/> : null








    return (
        <div className="comics__list">

            {errorMessage}
            {spinner}
            {items}
            
            <button className = "button button__main button__long"
                    disabled = {newLoading}
                    style = {{'display' : comicsEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;