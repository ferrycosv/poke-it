const nodeFetch = require("node-fetch");
var argv = require("yargs") //(["generation", "-i", "1"])
  .usage("Usage: node $0 <command> [options]")
  .command("pokemon", "Fetch a pokemon")
  .example("$0 pokemon -i 1", "Fetch pokemon with id 1 from pokeAPI")
  .example(
    "$0 pokemon -n charmander",
    "Fetch pokemon with name charmander from pokeAPI"
  )
  .command("item", "Fetch an item")
  .example("$0 item -i 1", "Fetch item with id 1 from pokeAPI")
  .example(
    "$0 item -n master-ball",
    "Fetch item with name master-ball from pokeAPI"
  )
  .command("generation", "Fetch a pokemon game generation")
  .example(
    "$0 generation -i 1",
    "Fetch pokemon game generation with id 1 from pokeAPI"
  )
  .example(
    "$0 generation -n generation-i",
    "Fetch pokemon game generation with name generation-i from pokeAPI"
  )
  .nargs("i", 1)
  .describe("i", "By id")
  .alias("i", "id")
  .alias("n", "name")
  .nargs("n", 1)
  .describe("n", "By name")
  .help("h")
  .alias("h", "help")
  .version("v0.1")
  .epilog("copyright 2020").argv;

const baseURL = "https://pokeapi.co/api/v2/";

async function fetchFromAPI(URL) {
  try {
    const res = await nodeFetch(URL);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

const main = async () => {
  const URL = `${baseURL}${argv._[0]}/${argv.id ? argv.i : argv.n}/`;
  const data = await fetchFromAPI(URL);
  switch (argv._[0]) {
    case "pokemon":
      printPokemon(data);
      break;
    case "item":
      printItem(data);
      break;
    case "generation":
      printGeneration(data);
      break;
  }
};
main();

function printPokemon(data) {
  console.log(`\nPokemon 
    number: ${data.id}
    name: ${data.name}
    height: ${data.height}
    weight: ${data.weight}
    types: ${data.types.reduce((acc, curr, idx, arr) => {
      return (acc += `${curr.type.name}${idx === arr.length - 1 ? "" : ", "}`);
    }, "")}\n`);
}

function printItem(data) {
  console.log(`\nItem 
      number: ${data.id}
      name: ${data.name}
      cost: ${data.cost}
      category: ${data.category.name}
      attributes: ${data.attributes.reduce((acc, curr, idx, arr) => {
        return (acc += `${curr.name}${idx === arr.length - 1 ? "" : ", "}`);
      }, "")}\n`);
}

function printGeneration(data) {
  console.log(`\nGeneration 
        number: ${data.id}
        name: ${data.name}
        main_region: ${data.main_region.name}
        version_groups: ${data.version_groups.reduce((acc, curr, idx, arr) => {
          return (acc += `${curr.name}${idx === arr.length - 1 ? "" : ", "}`);
        }, "")}\n`);
}
