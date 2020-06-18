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
	
	
	const idRistorante = getUrlParameter('idRistorante')
	const idPiatto = getUrlParameter('idPiatto')
	
	
	function getPiatto(id){
		$.get(`piatti/${id}`, function(res){
			$(`	<br>
				<h3>Piatto selezionato:</h3>
				<br>
				<p><strong>Nome</strong>: ${res.nome}<p>
				<p><strong>Categoria</strong>: ${res.categoria}<p>
				<p><strong>Ingredienti</strong>: ${res.ingredienti}<p>
				<p><strong>Prezzo</strong>: ${res.prezzo} &euro;<p>
				<br><br>
              `)
              .appendTo('.render-dettaglio-piatto')
              
		})
		
		
		console.log('idRistorante:')
		console.log(idRistorante)
	}

	getPiatto(idPiatto)
	
	function getBottoni(){
		$(`
				<button class='elimina-piatto2 button'>Sì</button>
				<button class='button'><a style='text-decoration:none; color: black;' href='/'>No, torna alla Home</a></button>
				
		`).appendTo('.sei-sicuro')
	}
	
	getBottoni()
	
	$('body').on('click', '.elimina-piatto2', function(){
		
		deletePiatto(idPiatto)
		
		
	})
	
	function deletePiatto(idPiatto){
		$.ajax({
			url: `piatti/${idPiatto}`,
			type: 'DELETE',
			success: function(){
				const url = `/pannello_ristorante.html`;   
        		$(location).attr('href',url)
        		
//        		$.getScript("js/main2.js", function(){
//        			setTimeOut(getModaleRistorante(34), 2000) 
//        		})
        		
			},
			error: function(){
				alert("Qualcosa è andato storto");
			}
			
		})
	}
	

})