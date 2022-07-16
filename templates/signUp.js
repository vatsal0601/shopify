const Name = document.querySelector(".name");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const rePassword = document.querySelector(".re-password");

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

const validateEmail = () => {
	const emailError = document.querySelector(".email-error");
	const checkEmail = /^([a-z \d \. -]+)@([a-z \d -]+)\.([a-z]+)(\.[a-z]+)?$/;
	if (email.value.trim() == "") {
		emailError.innerHTML = "This field is required";
		return false;
	} else if (!checkEmail.test(email.value)) {
		emailError.innerHTML = "Please enter a valid email address";
		return false;
	}
	emailError.innerHTML = "";
	return true;
};

const validatePassword = () => {
	const passwordError = document.querySelector(".password-error");
	const checkPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
	if (password.value.trim() == "") {
		passwordError.innerHTML = "This field is required";
		return false;
	} else if (!checkPassword.test(password.value)) {
		passwordError.innerHTML = "Please enter correct password";
		return false;
	}
	passwordError.innerHTML = "";
	return true;
};

const validateRePassword = () => {
	const rePasswordError = document.querySelector(".re-password-error");
	if (rePassword.value.trim() == "") {
		rePasswordError.innerHTML = "This field is required";
		return false;
	} else if (rePassword.value !== password.value) {
		rePasswordError.innerHTML = "Password doesn't match";
		return false;
	}
	rePasswordError.innerHTML = "";
	return true;
};

const storeCredentials = () => {
	localStorage.setItem("login", "true");
	let getName = localStorage.getItem("name");
	let getEmail = localStorage.getItem("email");
	let getPassword = localStorage.getItem("password");
	if (getName === null) {
		localStorage.setItem("name", Name.value);
	}
	if (getEmail === null) {
		localStorage.setItem("email", email.value);
	}
	if (getPassword === null) {
		localStorage.setItem("password", password.value);
	}
};

const validateSignUp = () => {
	if (validateName() && validateEmail() && validatePassword() && validateRePassword()) {
		storeCredentials();
		return true;
	}
	return false;
};

Name.addEventListener("keyup", validateName);
email.addEventListener("keyup", validateEmail);
password.addEventListener("keyup", validatePassword);
rePassword.addEventListener("keyup", validateRePassword);
