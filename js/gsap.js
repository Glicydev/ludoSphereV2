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
        scrollTo: { y: under.offsetTop + 125 },
        ease: "power2"
    })
}

// Animation de base de la carte
gsap.fromTo(card, {
    y: 30,
    opacity: 0.5
}, {
    duration: 1,
    y: 0,
    opacity: 1
})

// Animation pour les languages
languages.forEach(language => {
    gsap.fromTo( language.querySelectorAll("*"), {
        opacity: 0,
        y: 100
    }, {
        opacity: 1,
        duration: 0.5,
        y: 0,
        scrollTrigger: {
            trigger: language,
            markers: true,
            start: "top 40%",
            toggleActions: "play none none reverse"
        }
    });
});

function goToSecond() {
    const second = document.querySelector(".secondLanguage")
    gsap.to(window, {
        duration: 1.25,
        scrollTo: { y: second.offsetTop }
    })
}

function goNext() {
    const targetPosition = window.scrollY + window.innerHeight
    gsap.to(window, {
        duration: 1.25,
        scrollTo: { y: targetPosition }
    })
}