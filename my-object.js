/* Mendiela Jerome: Spider Monkey, just feed index.html to your firefox */
'use strict';

/* the object */
let myObject = {
	/* a "private" method to recursively search the array of parents */
	_searchObjectAndExecute: function(object, funcName, parameters) {
		/* look for funcName in object */
		for (let attr in object) {
			if (attr == funcName) {
				return object[attr].apply(null, parameters);
			}
		}
		/* loop over _parents */
		for (let i = 0; i < object._parents.length; i++) {
			/* recurse with the next object */
			if (object._parents[i].length !== 0) {
				return this._searchObjectAndExecute(object._parents[i], funcName, parameters);
			} else {
				return 0;
			}
		}
	},
	create: function(prototypeList) {
		let newObject = Object.create(this);
		newObject._parents = [];
		
		if (prototypeList === null || prototypeList.length === 0) {
			return newObject;
		} else {
			for (let i = 0; i < prototypeList.length; ++i) {
				newObject._parents[i] = prototypeList[i];
			}
			return newObject;
		}
	},
	call: function(funcName, parameters) {
		return this._searchObjectAndExecute(this, funcName, parameters);
	}
};

/* the test */
function runTestObject() {
	let divRun = document.getElementById('runningTest');

	divRun.innerHTML += 'creating object 0 1 2 and 3<br/>'; 
	/* Object 0 */
	let obj0 = myObject.create(null);
	obj0.func = function(arg) { return 'func0: ' + arg; };

	/* Object 1 */
	let obj1 = myObject.create([obj0]);

	/* Object 2 */
	let obj2 = myObject.create([]);
	obj2.func = function(arg) { return 'func2: ' + arg; };

	/* Object 3 */
	let obj3 = myObject.create([obj1, obj2]);

	divRun.innerHTML += 'calling obj3.func() with parameters [\'hello\']<br/>'; 
	let result = obj3.call('func', ['hello']);
	if (result === 'func0: hello') {
		divRun.innerHTML += 'result is func0: hello<br/>'; 
		console.log('part 1 done !');
		return 0;
	}
	return 1;
}
