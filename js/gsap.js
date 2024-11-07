// Initialisation
const under = document.getElementById("under");
const card = document.querySelector(".card");
const languages = document.querySelectorAll(".languages article");
const nextButtons = document.querySelectorAll(".languageNext button");
const aside = document.querySelector("aside");
const texts = document.querySelectorAll("aside .container .text")
const textInAsideColor = "#8b8b8b"

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
    gsap.fromTo(language.querySelectorAll("*"), {
        opacity: 0,
        y: 100
    }, {
        opacity: 1,
        duration: 0.5,
        y: 0,
        scrollTrigger: {
            trigger: language,
            start: "top 40%",
            toggleActions: "play none none reverse"
        }
    })
})

function goToSecond() {
    const second = document.querySelector(".secondLanguage")
    gsap.to(window, {
        duration: 1.25,
        scrollTo: { y: second.offsetTop }
    })
}

function goNext(e) {
    const parent = e.target.parentElement
    const rect = parent.getBoundingClientRect()
    const targetPosition = rect.top + window.scrollY + window.innerHeight
    gsap.to(window, {
        duration: 1.25,
        scrollTo: { y: targetPosition },
        autoKill: true
    })
}

nextButtons.forEach(nextButton => {
    nextButton.addEventListener("click", goNext)
})

gsap.to(aside.querySelector(".bg"), {
    top: 0
})

function animateAside() {

    // Recuperation des elements html
    const container = aside.querySelector(".container")
    const line = document.querySelector(".line")
    const languagesDiv = document.querySelector(".languages")
    const footer = document.querySelector("footer")
    const dessus = document.querySelector(".dessus")
    const techs = document.querySelector(".techs")


    // Placer le footer
    footer.style.top = techs.offsetTop + techs.style.height + "px"

    // Recuperer les rects des etapes
    const containerRect = container.getBoundingClientRect();
    const baseRect = texts[0].getBoundingClientRect();
    const firstStepRect = texts[1].getBoundingClientRect();
    const secondStepRect = texts[2].getBoundingClientRect();
    const lastStepRect = texts[3].getBoundingClientRect();
    
    // Calculer les etapes pour la ligne
    const baseStep = baseRect.top - containerRect.top
    const firstStep = firstStepRect.top - containerRect.top
    const secondStep = secondStepRect.top - containerRect.top
    const lastStep = lastStepRect.top - containerRect.top

    // Initialisation de la forme
    gsap.set(line, { height: baseStep });
    gsap.to(texts[0], { color: "#333", fontSize: "1.1rem", duration: 0.2 });

    // Animation
    let tl = gsap.timeline();

    tl.to(line, {
        scrollTrigger: {
            trigger: dessus,
            start: "bottom 99%",
            end: "bottom 20%",
            toggleActions: "play none reverse none",
            scrub: 1, 
            markers: false,
            onEnter: () => {
                gsap.to(texts[0], { color: "#333", fontSize: "1.1rem", duration: 0.2 });
            }
        },
        height: firstStep,
        onComplete: function() {
            tl.to(line, {
                scrollTrigger: {
                    trigger: languagesDiv,
                    start: "top 90%",
                    end: "bottom 10%",
                    toggleActions: "play none reverse none",
                    scrub: 1,
                    markers: true,
                    onEnter: () => {
                        gsap.to(texts[1], { color: "#333", fontSize: "1.1rem", duration: 0.2 });
                        gsap.to(texts[0], { color: textInAsideColor, fontSize: "1rem", duration: 0.2 });
                    }
                },
                height: secondStep,
                onComplete: function() {
                    tl.to(line, {
                        scrollTrigger: {
                            trigger: footer,
                            start: "top 90%",
                            end: "bottom bottom",
                            toggleActions: "play none reverse none",
                            scrub: 1,
                            markers: false,
                            onEnter: () => {
                                gsap.to(texts[2], { color: "#333", fontSize: "1.1rem", duration: 0.2 });
                                gsap.to(texts[1], { color: textInAsideColor, fontSize: "1rem", duration: 0.2 });
                            }
                        },
                        height: lastStep
                    });
                }
            });
        }
    });
}

animateAside()

window.addEventListener("resize", animateAside)

/**
 * Permet de plus facilement scroller jusqu'a un element HTML
 * 
 * @param {string} elementClass Nom de la classe de l'element HTML
 */
function goTo(elementClass) {
    const element = document.querySelector(`.${elementClass}`)
    window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth"
    })
}

// Si on est tout en haut, alors faire que ce soit uniquement le premier texte du aside qui soit visible
window.addEventListener("scroll", () => {
    if (window.scrollY === 0) {
        gsap.to(texts[0], { color: "#333", fontSize: "1.1rem", duration: 0.2 });
        gsap.to(texts[1], { color: textInAsideColor, fontSize: "1rem", duration: 0.2 });
    }
})