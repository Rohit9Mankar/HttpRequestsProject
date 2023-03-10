import React, { useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import MovieForm from './components/MovieForm';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(null);

  let intervalId;
  async function fetchMoviesHandler() {
    setIsLoading(true);
    setIsError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {

        //intervalId= setInterval(()=>{
        //    fetch("https://swapi.dev/api/fils/")
        // },5000);

        throw new Error('Something went Wrong, Retrying..');

      }

      const data = await response.json();



      const transformed = await data.results.map((movieData) => {
        localStorage.setItem("movieId", movieData.episode_id)
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        };

      })
      // fetch('https://crudcrud.com/api/40d913e1a287437cb224f4e880b74337',
      // {
      //   method: 'POST',
      //   body:response
      // })

      setMovies(transformed);


    }

    catch (error) {

      setIsError(error.message)
    }

    setIsLoading(false);
  }

  function removeHandler() {
    return () => clearInterval(intervalId);
  }

  useEffect(() => {
    fetch("https://swapi.dev/api/films/")
      .then(response => {
        return response.json()
      })
      .then((data) => {
        const transformedMovies =  data.results.map((movieData) => {
          //localStorage.setItem("movieId", movieData.episode_id)
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date
          };
          
        })
        setMovies(transformedMovies);
      })
      
  }, []);





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
        <MovieForm/>
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        <button onClick={removeHandler}>Cancel</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}



export default App;
