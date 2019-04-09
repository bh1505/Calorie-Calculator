//funciton passed into isCorrect, used to add a new error to the DOM
function displayErr(what) {
	const div = document.querySelector('#err');
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
function isCorrect(validHelper) {
	const cal = document.myform1.cal.value;
	const mon = document.myform1.mon.value;
	const date = document.myform1.date.value;
	const today = new Date();
	if (cal < 1000) {
		validHelper("You Should Be Eating More Than That!");
		console.log("You Should Be Eating More Than That!");
		return false;
	} else if (mon < 5) {
		validHelper("Treat Yourself $$$!");
		console.log("Treat Yourself $$$!");
		return false;
	} else {
		if (date[4] !== '-' || date[7] !== "-" || date.length !== 10) {
			validHelper("Wrong Date Format!");
			console.log("Wrong Date Format!");
			return false;
		}
		else if (date.slice(0, 4) != today.getFullYear()) {
			//for now only takes 2018 entries
			validHelper("We are in year " + today.getFullYear() + "!");
			console.log("We are in year " + today.getFullYear() + "!");
			return false;
		} 
		else if (date.slice(5, 7) < 1 || date.slice(5, 7) > 12) {
			validHelper("Not a Month!");
			console.log("Not a Month!");
			return false;
		}
		else if (date.slice(8) < 1 || date.slice(8) > 31) {
			validHelper("Not a Day!");
			console.log("Not a Day!");
			return false;
		}
		return true;
	}
}



function main() {
    console.log('THE DOM IS RED E');
}
document.addEventListener('DOMContentLoaded', main);