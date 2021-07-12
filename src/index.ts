import {showAutor} from"./Views/AutorView"
import { Autor } from"./Models/Autor"
import {createBookPrewiew, showKnjiga} from"./Views/KnjigaView"
import { Knjiga } from"./Models/Knjiga"
import{createSearch, checkMouseClick} from"./Search"
import * as EventEmitter from "events"

import { from, fromEvent, Observable, Subject } from "rxjs";
import { debounceTime, map, sampleTime ,filter, switchMap,take, defaultIfEmpty, distinctUntilChanged} from "rxjs/operators";
import { createSlideBar } from "./slideBar"

let autors:Autor[] = [
{id:5,ime:"Nikola",prezime:"Krstic",slika:"https://scontent.fbeg10-1.fna.fbcdn.net/v/t1.6435-9/187990642_3918755121505983_3448040167801239131_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=7JCLF1n77kAAX_RdnXB&_nc_oc=AQm2CgVQUg4o6H86JDyuXHD2aKcg8-pLFLKiUeGxY_08__z5p88pFU66tVCoxquI76s&_nc_ht=scontent.fbeg10-1.fna&oh=13d8d97fcf0e89322cc95d0ba148a9f0&oe=60E08654"},
 {id:5,ime:"Nikola",prezime:"Krstic",slika:"https://scontent.fbeg10-1.fna.fbcdn.net/v/t1.6435-9/187990642_3918755121505983_3448040167801239131_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=7JCLF1n77kAAX_RdnXB&_nc_oc=AQm2CgVQUg4o6H86JDyuXHD2aKcg8-pLFLKiUeGxY_08__z5p88pFU66tVCoxquI76s&_nc_ht=scontent.fbeg10-1.fna&oh=13d8d97fcf0e89322cc95d0ba148a9f0&oe=60E08654"},
 {id:5,ime:"Nikola",prezime:"Krstic",slika:"https://scontent.fbeg10-1.fna.fbcdn.net/v/t1.6435-9/187990642_3918755121505983_3448040167801239131_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=7JCLF1n77kAAX_RdnXB&_nc_oc=AQm2CgVQUg4o6H86JDyuXHD2aKcg8-pLFLKiUeGxY_08__z5p88pFU66tVCoxquI76s&_nc_ht=scontent.fbeg10-1.fna&oh=13d8d97fcf0e89322cc95d0ba148a9f0&oe=60E08654"},
 {id:5,ime:"Nikola",prezime:"Krstic",slika:"https://scontent.fbeg10-1.fna.fbcdn.net/v/t1.6435-9/187990642_3918755121505983_3448040167801239131_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=7JCLF1n77kAAX_RdnXB&_nc_oc=AQm2CgVQUg4o6H86JDyuXHD2aKcg8-pLFLKiUeGxY_08__z5p88pFU66tVCoxquI76s&_nc_ht=scontent.fbeg10-1.fna&oh=13d8d97fcf0e89322cc95d0ba148a9f0&oe=60E08654"}]


 function createHeader()
 {
    const header = document.createElement("div");
    header.className="classHeader";
    document.body.appendChild(header);
    createSearch(header);
 }



 createHeader();
 createSlideBar();
 checkMouseClick();
 createBookPrewiew();


