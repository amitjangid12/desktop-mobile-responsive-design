import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";
import { useSelector } from "react-redux";

const ListView = (props) => {

    const currentData = useSelector((state) => state.addBookReducer);
    const { setClose, setBookLibraryConfig, bookLibraryConfig, filtered, setFiltered, searchValue } = props;
    const [serachEnable, setSearchEnable] = useState(false)
    const handleSearch = (e) => {
        setSearchEnable(true)
        const searchFieldValue = e.target.value || "";
        setBookLibraryConfig({ ...bookLibraryConfig, searchValue: searchFieldValue });

        const commonWord = currentData.data.filter((newValue) => newValue.bookName.toUpperCase().includes(searchFieldValue.toUpperCase()))
        setFiltered(commonWord)
    }

    return (
        <div>
            <div className='searh-container'>
                <span className="search-second"><BsSearch /></span>
                <input value={searchValue} type="text" className='search-bar' placeholder="Search a Book..." onChange={(e) => handleSearch(e)} />
                <span className='search-cross-icon'><RxCrossCircled onClick={() => setBookLibraryConfig({ ...bookLibraryConfig, searchValue: "" })} /></span>
            </div>
            <div>
                <div className='title-bar'>
                    <div className="book-list-view">Book Title & Author</div><div className="book-genre-list-view">Genre</div><div className="book-percent-list-view">Reading Progress
                    </div><div className="book-opened-list-view"><span>Last Opened </span></div>
                </div>
                {
                    filtered.length > 0 ? (
                        filtered && filtered.length > 0 && filtered.map((data) => {
                            return <div key={data.id}>

                                <div className='book-details-list-view'>
                                    <div className='book-list-view' onClick={() => {
                                        setBookLibraryConfig({
                                            ...bookLibraryConfig,
                                            currentValue: data,
                                        })
                                        setClose(true)
                                    }}>
                                        <img className='book-image-list-view' src={data.photo} alt='book img not show' />
                                        <div className='title-author-name' >
                                            <h3>{data.bookName}</h3>
                                            <span>{data.author}</span>
                                        </div>
                                    </div>
                                    <div className='book-genre-list-view'>
                                        <span >{data.bookGener}</span>
                                    </div>
                                    <div className='book-percent-list-view'>
                                        <span >{data.bookPercent}%</span>
                                    </div>
                                    <div className='book-opened-list-view'>
                                        <span >bookPercent</span>
                                    </div>
                                </div>
                            </div>
                        })
                    ) : (
                        serachEnable ? (!filtered.length && <p className="data-not-found"> {searchValue} Result not Found </p>) : (
                            currentData.data && currentData.data.length > 0 && currentData.data.map((data) => {
                                return <div key={data.id}>

                                    <div className='book-details-list-view'>
                                        <div className='book-list-view' onClick={() => {
                                            setBookLibraryConfig({
                                                ...bookLibraryConfig,
                                                currentValue: data
                                            })
                                            setClose(true)
                                        }}>
                                            <img className='book-image-list-view' src={data.photo} alt='book img not show' />
                                            <div className='title-author-name' >
                                                <h3>{data.bookName}</h3>
                                                <span>{data.author}</span>
                                            </div>
                                        </div>
                                        <div className='book-genre-list-view'>
                                            <span >{data.bookGener}</span>
                                        </div>
                                        <div className='book-percent-list-view'>
                                            <span >{data.bookPercent}%</span>
                                        </div>
                                        <div className='book-opened-list-view'>
                                            <span >bookPercent</span>
                                        </div>
                                    </div>
                                </div>
                            })
                        )
                    )
                }
            </div>
        </div>
    )
}

export default ListView;