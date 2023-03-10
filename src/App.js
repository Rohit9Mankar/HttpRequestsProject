import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import MovieForm from './components/MovieForm';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(null);


  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setIsError(null);
    try {
      const response = await fetch("https://reacthttpsrequests-default-rtdb.firebaseio.com/movies.json");
      if (!response.ok) {

        throw new Error('Something went Wrong, Retrying..');

      }

      const data = await response.json();
      const loadedMovies = [];

      for (const key in data) {
        localStorage.setItem("newId", key);
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        });
      }

      setMovies(loadedMovies);


    }

    catch (error) {

      setIsError(error.message)
    }

    setIsLoading(false);
  }, []);



  function removeHandler() {
    const toBeDeletedId = localStorage.getItem("newId");

    console.log(toBeDeletedId)

    fetch(`https://reacthttpsrequests-default-rtdb.firebaseio.com/movies/${toBeDeletedId}.json`, {
      method: 'DELETE'
    }).then(() => console.log('Delete successful'));

    fetchMoviesHandler();
  }

  useEffect(() => {
    fetchMoviesHandler();
  }
    , [fetchMoviesHandler]);

  async function addMovieHandler(newFilm) {
    const response = await fetch('https://reacthttpsrequests-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(newFilm),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const dat = await response.json();
    console.log(dat);

  }



  let content = <p>Found no movies</p>

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />
  }
  if (error) {
    content = <p>{error}</p>
  }
  if (isLoading) {
    content = <p>Loading...</p>
  }
  return (
    <React.Fragment>
      <section>
        <MovieForm onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        <button onClick={removeHandler}>Delete</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}



export default App;
