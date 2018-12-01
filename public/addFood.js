//funciton passed into check, used to add a new error to the DOM
function handleErr(what) {
	const div = document.querySelector('#foodErr');
	const notif = document.createElement('p');
	const a = document.createTextNode(what);
	notif.appendChild(a);
	if (div.getElementsByTagName('p').length > 0) {
		div.removeChild(div.getElementsByTagName("p")[0]);
	}
	div.appendChild(notif);
	
	div.classList.remove("handle");
	div.classList.add("alert");
}

//higher order function for discovering any errors in form submission
function check(validHelper) {
	const name = document.myform2.name.value;
	const time = document.myform2.time.value;
	const price = document.myform2.price.value;
	const cals = document.myform2.cals.value;
	if (name === '') {
		validHelper("Enter a Name!");
		console.log("Enter a Name!");
		return false;
	}
	else if (time < 0 || time > 23) {
		validHelper("Not a Valid Time!");
		console.log("Not a Valid Time!");
		return false;
	}
	else if (price < 0) {
		validHelper("Price can't be negative!");
		console.log("Price can't be negative!");
		return false;
	}
	else if (cals < 1) {
		validHelper("Everything has calories!");
		console.log("Everything has calories!");
		return false;
	}
	return true;

}


function main() {
    console.log('THE DOM IS RED E');
}
document.addEventListener('DOMContentLoaded', main);