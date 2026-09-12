document.addEventListener("DOMContentLoaded", () => {

const loginForm =
    document.getElementById("loginForm");

const loginButton =
    document.getElementById("loginButton");

const loginIdentifier =
    document.getElementById("loginIdentifier");

const loginPassword =
    document.getElementById("loginPassword");

const showLoginPassword =
    document.getElementById("showLoginPassword");

const loginStatus =
    document.getElementById("loginStatus");

const loginPopup =
    document.getElementById("loginPopup");

const popupTitle =
    document.getElementById("popupTitle");

const popupMessage =
    document.getElementById("popupMessage");

const popupClose =
    document.getElementById("popupClose");


/* =====================================
   CHECK REQUIRED ELEMENTS
===================================== */

if (!loginForm ||
    !loginButton ||
    !loginPopup ||
    !popupTitle ||
    !popupMessage ||
    !popupClose) {

    console.error(
        "NULLEX LOGIN: Required HTML element missing."
    );

    return;
}


/* =====================================
   LOGIN BUTTON ESCAPE SYSTEM
===================================== */

let escapeCount = 0;

const maximumEscapes = 5;

let buttonUnlocked = false;


function moveLoginButton() {

    if (buttonUnlocked) {
        return;
    }


    escapeCount++;


    const buttonWidth =
        loginButton.offsetWidth;

    const buttonHeight =
        loginButton.offsetHeight;


    const maxX =
        Math.max(
            20,
            window.innerWidth -
            buttonWidth -
            40
        );

    const maxY =
        Math.max(
            20,
            window.innerHeight -
            buttonHeight -
            40
        );


    const randomX =
        Math.floor(
            Math.random() * maxX
        );

    const randomY =
        Math.floor(
            Math.random() * maxY
        );


    loginButton.style.position =
        "fixed";

    loginButton.style.left =
        randomX + "px";

    loginButton.style.top =
        randomY + "px";

    loginButton.style.zIndex =
        "9999";


    if (
        escapeCount >=
        maximumEscapes
    ) {

        unlockLoginButton();

    } else {

        loginStatus.textContent =
            "LOGIN BUTTON ESCAPED " +
            escapeCount +
            "/5 TIMES.";

    }

}


/* =====================================
   UNLOCK LOGIN BUTTON
===================================== */

function unlockLoginButton() {

    buttonUnlocked = true;


    loginButton.style.position =
        "relative";

    loginButton.style.left =
        "";

    loginButton.style.top =
        "";

    loginButton.style.zIndex =
        "";


    loginButton.textContent =
        "LOGIN →";


    loginButton.disabled =
        false;


    loginStatus.textContent =
        "FINE. YOU MAY CLICK IT NOW.";


    loginButton.classList.add(
        "login-ready"
    );

}


/* =====================================
   MOUSE ESCAPE
===================================== */

loginButton.addEventListener(
    "mouseenter",
    () => {

        if (!buttonUnlocked) {

            moveLoginButton();

        }

    }
);


/* =====================================
   MOBILE ESCAPE
===================================== */

loginButton.addEventListener(
    "touchstart",
    (event) => {

        if (!buttonUnlocked) {

            event.preventDefault();

            moveLoginButton();

        }

    },
    {
        passive: false
    }
);


/* =====================================
   SHOW POPUP
===================================== */

function showPopup(
    title,
    message,
    buttonText
) {

    popupTitle.textContent =
        title;

    popupMessage.textContent =
        message;

    popupClose.textContent =
        buttonText;


    /*
     * Make sure popup is visible.
     */

    loginPopup.style.display =
        "flex";

    loginPopup.style.visibility =
        "visible";

    loginPopup.style.opacity =
        "1";


    loginPopup.classList.add(
        "show"
    );

}


/* =====================================
   HIDE POPUP
===================================== */

function hidePopup() {

    loginPopup.classList.remove(
        "show"
    );

    loginPopup.style.display =
        "";

    loginPopup.style.visibility =
        "";

    loginPopup.style.opacity =
        "";

}


/* =====================================
   SHOW PASSWORD BUTTON
===================================== */

if (showLoginPassword) {

    showLoginPassword.addEventListener(
        "click",
        () => {

            showPopup(
                "NICE TRY.",
                "WHY WOULD WE LET YOU SEE YOUR PASSWORD? THAT WOULD MAKE TOO MUCH SENSE.",
                "OK"
            );

        }
    );

}


/* =====================================
   USERNAME INPUT
===================================== */

if (loginIdentifier) {

    loginIdentifier.addEventListener(
        "input",
        () => {

            loginStatus.textContent =
                "USERNAME RECEIVED.";

        }
    );

}


/* =====================================
   PASSWORD INPUT
===================================== */

if (loginPassword) {

    loginPassword.addEventListener(
        "input",
        () => {

            loginStatus.textContent =
                "PASSWORD RECEIVED.";

        }
    );

}


/* =====================================
   LOGIN FORM
===================================== */

loginForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        /*
         * The button must escape
         * five times first.
         */

        if (!buttonUnlocked) {

            moveLoginButton();

            return;

        }


        /*
         * ==============================
         * FAKE ACCOUNT CHECK
         * ==============================
         */

        loginButton.disabled =
            true;

        loginButton.textContent =
            "CHECKING...";


        loginStatus.textContent =
            "SEARCHING FOR YOUR ACCOUNT...";


        /*
         * Wait one second.
         */

        setTimeout(
            () => {

                /*
                 * Re-enable button.
                 */

                loginButton.disabled =
                    false;


                loginButton.textContent =
                    "LOGIN →";


                loginStatus.textContent =
                    "ACCOUNT SEARCH COMPLETE.";


                /*
                 * ==========================
                 * MESSAGE 1
                 * ==========================
                 */

                showPopup(
                    "NO SUCH ACCOUNT FOUND.",
                    "WE COULD NOT FIND ANY ACCOUNT WITH THESE CREDENTIALS.",
                    "DONE"
                );

            },
            1000
        );

    }
);


