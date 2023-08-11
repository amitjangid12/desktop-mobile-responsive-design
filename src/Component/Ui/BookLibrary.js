import React, { useEffect, useState } from 'react';
import { BsPlayCircle } from "react-icons/bs";
import { MdAddCircleOutline } from "react-icons/md";
import { CgDarkMode } from "react-icons/cg";
import { TbLayoutGrid } from "react-icons/tb";
import { IoMdList } from "react-icons/io";
import { addBook } from '../../Redux/action';
import { useDispatch, useSelector } from 'react-redux';
import GridView from './GridView';
import ListView from './ListView';
import ModalView from './ModalView';
import AddBookForm from './AddBookForm';
import { useNavigate } from 'react-router-dom';

function BookLibrary() {

    const [close, setClose] = useState(false);
    const currentData = useSelector((data) => data.addBookReducer);
    const [filtered, setFiltered] = useState([]);
    const [bookLibraryConfig, setBookLibraryConfig] = useState({
        theme: "light",
        view: "grid",
        searchValue: "",
        currentValue: "",
        form: false
    })

    const { theme, view, searchValue, currentValue, form } = bookLibraryConfig;
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const toggleTheme = () => {
        if (bookLibraryConfig.theme === "light") {
            setBookLibraryConfig({ ...bookLibraryConfig, theme: "dark" });
        }
        else {
            setBookLibraryConfig({ ...bookLibraryConfig, theme: "light" });
        }
    };
    let debounceTimeout;
    useEffect(() => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {

            dispatch(addBook());
        });
    }, [])

    return (
        <div className='desktop-mobile-view' >
            <div className={`library ${theme}`}>
                <div className='settings'>
                    <div className='library-heading'>
                        <h4>Library</h4>
                    </div>
                    <div className='library-settings dark-mode-my-books'>
                        <div className='setting-option-position'>
                            <div className='icons-play-add-theme'>
                                <span ><BsPlayCircle /></span>
                            </div>
                            <div className='book-add-mode'>
                                <span> My Books </span>
                            </div>
                        </div>
                        <div>
                            <span><span style={{position:'relative'}}>{currentData.length}</span></span>
                        </div>
                    </div>
                    <div className='library-settings'>
                        <button className='add-button' onClick={() => navigate("/addBook")}>
                            <div className='setting-option-position'>
                                <div className='add-icon'>
                                    <span ><MdAddCircleOutline /></span>
                                </div>
                                <div className='book-add'>
                                    <span >Add New Books</span>
                                </div>
                            </div>
                        </button>
                    </div>
                    <div className='library-settings'>
                        <h4>Settings</h4>
                    </div>
                    <div className='library-settings dark-mode-hover'>
                        <div className='setting-option-position'>
                            <div className='icons-play-add-theme'>
                                <span><CgDarkMode /></span>
                            </div>
                            <div className='book-add-mode'>
                                <span> Dark mode </span>
                            </div>
                        </div>
                        <div>
                            <span>
                                <label className="switch">
                                    <input type="checkbox" onClick={toggleTheme} />
                                    <span className="slider round"></span>
                                </label>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="show-heading-book">
                    <div className='dark-mode'>
                        <span className='dark-mode-mobile' onClick={toggleTheme}><CgDarkMode /></span>
                    </div>

                    <div className="show-heading-book-margin">
                        <div className="heading-container">
                            <h1 className="heading">Book Library <span className='heading-dot'>...</span></h1>
                            <span className="grid-view" onClick={() => setBookLibraryConfig({ ...bookLibraryConfig, view: "grid" })}><TbLayoutGrid /> </span>
                            <span className="list-view" onClick={() => setBookLibraryConfig({ ...bookLibraryConfig, view: "list" })}><IoMdList /></span>
                            {/* <span className="search-first"><BsSearch /></span> */}
                        </div>
                        <div>
                            {
                                view === "grid" ? (
                                    <GridView setBookLibraryConfig={setBookLibraryConfig} setClose={setClose} bookLibraryConfig={bookLibraryConfig}
                                        filtered={filtered} setFiltered={setFiltered} searchValue={searchValue} />
                                ) : (
                                    <ListView setBookLibraryConfig={setBookLibraryConfig}
                                        setClose={setClose} bookLibraryConfig={bookLibraryConfig} filtered={filtered} setFiltered={setFiltered} searchValue={searchValue} />
                                )
                            }
                            <div className='add-book-container'>
                                {
                                    form && <AddBookForm setBookLibraryConfig={setBookLibraryConfig} bookLibraryConfig={bookLibraryConfig} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='open-modal'>
                {close && <ModalView openModal={setClose} currentValue={currentValue} />}
            </div>
        </div>
    );
}

export default BookLibrary;