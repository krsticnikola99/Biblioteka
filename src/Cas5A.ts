
import{from} from "rxjs";
import{distinct, filter,pairwise,scan} from "rxjs/operators";

const number$ = from([1,-4,5,-7,5,4]);


number$.pipe(
    filter(broj=> broj>0),
    //scan((acc,broj) => acc+broj)// vracamo acc+broj u acc i prenosimo acc u sledecu iteraciju
   // pairwise()//uparuje prethodnu i tenutnu emitovanu vrednost
   distinct()
).subscribe(x=>console.log(x));
