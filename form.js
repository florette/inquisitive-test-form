// Selectors
const formElement = document.getElementById("form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const colourInput = document.getElementById("colour");
const animalBearInput = document.getElementById("bear");
const animalTigerInput = document.getElementById("tiger");
const animalSnakeInput = document.getElementById("snake");
const animalDonkeyInput = document.getElementById("donkey");
const typeTigerInput = document.getElementById("type_tiger");
const alertEmailMsg = document.getElementById("email-error");
const alertPasswordMsg = document.getElementById("password-error");
const alertColourMsg = document.getElementById("colour-error");
const alertAnimalMsg = document.getElementById("animal-error");
const alertTigerMsg = document.getElementById("tiger-error");
const successMsg = document.getElementById("success-message");
const submitBtn = document.getElementById("submit_btn");
const allCheckboxes = document.getElementsByClassName("checkbox");
const optionalField = document.getElementById("optional_field");

// State management
let tigerIsChecked = false;

// Form fields result
const account = {
  success: [false, false, false, false],
  email: "",
  password: "",
  colour: "",
  animal: [],
  tiger: "",
};

// Email validation
const checkEmail = (value) => {
  let valid = true;
  if (value.indexOf("@") == -1) {
    valid = false;
  } else {
    const parts = value.split("@");
    const domain = parts[1];
    if (domain.indexOf(".") == -1) {
      valid = false;
    } else {
      const domainParts = domain.split(".");
      const ext = domainParts[1];
      if (ext.length > 4 || ext.length < 2) {
        valid = false;
      }
    }
  }
  return valid;
};

// Password validation
const checkPassword = (value) => {
  let valid = true;
  if (value.length < 8) {
    valid = false;
  }
  return valid;
};

// Text field validation
const checkTextfield = (value) => {
  let valid = true;
  if (value === "") {
    valid = false;
  }
  return valid;
};

// Validation functions
const validateEmail = () => {
  let emailValue = emailInput.value;
  if (!checkEmail(emailValue) || emailValue === "") {
    alertEmailMsg.classList.remove("hidden");
    emailInput.focus();
  } else {
    alertEmailMsg.classList.add("hidden");
    account.success[0] = true; // Final validation before submitting
    account.email = emailValue;
  }
};

const validatePassword = () => {
  let passwordValue = passwordInput.value;
  if (!checkPassword(passwordValue)) {
    alertPasswordMsg.classList.remove("hidden");
    passwordInput.focus();
  } else {
    alertPasswordMsg.classList.add("hidden");
    account.success[1] = true; // Final validation before submitting
    account.password = passwordValue;
  }
};

const validateColour = () => {
  let colourValue = colourInput.value;
  if (!checkTextfield(colourValue)) {
    alertColourMsg.classList.remove("hidden");
    colourInput.focus();
  } else {
    alertColourMsg.classList.add("hidden");
    account.success[2] = true; // Final validation before submitting
    account.colour = colourValue;
  }
};

const validateAnimals = () => {
  let totalChecked = [];
  let animalChecked = [];
  for (let checkbox of allCheckboxes) {
    // Tiger action
    if (checkbox.name === "tiger" && checkbox.checked === true) {
      tigerIsChecked = true;
      optionalField.classList.remove("hidden");
    } else if (checkbox.name === "tiger" && checkbox.checked === false) {
      tigerIsChecked = false;
      optionalField.classList.add("hidden");
    }

    // Count the number of checkboxes checked
    if (checkbox.checked === true) {
      totalChecked.push(checkbox.checked);
      animalChecked.push(checkbox.name);
    }
  }
  if (totalChecked.length >= 2) {
    alertAnimalMsg.classList.add("hidden");
    account.success[3] = true; // Final validation before submitting
  } else {
    alertAnimalMsg.classList.remove("hidden");
  }
  account.animal = animalChecked;
};

const validateTiger = () => {
  if (tigerIsChecked) {
    let tigerValue = typeTigerInput.value;
    if (!checkTextfield(tigerValue)) {
      alertTigerMsg.classList.remove("hidden");
    } else {
      alertTigerMsg.classList.add("hidden");
      account.tiger = tigerValue;
    }
  }
};

// Inline validation
emailInput.addEventListener("focusout", () => validateEmail());
passwordInput.addEventListener("focusout", () => validatePassword());
colourInput.addEventListener("change", () => validateColour());
animalTigerInput.addEventListener("click", () => validateAnimals());
typeTigerInput.addEventListener("focusout", () => validateTiger());

// Form validation
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  validateEmail();
  validatePassword();
  validateColour();
  validateAnimals();
  validateTiger();

  const validAll = account.success.every(
    (currentValue) => currentValue === true
  );

  if (validAll) {
    successMsg.classList.remove("hidden");
    alert(
      `Details submitted: 
       Email: ${account.email}
       Password: ${account.password}
       Colour: ${account.colour}
       Animals selected: ${account.animal}
       ${tigerIsChecked ? "Type of tiger: " + account.tiger : ""}
       `
    );

    // Reset the form
    emailInput.value = "";
    passwordInput.value = "";
    colourInput.value = "";
    typeTigerInput.value = "";
    animalBearInput.checked = false;
    animalTigerInput.checked = false;
    animalSnakeInput.checked = false;
    animalDonkeyInput.checked = false;
    optionalField.classList.add("hidden");

    account.success = [false, false, false, false];
    account.email = "";
    account.password = "";
    account.colour = "";
    account.animal = [];
    account.tiger = "";
  }
});
