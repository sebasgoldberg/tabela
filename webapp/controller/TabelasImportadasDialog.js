import AnexosBaseDialog from "simplifique/telaneg/base/controller/AnexosBaseDialog";

export default AnexosBaseDialog.extend("simplifique.telaneg.tabela.controller.TabelasImportadasDialog",{

    constructor : function (oView) {
        AnexosBaseDialog.prototype.constructor.call(this, oView,
            "simplifique.telaneg.tabela.view.TabelasImportadas", "tabelasImportadas", "UploadCollectionTabelasImportadas");
    },

    onTabelaImportadaDetails: function(oEvent) {
        let sTabelaImportadaPath = oEvent.getSource().getBindingContext().getPath();
        let tabelaImportadaDialog = this.getOwnerComponent().getTabelaImportadaDialog();
        tabelaImportadaDialog.open(sTabelaImportadaPath);

        //url="{
        //    parts: [ {path: 'Item'} ],
        //    formatter: '.formatter.urlAnexoForDownload'
        //    }"
    },

    onUploadComplete: function() {
        AnexosBaseDialog.prototype.onUploadComplete.apply(this);
        this._callerController.refreshItems();
        this._callerController.refreshItemsFilters();
        this._callerController.refreshFornecedores();
        this._callerController.refreshVariacaoCusto();
    },

    setCallerController: function(oController) {
        this._callerController = oController;
    },
});

