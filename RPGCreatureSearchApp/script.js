const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

// Stats
const searchResult = document.querySelector(".result-search");
const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id");
const creatureWeight = document.getElementById("weight");
const creatureHeight = document.getElementById("height");
const creatureTypes = document.getElementById("types");

// Table
// const hp = document.getElementById("hp");
// const attack = document.getElementById("attack");
// const defense = document.getElementById("defense");
// const specialAttack = document.getElementById("special-attack");
// const specialDefense = document.getElementById("special-defense");
// const speed = document.getElementById("speed");
const tdNodeList = document.querySelectorAll("tr td:nth-child(2)");
const tdElements = Array.from(tdNodeList).map(td => {
  return {
    element: td,
    className: td.className
  };
});

const apiURL = "https://rpg-creature-api.freecodecamp.rocks/api/creatures";

const getCreatureStats = async (nameOrId) => {
    try {
        // const res = await fetch(apiURL);
        // const data = await res.json();
        // // console.log(data[0]);
        // const creature = data.find(element => String(element.id) === nameOrId || element.name === nameOrId);
        // if(!creature) {
        //     return undefined;
        // }
        const creatureStats = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${nameOrId}`);
        return creatureStats.json();
    } catch(err) {
        alert("Something went wrong, please try again!");
        console.error(err);
    }
}

const fillInfo = async (nameOrId) => {
    try {
        const creature = await getCreatureStats(nameOrId);
        console.log(creature)
        if(!creature) {
            // delete all infos ( leave it blank)
            alert("Creature not found");
            searchResult.classList.add("hidden");
            tdElements.forEach((td, index) => {
                td.element.textContent = '';
            });
            return;
        }
        const {id, name, weight, height, special, stats, types} = creature;
        creatureName.textContent = name.toUpperCase();
        creatureId.textContent = `#${id}`;
        creatureWeight.textContent = weight;
        creatureHeight.textContent = height;
        searchResult.classList.remove("hidden");
        creatureTypes.textContent = "";
        types.forEach(element => {
            const pElement = document.createElement("p");
            pElement.textContent = element["name"].toUpperCase();
            creatureTypes.appendChild(pElement);
        });
        tdElements.forEach((td, index) => {
            td.element.textContent = stats[index].base_stat;
        });
    } catch(err) {
        // delete all infos ( leave it blank)
        alert("Creature not found");
        searchResult.classList.add("hidden");
        tdElements.forEach((td, index) => {
            td.element.textContent = '';
        });
        return;
    }
    // console.log(id, name, weight, height, special, stats, types);  
}


searchBtn.addEventListener("click", () => { fillInfo(searchInput.value) });