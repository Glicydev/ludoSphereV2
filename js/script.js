var listOfLanguages = document.querySelectorAll(".languages article");
listOfLanguages.forEach(function (language) {
    language.setAttribute("loading", "lazy");
});
