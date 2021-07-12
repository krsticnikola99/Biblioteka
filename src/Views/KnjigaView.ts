import { from, fromEvent, Observable, Subject ,merge} from "rxjs";
import { filter, map, scan, switchMap, switchScan, take, takeUntil } from "rxjs/operators";
import { Autor } from "../Models/Autor";
import{Knjiga} from"../Models/Knjiga"
import { checkMouseClick } from "../Search";
import { showAutor } from "./AutorView";
const API_URL=" http://localhost:3000";

let previewSubject:Subject<Knjiga>;

export function showKnjiga(doc:HTMLElement,knjiga:Knjiga)
{
    const container = document.createElement("div");
    container.className="classKnjiga";

    const container1 = document.createElement("div");
    container1.className = "top";
    const container2 = document.createElement("div");
    container2.className = "down";

    container.appendChild(container1);
    container.appendChild(container2);

    const img = document.createElement("img");
    img.src = knjiga.slika;
    container1.appendChild(img);

    const topright = document.createElement("div");
    topright.className="topright";
    container1.appendChild(topright);

    let text = document.createElement("span");
    text.innerHTML = knjiga.ime;
    text.className="title";
    topright.appendChild(text);

    text = document.createElement("span");
    text.innerHTML = `Opis: <br />${knjiga.opis}`;
    text.className="description";
    topright.appendChild(text);

   text = document.createElement("span");
    text.innerHTML = `Zanr: <br />${knjiga.zanr.join(", ")}`;
    text.className="genre";
    topright.appendChild(text);

    
      knjiga.autoria = [];
         getAutors(knjiga.autori).subscribe((autori:Autor[])=>{
            autori.forEach((autor:Autor)=> {
               knjiga.autoria.push(autor);
               showAutor(container2,autor);
            })
         
      });

   
  

    doc.appendChild(container);


}

export function showKnjigaCard(doc:HTMLElement,knjiga:Knjiga)
{
   const container = document.createElement("div");
   container.className = "classKnjigaCard";
   
   const img = document.createElement("img");
   img.src = knjiga.slika;
   container.appendChild(img);

   let text = document.createElement("span");
   text.className = "title";
   text.innerHTML= `${knjiga.ime}`;
   container.appendChild(text);

   const rate = document.createElement("p");
   rate.className = "classRate";
   rate.innerHTML= `★ ${knjiga.ocena}`;
   text.appendChild(rate);

   text = document.createElement("span");
   text.className="description";
   text.innerHTML= `${knjiga.opis.substring(0,150)}...`;
   container.appendChild(text);  
   doc.appendChild(container);

   checkMouseClickOnCard(container)
   .subscribe((el:HTMLElement)=>{
      if(previewSubject)
      previewSubject.next(knjiga);
   })

}

function checkMouseClickOnCard(area:HTMLElement):Observable<HTMLElement>{
   return fromEvent(area,"click").pipe(
      map((ev:MouseEvent) => (<HTMLElement>ev.target)),
      map((el:HTMLElement) => el.parentElement)
   );
}


export function createBookPrewiew(){

   previewSubject = new Subject();
   const container = document.createElement("div");
   container.className = "classPreviewBook";
   document.body.appendChild(container);

   previewSubject.subscribe((knjiga:Knjiga)=>{
      container.innerHTML ="";
      showKnjiga(container,knjiga);
   })
 }

  function getAutors(autorIds: number[]):Observable<Autor[]>
 {
    const autoriPromise:Promise<Autor>[] = [];
   autorIds.forEach((id:number)=> { 
      autoriPromise.push(getAutorById(id));
   })
   const autori =  Promise.all(autoriPromise);
   return from(autori);
 }

   async function getAutorById(id:number):Promise<Autor>{
   return fetch(`${API_URL}/Autori/${id}`).then((response)=> {
       if(response.ok)
       {
         return response.json();
       }
       else
       {
         throw new Error("Ne postoji autor.");
       }
    })
}

/*async function setAutors(el:HTMLElement,knjiga:Knjiga)
{
  knjiga.autoria = [];
  knjiga.autori.forEach(autorid => {

     fetch(`${API_URL}/Autori/${autorid}`).then((response)=>{
        if(response.ok)
        {
             response.json().then(e=> {    
                knjiga.autoria.push(e);
                showAutor(el,e);
             });             
        }      
    })
  });

}*/
