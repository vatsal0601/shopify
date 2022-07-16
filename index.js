const navSlide = () => {
	const burger = document.querySelector(".nav__burger");
	const line1 = document.querySelector(".line1");
	const line2 = document.querySelector(".line2");
	const line3 = document.querySelector(".line3");
	const navLinks = document.querySelector(".nav__links");

	burger.addEventListener("click", () => {
		navLinks.classList.toggle("transform");
		navLinks.classList.toggle("translate-x-0");
		line1.classList.toggle("transform");
		line1.classList.toggle("rotate-45");
		line1.classList.toggle("translate-y-1");
		line2.classList.toggle("hidden");
		line3.classList.toggle("transform");
		line3.classList.toggle("-rotate-45");
		line3.classList.toggle("-translate-y-1");
	});
};

const checkLogIn = () => {
	const loggedIn = document.querySelectorAll(".logged-in");
	const notLoggedIn = document.querySelectorAll(".not-logged-in");
	if (localStorage.getItem("login") === "true") {
		loggedIn.forEach((element) => {
			if (element.nodeName === "P") {
				element.innerHTML = "Hello, " + localStorage.getItem("name");
			}
			element.classList.remove("hidden");
		});
		notLoggedIn.forEach((element) => {
			element.classList.add("hidden");
		});
	}
};

const logout = () => {
	const loggedIn = document.querySelectorAll(".logged-in");
	const notLoggedIn = document.querySelectorAll(".not-logged-in");

	localStorage.setItem("login", "false");
	loggedIn.forEach((element) => {
		element.classList.add("hidden");
	});
	notLoggedIn.forEach((element) => {
		element.classList.remove("hidden");
	});
};

let cart = [];
const fetchData = async () => {
	try {
		let data = await fetch("https://fakestoreapi.com/products");
		data = await data.json();
		addProducts(data, "All");
		addCategories(data);
		selectCategory(data);
		selectProduct(data);
	} catch (err) {
		console.log(err);
		const error = document.querySelector(".error");
		const main = document.querySelector("main");
		main.classList.add("hidden");
		error.classList.remove("hidden");
	}
};

const productMarkup = (allProducts, id, category, title, image, price, description) => {
	return `
	<div class="bg-white p-3 space-y-5 shadow-lg rounded-md">
		<img src="${image}" alt="Image" class="max-h-80 mx-auto rounded-md" />
		${
			allProducts
				? `<p class="text-sm xl:text-base italic text-gray-500">Category: ${category}</p>`
				: ``
		}
		<div class="space-y-3">
			<h2 class="font-semibold text-lg xl:text-xl text-blue-700">${title}</h2>
			<div class="flex items-center justify-between">
				<p class="hidden">${id}</p>
				<p class="xl:text-lg text-gray-700">Price: $${price}</p>
				${
					isPresentInCart(id)
						? `<button
					class="bg-gray-200 hover:bg-gray-300 transition-colors flex items-center justify-center gap-1 focus:outline-none text-sm xl:text-base font-semibold 
					px-2 py-1 rounded-md product-button"
					>
					<img src="assets/Tick.svg" alt="cart" class="w-4 xl:w-5 h-4 xl:h-5" /> Added to cart!
					</button>`
						: `<button
					class="bg-gray-200 hover:bg-gray-300 transition-colors flex items-center justify-center gap-1 focus:outline-none text-sm xl:text-base font-semibold 
					px-2 py-1 rounded-md product-button"
					>
					<img src="assets/Cart.svg" alt="cart" class="w-4 xl:w-5 h-4 xl:h-5" /> Add to cart
					</button>`
				}
			</div>
			<p class="xl:text-lg text-gray-500">${description}</p>
		</div>
	</div>
	`;
};

const addProducts = (data, category) => {
	const contentMenu = document.querySelector(".products");
	contentMenu.innerHTML = "";
	if (category == "All") {
		for (i in data) {
			contentMenu.innerHTML += productMarkup(
				true,
				data[i].id,
				data[i].category,
				data[i].title,
				data[i].image,
				data[i].price,
				data[i].description
			);
		}
	}
	for (i in data) {
		if (data[i].category == category) {
			contentMenu.innerHTML += productMarkup(
				false,
				data[i].id,
				data[i].category,
				data[i].title,
				data[i].image,
				data[i].price,
				data[i].description
			);
		}
	}
};

const addCategories = (data) => {
	let categories = Array.from(data, (element) => element.category);
	categories = [...new Set(categories)];
	categories.splice(0, 0, "All");
	const categoryElement = document.querySelector(".categories");
	for (i in categories) {
		categoryElement.innerHTML += `
		<p class="bg-white xl:text-lg px-3 py-1 rounded-md shadow-lg transition-all cursor-pointer category">${categories[i]}</p>
		`;
	}
};