/* =====================================
   POPUP BUTTON
===================================== */

popupClose.addEventListener(
    "click",
    () => {

        const currentTitle =
            popupTitle.textContent;


        /*
         * ==============================
         * MESSAGE 1
         * ==============================
         *
         * NO SUCH ACCOUNT FOUND.
         *
         * DONE ->
         * MESSAGE 2
         */

        if (
            currentTitle ===
            "NO SUCH ACCOUNT FOUND."
        ) {

            showPopup(
                "HAHA. WE TRICKED YOU!",
                "THERE IS AN ACCOUNT! WE JUST WANTED TO MAKE YOU THINK THERE WASN'T ONE.",
                "OK"
            );


            return;

        }


        /*
         * ==============================
         * MESSAGE 2
         * ==============================
         *
         * OK ->
         * game.html
         */

        if (
            currentTitle ===
            "HAHA. WE TRICKED YOU!"
        ) {

            popupClose.disabled =
                true;


            popupClose.textContent =
                "LOADING...";


            loginStatus.textContent =
                "WELCOME TO NULLEX.";


            /*
             * Save journey start time
             * if it does not already exist.
             */

            if (
                !localStorage.getItem(
                    "nullexStartTime"
                )
            ) {

                localStorage.setItem(
                    "nullexStartTime",
                    Date.now().toString()
                );

            }


            /*
             * Go to game.html.
             */

            setTimeout(
                () => {

                    window.location.href =
                        "game.html";

                },
                500
            );


            return;

        }


        /*
         * ==============================
         * PASSWORD POPUP
         * ==============================
         */

        if (
            currentTitle ===
            "NICE TRY."
        ) {

            hidePopup();

            return;

        }

    }
);

});
