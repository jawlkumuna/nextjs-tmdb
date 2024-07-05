import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

export default async function Home() {
  const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200';
  const posterUrl = 'https://image.tmdb.org/t/p/w500';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`
    }
  };

  let movies = await fetch(url, options)
    .then(res => res.json())
    .catch(err => console.error('error:' + err));

  const listItems = (movies.results ?? []).map((movie: any) => (
    // <div className="flex-2 flex flex-col max-w-screen-lg" key={movie.id}>
    //   <Image
    //     className="rounded-lg mx-auto"
    //     src={posterUrl + movie.poster_path}
    //     alt={movie.title}
    //     width={200}
    //     height={300}
    //   />

    // <Link href={`/movies/${movie.id}`} className="text-xl max-w-lg">{movie.title} </Link>
    // <p className="text-center">{movie.release_date.split('-')[0]}</p>
    // {/* <p>{movie.overview}</p> */}

    // </div >
    <div key={movie.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <Image
          className="rounded-lg mx-auto"
          src={posterUrl + movie.poster_path}
          alt={movie.title}
          width={200}
          height={300}
        />
      </a>
      <div className="p-5">
        <Link href={`/movies/${movie.id}`} className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{movie.title} </Link>
        <p className="text-slate-500">{movie.release_date.split('-')[0]}</p>
      </div>
    </div>
  ));


  return (
    <>
      <h1 className="text-4xl">Movies</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-2 align-items-center">
        {listItems}
      </ul>
    </>
  );


};
