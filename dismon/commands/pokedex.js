const { SlashCommandBuilder, ButtonBuilder, EmbedBuilder, Permission, MessageButton } = require('discord.js');
const Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pokedex')
        .setDescription('Get information on a specific pokemon')
        .setDMPermission(false)
        .addStringOption((option) => 
            option.setName('pokemon')
            .setDescription('The pokemon you want information on.')
            .setRequired(true)
        ),
    async execute(interaction) {
        const pokemonChoice = interaction.options.getString("pokemon")
        interaction.deferReply();
        var form = pokemonChoice;
        var gen = 8;
        var flavorNumber = 0;

        let pokemon = pokemonChoice.toLowerCase();
        const embed = new EmbedBuilder()
        P.getPokemonSpeciesByName(pokemon)
            .then(function(response) {
                embed.addFields(
                    { name: "Generation", value: response.generation.name.toString().replaceAll("-", " "), inline: true }
                )

                for(var i = 0; i < response.flavor_text_entries.length; i++) {
                    if(response.flavor_text_entries[i].language.name === "en") {
                        flavorNumber = i;
                        break;
                    }
                }

                embed.setDescription(reponse.flavor_text_entries[flavorNumber].flavorText.toString().replaceAll("\n", " ").replaceAll("\u000c", " "))

                //if(gen < response.generation)
                //if(response.flavor_text_entries)

                //embed.setDescription(response.flavor_text_entries[gen-1].flavor_text.toString().replaceAll)
            })
        P.getPokemonByName(pokemon)
            .then(function(response) {
                embed.setTitle('Pokedex | N° '+response.id+ " " +response.name)
                embed.setThumbnail(response.sprites.front_default)

                if(response.types[1] === undefined) {
                    embed.addFields(
                        { name: "type", value: response.types[0].type.name, inline: true }
                    )
                } else {
                    embed.addFields(
                        { name: "types", value: response.types[0].type.name+", "+response.types[1].type.name, inline: true }
                    )
                }

                embed.addFields(
                    { name: 'Ability Information', value: '\u200b' },
                    { name: 'Ability 1', value: response.abilities[0].ability.name, inline: true }
                )

                if(response.abilities[1].is_hidden === true) {
                    embed.addFields(
                        { name: "Hidden Ability", value: response.abilities[1].ability.name, inline: true}
                    )
                } else {
                    embed.addFields(
                        { name: "Ability 2", value: response.abilities[1].ability.name, inline: true },
                        { name: "Hidden Ability", value: response.abilities[2].ability.name, inline: true }
                    )
                }
            })

            await interaction.editReply({ embeds: [embed] })
    }
}