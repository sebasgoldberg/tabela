import formatter from 'simplifique/telaneg/tabela/model/formatter';
import Controller from "simplifique/telaneg/custos/controller/TaskDetail.controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import FilterType from 'sap/ui/model/FilterType';
import MessageToast from 'sap/m/MessageToast';


export default Controller.extend("simplifique.telaneg.tabela.controller.TaskDetail", {

    formatter: formatter,

    onInit: function(...args) {
        Controller.prototype.onInit.apply(this, ...args);
        this.getView().setModel(new JSONModel({
            SemICMS: false,
        }), 'view_tab');
    },

    getNegociacaoSetExpandAttr: function() {
        return 'tipoNegociacao,fornecedor,status,bandeira,comentarioImpressao,agregacao';
    },

    onMostrarAnexos: function(oEvent) {
        let sNegociacaoPath = this.getView().getBindingContext().getPath();
        let oTabelasImportadasDialog = this.getOwnerComponent().getTabelasImportadasDialog();
        oTabelasImportadasDialog.setCallerController(this);
        oTabelasImportadasDialog.open(sNegociacaoPath);
    },

    refreshResumo: function() {
        this.getView().byId('resumoTreeTable').getBinding('rows').refresh();
    },

    refreshVariacaoCusto: function() {
        this.getView().byId('variacaoCustoTreeTable').getBinding('rows').refresh();
    },

    onDeleteFornecedorAdicional: async function(oEvent) {
        let bEliminacaoRealizada = await Controller.prototype.onDeleteFornecedorAdicional.apply(this, oEvent);
        if (bEliminacaoRealizada){
            this.refreshItems();
            this.refreshItemsFilters();
            this.refreshVariacaoCusto();
        }
    },

    onAddFornecedorAdicional: async function(oEvent) {
        let bAdicaoRealizada = await Controller.prototype.onAddFornecedorAdicional.apply(this, oEvent);
        if (bAdicaoRealizada){
            this.refreshItems();
            this.refreshItemsFilters();
            this.refreshVariacaoCusto();
        }
    },

    refreshFornecedores: function() {
        this.getView()
            .byId('fornecedoresAdicionaisTable')
            .getBinding('items')
            .refresh();
    },

    onNavigateToNegociacaoFilha: function(oEvent) {
        let oListItem = oEvent.getParameter('listItem');
        let sNegociacaoID = oListItem.getBindingContext().getObject().ID;
        this.navTo('TaskDetail', {negociacaoID: sNegociacaoID});
    },

    onNavigatePai: function(oEvent) {
        let sNegociacaoID = this.getView().getBindingContext().getObject().Pai;
        this.navTo('TaskDetail', {negociacaoID: sNegociacaoID});
    },

    onEnviarTabela: function() {
        return this.changeStatusNegociacao({
            temCertezaOptions: {
                pergunta: "Tem certeza que deseja enviar a tabela para analises?",
                titulo: "Enviar Tabela Para Analises",
            },
            successMessage: "Tabela enviada para analises realizado com sucesso.",
            errorMessage: "Aconteceram erros ao tentar enviar a tabela para analises."
            });
    },

    onIniciarAnalises: function() {
        return this.changeStatusNegociacao({
            temCertezaOptions: {
                pergunta: "Tem certeza que deseja iniciar o analises?",
                titulo: "Iniciar Analises",
            },
            functionImportPath: '/IniciarAnalises',
            successMessage: "Tarefas de inicio de analises realizadas com sucesso.",
            errorMessage: "Aconteceram erros ao tentar executar as tarefas de inicio de analises."
            });
    },

    onEnviarParaAprovacao: function() {
        return this.changeStatusNegociacao({
            temCertezaOptions: {
                pergunta: "Tem certeza que deseja enviar a tabela para aprovação?",
                titulo: "Enviar Tabela Para Aprovação",
            },
            successMessage: "Tabela enviada para aprovação realizado com sucesso.",
            errorMessage: "Aconteceram erros ao tentar enviar a tabela para aprovação."
            });
    },

    onAprovar: function() {
        return this.changeStatusNegociacao({
            temCertezaOptions: {
                pergunta: "Tem certeza que deseja aprovar a tabela?",
                titulo: "Aprovar Tabela",
            },
            functionImportPath: '/AprovarNegociacao',
            successMessage: "Tabela aprovada com sucesso.",
            errorMessage: "Aconteceram erros ao tentar aprovar a tabela.",
            });
    },

    onRenegociar: function() {
        return this.changeStatusNegociacao({
            temCertezaOptions: {
                pergunta: "Tem certeza que deseja enviar a tabela para ser analisada novamente?",
                titulo: "Renegociar Tabela",
            },
            functionImportPath: '/AnalisarNovamente',
            successMessage: "Tabela enviada para ser analisada novamente, feito com sucesso.",
            errorMessage: "Aconteceram erros ao tentar enviar a tabela para ser analisada novamente.",
            });
    },


    onRejeitar: function() {
        return this.changeStatusNegociacao({
            temCertezaOptions: {
                pergunta: "Tem certeza que deseja rejeitar a tabela?",
                titulo: "Rejeitar Tabela",
            },
            functionImportPath: '/RejeitarNegociacao',
            successMessage: "Tabela rejeitada com sucesso.",
            errorMessage: "Aconteceram erros ao tentar rejeitar a tabela."
            });
    },

    onEliminarItensSelecionados: async function() {
        await Controller.prototype.onEliminarItensSelecionados.apply(this);
        this.refreshItemsFilters();
    },

    setItemsFilters: function(aFilters) {
        Controller.prototype.setItemsFilters.call(this, aFilters);
        this.getView().byId('ComparativoUFTable').getBinding('rows').filter(aFilters, FilterType.Application);
    },

    onSolicitarPesquisa: function(oEvent) {

        let v = this.getView();

        let oNegociacao = v.getBindingContext().getObject();

        // Sugerimos o assunto
        this.getModel('mail').setProperty('/assunto',`Pesquisa de Preço - Negociação ${oNegociacao.ID}`);

        // Sugerimos o corpo
        let oTree = this.getView().byId('treeTable');
        let sBorder = "border: 1px solid black;";
        let sTableStyle = `style="margin: 1em; ${sBorder}"`
        let sCellStyle = `style="padding: 5px; ${sBorder}"`;
        let sHtmlRowsItemsSelecionados = oTree.getSelectedIndices()
            .map( index => oTree.getContextByIndex(index) )
            .map( bc => bc.getObject() )
            .reduce( (sHtml, oItem) => `${sHtml}
                <tr>
                    <td ${sCellStyle}>${oItem.OrgID}</td>
                    <td ${sCellStyle}>${oItem.FornecedorID}</td>
                    <td ${sCellStyle}>${oItem.MaterialID}</td>
                </tr>
                `, '');

        if (!sHtmlRowsItemsSelecionados){
            MessageToast.show('Deve selecionar os itens nos quais aplicaria a pesquisa.');
            return;
        }

        this.getModel('mail').setProperty('/corpo',`
            <p>Estimado(s),</p>
            <p>Solicitamos por favor a pesquisa de preço de venda dos seguintes items associados a negociação ${oNegociacao.ID}</p>
            <p>
            <table ${sTableStyle}>
                <tr>
                    <th ${sCellStyle}>UF</th>
                    <th ${sCellStyle}>Fornecedor</th>
                    <th ${sCellStyle}>Material</th>
                </tr>
                ${sHtmlRowsItemsSelecionados}
            </table>
            <p>Agradeço desde já sua colaboração.</p>
            <p>Att.</p>
        `);
        
        this.onEnviarEmail();
    },

    doSortItemsNegociacao: function(aSorters) {

        Controller.prototype.doSortItemsNegociacao.apply(this, aSorters);
        this
            .getView()
            .byId('ComparativoUFTable')
            .getBinding("rows")
            .sort(aSorters);
        
    },

    onAtualizarIC: async function(oEvent) {
        if (await this.simularItemsSelecionados({
            successMessage: 'Atualização de IC realizada para os itens selecionados.',
            errorMessage: 'Aconteceu um erro ao tentar atualizar o IC dos itens selecionados.',
            }))
            this.refreshResumo();
    },

    onExportarVariacaoCusto: function(oEvent) {
        this.onGetAgregacaoExportada(oEvent);
    },

    onExportarResumo: function(oEvent) {
        this.onGetAgregacaoExportada(oEvent);
    },

    onExportarItems: function(oEvent) {
        this.onGetItemsExportados(oEvent);
    },

    refreshLogImportacao: function() {
        this.getView()
            .byId('ultimoLogImportacaoTable')
            .getBinding('rows')
            .refresh();
    },

});

