document.addEventListener("DOMContentLoaded", function () {
const nav = document.querySelector(".mobile-nav"),
    navMenuButton = document.querySelector(".nav-menu-btn"),
    navCloseButton = document.querySelector(".nav-close-btn"),
    navLinks = document.querySelectorAll(".nav-link-mob");

const navToggleFunction = () => nav.classList.toggle("active");
navMenuButton.addEventListener("click", navToggleFunction);
navCloseButton.addEventListener("click", navToggleFunction);
navLinks.forEach(navLink => {
    navLink.addEventListener("click", navToggleFunction);
})

const themeBtn = document.querySelectorAll(".theme-btn");

for (let i = 0; i < themeBtn.length; i++) {
    themeBtn[i].addEventListener("click", function () {
        document.body.classList.toggle("light-theme");
        document.body.classList.toggle("dark-theme");

        for (let j = 0; j < themeBtn.length; j++) {
            themeBtn[j].classList.toggle("light");
            themeBtn[j].classList.toggle("dark");
        }
    });
}



let noOfCharc = 400;
let contents = document.querySelectorAll(".contents");

contents.forEach(content => {
    let displayText = content.textContent.slice(0, noOfCharc);
    let moreText = content.innerHTML.slice(noOfCharc + 3);
    content.innerHTML = `${displayText}<span class="dots"> ...</span><div class="hide more">${moreText}</div>`;
});

const btnReadMore = (btn) => {
    let Allcontent = btn.parentElement;
    Allcontent.querySelector(".dots").classList.toggle("hide");
    Allcontent.querySelector(".more").classList.toggle("hide");
    btn.textContent == "Read More" ? btn.textContent = "Read Less" : btn.textContent = "Read More";
};

const donateBtn = document.querySelector("#donate_btn");
const donateClose = document.querySelector("#donate_close");

const donate = document.querySelector("#donation")
const donateOpenFunction = () => {
  donate.style.display = "block";
  document.querySelector("main").style.opacity = ".3"
  document.querySelector("header").style.opacity = ".3"
  document.querySelector("footer").style.opacity = ".3"
}
const donateCloseFunction = () => {
  donate.style.display = "none"
  document.querySelector("main").style.opacity = "1"
  document.querySelector("header").style.opacity = "1"
  document.querySelector("footer").style.opacity = "1"
}
donateBtn.addEventListener("click", donateOpenFunction);
donateClose.addEventListener("click", donateCloseFunction);
});