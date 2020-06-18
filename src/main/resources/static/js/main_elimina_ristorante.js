$(document).ready(function(){
	
// GET PARAMETRI URL
	
	var getUrlParameter = function getUrlParameter(sParam) {
	    var sPageURL = window.location.search.substring(1),
	        sURLVariables = sPageURL.split('&'),
	        sParameterName,
	        i;

	    for (i = 0; i < sURLVariables.length; i++) {
	        sParameterName = sURLVariables[i].split('=');

	        if (sParameterName[0] === sParam) {
	            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
	        }
	    }
	};
	
	
	const idRistorante = getUrlParameter('id')
	
	function getRistorante(id){
		$.get(`ristoranti/${id}`, function(res){
			$(`	<br>
				<h3>Ristorante selezionato:</h3>
				<br>
				<p><strong>Nome</strong>: ${res.nome}<p>
				<p><strong>Categoria</strong>: ${res.categoria}<p>
				<p><strong>Ragione sociale</strong>: ${res.ragioneSociale}<p>
				<p><strong>Partita IVA</strong>: ${res.pIva}<p>
				<p><strong>Regione</strong>: ${res.regione}<p>
				<p><strong>Città</strong>: ${res.citta}<p>
				<p><strong>Indirizzo</strong>: ${res.via}, ${res.nCivico}<p>
				<br><br>
              `)
              .appendTo('.render-dettaglio-ristorante')
		})
	}
	
	
	getRistorante(idRistorante)
	
	function getBottoni(){
		$(`
				<button class='elimina-ristorante2 button'>Sì</button>
				<button class='button'><a style='text-decoration:none; color: black;' href='/'>No, torna alla Home</a></button>
				
		`).appendTo('.sei-sicuro')
	}
	
	getBottoni()
	
// Elimina Ristorante
	
	$('body').on('click', '.elimina-ristorante2', function(){
		
		deleteRistorante(idRistorante)
		
	})
		
	function deleteRistorante(idRistorante){
		$.ajax({
			url: `ristoranti/${idRistorante}`,
			type: 'DELETE',
			success: function(){
				const url = `/pannello_ristorante.html`;    
        		$(location).attr('href',url)
			},
			error: function(){
				alert("Qualcosa è andato storto")
			}
		})
	}
})








