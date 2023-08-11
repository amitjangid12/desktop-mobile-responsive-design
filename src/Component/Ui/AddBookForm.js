import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewBook } from "../../Redux/action";

const AddBookForm = () => {

    const [errors, setErrors] = useState("")
    const [state, setState] = useState({
        id: "",
        bookName: "",
        author: "",
        bookPercent: "",
        gener: "",
        description: "",
        photo: "",

    });

    const navigate = useNavigate();
    const { bookPercent, gener, bookName, author, description } = state

    const dispatch = useDispatch()

    const handleInputChange = (e) => {

        let { name, value } = e.target;
        setState({ ...state, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!bookPercent || !gener || !bookName || !author || !description) {
            setErrors("* Please fill value");
        } else {
            setErrors("");
            dispatch(addNewBook(state))
            navigate("/home")
        }
    }

    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setState((prevState) => ({
            ...prevState,
            photo: base64
        }))
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    return (
        <div className="add-book-form" >
            <div className="book-form">
                <div className="heading-add-book">
                    <h1>Add Book</h1>
                </div>
                <div className="form">
                    <form onSubmit={(e) => handleSubmit(e)}>

                        <div className="form-data">
                            <label className="form-field">
                                Book percent:
                            </label>
                            <input className="input" type="text" placeholder="56" name="bookPercent" value={bookPercent} onChange={(e) => handleInputChange(e)} />
                        </div>
                        <p className="show-error">{errors}</p>

                        <div className="form-data">
                            <label className="form-field">
                                Book Show:
                            </label>
                            <input className="input" type="text" placeholder="adventure" name="gener" value={gener} onChange={(e) => handleInputChange(e)} />
                        </div>
                        <p className="show-error">{errors}</p>

                        <div className="form-data">
                            <label className="form-field">
                                Book Name:
                            </label>
                            <input className="input" type="text" placeholder="The Tiger" name="bookName" value={bookName} onChange={(e) => handleInputChange(e)} />
                        </div>
                        <p className="show-error">{errors}</p>

                        <div className="form-data">
                            <label className="form-field">
                                Author:
                            </label>
                            <input className="input" type="text" placeholder="Ads Thomas" name="author" value={author} onChange={(e) => handleInputChange(e)} />
                        </div>
                        <p className="show-error">{errors}</p>
                        <div className="form-data">
                            <label className="form-field">
                                Photo:
                            </label>
                            <input className="file-upload input" type="file" name="photo" onChange={(e) => handleUploadImage(e)} />
                        </div>
                        <p className="show-error">{errors}</p>

                        <div className="form-data">
                            <label className="form-field">
                                Discription:
                            </label>
                            <textarea className="text-area input" placeholder="Discription" name="description" value={description} onChange={(e) => handleInputChange(e)} />
                        </div>
                        <p className="show-error">{errors}</p>

                        <div className="button-container">
                            <button type="submit" className="submit-button">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default AddBookForm;