// кнопки смены темы
var themeBtn = document.getElementById("theme-toggle");
var themeBtnMobile = document.getElementById("theme-toggle-mobile");

// загружаем тему
var savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
}

// меняем тему
function changeTheme() {
    var theme = document.documentElement.getAttribute("data-theme");
    if (theme == "dark") {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    }
}

// кнопка на пк
if (themeBtn) {
    themeBtn.onclick = changeTheme;
}
// кнопка на телефоне
if (themeBtnMobile) {
    themeBtnMobile.onclick = changeTheme;
}

// бургер меню
var burger = document.getElementById("burger");
var menu = document.getElementById("mobile-menu");
if (burger && menu) {
    burger.onclick = function () {
        menu.classList.toggle("active");
    };
}

// проверка формы
function checkForm(formId) {
    var form = document.getElementById(formId);
    if (!form) {
        return;
    }
    form.onsubmit = function (event) {
        var ok = true;

        // все обязательные поля
        var inputs = form.querySelectorAll("input[required], textarea[required]");
        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            input.classList.remove("error");
            var error = input.nextElementSibling;
            if (error && error.classList.contains("error-msg")) {
                error.style.display = "none";
            }

            // пустое поле
            if (input.value.trim() == "") {
                ok = false;
                input.classList.add("error");
                if (error && error.classList.contains("error-msg")) {
                    error.style.display = "block";
                }
            }

            // проверка почты
            if (input.type == "email" && input.value != "") {
                var email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!email.test(input.value)) {
                    ok = false;
                    input.classList.add("error");
                }
            }
        }

        // если есть ошибки
        if (!ok) {
            event.preventDefault();
            alert("заполните все обязательные поля");
        }
    };
}

// запускаем проверку
window.onload = function () {
    checkForm("checkout-form");
    checkForm("login-form");
    checkForm("register-form");
};