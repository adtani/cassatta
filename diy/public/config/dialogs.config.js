(function () {
    'use strict';

    var app = angular.module('angularApp');
    
    app.config(['dialogsProvider','$translateProvider', 'AppConfig', dialogsConfig]);

    function dialogsConfig(dialogsProvider, $translateProvider, AppConfig) {
    	
		dialogsProvider.useBackdrop('static');
		dialogsProvider.useEscClose(true);
		dialogsProvider.useCopy(false);
		dialogsProvider.setSize('sm');

//		$translateProvider.translations('es',{
//			DIALOGS_ERROR: "Error",
//			DIALOGS_ERROR_MSG: "Se ha producido un error desconocido.",
//			DIALOGS_CLOSE: "Cerca",
//			DIALOGS_PLEASE_WAIT: "Espere por favor",
//			DIALOGS_PLEASE_WAIT_ELIPS: "Espere por favor...",
//			DIALOGS_PLEASE_WAIT_MSG: "Esperando en la operacion para completar.",
//			DIALOGS_PERCENT_COMPLETE: "% Completado",
//			DIALOGS_NOTIFICATION: "Notificacion",
//			DIALOGS_NOTIFICATION_MSG: "Notificacion de aplicacion Desconocido.",
//			DIALOGS_CONFIRMATION: "Confirmacion",
//			DIALOGS_CONFIRMATION_MSG: "Se requiere confirmacion.",
//			DIALOGS_OK: "Bueno",
//			DIALOGS_YES: "Si",
//			DIALOGS_NO: "No"
//		});
//
//		$translateProvider.preferredLanguage('en-US');

    };
    
})();

