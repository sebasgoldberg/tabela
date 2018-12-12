import UIComponent from "sap/ui/core/UIComponent";
import models from "sap/ui/demo/basicTemplate/model/models";

export default UIComponent.extend("sap.ui.demo.basicTemplate.Component", {

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