const removeSelectedCategory = () => {
	const categories = document.querySelectorAll(".category");
	categories.forEach((category) => {
		category.classList.remove("ring-2", "ring-blue-700", "font-semibold");
		category.classList.add("shadow-lg");
	});
};

const selectCategory = (data) => {
	const categories = document.querySelectorAll(".category");
	categories[0].classList.add("ring-2", "ring-blue-700", "font-semibold");
	categories[0].classList.remove("shadow-lg");
	categories.forEach((category) => {
		category.addEventListener("click", () => {
			removeSelectedCategory();
			addProducts(data, category.innerHTML);
			selectProduct(data);
			category.classList.add("ring-2", "ring-blue-700", "font-semibold");
			category.classList.remove("shadow-lg");
		});
	});
};

const isPresentInCart = (id) => {
	if (cart.includes(id)) return true;
	return false;
};

const selectProduct = (data) => {
	const products = document.querySelectorAll(".product-button");
	products.forEach((product) => {
		product.addEventListener("click", () => {
			if (localStorage.getItem("login") === "true") {
				product.innerHTML = `<img src="assets/Tick.svg" alt="cart" class="w-4 xl:w-5 h-4 xl:h-5" /> Added to cart!`;
				if (!isPresentInCart(+product.parentElement.children[0].innerHTML)) {
					cart.push(+product.parentElement.children[0].innerHTML);
					addToCart(data[+product.parentElement.children[0].innerHTML - 1]);
					updateQuantity();
					removeFromCart(data);
				}
			} else {
				alert("Please LogIn to add items to cart!");
			}
		});
	});
};

const addToCart = (product) => {
	const cartContainer = document.querySelector(".cart-container");
	cartContainer.innerHTML += `
	<div
		class="bg-white flex flex-col sm:flex-row items-start gap-3 sm:items-center sm:justify-between p-3 shadow-lg rounded-md cart"
	>
		<div class="flex items-center justify-center gap-3">
			<img
				src="${product.image}"
				alt="cart-image"
				class="max-h-20 xl:max-h-24 mx-auto rounded-md"
			/>
			<div>
				<h2 class="font-semibold text-lg xl:text-xl">${product.title}</h2>
				<p class="text-gray-500 xl:text-lg">$${product.price}</p>
			</div>
		</div>
		<div class="flex items-center justify-center gap-3">
			<p class="hidden">${product.id}</p>
			<label for="quantity" class="text-sm xl:text-base"
				>Quantity:
				<input
					type="number"
					name="quantity"
					value = 1
					class="border border-gray-300 p-1 ml-1 focus:outline-none rounded-md quantity"
			/></label>
			<button
				class="bg-red-600 hover:bg-red-700 text-white xl:text-lg font-semibold px-2 py-1 focus:outline-none rounded-md remove-button"
			>
				Remove
			</button>
		</div>
	</div>
	`;
	updateTotal();
};

const removeFromCart = (data) => {
	const removeButtons = document.querySelectorAll(".remove-button");
	removeButtons.forEach((removeButton) => {
		removeButton.addEventListener("click", () => {
			cart.splice(cart.indexOf(+removeButton.parentElement.children[0].innerHTML), 1);
			const categories = document.querySelectorAll(".category");
			categories.forEach((category) => {
				if (category.classList.contains("font-semibold")) {
					addProducts(data, category.innerHTML);
					selectProduct(data);
				}
			});
			removeButton.parentElement.parentElement.remove();
			updateTotal();
		});
	});
};

const updateTotal = () => {
	const total = document.querySelector(".total");
	let totalAmount = 0;

	const cartElements = document.querySelectorAll(".cart");
	cartElements.forEach((cartElement) => {
		let price = +cartElement.children[0].children[1].children[1].innerHTML.replace("$", "");
		let quantity = +cartElement.children[1].children[1].children[0].value;
		totalAmount += price * quantity;
	});
	total.innerHTML = "Total: $" + totalAmount.toFixed(2);
};

const updateQuantity = () => {
	const inputFields = document.querySelectorAll(".quantity");
	inputFields.forEach((inputField) => {
		inputField.addEventListener("change", () => {
			if (inputField.value <= 0) {
				inputField.value = 1;
			}
			updateTotal();
		});
	});
};

const placeOrder = () => {
	if (cart.length > 0) location.href = "./templates/place-order.html";
};

const app = async () => {
	await fetchData();
	navSlide();
	checkLogIn();
};

window.onload = app();
