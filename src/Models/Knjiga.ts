import { Autor } from "./Autor";

export interface Knjiga{
    id:number;
    ime:string;
    opis:string;
    slika:string;
    ocena:number;
    zanr:string[];
    autori:number[];
    autoria:Autor[];
}