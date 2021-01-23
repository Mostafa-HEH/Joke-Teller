const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


function toggleButton() {
    button.disabled = !button.disabled;
}

function tellMe(joke) {
        VoiceRSS.speech({
        key: 'feb2386d47d24a4d9911817f68fb0cc1',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

async function getJoke() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        // console.log(data);
        if (data.type === 'single') {
            joke = data.joke;
        } else {
            joke = `${data.setup} ... ${data.delivery}`;
        }
        tellMe(joke);
        toggleButton();
    } catch {
        console.log('woops, something went wrong');
    }
}

button.addEventListener('click', getJoke);
audioElement.addEventListener('ended', toggleButton);

