
function displayErr(what) {
	const div = document.querySelector('#errmessage');
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

function validate(validHelper) {
	const y = document.myform.year.value;
	const m = document.myform.month.value;
	const d = document.myform.day.value;
	if (y === "" || y != 2018) {
		validHelper("Invalid Year");
		return false;
	}
	else if (m === "" || (m < 1 || m > 12)) {
		validHelper("Invalid Month");
		return false;
	}
	else if (d === "" || (d < 1 || d > 31)) {
		validHelper("Invalid Day");
		return false;
	}
	else {
		return true;
	}
}

function main() {
    console.log('THE DOM IS RED E');
}
document.addEventListener('DOMContentLoaded', main);



