import React, { useState } from "react";
import Unsplash, { toJson } from "unsplash-js";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";//to keep track of promise
import Loader from 'react-loader-spinner';  //spinner                   //whether promise is finished or not
import './loader.css';



const accessKey = "HMyw4t_FnVoPsYapnyyu2YNPy5J6wvbz9ITZ6wmePVo";
const unsplash = new Unsplash({
    accessKey: accessKey,
});

export default function SearchPhotos() {
    const { promiseInProgress } = usePromiseTracker();
    const [query, setQuery] = useState("");
    const [pics, setPics] = useState([]);

    const searchPhotos = async (e) => {
        e.preventDefault();

        // let response = await unsplash.search.photos(query);
        // let jsonValue = await response.json();
        // let picsArray = jsonValue.results;
        // setPics(picsArray);
        trackPromise(unsplash.search
            .photos(query, 1, 20)
            .then(toJson)
            .then((json) => {
                setPics(json.results)
            }));


    };
    if (promiseInProgress)
        return <div className="loader" >
            <Loader type="ThreeDots" color="white" height="100" width="100" />
        </div>
    else {
        return (
            <>
                <form className="form" onSubmit={searchPhotos}>
                    {" "}
                    <label className="label" htmlFor="query">
                        {" "}
                        📷
                    </label>
                    <input
                        type="text"
                        name="query"
                        className="input"
                        placeholder={`Try searching dog"`}
                        value={query}
                        onChange={
                            (e) => {
                                setQuery(e.target.value)

                            }
                        }
                    />
                    <button type="submit" className="button">
                        Search
                    </button>
                </form>

                <div className="card-list">
                    {pics.map((pic) => (

                        <img className="image"
                            key={pic.id}
                            alt={pic.alt_description}
                            src={pic.urls.full}

                        ></img>

                    ))}{" "}
                </div>
            </>
        );
    }
}