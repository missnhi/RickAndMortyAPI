import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import React, { useState, useEffect } from "react";

import SearchBar from "./components/Searchbar/searchbar.components";
import Card from './components/Card/card.components';
import Pagination from './components/Pagination/pagination.components.js';
import Filter from './components/Filter/filter.components.js';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/navbar.components.js';
import Episodes from './Pages/Episodes';
import Location from './Pages/Location';
import CardDetails from './components/Card/cardDetails.components';
function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:id" element={<CardDetails />} />

                <Route path="/episodes" element={<Episodes />} />
                <Route path="/episodes/:id" element={<CardDetails />} />

                <Route path="/location" element={<Location />} />
                <Route path="/location/:id" element={<CardDetails />} />
            </Routes>
        </Router>
    );
}


const Home = () => {
    let [fetchedData, updateFetchedData] = useState([]);
    let { info, results } = fetchedData;

    let [pageNumber, updatePageNumber] = useState(1);
    let [search, setSearch] = useState("");

    let [status, updateStatus] = useState("");
    let [gender, updateGender] = useState("");
    let [species, updateSpecies] = useState("");

    let api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${search}&status=${status}&gender=${gender}&species=${species}`;
    //when api change, reload the new data
    useEffect(() => {
        (async function () {
            let data = await fetch(api).then(res => res.json());
            updateFetchedData(data)
        }) ();
    }, [api]);

    return (
            <div className="App">
                <h1 className="text-center mb-3">Members of the Rick&Morty Multiverse</h1>
                <SearchBar setSearch={setSearch} updatePageNumber={updatePageNumber} />
                <div className="container">
                    <div className="row">
                        {/* Filter components */}
                        <Filter
                            pageNumber={pageNumber}
                            status={status}
                            updateStatus={updateStatus}
                            updateGender={updateGender}
                            updateSpecies={updateSpecies}
                            updatePageNumber={updatePageNumber}
                        />

                        <div className="col-lg-8 col-12">
                            <div className="row">
                                <Card page="/" results={results}/>
                            </div>
                        </div>
                    </div>
                </div>
                <Pagination
                    info={info}
                    pageNumber={pageNumber}
                    updatePageNumber={updatePageNumber}
                />
            </div>
    );
}

export default App;
