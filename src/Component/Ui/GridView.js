import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";
import { useSelector } from "react-redux";

const GridView = (props) => {

    const { setClose, setBookLibraryConfig, bookLibraryConfig, filtered, setFiltered, searchValue } = props;
    let debounceTimeout;
    const currentData = useSelector((data) => data.addBookReducer);
    console.log(currentData.data);
    const [serachEnable, setSearchEnable] = useState(false)
    const [showNotFound, setShowNotFound] = useState(false);

    const handleSearch = (e) => {
        const searchFieldValue = e.target.value || "";
        setBookLibraryConfig({ ...bookLibraryConfig, searchValue: searchFieldValue.trim() });
    }

    useEffect(() => {
        clearTimeout(debounceTimeout);
        if (searchValue !== "") {
            setSearchEnable(true);
            debounceTimeout = setTimeout(() => {
                const commonWord = currentData.data.filter((newValue) =>
                    newValue.bookName.toUpperCase().includes(searchValue.toUpperCase())
                );
                setFiltered(commonWord);
                setShowNotFound(commonWord.length === 0)
            }, 300);
        } else {
            setFiltered([]);
            setSearchEnable(false);
        }
    }, [searchValue]);

    return (
        <div>
            <div className='searh-container'>
                <span className="search-second"><BsSearch /></span>
                <input value={searchValue} type="text" className='search-bar' placeholder="Search a Book..." onChange={(e) => handleSearch(e)} />
                <span className='search-cross-icon'><RxCrossCircled
                    onClick={() => {
                        setFiltered([]);
                        setBookLibraryConfig({
                            ...bookLibraryConfig,
                            searchValue: ""
                        });
                    } 
                    } />
                </span>
            </div>
            <div className='show-book-grid-view'>
                {
                    filtered.length > 0 ? (
                        filtered && filtered.length > 0 && filtered.map((data) => {

                            return (
                                <div key={data.id} className='book-details-grid-view' onClick={() => {
                                    setBookLibraryConfig({
                                        ...bookLibraryConfig,
                                        currentValue: data,
                                    })
                                    setClose(true)
                                }}>
                                    <div className='book-grid-view '>
                                        <span className='book-percent-grid-view'>{data.bookPercent}%</span>
                                        <img className='book-image-grid-view' src={data.photo} alt='book img not show' />
                                        <span className='book-genre-grid-view'>{data.bookGener}</span>
                                    </div>
                                    <h3 className='book-name-author'>{data.bookName}</h3>
                                    <span className='book-name-author'>{data.author}</span>
                                </div>
                            )
                        })
                    ) : (
                        serachEnable && showNotFound ? (!filtered.length && <p className="data-not-found"> {searchValue} Result not Found </p>) : (
                            currentData.data && currentData.data.length > 0 && currentData.data.map((data) => {

                                return (

                                    <div key={data.id} className='book-details-grid-view' onClick={() => {
                                        setBookLibraryConfig({
                                            ...bookLibraryConfig,
                                            currentValue: data
                                        })
                                        setClose(true)
                                    }}>
                                        <div className='book-grid-view '>
                                            <span className='book-percent-grid-view'>{data.bookPercent}%</span>
                                            <img className='book-image-grid-view' src={data.photo} alt='book img not show' />
                                            <span className='book-genre-grid-view'>{data.bookGener}</span>
                                        </div>
                                        <h3 className='book-name-author'>{data.bookName}</h3>
                                        <span className='book-name-author'>{data.author}</span>
                                    </div>
                                )
                            })
                        )
                    )
                }

            </div>
        </div>

    )
}

export default GridView;