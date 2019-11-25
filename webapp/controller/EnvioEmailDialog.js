import BaseDialog from "simplifique/telaneg/base/controller/BaseDialog";

export default BaseDialog.extend("simplifique.telaneg.base.controller.EnvioEmailDialog",{

    constructor : function (oView) {
        BaseDialog.prototype.constructor.call(this,
            oView, "simplifique.telaneg.tabela.view.EnvioEmailDialog");
    },

    onEnviar: function(oEvent){
        this.resolve(true);
        this.dialog.close();
    },

});



