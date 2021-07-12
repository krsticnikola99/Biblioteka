import { combineLatest, interval,merge,zip } from "rxjs";
import { map, take } from "rxjs/operators";

const stream1 = interval(500).pipe(
    map(x=> `prvi: ${x}`),
    take(5)
);

const stream2 = interval(1500).pipe(
    map(x=> `drugi: ${x}`),
    take(5)
);
//Ceka da se oba toka zavrse i emituje zadnje vrednosti sa oba toka.
//forkJoin([stream1,stream2]).subscribe(x=> console.log(x));


//emituje sve vrednosti svih tokova kada svaki emituje po jednu vrednost
//zip(stream1,stream2).subscribe(x=> console.log(x)); 

//emituje sve vrednosti kad bilo koji od tokova emituje vrednost, na pocetak ceka da svaki tok emituje po jednu vrednost
//combineLatest(stream1,stream2).subscribe(x=> console.log(x)); 

// kao tunel kako dolaze spajaju se u jedan tok
merge(stream1,stream2).subscribe(x=> console.log(x)); 
