const email = document.querySelector(".email");
const password = document.querySelector(".password");

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

const storeCredentials = () => {
	localStorage.setItem("login", "true");
	if (document.querySelector(".checkbox").checked) {
		let getEmail = localStorage.getItem("email");
		let getPassword = localStorage.getItem("password");
		if (getEmail === null) {
			localStorage.setItem("email", email.value);
		}
		if (getPassword === null) {
			localStorage.setItem("password", password.value);
		}
	}
};

const autoFill = () => {
	let getEmail = localStorage.getItem("email");
	let getPassword = localStorage.getItem("password");
	email.value = getEmail;
	password.value = getPassword;
};

const validateSignIn = () => {
	if (validateEmail() && validatePassword()) {
		storeCredentials();
		return true;
	}
	const invalidMessage = document.querySelector(".invalid-login");
	invalidMessage.classList.remove("hidden");
	return false;
};

email.addEventListener("keyup", validateEmail);
password.addEventListener("keyup", validatePassword);
autoFill();
