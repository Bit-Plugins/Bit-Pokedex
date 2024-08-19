const { SlashCommandBuilder, ButtonBuilder, EmbedBuilder, Permission, MessageButton, AttachmentBuilder  } = require('discord.js');
const { createCanvas, Image, GlobalFonts, loadImage } = require('@napi-rs/canvas');
const fs = require('fs');
const { readFile } = require('fs/promises');
const { request } = require('undici');
const Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

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
        var fileExists = false;
        interaction.deferReply();
        var form = pokemonChoice;
        var gen = 8;
        var flavorNumber = 0;
        var continueGeneration = true;

        function wait(ms){
            var start = new Date().getTime();
            var end = start;
            while(end < start + ms) {
              end = new Date().getTime();
           }
         }

        let pokemon = pokemonChoice.toLowerCase().replaceAll(" ", "-");

        fs.stat('./plugins/dismon/assets/generatedImages/'+pokemon+'.png', function(err, stat) {
            if(err == null) {
                fileExists = true;
                console.log("File Exists")
            } else if(err.code === 'ENOET') {
                fileExists = false;
                console.log("File Does Not Exist")
            } else {
                fileExists = false;
                console.log("File Does Not Exist or is broken")
            }
        })

        setTimeout(function () {
            if(fileExists === true) {
                const attachment = new AttachmentBuilder("./plugins/dismon/assets/generatedImages/"+pokemon+".png");
                interaction.editReply({ files: [attachment]});
            } else {
                const applyText = (camvas, text) => {
                    const context = canvas.getContext('2d');
                    let fontSize = 70;
        
                    do {
                        context.font = `${fontSize -= 0}px sans-serif`;
                    } while (context.measureText(text).width > canvas.width - 300);
        
                    return context.font;
                };
        
                function splitString(str, numWords) {
                    let words = str.split(' ');
                    let firstWords = words.slice(0, numWords);
                    let remainingWords = words.slice(numWords).join(' ');
                    return [firstWords.join(' '), remainingWords];
                }
        
                const canvas = createCanvas(1920, 1080);
                const context = canvas.getContext('2d');

                //const descriptionBackgroundImage = loadImage('./plugins/dismon/assets/images/descriptionBackground.png');

                const descriptionBackgroundFile = fs.readFileSync('./plugins/dismon/assets/images/descriptionBackground.png')
                const descriptionBackgroundImage = new Image()
                descriptionBackgroundImage.src = descriptionBackgroundFile
                context.drawImage(descriptionBackgroundImage, 30, 868, 840, 182)

                const titleBackgroundFile = fs.readFileSync('./plugins/dismon/assets/images/titleBackground.png')
                const titleBackgroundImage = new Image()
                titleBackgroundImage.src = titleBackgroundFile
                context.drawImage(titleBackgroundImage, 1276, 30, 612, 63)

                const infoBackgroundFile = fs.readFileSync('./plugins/dismon/assets/images/infoBackground.png')
                const infoBackgroundImage = new Image()
                infoBackgroundImage.src = infoBackgroundFile
                context.drawImage(infoBackgroundImage, 1276, 93, 612, 397)

                const seperaterFile = fs.readFileSync('./plugins/dismon/assets/images/seperater.png')
                const seperaterImage = new Image()
                seperaterImage.src = seperaterFile
                context.drawImage(seperaterImage, 1276, 93, 606, 0.5)
                context.drawImage(seperaterImage, 1276, 150, 606, 0.5)
                context.drawImage(seperaterImage, 1276, 200, 606, 0.5)
                context.drawImage(seperaterImage, 1276, 250, 606, 0.5)
                context.drawImage(seperaterImage, 1276, 300, 606, 0.5)
                context.drawImage(seperaterImage, 1276, 410, 606, 0.5)
        
                /*const descriptionBackground = readFile("./plugins/dismon/assets/images/descriptionBackground.png")
                const descriptionBackgroundImage = new Image();
                descriptionBackgroundImage.src = descriptionBackground;
                context.drawImage(descriptionBackgroundImage, 30, 868, 840, 182)

                console.log("descriptionBackground loaded")

                //const titleBackgroundImage = loadImage('./plugins/dismon/assets/images/titleBackground.png');
        
                const titleBackground = readFile("./plugins/dismon/assets/images/titleBackground.png")
                const titleBackgroundImage = new Image();
                titleBackgroundImage.src = titleBackground;
                context.drawImage(titleBackgroundImage, 1276, 30, 612, 63)

                console.log("titleBackground loaded")

                //const infoBackgroundImage = loadImage('./plugins/dismon/assets/images/infoBackground.png');
        
                const infoBackground = readFile("./plugins/dismon/assets/images/infoBackground.png")
                const infoBackgroundImage = new Image();
                infoBackgroundImage.src = infoBackground;
                context.drawImage(infoBackgroundImage, 1276, 93, 612, 397)

                console.log("infoBackground loaded")

                //const seperaterImage = loadImage('./plugins/dismon/assets/images/seperater.png');=
        
                const seperater = readFile("./plugins/dismon/assets/images/seperater.png")
                const seperaterImage = new Image();
                seperaterImage.src = seperater*/
                console.log("Well at least it loads the images :)")
        
                context.letterSpacing = "5px"
                context.font = `30px sans-serif`
                context.textAlign = "center"
                context.strokeStyle = "#ffffff";
                context.fillStyle = "#ffffff";
                context.lineWidth = 5;
                context.fillText("Egg Groups", 1375, 200+25);
                        
                context.letterSpacing = "5px"
                context.font = `30px sans-serif`
                context.textAlign = "center"
                context.strokeStyle = "#ffffff";
                context.fillStyle = "#ffffff";
                context.lineWidth = 5;
                context.fillText("Catch Rate", 1375, 250+25);
        
                context.letterSpacing = "5px"
                context.font = `30px sans-serif`
                context.textAlign = "center"
                context.strokeStyle = "#ffffff";
                context.fillStyle = "#ffffff";
                context.lineWidth = 5;
                context.fillText("Height", 1375, 100+25);
        
                context.letterSpacing = "5px"
                context.font = `30px sans-serif`
                context.textAlign = "center"
                context.strokeStyle = "#ffffff";
                context.fillStyle = "#ffffff";
                context.lineWidth = 5;
                context.fillText("Abilities", 1375, 330+25);
        
                context.letterSpacing = "5px"
                context.font = `30px sans-serif`
                context.textAlign = "center"
                context.strokeStyle = "#ffffff";
                context.fillStyle = "#ffffff";
                context.lineWidth = 5;
                context.fillText("Weight", 1375, 150+25);
        
                var description
        
                P.getPokemonSpeciesByName(pokemon)
                    .then(function(response) {
                        var imgURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+response.pokedex_numbers[0].entry_number+".png"
        
                        const { body } = request(imgURL);
                        const avatar = loadImage(imgURL).then((image) => {
                            context.drawImage(image, 30, 30, 747, 747)
                        })
                        //const avatarURL = loadImage(imgURL)
        
                        //context.drawImage(avatar, 30, 30, 747, 747)
        
                        for(var i = 0; i < response.flavor_text_entries.length; i++) {
                            if(response.flavor_text_entries[i].language.name === "en") {
                                flavorNumber = i;
                                break;
                            }
                        }
        
                        description = response.flavor_text_entries[flavorNumber].flavor_text.toString().replaceAll("\u000c", " ")
                        descriptionSplit = splitString(description, 5)
        
                        let descriptionOne = descriptionSplit[0]
                        let descriptionTwo = splitString(descriptionSplit[1], 5)[0]
                        let descriptionThree = splitString(descriptionSplit[1], 5)[1]
        
                        context.letterSpacing = "5px"
                        context.font = `40px sans-serif`
                        context.textAlign = "center"
                        context.strokeStyle = "#ffffff";
                        context.fillStyle = "#ffffff";
                        context.lineWidth = 5;
                        context.fillText(descriptionOne, 450, 878+25);
                        context.fillText(descriptionTwo, 450, 928+25);
                        context.fillText(descriptionThree, 450, 978+25);
        
                        context.letterSpacing = "5px"
                        context.font = `25px sans-serif`
                        context.textAlign = "center"
                        context.strokeStyle = "#ffffff";
                        context.fillStyle = "#ffffff";
                        context.lineWidth = 5;
                        context.fillText(response.egg_groups[0].name, 1602, 200+25);
        
                        context.letterSpacing = "5px"
                        context.font = `25px sans-serif`
                        context.textAlign = "center"
                        context.strokeStyle = "#ffffff";
                        context.fillStyle = "#ffffff";
                        context.lineWidth = 5;
                        context.fillText(response.capture_rate.toString(), 1602, 250+25);
        
                        context.letterSpacing = "5px"
                        context.font = `50px sans-serif`
                        context.textAlign = "center"
                        context.strokeStyle = "#ffffff";
                        context.fillStyle = "#ffffff";
                        context.lineWidth = 5;
                        context.fillText(`No ${response.pokedex_numbers[0].entry_number} ${response.name}`, 1577, 30+50);
                    }).catch((err) => {
                        if(err.response.status === 404) {
                            setTimeout(function () {
                                continueGeneration = false;
                                return interaction.editReply({
                                    content: "That pokemon could not be found!"
                                })
                            }, 2000)
                        } else {
                            console.log(err)
                        }
                    })
                P.getPokemonByName(pokemon)
                    .then(function(response) {
        
                        var abilityOne = "s"
                        var abilityTwo = "s"
                        var hiddenAbility = "s"
        
                        if(response.abilities[1].is_hidden === true) {
                            abilityTwo = "Hidden: "+response.abilities[1].ability.name
                        } else {
                            hiddenAbility = "Hidden: "+response.abilities[2].ability.name
                            abilityTwo = "2: "+response.abilities[1].ability.name
                        }
        
                        context.letterSpacing = "5px"
                        context.font = `25px sans-serif`
                        context.textAlign = "center"
                        context.strokeStyle = "#ffffff";
                        context.fillStyle = "#ffffff";
                        context.lineWidth = 5;
                        context.fillText(`${response.height / 10}m`, 1602, 100+25);
        
                        context.letterSpacing = "5px"
                        context.font = `25px sans-serif`
                        context.textAlign = "center"
                        context.strokeStyle = "#ffffff";
                        context.fillStyle = "#ffffff";
                        context.lineWidth = 5;
                        context.fillText(`${response.weight / 10}kg`, 1602, 150+25);
        
                        context.letterSpacing = "5px"
                        context.font = `25px sans-serif`
                        context.textAlign = "center"
                        context.strokeStyle = "#ffffff";
                        context.fillStyle = "#ffffff";
                        context.lineWidth = 5;
                        context.fillText("1: "+response.abilities[0].ability.name, 1602, 300+25);
        
                        context.letterSpacing = "5px"
                        context.font = `25px sans-serif`
                        context.textAlign = "center"
                        context.strokeStyle = "#ffffff";
                        context.fillStyle = "#ffffff";
                        context.lineWidth = 5;
                        context.fillText(abilityTwo, 1602, 330+25);
        
                        context.letterSpacing = "5px"
                        context.font = `25px sans-serif`
                        context.textAlign = "center"
                        context.strokeStyle = "#ffffff";
                        context.fillStyle = "#ffffff";
                        context.lineWidth = 5;
                        context.fillText(hiddenAbility, 1602, 360+25);
        
                        context.letterSpacing = "5px"
                        context.font = `30px sans-serif`
                        context.textAlign = "center"
                        context.strokeStyle = "#ffffff";
                        context.fillStyle = "#ffffff";
                        context.lineWidth = 5;
                        context.fillText(`HP: ${response.stats[0].base_stat}`, 1377, 410+25);
        
                        context.letterSpacing = "5px"
                        context.font = `30px sans-serif`
                        context.textAlign = "center"
                        context.strokeStyle = "#ffffff";
                        context.fillStyle = "#ffffff";
                        context.lineWidth = 5;
                        context.fillText(`Atk: ${response.stats[1].base_stat}`, 1581, 410+25);
        
                        context.letterSpacing = "5px"
                        context.font = `30px sans-serif`
                        context.textAlign = "center"
                        context.strokeStyle = "#ffffff";
                        context.fillStyle = "#ffffff";
                        context.lineWidth = 5;
                        context.fillText(`Def: ${response.stats[2].base_stat}`, 1785, 410+25);
        
                        context.letterSpacing = "5px"
                        context.font = `30px sans-serif`
                        context.textAlign = "center"
                        context.strokeStyle = "#ffffff";
                        context.fillStyle = "#ffffff";
                        context.lineWidth = 5;
                        context.fillText(`Speed: ${response.stats[5].base_stat}`, 1377, 450+25);
        
                        context.letterSpacing = "5px"
                        context.font = `30px sans-serif`
                        context.textAlign = "center"
                        context.strokeStyle = "#ffffff";
                        context.fillStyle = "#ffffff";
                        context.lineWidth = 5;
                        context.fillText(`SP Atk: ${response.stats[3].base_stat}`, 1581, 450+25);
        
                        context.letterSpacing = "5px"
                        context.font = `30px sans-serif`
                        context.textAlign = "center"
                        context.strokeStyle = "#ffffff";
                        context.fillStyle = "#ffffff";
                        context.lineWidth = 5;
                        context.fillText(`SP Def: ${response.stats[4].base_stat}`, 1785, 450+25);
                    }).catch((err) => {
                        if(err.response.status === 404) {
                            setTimeout(function () {
                                continueGeneration = false;
                                return interaction.editReply({
                                    content: "That pokemon could not be found!"
                                })
                            }, 2000)
                        } else {
                            console.log(err)
                        }
                    })
        
                    setTimeout(function () {
                        if(continueGeneration) {
                            const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), { name: pokemon+'.png' });

                            fs.writeFileSync('./plugins/dismon/assets/generatedImages/'+pokemon+".png", canvas.toBuffer('image/png'))
                            interaction.editReply({ files: [attachment]});
                        }
                    }, 5000)
            }
        }, 3000)
    }
}