import UIComponent from "simplifique/telaneg/custos/Component";
import models from "simplifique/telaneg/tabela/model/models";

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

        // set the device model
        this.setModel(models.createDeviceModel(), "device");
    }

});

