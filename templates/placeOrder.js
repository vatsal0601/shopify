const Name = document.querySelector(".name");
const number = document.querySelector(".number");
const pin = document.querySelector(".pin");

const validateName = () => {
	const nameError = document.querySelector(".name-error");
	let checkName = /^[a-z\s]*$/i;

	if (Name.value.trim() == "") {
		nameError.innerHTML = "This field is required";
		return false;
	} else if (!checkName.test(Name.value)) {
		nameError.innerHTML = "Please enter a valid name";
		return false;
	}
	nameError.innerHTML = "";
	return true;
};

const validateNumber = () => {
	const numberError = document.querySelector(".number-error");
	const checkNumber = /^\d{10}$/;
	if (number.value.trim() == "") {
		numberError.innerHTML = "This field is required";
		return false;
	} else if (!checkNumber.test(number.value)) {
		numberError.innerHTML = "Please enter a valid number";
		return false;
	}
	numberError.innerHTML = "";
	return true;
};

const validatePin = () => {
	const pinError = document.querySelector(".pin-error");
	const checkPin = /^\d{6}$/;
	if (pin.value.trim() == "") {
		pinError.innerHTML = "This field is required";
		return false;
	} else if (!checkPin.test(pin.value)) {
		pinError.innerHTML = "Please enter a valid PIN";
		return false;
	}
	pinError.innerHTML = "";
	return true;
};

const validatePlaceOrder = () => {
	const successMessage = document.querySelector(".success");
	if (validateName() && validateNumber() && validatePin()) {
		successMessage.classList.remove("hidden");
		return true;
	}

	return false;
};

Name.addEventListener("keyup", validateName);
number.addEventListener("keyup", validateNumber);
pin.addEventListener("keyup", validatePin);
document.querySelector(".form").addEventListener("submit", (e) => e.preventDefault());
