const { EmbedBuilder, Permissions, SlashCommandBuilder } = require('discord.js');
const ms = require("ms");
const Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('wtp')
        /*.setNameLocalizations({
			pl: 'pies',
			de: 'hund',
		})*/
		.setDescription('WHO\'S THAT POKEMON?')
        /*.setDescriptionLocalizations({
			pl: 'Rasa psa',
			de: 'Hunderasse',
		})*/
        .setDMPermission(false)
        .addIntegerOption((option) =>
            option.setName('gen-start')
            /*.setNameLocalizations({
			    pl: 'pies',
			    de: 'hund',
		    })*/
            .setDescription('Generation Start')
            /*.setDescriptionLocalizations({
			    pl: 'Rasa psa',
			    de: 'Hunderasse',
		    })*/
            .setRequired(false)
            .setMaxValue(9)
            .setMinValue(1)
        )

        .addIntegerOption((option) =>
            option.setName('gen-end')
            /*.setNameLocalizations({
			    pl: 'pies',
			    de: 'hund',
		    })*/
            .setDescription('Generation End')
            /*.setDescriptionLocalizations({
			    pl: 'Rasa psa',
			    de: 'Hunderasse',
		    })*/
            .setRequired(false)
            .setMaxValue(9)
            .setMinValue(1)
        )

        .addStringOption((option) =>
            option.setName('difficulty')
            /*.setNameLocalizations({
			    pl: 'pies',
			    de: 'hund',
		    })*/
            .setDescription("What difficulty would you like?")
            /*.setDescriptionLocalizations({
			    pl: 'Rasa psa',
			    de: 'Hunderasse',
		    })*/
            .setRequired(false)
            .addChoices(
                { name: "Easy", value: "easy" },
                { name: "Normal", value: "normal" },
                { name: "Hard", value: "hard" },
                { name: "Help", value: "help" },
            )
        )

        .addIntegerOption((option) =>
            option.setName('timer')
            /*.setNameLocalizations({
			    pl: 'pies',
			    de: 'hund',
		    })*/
            .setDescription("How long would you like the timer to go for?")
            /*.setDescriptionLocalizations({
			    pl: 'Rasa psa',
			    de: 'Hunderasse',
		    })*/
            .setRequired(false)
            .addChoices(
                { name: '10 Seconds', value: 10000 },
                { name: '20 Seconds', value: 20000 },
                { name: '30 Seconds', value: 30000 },
                { name: '40 Seconds', value: 40000 },
                { name: '50 Seconds', value: 50000 },
                { name: '1 Minute', value: 60000 },
                { name: '1 Minute 30 Seconds', value: 90000 },
                { name: '2 Minutes', value: 120000 },
                { name: '2 Minutes 30 seconds', value: 150000 },
                { name: '3 Minutes', value: 180000 },
            )
        ),
	async execute(interaction) {
        function ranNum( min, max ) {
            if(Number.isInteger(min) === false) {
                return "minNotInt";
            } else if(Number.isInteger(max === false)) {
                return "maxNotInt";
            } else {
                var result = Math.floor(Math.random() * max) + min;
                return result;
            }
        },

        await interaction.deferReply();
        const client = interaction.client
        const genStart = interaction.options.getInteger('gen-start');
        const genEnd = interaction.options.getInteger('gen-end');
        const timerInt = interaction.options.getInteger('timer');
        const difficulty = interaction.options.getString('difficulty');
        if(difficulty === "help") {
            const embed = new EmbedBuilder()
                embed.setDescription("# Difficulty Help\n## Easy\nWill show just the picture of the pokemon to guess, the form will not be required.\n\n## Normal\nThe default option, will show the picture of the pokemon to guess, the form however will be required in the guess.\n\n## Hard\nWill show the pokemons pokedex description. The form will not be required.")

            interaction.editReply({ embeds: [embed] })
            return;
        }

        var pokeCountStart = 1;
        var pokeCountEnd = 1025;
        var timer = 30000;
        var forms = false;
        var pot = 5;
        var isLegend = false;
        var pokedex = "NOTHING TO SEE HERE";
        var diff = "normal"

        if(difficulty === "normal") {
            forms = true;
        } else {
            diff = difficulty;
            forms = false;
        }

        if(timerInt) {
           timer = timerInt; 
        }

        if(genStart) {
            switch (genStart) {
                case 1:
                    pokeCountStart = 1;
                break;
                case 2:
                    pokeCountStart = 152;
                break;
                case 3:
                    pokeCountStart = 252;
                break;
                case 4:
                    pokeCountStart = 387;
                break;
                case 5:
                    pokeCountStart = 494;
                break;
                case 6:
                    pokeCountStart = 650;
                break;
                case 7:
                    pokeCountStart = 722;
                break;
                case 8:
                    pokeCountStart = 810;
                break;
                case 9:
                    pokeCountStart = 906;
                break;
            }
            //pokeCountStart = genStart;
        }

        if(genEnd) {
            switch (genStart) {
                case 1:
                    pokeCountEnd = 151;
                break;
                case 2:
                    pokeCountEnd = 251;
                break;
                case 3:
                    pokeCountEnd = 386;
                break;
                case 4:
                    pokeCountEnd = 493;
                break;
                case 5:
                    pokeCountEnd = 649;
                break;
                case 6:
                    pokeCountEnd = 721;
                break;
                case 7:
                    pokeCountEnd = 809;
                break;
                case 8:
                    pokeCountEnd = 905;
                break;
                case 9:
                    pokeCountEnd = 1025;
                break;
            }
            //pokeCountEnd = genEnd;
        }
        var pokemon;
        //var randPoke = Math.floor(Math.random() * pokeCountEnd) + pokeCountStart;
        var randPoke = ranNum(pokeCountStart, pokeCountEnd);
        //var randPoke = 386;
        var pokeNum = randPoke;
        var imgNum = pokeNum;
        var pokeName = "eevee";
        if(imgNum < 10) {
            imgNum = "00"+imgNum;
        } else if(imgNum < 100 && imgNum > 10) {
            imgNum = "0"+imgNum;
        }

        P.getPokemonSpeciesByName(pokeNum)
            .then(function(response) {
                if(forms === true) {
                    var formCount = response.varieties.length;
                    var formsList = response.varieties;
                    var thisFormNumber = Math.floor(Math.random()*formCount)
                    var thisForm = formsList[thisFormNumber];
                    var mainPoke = response.name;
                    if(thisFormNumber === 0) {
                        pokeName = response.name;
                    } else {
                        pokeName = thisForm.pokemon.name;
                        var formImgNumber = thisFormNumber+1
                        imgNum = imgNum+"_f"+formImgNumber;
                    }
                } else if(diff === "hard") {
                    var pokeRegEx = response.name.toUpperCase();
                    //pokedex = response.flavor_text_entries[0].flavor_text
                    var pokedexes = response.flavor_text_entries
                    /*pokedex = pokedexes.filter(obj => {
                        return obj.language.name === "en"
                    })*/

                    for(var i=0, iLen=pokedexes.length; i<iLen; i++) {
                        if(pokedexes[i].language.name === "en") {
                            pokedex = pokedexes[i].flavor_text.toString().replaceAll("\n", " ").replaceAll("\u000c", " ").replaceAll(pokeRegEx, "REDACTED");
                            console.log(pokeRegEx);
                            console.log(response.name.toUpperCase());
                            console.log(pokedex);
                            return;
                        }
                    }

                    //console.log(pokedex)
                    //return;
                }
                if(response.is_legendary === true || response.is_mythical === true) {
                    isLegend = true;
                } else {
                    isLegend = false;
                }
            })

        const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
        await delay(2000);

        P.getPokemonByName(pokeNum)
            .then(function(response) {
                pokemon = response;
                if(forms === false) {
                    pokeName = pokemon.species.name;
                }

                P.getPokemonSpeciesByName(pokeNum)
                    .then(function(response) {
                        pokemon = response;
                        if(pokemon.is_legendary === true || pokemon.is_mythical === true) {
                            isLegend = true;
                        } else {
                            isLegend = false;
                        }
                    })

                const embed = new EmbedBuilder()
                    if(diff === "hard") {
                        embed.setDescription("# WHO'S THAT POKEMON\n!guess {pokemon} to guess\n\n"+pokedex)

                        if(isLegend === true) {
                            embed.setColor('Gold')
                        } else {
                            embed.setColor('DarkButNotBlack')
                        }
                    } else {
                        embed.setTitle("Who's that Pokemon?")
                        embed.setImage("https://assets.pokemon.com/assets/cms2/img/pokedex/full/"+imgNum+".png")
                        if(forms === true) {
                            embed.setDescription("# WHO'S THAT POKEMON?\n!guess {pokemon}-{form} to guess")
                        } else {
                            embed.setDescription("# WHO'S THAT POKEMON\n!guess {pokemon} to guess")
                        }

                        if(isLegend === true) {
                            embed.setColor('Gold')
                        } else {
                            if(forms === true) {
                                embed.setColor('Blue')
                            } else {
                                embed.setColor('DarkButNotBlack')
                            }
                        }
                    }

                console.log("https://assets.pokemon.com/assets/cms2/img/pokedex/full/"+imgNum+".png")
                console.log(pokeName);
                var isGame = true;
                interaction.editReply({ embeds: [embed] }).then(() => {
                    const collectorFilter = response => {
                        if(response.author.bot === false) {
                            if(response.content.includes("!guess")) {
                                if(response.content.toLowerCase() === "!guess "+pokeName) {
                                    return true;
                                } else {
                                    response.react("❌")
                                }
                            }
                        }
                    }

                interaction.channel.awaitMessages({ filter: collectorFilter, time: timer, max: 1, errors: ['time']})
                    .then(messages => {
                        isGame = false;
                        const embed = new EmbedBuilder()
                            embed.setColor('Green')
                            embed.setDescription("# CORRECT, "+messages.first().member.username+"\nThe answer was "+pokeName)
                            //embed.setDescription("🎉🎉 Correct, <@"+messages.first().author.id+">, the answer was "+pokeName+" 🎉🎉")
                            embed.setImage("https://assets.pokemon.com/assets/cms2/img/pokedex/full/"+imgNum+".png")
                        interaction.editReply({ embeds: [embed] })
                        messages.first().reply({ content: "🎉🎉 Congratulations "+messages.first().member.username+" you got it right! 🎉🎉\n\nThe answer was "+pokeName })
                    })
                    .catch(() => {
                        if(isGame === false) return;
                        const embed = new EmbedBuilder()
                            embed.setColor('Red')
                            //embed.setDescription("You took too long, the answer was "+pokeName)
                            embed.setDescription("# TIMED OUT\nThe answer was "+pokeName)
                            embed.setImage("https://assets.pokemon.com/assets/cms2/img/pokedex/full/"+imgNum+".png")
                        interaction.editReply({ embeds: [embed] })
                        interaction.followUp({ content: 'The answer was '+pokeName+" you're all wrong" });
                    })
            })
        })
    }
};