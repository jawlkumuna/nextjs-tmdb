import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Fragment } from "react";

export default async function MovieDetails({ params }: { params: { id: string } }) {

    console.log(params);
    const url = `https://api.themoviedb.org/3/movie/${params.id}?language=en-US`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`
        }
    };

    let movie: any = await fetch(url, options)
        .then(res => res.json())
        .catch(err => console.error('error:' + err));

    let cast: any = await fetch(`https://api.themoviedb.org/3/movie/${params.id}/credits?language=en-US`, options)
        .then(res => res.json())
        .catch(err => console.error('error:' + err));
    console.log(cast);

    return (
        <>
            <div className="flex flex-col md:flex-row">
                <Image
                    src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                    alt={movie.title}
                    className="rounded-lg m-4"
                    width={400 / 1.3}
                    height={600 / 1.3}
                />

                <div className="flex flex-col justify-start">
                    <h1 className="text-4xl">{movie.title}</h1>
                    <ul>
                        {movie.genres.map((genre: any) => (
                            <Badge key={genre.id} variant="outline">{genre.name}</Badge>
                        ))}
                    </ul>
                    <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}</span>
                    <p>{movie.overview}</p>

                </div>
            </div>
            <h2 className="text-xl">Cast</h2>
            <ul className="flex flex-row flex-wrap">
                {cast.cast.map((actor: any) => (
                    <li key={actor.id} className="w-64">
                        <Image
                            src={"https://image.tmdb.org/t/p/w500" + actor.profile_path}
                            alt={actor.name}
                            width={200 / 1.3}
                            height={300 / 1.3}
                            className="rounded-lg"
                        />
                        <p>{actor.name}</p>
                        <p>{actor.character}</p>
                    </li>
                ))}
            </ul>

        </>

    );
}