import { from, fromEvent, Observable } from "rxjs";
import { debounceTime, map, sampleTime ,filter, switchMap,take} from "rxjs/operators";
import{Movie } from "./movie"

const API_URL=" http://localhost:3000";

interface MouseCoo{
    x:number;
    y:number;
}
function getMoviesObservableByTitle(title: string):Observable<Movie[]>{
    return from( fetch(`${API_URL}/movies/?title=${title}`).then((response) =>{
        if(response.ok)
        {
            console.log(response);
            return response.json();
        }
        else
        {
            throw new Error("Movie not found.");
        }

    }).catch((err)=> console.log(err)))
}

function logMouse(){
    fromEvent(document,"mousemove").pipe(
        sampleTime(500),
        map((ev:MouseEvent) => ({
            x: ev.screenX,
            y: ev.screenY
        }))
    ).subscribe((coo: MouseCoo) => console.log(coo));
}



function createMovieSearchBox(){
const input = document.createElement("input");
document.body.appendChild(input);

fromEvent(input,"input").pipe(
    debounceTime(500),
    map((ev:InputEvent) => (<HTMLInputElement>ev.target).value),
    filter(text=> text.length >= 3),
    switchMap(title => getMoviesObservableByTitle(title)),
    map(movies => movies[0])
) 
.subscribe((movie:Movie)=> showMovie(movie)); 
}

function showMovie(movie:Movie){
    if(!movie)
    return;
const movieContainer = document.createElement("div");
document.body.appendChild(movieContainer);
movieContainer.innerHTML = `id: ${movie.id} title: ${movie.title}, year: ${movie.year}, score: ${movie.score}`;

}

createMovieSearchBox();
//logMouse();