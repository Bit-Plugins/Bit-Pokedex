const { SlashCommandBuilder, ButtonBuilder, EmbedBuilder, Permission, MessageButton, AttachmentBuilder  } = require('discord.js');
const Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

module.exports = {

    cooldown: 5,
    
    data: new SlashCommandBuilder()
        .setName('itemdex')
        .setDescription('Get information on a specific item')
        .setDMPermission(false)
        .addStringOption((option) => 
            option.setName('item')
            .setDescription('The item you want information on.')
            .setRequired(true)
        )
        .setIntegrationTypes(0,1)
        .setContexts(0,1,2),
    async execute(interaction) {
        const item = interaction.options.getString('item').toLowerCase();
            P.getItemByName(item.toLowerCase().replaceAll(" ", "-"))
                .then(function(response) {
                const pokeEmbed = new EmbedBuilder()
                    .setTitle('Itemdex | '+item)
                    .setThumbnail(response.sprites.default)
                    if(response.cost === 0) {
                        pokeEmbed.addFields({ name: 'Cost in Mart', value: 'Not Purchaseable', inline: true })
                    } else {
                        pokeEmbed.addFields({ name: 'Cost in Mart', value: response.cost.toString(), inline: true })
                    }
                    pokeEmbed.addFields([
                        { name: 'Effect', value: response.effect_entries[0].short_effect, inline: true },
                        { name: 'Item Category', value: response.category.name.replaceAll("-", " "), inline: true }
                    ])
                    pokeEmbed.setDescription(response.flavor_text_entries[0].text.toString())
                interaction.reply({ embeds: [pokeEmbed] })
                return;
            }) .catch((err) => {
                //console.log(err)
                if(err.response.status === 404) {
                    return interaction.reply({
                        content: "Item not found!"
                    })
                } else {
                    interaction.reply({
                        content: err.response.statusText
                    })

                    console.log("Unhandled Error "+err.response.status.toString()+" "+err.response.statusText)
                    return;
                }
            });
    }
}