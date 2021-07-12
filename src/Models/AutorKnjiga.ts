import { Autor } from "./Autor";

export interface AutorKnjiga{
    id:number;//duplo
    ime:string;//duplo
    prezime:string;
    slika:string;//duplo
    opis:string;
    ocena:number;
    zanr:string[];
    autori:number[];
    autoria:Autor[];
}