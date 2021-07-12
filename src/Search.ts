import { from, fromEvent, Observable ,merge, interval, Subject} from "rxjs";
import { debounceTime, map, sampleTime ,filter, switchMap,take, distinctUntilChanged, distinct, distinctUntilKeyChanged, takeUntil} from "rxjs/operators";
import { Knjiga } from "./Models/Knjiga";
import { Autor } from "./Models/Autor";
import { showKnjiga, showKnjigaCard } from "./Views/KnjigaView";
import { isModuleNamespaceObject } from "util/types";
import { KeyObject } from "crypto";

const API_URL=" http://localhost:3000";

let searchControlObserver = new Subject();

export function createSearch(doc:HTMLElement){
    const container = document.createElement("div");
    container.className = "classDropDown";
    
    const input = document.createElement("input");
    container.appendChild(input);
    input.className="classSearch";
    input.placeholder="Pretraga..";
    pokretniText(input);

    const listContainer = document.createElement("div");
    listContainer.className = "classDropDownContent";

    let proba:HTMLElement;
        searchResult(input).subscribe((knjige:Knjiga[])=>{    
            listContainer.innerHTML=""; 
            knjige.forEach((knjiga:Knjiga)=>{
                proba = document.createElement("a");
                showKnjigaCard(proba,knjiga);
                listContainer.appendChild(proba); 
            })                  
        })


    container.appendChild(listContainer);
    doc.appendChild(container);


    
  /*  fromEvent(input,"input").pipe(
        debounceTime(500),
        map((ev:InputEvent) => (<HTMLInputElement>ev.target).value),
        filter(text=> text.length >= 3),
        switchMap(title => getObservableByConstraint(title)),
        //switchMap(knjige => getKnjige(knjige))
       // map(knjige => getKnjige(knjige))
    ) 
    .subscribe((knjige:Knjiga[])=> {
        document.querySelector(".classDropDownContent").classList.toggle("show");
      //  knjige.forEach(knjiga=> {console.log(knjiga); showKnjiga(document.body, knjiga);} )
    }); */
    
}

function pokretniText(box:HTMLInputElement)
{
    interval(3000).pipe(
       
        map(el=> box.placeholder = ""),
        switchMap(e=> ispisiText("Pretraga..")),
        takeUntil(searchControlObserver)
    ).subscribe((el) => box.placeholder = box.placeholder+el)
    //ispisiText("Pretraga..").subscribe((el) => box.placeholder = box.placeholder+el)
}

function ispisiText(text:string):Observable<string>
{
   return interval(100).pipe(
        //takeUntil(searchControlObserver),
        take(text.length),
        map((id:number)=> text[id])
    )

}


function searchResult(searchBox:HTMLElement):Observable<Knjiga[]>
        {
        return  fromEvent(searchBox,"input").pipe(
                debounceTime(500),
                map((ev:InputEvent) => (<HTMLInputElement>ev.target).value),
                filter(text=> text.length >= 3),
                switchMap(title => getObservableByQuery(title)),

            )
        }

//function getObservableResult(text:string):Observable<Knjiga>{
   // return getObservableByQuery(text).pipe(
     //   switchMap((knjige:Knjiga[])=> from(knjige))
  //  );
//}

//function getObservableKnjiga(knjige:Knjiga[]):Observable<Knjiga>
//{
  //  return from(knjige);
//}


function getObservableByQuery(text: string):Observable<Knjiga[]>{
    return from( fetch(`${API_URL}/Knjige/?&q=${text}`).then((response) =>{
        if(response.ok)
        {
            console.log(response);
            return response.json();
        }
        else
        {
            throw new Error("Ne postoje knjige.");
        }

    }).catch((err)=> console.log(err)))
}

/*function getObservableByTitle(text: string):Observable<Knjiga[]>{
    return from( fetch(`${API_URL}/Knjige/?&ime_like=${text}`).then((response) =>{
        if(response.ok)
        {
            console.log(response);
            return response.json();
        }
        else
        {
            throw new Error("Ne postoje knjige.");
        }

    }).catch((err)=> console.log(err)))
}*/


export function checkMouseClick(){
    fromEvent(document,"click").pipe(
       map((ev:MouseEvent) => (<HTMLElement>ev.target)),
       map((el:HTMLElement) => el.className === "classSearch"),
       distinctUntilChanged()
    ).subscribe(visible=> setDropDownVisible(visible));
}

function setDropDownVisible(visible:boolean)
{
    const menu = document.querySelector(".classDropDownContent");
    const input = <HTMLInputElement>document.querySelector(".classSearch");
        if(visible!=menu.classList.contains('show'))
        menu.classList.toggle("show");

        if(visible == true)
        {
            searchControlObserver.next("kraj");
            searchControlObserver.complete();
            input.placeholder ="";
            console.log("nesto");
        }
        else
        {           
            searchControlObserver = new Subject();
            pokretniText(input);
            console.log("pokrenut");
        }
        

}




