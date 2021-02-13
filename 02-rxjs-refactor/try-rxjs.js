const sampleData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const observable = rxjs.from(sampleData);
const subject = new rxjs.Subject();
const { filter, map, scan, tap } = rxjs.operators;

subject.pipe(
  filter(e => e % 2 === 1),
  map(e => e * e), 
  scan((acc, cur) => acc + cur, 0),
  tap(e => console.log('first', e))
).subscribe();

subject.pipe(
  filter(e => e % 2 === 0),
  map(e => e * e),
  scan((acc, cur) => acc + cur, 0),
  tap(e => console.log('second', e))
).subscribe();

observable.subscribe(subject);

const bSubject = new rxjs.BehaviorSubject();
const observable2 = bSubject.asObservable();
bSubject.next(1);

let someValue = 0;
setTimeout(() => {
  observable2.subscribe(value => someValue = value)
  console.log(someValue);
}, 1000)