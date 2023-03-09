import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(null);
 let intervalId;

  async function fetchMoviesHandler() {
    setIsLoading(true);
    setIsError(null);
    try {
      const response = await fetch("https://swapi.dev/api/fils/");
      if (!response.ok) {
        
   intervalId= setInterval(()=>{
       fetch("https://swapi.dev/api/fils/")
    },5000);
    
        throw new Error('Something went Wrong, Retrying..');
       
      }
     
      const data = await response.json();

      

      const transformed = await data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        };

      })
      setMovies(transformed);


    }
    
    catch (error) {
    
      setIsError(error.message)
    }

    setIsLoading(false);
  }

  function removeHandler(){
   return ()=>clearInterval(intervalId);
  }

 



  let content=<p>Found no movies</p>

  if(movies.length > 0){
    content=<MoviesList movies={movies} />
  }
  if(error){
    content=<p>{error}</p>
  }
  if(isLoading){
    content=<p>Loading...</p>
  }
  return (
    <React.Fragment>
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
