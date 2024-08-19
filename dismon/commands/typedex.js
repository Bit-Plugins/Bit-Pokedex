const { SlashCommandBuilder, ButtonBuilder, EmbedBuilder, Permission, MessageButton, AttachmentBuilder  } = require('discord.js');
const dismondb = require("dismondb");

module.exports = {

    cooldown: 5,

    integration_types: {
        user: true,
        guild: true,
    },

    context_types: {
		guildChannel: true,
		botDM: true,
		privateChannel: true,
	},
    
    data: new SlashCommandBuilder()
        .setName('typedex')
        .setDescription('Get information on a specific type')
        .setDMPermission(false)
        .addStringOption((option) => 
            option.setName('type')
            .setDescription('The type you want information on.')
            .setRequired(true)
            .addChoices(
                { name: 'Normal', value: 'normal' },
                { name: 'Fire', value: 'fire' },
                { name: 'Water', value: 'water' },
                { name: 'Grass', value: 'grass' },
                { name: 'Electric', value: 'electric' },
                { name: 'Ice', value: 'ice' },
                { name: 'Fighting', value: 'fighting' },
                { name: 'Poison', value: 'poison' },
                { name: 'Ground', value: 'ground' },
                { name: 'Flying', value: 'flying' },
                { name: 'Psychic', value: 'psychic' },
                { name: 'Bug', value: 'bug' },
                { name: 'Rock', value: 'rock' },
                { name: 'Ghost', value: 'ghost' },
                { name: 'Dark', value: 'dark' },
                { name: 'Dragon', value: 'dragon' },
                { name: 'Steel', value: 'steel' },
                { name: 'Fairy', value: 'fairy' },
            )
        ),
    async execute(interaction) {
        const type = interaction.options.getString('type').toLowerCase();

        const typeInformation = dismondb.typedex(type, 4)

        const embed = new EmbedBuilder()
            .setTitle(typeInformation.name.en)
            .setThumbnail(typeInformation.images.symbol)
            .addFields(
                { name: "Generation Added", value: typeInformation.genAdded.toString(), inline: true },
                { name: "Move Count", value: typeInformation.counters.moves.toString(), inline: true },
                { name: "Pokemon Count", value: typeInformation.counters.pokemon.total.toString(), inline: true },
                { name: "No Effect From", value: typeInformation.typemaps.gen6.defence.noEffect, inline: true },
                { name: "Not very Effective from", value: typeInformation.typemaps.gen6.defence.notVeryEffective, inline: true },
                { name: "Super Effective from", value: typeInformation.typemaps.gen6.defence.superEffective, inline: true },
                { name: "No Effect To", value: typeInformation.typemaps.gen6.defence.noEffect, inline: true },
                { name: "Not very Effective To", value: typeInformation.typemaps.gen6.defence.notVeryEffective, inline: true },
                { name: "Super Effective To", value: typeInformation.typemaps.gen6.defence.superEffective, inline: true },
            )
        interaction.reply({
            embeds: [embed]
        })
    }
}