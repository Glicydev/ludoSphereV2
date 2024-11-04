// Initialisation
const under = document.getElementById("under");
const card = document.querySelector(".card");
const languages = document.querySelectorAll(".languages article");

// PLuggins registering
gsap.registerPlugin(ScrollToPlugin)
gsap.registerPlugin(ScrollTrigger)


// Scrolling
function scrollToUnder() {
    gsap.to(window, {
        duration: 1.25,
        scrollTo: { y: under.offsetTop + 100 },
        ease: "power2"
    })
}

gsap.fromTo(card, {
    y: 30,
    opacity: 0.5
}, {
    duration: 1,
    y: 0,
    opacity: 1
})

languages.forEach(language => {
    gsap.fromTo(language, {
        opacity: 0,
        y: 100
    }, {
        opacity: 1,
        duration: 0.5,
        y: 0,
        scrollTrigger: {
            trigger: language,
            markers: true,
            start: "top 70%",
            toggleActions: "play none none reverse"
        }
    });
});
