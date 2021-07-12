import { from, interval, merge, Observable, zip } from "rxjs";
import { switchMap, take } from "rxjs/operators";
import { Autor } from "./Models/Autor";
import { AutorKnjiga } from "./Models/AutorKnjiga";
import { Knjiga } from "./Models/Knjiga";
import { showAutor } from "./Views/AutorView";
import { showKnjigaCard } from "./Views/KnjigaView";
const API_URL=" http://localhost:3000";


 export function createSlideBar()
 {
   const container = document.createElement("div");
   container.className = "classSlideBar";
   document.body.appendChild(container);
   AutoriIKnjige().subscribe((autorknjiga:[Autor,Knjiga])=> {
     //  showAutor(container, autorknjiga[0]);
      // showKnjigaCard(container, autorknjiga[1]);
      showSlideBarElement(container, autorknjiga[0]);
      showSlideBarElement(container,autorknjiga[1]);
   })
}

function showSlideBarElement(context:HTMLElement,element: Autor| Knjiga)
{
    const container =  document.createElement("div");
    container.className="classSlideBarElementContainer";

    const img = document.createElement("img");
    img.src = element.slika;
    const text = document.createElement("span");

    container.appendChild(img);
    container.appendChild(text);

    let autor = element as Autor;
    if(autor.prezime)
    text.innerHTML = autor.ime +" " + autor.prezime;
    else
    text.innerHTML = element.ime;


    context.appendChild(container);


}

function AutoriIKnjige():Observable<[Autor, Knjiga]>
{
    return zip(getObservableAutori(),getObservableKnjige()).pipe(
        take(3)
    )
}


 function getObservableKnjige():Observable<Knjiga>{
    return from( fetch(`${API_URL}/Knjige/`).then((response) =>{
        if(response.ok)
        {
            console.log(response);
            return response.json();
        }
        else
        {
            throw new Error("Ne postoje knjige.");
        }

    }).catch((err)=> console.log(err))).pipe(
        switchMap((knjige:Knjiga[])=> from(knjige))
    )
}

function getObservableAutori():Observable<Autor>{
    return from( fetch(`${API_URL}/Autori/`).then((response) =>{
        if(response.ok)
        {
            console.log(response);
            return response.json();
        }
        else
        {
            throw new Error("Ne postoje autori.");
        }

    }).catch((err)=> console.log(err))).pipe(
        switchMap((autori:Autor[])=> from(autori))
    )
}