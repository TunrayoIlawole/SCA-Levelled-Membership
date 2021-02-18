const carousel = [
    {
        img: "one",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eros libero, fermentum vel convallis et, pretium a urna. Duis convallis lobortis tristique. Duis mattis eros suscipit sem facilisis."
    },
    {
        img: "two",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eros libero, fermentum vel convallis et, pretium a urna. Duis convallis lobortis tristique."
    },
    {
        img: "three",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem, pretium a urna. Duis convallis lobortis tristique. Duis mattis eros suscipit sem facilisis."
    },
    {
        img: "four",
        text: "Lorem ipsum dolor sit amet, adipiscing elit. Praesent libero, fermentum vel convallis et. Duis convallis tristique. Duis mattis eros suscipit sem facilisis."
    },
    {
        img: "five",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eros libero, fermentum vel convallis. Duis lobortis tristique. Duis mattis eros suscipit sem facilisis."
    }
]

const domElements = {
    carouselCon: document.querySelector('.carousel'),
    circles: document.querySelectorAll('span')
}

let i = 0;
let markup;

setInterval(() => {
    i === carousel.length - 1 ? i = 0 : i++;

    markup = `<img src = "assets/${carousel[i].img}.JPG" alt = "person" />
    <p>${carousel[i].text}</p>`;

    domElements.carouselCon.innerHTML = markup;

    const circlesArr = Array.from(domElements.circles);
    circlesArr.forEach(circle => {
        if(circle.id === carousel[i].img) {
            circle.classList.add('active');
        }
        else {
            circle.classList.remove('active');
        }
    });
}, 4000);