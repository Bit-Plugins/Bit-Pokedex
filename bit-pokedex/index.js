const core = require("bit/core");

module.exports = {
    define_intents: function define_intents() {
        core.log(0, "Byte Utilities", true, "Installing Node Modules!")
        core.install_module('pokedex-promise-v2@3.3.2')
        core.install_module('dismondb@4.0.4')
    }
}