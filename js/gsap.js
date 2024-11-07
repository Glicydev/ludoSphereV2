// Initialisation
const under = document.getElementById("under");
const card = document.querySelector(".card");
const languages = document.querySelectorAll(".languages article");
const nextButtons = document.querySelectorAll(".languageNext button");
const aside = document.querySelector("aside");

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
    const container = aside.querySelector(".container")
    const line = document.querySelector(".line")
    const texts = document.querySelectorAll("aside .container .text")
    const languagesDiv = document.querySelector(".languages")
    const footer = document.querySelector("footer")
    const dessus = document.querySelector(".dessus")
    const techs = document.querySelector(".techs")

    footer.style.top = techs.offsetTop + techs.style.height + "px"

    const containerRect = container.getBoundingClientRect();
    const baseRect = texts[0].getBoundingClientRect();
    const firstStepRect = texts[1].getBoundingClientRect();
    const secondStepRect = texts[2].getBoundingClientRect();
    const lastStepRect = texts[3].getBoundingClientRect();
    
    const baseStep = baseRect.top - containerRect.top
    const firstStep = firstStepRect.top - containerRect.top
    const secondStep = secondStepRect.top - containerRect.top
    const lastStep = lastStepRect.top - containerRect.top
    gsap.set(line, { height: baseStep });

    let tl = gsap.timeline();

    // Première animation
    tl.to(line, {
        scrollTrigger: {
            trigger: dessus,
            start: "bottom 99%",
            end: "bottom 10%",
            toggleActions: "play none reverse none",
            scrub: 2, 
            markers: false
        },
        height: firstStep,
        onComplete: function() {
            // Une fois la première animation terminée, on déclenche la deuxième
            tl.to(line, {
                scrollTrigger: {
                    trigger: languagesDiv,
                    start: "top 90%", // La deuxième animation commence ici
                    end: "bottom 10%",
                    toggleActions: "play none reverse none",
                    scrub: 2,
                    markers: true
                },
                height: secondStep,
                onComplete: function() {
                    // La troisième animation commence après la deuxième
                    tl.to(line, {
                        scrollTrigger: {
                            trigger: footer,
                            start: "top 90%", // La troisième animation commence ici
                            end: "bottom bottom",
                            toggleActions: "play none reverse none",
                            scrub: 2,
                            markers: false
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