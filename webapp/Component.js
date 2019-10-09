import UIComponent from "simplifique/telaneg/custos/Component";
import models from "simplifique/telaneg/tabela/model/models";
import TabelasImportadasDialog from "simplifique/telaneg/tabela/controller/TabelasImportadasDialog";
import EnvioEmailDialog from "simplifique/telaneg/tabela/controller/EnvioEmailDialog";

export default UIComponent.extend("simplifique.telaneg.tabela.Component", {

    metadata: {
        manifest: "json"
    },

    /**
     * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
     * @public
     * @override
     */
    init: function() {

        // call the base component's init function
        UIComponent.prototype.init.apply(this, arguments);

        this._tabelasImportadasDialog = new TabelasImportadasDialog(this.getRootControl());
        this._envioEmailDialog = new EnvioEmailDialog(this.getRootControl());

        // set the device model
        this.setModel(models.createDeviceModel(), "device");
    },

    getTabelasImportadasDialog: function() {
        return this._tabelasImportadasDialog;
    },

    getEnvioEmailDialog: function() {
        return this._envioEmailDialog;
    }

});

