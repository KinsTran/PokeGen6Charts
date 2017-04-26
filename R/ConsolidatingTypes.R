library(dplyr)
setwd("D:/Info474/PokeGen6Charts")
pokemon <- read.csv("data/pokemon.csv", stringsAsFactors = FALSE)
pokemon.types <- read.csv("data/pokemon_types.csv", stringsAsFactors = FALSE)
types <- read.csv("data/types.csv", stringsAsFactors = FALSE)
abcd <- read.csv("data/consolidated_pokemon_types.csv", stringsAsFactors = FALSE)

types <- select(types, type_id, type_name)

pokemon <- left_join(pokemon, pokemon.types)
pokemon <- left_join(pokemon, types)

pokemon <- mutate(abcd, noMeasure = 1) #Edited on the fly, gibberish now
pokemon <- select(pokemon, id, pokemon_id, pokemon_name, height, weight, slot, type_name, noMeasure)
write.csv(pokemon, "data/consolidated_pokemon_types.csv")
