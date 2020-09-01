let tbody = document.querySelector('#table tbody');
let dataset = [];
document.querySelector('#exec').addEventListener('click', function() {
	// Initialize tbody inner
	tbody.innerHTML = '';
	let hor = parseInt(document.querySelector('#hor').value);
	let ver = parseInt(document.querySelector('#ver').value);
	let mine = parseInt(document.querySelector('#mine').value);
	console.log(hor, ver, mine);
	
	// Select mine location
	let candidateGroup = Array(hor * ver)
		.fill()
		.map(function (iElement, iIndex) {
			return iIndex;	// 0 ~ 99
		});
	
	// *Fisher–Yates Shuffle
	let shuffledGroup = [];
	while (candidateGroup.length > 80) {
		let shiftValue = candidateGroup.splice(Math.floor(Math.random() * candidateGroup.length), 1)[0];
		shuffledGroup.push(shiftValue);
	}
	console.log(shuffledGroup);
	
	// Make a mine table
	for (let i = 0; i < ver; i += 1) {
		let arr = [];
		let tr = document.createElement('tr');
		dataset.push(arr);

		for (let j = 0; j < hor; j += 1) {
			arr.push(1);
			let td = document.createElement('td');
			td.addEventListener('contextmenu', function (e) {
				e.preventDefault();
				let parentTr = e.currentTarget.parentNode;
				let parentTbody = e.currentTarget.parentNode.parentNode;
				let rightClickCol = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
				let rightClickRow = Array.prototype.indexOf.call(parentTbody.children, parentTr);
				
				if (e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X') {
					e.currentTarget.textContent = '!';
				} else if (e.currentTarget.textContent === '!') {
					e.currentTarget.textContent = '?';
				} else if (e.currentTarget.textContent === '?') {

					if (dataset[rightClickRow][rightClickCol] = '1') {
						e.currentTarget.textContent = '';
					} else if (e.currentTarget.textContent = 'X') {
						e.currentTarget.textContent = 'X';
					}
				}
			});

			// click event
			td.addEventListener('click', function (e) {
				let parentTr = e.currentTarget.parentNode;
				let parentTbody = e.currentTarget.parentNode.parentNode;
				let rightClickCol = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
				let rightClickRow = Array.prototype.indexOf.call(parentTbody.children, parentTr);
				if (dataset[rightClickRow][rightClickCol] === 'X') {
					e.currentTarget.textContent = '☠';		// https://www.w3schools.com/charsets/ref_utf_symbols.asp
				} else {
					let aroundGroup = [
						dataset[rightClickRow][rightClickCol - 1], dataset[rightClickRow][rightClickCol + 1],
					];

					if (dataset[rightClickRow - 1]) {
						aroundGroup = aroundGroup.concat(
							dataset[rightClickRow - 1][rightClickCol - 1], dataset[rightClickRow - 1][rightClickCol], dataset[rightClickRow - 1][rightClickCol + 1]);
					
						} else if (dataset[rightClickRow + 1]) {
						aroundGroup = aroundGroup.concat(
							dataset[rightClickRow + 1][rightClickCol - 1], dataset[rightClickRow + 1][rightClickCol], dataset[rightClickRow + 1][rightClickCol + 1]);
					}

					e.currentTarget.textContent = aroundGroup.filter(function(v) {
						return v === 'X';
					}).length;
				}
			}); 
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}

	// Locate a mine
	for (let k = 0; k < shuffledGroup.length; k++) {				// ex) 60
		let hor = Math.floor(shuffledGroup[k] / 10);					// ex) 6
		let ver = shuffledGroup[k] % 10;											// ex) 0
		tbody.children[hor].children[ver].textContent = 'X';
		dataset[hor][ver] = 'X';
	}
});