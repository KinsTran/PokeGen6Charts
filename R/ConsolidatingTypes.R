library(dplyr)
setwd("D:/Info474/PokeGen6Charts")
pokemon <- read.csv("data/pokemon.csv", stringsAsFactors = FALSE)
pokemon.types <- read.csv("data/pokemon_types.csv", stringsAsFactors = FALSE)
types <- read.csv("data/types.csv", stringsAsFactors = FALSE)
abcd <- read.csv("data/consolidated_pokemon_types.csv", stringsAsFactors = FALSE)

types <- select(types, type_id, type_name)

pokemon <- left_join(pokemon, pokemon.types)
pokemon <- left_join(pokemon, types)

write.csv(pokemon, "data/consolidated_pokemon_types.csv")
