// API endpoint
const url = "https://official-joke-api.appspot.com/jokes/ten";

// create a function to fetch ten random jokes everytime the browser is refreshed
const fetchJokes = async() => {
    try {
        // fetches the jokes from the API endpoint using the inbuilt javascript API
        const jokes = await fetch(url);

        // store the json response gotten as a javascript object (array)
        const data = await jokes.json();
    
        // for each joke object in the array:
        data.forEach(jokeObject => {
            const joke = `
            <div class = "joke">
                <h3>${jokeObject.setup}</h3>
                <p>${jokeObject.punchline}</p>
            </div>
            `;
    
            // insert each joke into the html container element
            document.querySelector('.container').insertAdjacentHTML('beforeend', joke);
        });
    } catch (error) {
        console.log(error);
    }
}

// Everytime the browser loads, call the fetchJokes function
window.addEventListener('load', fetchJokes);