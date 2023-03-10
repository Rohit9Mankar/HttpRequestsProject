import React from "react";
import classes from './MoviesList.module.css';
const MovieForm = (props) => {


    const submitFormHandler =(event) => {
        event.preventDefault();
        const movietitle = document.getElementById("form_title").value;
        const movieopeningText = document.getElementById("form_opening").value;
        const moviereleaseDate = document.getElementById("form_Date").value;

        const newMovie = {
            title: movietitle,
            openingText: movieopeningText,
            releaseDate: moviereleaseDate

        }
        props.onAddMovie(newMovie);
    };

   

    return (
        <form onSubmit={submitFormHandler}>
            <div className={classes.form} >
                <div className={classes.contain}>
                    <label>Title</label>
                    <input type="text" id="form_title" ></input>
                </div>

                <div className={classes.contain}>
                    <label>Opening Text</label>
                    <input type="text" id="form_opening"></input>
                </div>

                <div className={classes.contain}>
                    <label>Release Date</label>
                    <input type="date" id="form_Date"></input>
                </div>

                <div>
                    <button type="submit">Add Movies</button>
                </div>
            </div>

        </form>
    )
}
export default MovieForm;