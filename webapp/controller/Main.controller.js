sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("revolucao.controller.Main", {
            onInit: function () {
                var ImageList = {
                    Images: [
                        {
                            title: "Google",
                            url: "https://www.google.com"
                        }
                    ]
                };

                var ImageModel = new JSONModel(ImageList);
                this.getView().setModel(ImageModel, "ModeloImagem");
            },
            onPressBuscar: function(){
                //alert("comenzo la revolución de SAP Fiori!!");
                var onInputBusca = this.byId("inpBusca");
                var sQuery = onInputBusca.getValue();
                //alert(sQuery);

                $.ajax({
                    //Cabecera
                    url: "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI",
                    method: "GET",
                    async: true,
                    crossDomain: true,
                    jsonCallback: "getJSON",
                    contentType: "application/json",
                    headers: {
                        "X-RapidAPI-Key": "dbc70fe25fmshbad12428d5bc289p155399jsn5ee16126ff3e",
		                "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
                    },

                    //Cuerpo
                    data: {
                        "q": sQuery,
                        "pageNumber": 1,
                        "pageSize": 30,
                        "autoCorrect": true,
                        "safeSearch": true
                    },

                    //retorno en caso de suceso
                    success: function(data, textStatus){
                        var oImageModel = this.getView().getModel("ModeloImagem");
                        var oDadosImage = oImageModel.getData();

                        oDadosImage = {
                            Images: []
                        };
                        oImageModel.setData(oDadosImage);
                        debugger

                        var listaResultados = data.value;
                        var newItem;

                        for(var i = 0; i < listaResultados.length; i++ ){
                            
                            newItem = listaResultados[i];
                            oDadosImage.Images.push(newItem);

                        };

                        oImageModel.refresh();
                    }.bind(this),

                    //retorno en caso de error
                    error: function(){

                    }.bind(this)

                });//fin $.ajax({})
            }
        });
    });
