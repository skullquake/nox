// coroutine.js
function yielder(x) {
var yield = Duktape.Thread.yield;
	console.log('yielder starting');
	console.log('yielder arg:', x);
	console.log('resumed with', yield(1));
	console.log('resumed with', yield(2));
	console.log('resumed with', yield(3));
	console.log('yielder ending');
	return 123;
}

var t = new Duktape.Thread(yielder);

console.log('resume test');
console.log('yielded with', Duktape.Thread.resume(t, 'foo'));
console.log('yielded with', Duktape.Thread.resume(t, 'bar'));
console.log('yielded with', Duktape.Thread.resume(t, 'quux'));
console.log('yielded with', Duktape.Thread.resume(t, 'baz'));
console.log('finished');
