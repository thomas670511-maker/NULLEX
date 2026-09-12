const username = document.getElementById("username");
const email = document.getElementById("email");

const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const passwordCount = document.getElementById("passwordCount");
const confirmCount = document.getElementById("confirmCount");

const passwordStatus = document.getElementById("passwordStatus");
const confirmStatus = document.getElementById("confirmStatus");

const characterPopup = document.getElementById("characterPopup");
const popupCharacter = document.getElementById("popupCharacter");

const confirmCharacter = document.getElementById("confirmCharacter");
const rejectCharacter = document.getElementById("rejectCharacter");

const errorPopup = document.getElementById("errorPopup");
const errorTitle = document.getElementById("errorTitle");
const errorMessage = document.getElementById("errorMessage");
const errorClose = document.getElementById("errorClose");

const showPassword = document.getElementById("showPassword");
const showConfirmPassword = document.getElementById("showConfirmPassword");

const colorButtons = document.querySelectorAll(".color-button");
const petals = document.querySelectorAll(".petal");

const selectedColorElement = document.getElementById("selectedColor");
const captchaStatus = document.getElementById("captchaStatus");

const signInButton = document.getElementById("signInButton");
const registerForm = document.getElementById("registerForm");

let passwordValue = "";
let confirmPasswordValue = "";

let pendingCharacter = "";
let pendingField = "";

let selectedColor = null;

let completedPetals = 0;

const MAX_PASSWORD_LENGTH = 20;

/* ==========================================
CHARACTER CONFIRMATION SYSTEM
========================================== */

password.addEventListener("beforeinput", function(event) {

if (
    event.inputType !== "insertText" &&
    event.inputType !== "insertCompositionText"
) {
    return;
}

event.preventDefault();

const character = event.data;

if (!character) {
    return;
}

if (passwordValue.length >= MAX_PASSWORD_LENGTH) {
    showError(
        "ENOUGH.",
        "You have already entered the maximum number of characters."
    );
    return;
}

pendingCharacter = character;
pendingField = "password";

popupCharacter.textContent = character;

characterPopup.style.display = "flex";

});

confirmPassword.addEventListener("beforeinput", function(event) {

if (
    event.inputType !== "insertText" &&
    event.inputType !== "insertCompositionText"
) {
    return;
}

event.preventDefault();

const character = event.data;

if (!character) {
    return;
}

if (confirmPasswordValue.length >= MAX_PASSWORD_LENGTH) {
    showError(
        "ENOUGH.",
        "Stop. The confirmation password is already long enough."
    );
    return;
}

pendingCharacter = character;
pendingField = "confirm";

popupCharacter.textContent = character;

characterPopup.style.display = "flex";

});

/* YES */

confirmCharacter.addEventListener("click", function() {

if (pendingField === "password") {

    passwordValue += pendingCharacter;

    password.value = "•".repeat(passwordValue.length);

    passwordCount.textContent = passwordValue.length;

    updatePasswordStatus();

}

if (pendingField === "confirm") {

    confirmPasswordValue += pendingCharacter;

    confirmPassword.value = "•".repeat(confirmPasswordValue.length);

    confirmCount.textContent = confirmPasswordValue.length;

    updateConfirmStatus();

}

pendingCharacter = "";
pendingField = "";

characterPopup.style.display = "none";

});

/* NO */

rejectCharacter.addEventListener("click", function() {

characterPopup.style.display = "none";

showError(
    "CHARACTER REJECTED.",
    "Excellent. You rejected your own character."
);

pendingCharacter = "";
pendingField = "";

});

/* ==========================================
PASSWORD BACKSPACE
========================================== */

password.addEventListener("keydown", function(event) {

if (event.key === "Backspace") {

    event.preventDefault();

    if (passwordValue.length > 0) {

        passwordValue =
            passwordValue.substring(
                0,
                passwordValue.length - 1
            );

        password.value = "•".repeat(passwordValue.length);

        passwordCount.textContent = passwordValue.length;

        updatePasswordStatus();

    }

}

});

confirmPassword.addEventListener("keydown", function(event) {

if (event.key === "Backspace") {

    event.preventDefault();

    if (confirmPasswordValue.length > 0) {

        confirmPasswordValue =
            confirmPasswordValue.substring(
                0,
                confirmPasswordValue.length - 1
            );

        confirmPassword.value =
            "•".repeat(confirmPasswordValue.length);

        confirmCount.textContent =
            confirmPasswordValue.length;

        updateConfirmStatus();

    }

}

});

/* ==========================================
PASSWORD STATUS
========================================== */

function updatePasswordStatus() {

if (passwordValue.length === 0) {

    passwordStatus.textContent =
        "WAITING FOR PASSWORD...";

    confirmPassword.disabled = true;

    return;
}

if (passwordValue.length < 10) {

    passwordStatus.textContent =
        "PASSWORD TOO SHORT. KEEP GOING.";

    confirmPassword.disabled = true;

    return;
}

passwordStatus.textContent =
    "10 CHARACTERS REACHED. FINALLY.";

confirmPassword.disabled = false;

updateConfirmStatus();

}

function updateConfirmStatus() {

if (confirmPasswordValue.length === 0) {

    confirmStatus.textContent =
        "NOW CONFIRM YOUR DECISION.";

    return;
}

if (confirmPasswordValue.length < 10) {

    confirmStatus.textContent =
        "KEEP CONFIRMING. THIS IS IMPORTANT.";

    return;
}

if (confirmPasswordValue !== passwordValue) {

    confirmStatus.textContent =
        "THE TWO PASSWORDS DO NOT AGREE.";

    return;
}

confirmStatus.textContent =
    "PASSWORD CONFIRMED. AGAINST ALL ODDS.";

}

