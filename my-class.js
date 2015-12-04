/* Mendiela Jerome: Spider Monkey, just feed index.html to your firefox */
'use strict';

/* the class */
function createClass(className, superClassList) {
	let newClass = Object.create(null);
	newClass._superClasses = [];
	newClass.className = className;

	newClass._searchAndExecute = function(currentClass, funcName, parameters) {
		for (let attr in currentClass) {
			if (attr == funcName) {
				return currentClass[attr].apply(null, parameters);
			}
		}
		/* loop over _parents */
		for (let i = 0; i < currentClass._superClasses.length; i++) {
			/* recurse with the next object */
			if (currentClass._superClasses[i].length !== 0) {
				return this._searchAndExecute(currentClass._superClasses[i], funcName, parameters);
			} else {
				return 0;
			}
		}
	};
	newClass.new = function() {
		return Object.create(this);
	};
	newClass.call = function(funcName, parameters) {
		return this._searchAndExecute(this, funcName, parameters);
	};
	
	if (superClassList === null || superClassList.length === 0) {
		return newClass;
	} else {
		for (let i = 0; i < superClassList.length; i++) {
			newClass._superClasses[i] = superClassList[i];
		}
		return newClass;
	}
}

/* the test */
function runTestClass() {
	let divRun = document.getElementById('runningTest');
	
	divRun.innerHTML += 'Creating class0, 1, 2 and 3<br/>'
	let class0 = createClass('Class0', null);
	class0.func = function(arg) { return "func0: " + arg; };
	
	let class1 = createClass("Class1", [class0]);

	let class2 = createClass("Class2", []);
	class2.func = function(arg) { return "func2: " + arg; };

	let class3 = createClass("Class3", [class1, class2]);

	divRun.innerHTML += 'creating obj3<br/>'
	let obj3 = class3.new();

	divRun.innerHTML += 'calling obj3.func() with parameter [\'hello\']<br/>'
	let result = obj3.call('func', ['hello']);
	if (result === 'func0: hello') {
		divRun.innerHTML += 'result is func0: hello';
		console.log('part 2 done !');
		return 0;
	}
	return 1;
}
