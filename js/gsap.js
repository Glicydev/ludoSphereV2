// Initialisation
const under = document.getElementById("under");
const card = document.querySelector(".card");

// PLuggins registering
gsap.registerPlugin(ScrollToPlugin)


// Scrolling
function scrollToUnder() {
    gsap.to(window, {
        duration: 1.25,
        scrollTo: {y: under.offsetTop + 100},
        ease: "power2"
    })
}

gsap.from(card, {
    duration: 2,
    y: 20,
    ease: "elastic.out(1, 0.3)"
})