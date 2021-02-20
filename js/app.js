// generate elements list pokemon 
function generateList(listPokemons) {
    let dom = document.querySelector('.right-container__screen');
    dom.innerHTML = "";
    listPokemons.forEach(pokemon => {
        let id = pokemon.url.split('pokemon/')[1];
        let idFinal = id.split('/')[0];
        dom.innerHTML += `<div class="list-item" data-id="${idFinal}">${idFinal}. ${pokemon.name}</div>`;
    });
    document.querySelector('body').style.textTransform = "capitalize";
    getPokemonDom()
}

// get pokemon from dom
function getPokemonDom() {
    let pokemonsDom = document.querySelectorAll('.list-item');
    pokemonsDom.forEach(pokeDom => {
        let id = pokeDom.getAttribute('data-id');
        pokeDom.addEventListener('click', function () {
            getProfilePoke(id);
        })
    })
}

// generate profil pokemon
function getProfilePoke(id) {
    fetch("https://pokeapi.co/api/v2/pokemon/" + id)
        .then(response => response.json())
        .then(data => {
            infoPokemon(data);
        })
        .catch(err => console.log(err))
}

// info pokemon
function infoPokemon(data) {
    let mainScreen = document.querySelector('.main-screen');
    let pokName = document.querySelector('.poke-name');
    let pokId = document.querySelector('.poke-id');
    let pokeFrontImage = document.querySelector('.poke-front-image');
    let pokeBackImage = document.querySelector('.poke-back-image');
    let pokeTypeOne = document.querySelector('.poke-type-one');
    let pokeTypeTwo = document.querySelector('.poke-type-two');
    let pokeWeight = document.querySelector('.poke-weight');
    let pokeHeight = document.querySelector('.poke-height');

    mainScreen.setAttribute("class", "main-screen " + data.types[0].type.name);
    mainScreen.classList.remove('hide');
    pokName.textContent = data.forms[0].name;
    pokId.textContent = data.id < 10 ? "#00" + data.id : data.id < 100 ? "#0" + data.id : "#" + data.id;
    pokeFrontImage.setAttribute("src", data.sprites.front_default);
    pokeBackImage.setAttribute("src", data.sprites.back_default);
    pokeTypeOne.textContent = data.types[0].type.name;

    let dreamWorld = data.sprites.other.dream_world.front_default;
    if (data.types[1]) {
        pokeTypeTwo.textContent = data.types[1].type.name;
        pokeTypeTwo.classList.remove("hide");
    } else {
        pokeTypeTwo.textContent = "";
        pokeTypeTwo.classList.add("hide");
    }
    pokeHeight.textContent = data.height;
    pokeWeight.textContent = data.weight;
    mainScreen.style.backgroundImage = ``;
    mainScreen.classList.remove('bonus')

    let screenStats = document.querySelector('.screen__stats');
    pokName.classList.remove('hide');
    pokId.classList.remove('hide');
    pokeFrontImage.classList.remove('hide');
    pokeBackImage.classList.remove('hide');
    pokeTypeOne.classList.remove('hide');
    screenStats.classList.remove('hide');

    showPokeImag(mainScreen, pokName, pokId, pokeFrontImage, pokeBackImage, pokeTypeOne, pokeTypeTwo, screenStats, dreamWorld);
    hidePokeImag(mainScreen, pokName, pokId, pokeFrontImage, pokeBackImage, pokeTypeOne, pokeTypeTwo, screenStats);
}

// get api pokemon → fetch
function getApiPokemon(count) {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${count}&limit=20`)
        .then(response => response.json())
        .then(data => {
            generateList(data.results)
        })
        .catch(err => {
            console.log(err);
        })
}
getApiPokemon();

// buttons
function button() {
    let nextButton = document.querySelector('.right-button');
    let prevButton = document.querySelector('.left-button');
    let right = document.querySelector('.d-pad__cell.right');
    let left = document.querySelector('.d-pad__cell.left');
    let top = document.querySelector('.d-pad__cell.top');
    let bottom = document.querySelector('.d-pad__cell.bottom');
    let buttonsAB = document.querySelectorAll('.buttons__button');
    let count = 0;

    // next list
    function rightClick() {
        count += 20;
        if (count >= 1118) {
            count = 1118;
        } else {
            getApiPokemon(count);
        }
    }

    // prev list
    function leftClick() {
        count -= 20;
        // redeclare count à 0 si égale 0
        if (count <= 0) {
            count = 0;
        }
        getApiPokemon(count);
    }
    // button "A"
    function topClick() {
        if (top) {
            // "#009"
            let id = document.querySelectorAll('.poke-id')[0].textContent.split('#')[1]
            id = Number(id) // "009" → 009 = 9
            id += 1; // 9 + 1 = 10
            getProfilePoke(id) // 10
        }
    }

    // button "B"
    function bottomClick() {
        if (bottom) {
            let id = document.querySelectorAll('.poke-id')[0].textContent.split('#')[1]
            id = Number(id)
            id -= 1;
            if (id === 0) {
                id = 1
            }
            getProfilePoke(id)
        }
    }

    // direction buttons keyddown
    window.addEventListener('keydown', (e) => {
        if (e.key === "ArrowRight") rightClick();
        if (e.key === "ArrowLeft") leftClick();
        if (e.key === "ArrowUp") topClick();
        if (e.key === "ArrowDown") bottomClick();
    })
    nextButton.addEventListener('click', rightClick);
    right.addEventListener('click', rightClick);
    prevButton.addEventListener('click', leftClick);
    left.addEventListener('click', leftClick);
    top.addEventListener('click', topClick);
    bottom.addEventListener('click', bottomClick);
}
button()


// show image pokemon 
function showPokeImag(mainScreen, pokName, pokId, pokeFrontImage, pokeBackImage, pokeTypeOne, pokeTypeTwo, screenStats, dreamWorld) {
    document.querySelector('.middle').addEventListener('click', () => {
        show();
    });
    window.addEventListener('keydown', (e) => {
        if (e.key === "a" || e.key === "Enter") {
            show();
        }
    })
    function show() {
        mainScreen.style.backgroundImage = `url(${dreamWorld})`;
        mainScreen.classList.add('bonus');
        pokName.classList.add('hide');
        pokId.classList.add('hide');
        pokeFrontImage.classList.add('hide');
        pokeBackImage.classList.add('hide');
        pokeTypeOne.classList.add('hide');
        pokeTypeTwo.classList.add('hide');
        screenStats.classList.add('hide');
    }
}

// hide image pokemon 
function hidePokeImag(mainScreen, pokName, pokId, pokeFrontImage, pokeBackImage, pokeTypeOne, pokeTypeTwo, screenStats) {

    window.addEventListener('keydown', (e) => {
        if (e.key === "b" || e.key === "B") {
            hide();
        }
    })
    document.querySelectorAll('.buttons__button')[0].addEventListener('click', hide);
    function hide() {
        mainScreen.style.backgroundImage = ``;
        mainScreen.classList.remove('bonus');
        pokName.classList.remove('hide');
        pokId.classList.remove('hide');
        pokeFrontImage.classList.remove('hide');
        pokeBackImage.classList.remove('hide');
        pokeTypeOne.classList.remove('hide');
        pokeTypeTwo.classList.remove('hide');
        screenStats.classList.remove('hide');
    }
}