/* ==========================================
SHOW PASSWORD
========================================== */

showPassword.addEventListener("click", function() {

if (passwordValue.length === 0) {
    return;
}

showError(
    "NICE TRY.",
    "We are not showing you that password yet."
);

});

showConfirmPassword.addEventListener("click", function() {

if (confirmPasswordValue.length === 0) {
    return;
}

showError(
    "WHY?",
    "You already know what you typed."
);

});

/* ==========================================
CAPTCHA COLORS
========================================== */

colorButtons.forEach(function(button) {

button.addEventListener("click", function() {

    colorButtons.forEach(function(item) {
        item.classList.remove("selected");
    });

    button.classList.add("selected");

    selectedColor = button.dataset.color;

    selectedColorElement.textContent =
        selectedColor;

});

});

/* ==========================================
PETAL CLICK
========================================== */

petals.forEach(function(petal) {

petal.addEventListener("click", function() {

    const requiredColor =
        petal.dataset.color;

    if (!selectedColor) {

        showError(
            "NO COLOR SELECTED.",
            "You need to select a color before touching the petal."
        );

        return;
    }

    if (petal.dataset.filled === "true") {

        showError(
            "ALREADY DONE.",
            "This petal has already suffered enough."
        );

        return;
    }

    if (selectedColor !== requiredColor) {

        showError(
            "WRONG COLOR.",
            "This petal requires " +
            requiredColor +
            ". You selected " +
            selectedColor +
            "."
        );

        return;
    }

    colorPetal(petal, selectedColor);

});

});

/* ==========================================
COLOR PETAL
========================================== */

function colorPetal(petal, color) {

petal.dataset.filled = "true";

petal.querySelector("span").textContent =
    "✓";

const colorMap = {

    RED: "#c93636",

    BLUE: "#356ca8",

    YELLOW: "#c5ad32",

    GREEN: "#3e9144",

    PURPLE: "#8148a1",

    ORANGE: "#c96c2c"

};

petal.style.background =
    colorMap[color];

petal.style.borderColor =
    colorMap[color];

completedPetals++;

captchaStatus.textContent =
    completedPetals +
    " / 6 PETALS COMPLETE";

selectedColor = null;

selectedColorElement.textContent =
    "NONE";

colorButtons.forEach(function(button) {
    button.classList.remove("selected");
});

if (completedPetals === 6) {

    captchaStatus.textContent =
        "CAPTCHA COMPLETE. HUMAN ENOUGH.";

    unlockSignIn();

}

}

/* ==========================================
UNLOCK SIGN IN
========================================== */

function unlockSignIn() {

if (
    passwordValue.length >= 10 &&
    confirmPasswordValue === passwordValue &&
    completedPetals === 6
) {

    signInButton.disabled = false;

    signInButton.textContent =
        "SIGN IN →";

}

}

/* ==========================================
USERNAME
========================================== */

username.addEventListener("input", function() {

const value = username.value.trim();

if (value.length < 3) {

    document.getElementById(
        "usernameStatus"
    ).textContent =
        "USERNAME TOO SHORT.";

    return;
}

document.getElementById(
    "usernameStatus"
).textContent =
    "USERNAME ACCEPTED. PROBABLY.";

});

/* ==========================================
EMAIL
========================================== */

email.addEventListener("input", function() {

if (!email.validity.valid) {

    email.style.borderColor = "#633";

} else {

    email.style.borderColor = "#292929";

}

});

/* ==========================================
FORM SUBMISSION
========================================== */

registerForm.addEventListener("submit", function(event) {

event.preventDefault();

if (username.value.trim().length < 3) {

    showError(
        "USERNAME INVALID.",
        "Your username needs at least 3 characters."
    );

    return;
}

if (!email.validity.valid) {

    showError(
        "EMAIL INVALID.",
        "Please enter an actual email address."
    );

    return;
}

if (passwordValue.length < 10) {

    showError(
        "PASSWORD TOO SHORT.",
        "The password needs at least 10 characters."
    );

    return;
}

if (confirmPasswordValue !== passwordValue) {

    showError(
        "PASSWORDS DO NOT MATCH.",
        "You managed to type two different passwords."
    );

    return;
}

if (completedPetals !== 6) {

    showError(
        "CAPTCHA INCOMPLETE.",
        "The flower is still judging you."
    );

    return;
}

signInButton.disabled = true;

signInButton.textContent =
    "PROCESSING...";

setTimeout(function() {

    showError(
        "REGISTRATION SUCCESSFUL.",
        "You have successfully convinced NULLEX that you are human."
    );

    setTimeout(function() {

        window.location.href =
            "login.html";

    }, 1800);

}, 1200);

});

/* ==========================================
ERROR POPUP
========================================== */

function showError(title, message) {

errorTitle.textContent = title;

errorMessage.textContent = message;

errorPopup.style.display = "flex";

}

errorClose.addEventListener("click", function() {

errorPopup.style.display = "none";

});

/* ==========================================
INITIAL STATE
========================================== */

confirmPassword.disabled = true;

signInButton.disabled = true;

captchaStatus.textContent =
"0 / 6 PETALS COMPLETE";

console.log(
"NULLEX registration protocol initialized."
);