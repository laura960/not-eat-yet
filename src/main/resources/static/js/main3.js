$(document).ready(function(){
	
	let idLogin = -1
	let dettaglioOn = false
	let dettaglioPiattoOn = false
	const listaCategorie = ['antipasto', 'primo', 'secondo', 'fritti', 'pizza', 'kebab', 'sushi', 'contorno', 'dolce', 'bevande']
	
	
	// GET PARAMETRI URL
//	
//	var getUrlParameter = function getUrlParameter(sParam) {
//	    var sPageURL = window.location.search.substring(1),
//	        sURLVariables = sPageURL.split('&'),
//	        sParameterName,
//	        i;
//
//	    for (i = 0; i < sURLVariables.length; i++) {
//	        sParameterName = sURLVariables[i].split('=');
//
//	        if (sParameterName[0] === sParam) {
//	            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
//	        }
//	    }
//	};
	
	
	// LOGIN
	
	$('body').on('click', '#modal-login', function(){
		const url = "/login.html";    
		$(location).attr('href',url);
	})
	
	
	// LOGOUT
	
	$('body').on('click', '#id-button-logout', function(){
		idLogin = -1
		utente = false
	})
	
	// SIGN IN
	
	$('body').on('click', '#modal-registrati', function(){
		const url = "/signup.html";    
		$(location).attr('href',url);
	})
	
	// MODALE RISTORANTE
	
	$('body').on('click', '.menu', function(){
		const idRistorante = $(this).attr('data-id')
		let nomeRistorante = $(this).attr('nome-ristorante')
		getModaleRistorante(idRistorante, nomeRistorante)
	})
	
	function getModaleRistorante(idRistorante, nomeRistorante){
		
		dettaglioOn = false
		dettaglioPiattoOn = false
		
		$('#titolo-modale').text(nomeRistorante)
		
		$('#render-menu').html('')
		getPiatti(idRistorante)
		
		$('.render-dettaglio-piatto').html('')
		
		$('#bottoni-modale').html('')
		caricaBottoni(idRistorante)
		
		$('#modaleRistorante').css('display', 'block')
		
	}
	
	
	function caricaBottoni(id){
		
			$(`
					 <button class='dettaglio-ristorante btn-dmea' id-ristorante='${id}'>Dettagli Ristorante</button>
					 <button class='modale-recensioni btn-dmea' id-ristorante='${id}'>Recensioni</button>
			         `
					).appendTo('#bottoni-modale')
		
	}
	
	$('#close-modal').on('click', function(){
		$('#modaleRistorante').css('display', 'none')
		$('.render-dettaglio-ristorante').html('')
	})
	
	// MODALE RECENSIONI
	
	$('body').on('click', '.modale-recensioni', function(){
		const idRistorante = $(this).attr('id-ristorante')
		
		getModaleRecensioni(idRistorante)
				
	})
	
	function getModaleRecensioni(idRistorante){
		$('#titolo-modale-recensioni').text('Recensioni')		
		
		$('#bottoni-modale-recensioni')
			.html(`<a href="/aggiungi_recensione.html?id=${idRistorante}"><button class='button bottone-recensione login'>Scrivi una recensione</button></a>`)
		
		$('#render-recensioni').html('')
		getRecensioni(idRistorante)
		
		
		$('#modale-recensioni').css('display', 'block')
	}
	
	
	$('.close').on('click', function(){
		$('#modale-recensioni').css('display', 'none')
	})
	
	// RECENSIONI
	
	// Get recensioni
	
	function getRecensioni(idRistorante){
		$.get(`recensioni?idRistorante=${idRistorante}`, function(res){
			
			if(res.length == 0){
				$(`
					<p>Nessuna recensione disponibile</p>
					`).appendTo('#render-recensioni')
			} else {
				for(let i = 0; i < res.length; i++){
						$(`
								<div>
								<li>
								<h4><strong>${res[i].titolo}</strong></h4>
								<p>Autore: ${res[i].nomeUtente}</p>
								<p>Voto: ${res[i].rating}</p>
								<p>${res[i].comment}</p>
								</li>
								<br><br>
								<div class='risposta-recensione-${res[i].id}' style='margin-left: 25px;'></div>
								</div>
								<br>
							`).prependTo('#render-recensioni')
					
					 getRisposte(res[i].id)
				}
			}
			
		})
	}
	
//	$('body').on('click', '.elimina-recensione', function(){
//		
//		const idRecensione = $(this).attr('id-recensione')
//		
//		eliminaRecensione(idRecensione, $(this).parent())
//		
//		
//	})
//	
//	function eliminaRecensione(idRecensione, htmlRow){
//		$.ajax({
//			url: `recensioni/${idRecensione}`,
//			type: 'DELETE',
//			success: function(){
//				htmlRow.remove()
//			},
//			error: function(){
//				alert("Non hai il permesso di utilizzare questo comando, accedi con le credenziali corrette")
//			}
//		})
//		
//	}
	
	$('body').on('click', '#add-recensione', function(){
		var idRistorante = getUrlParameter('id');
		const r = {
			titolo: $('#titolo-recensione').val(),
			comment: $('#testo-recensione').val(),
			rating: $("input[name='rating']:checked").val(),
			nomeUtente: $('#nome-utente').val(),
			ristorante: {
				"id": idRistorante 
			}
		}
		
		aggiungiRecensione(r)
		
		$('#titolo-recensione').val('')
		$('#testo-recensione').val('')
		$("input[name='rating']:checked").val('')
		$('#nome-utente').val('')
		
	})
	
	function aggiungiRecensione(r){
		
		$.ajax({
			url: '/recensioni',
            type: 'POST',
            data: JSON.stringify(r),
            contentType: 'application/json',
            dataType: 'json',
            success: function(data) {
            	const url = `/elencoristoranti.html`;    
        		$(location).attr('href',url)
            },
			error: function(){
				alert("Inserimento non andato a buon fine");
			}
		})
		
	}
	
// Risposta
	
//	$('body').on('click', '.render-form-risposta', function(){
//		const idRecensione = $(this).attr('id-recensione')
//		
//	if(!aggiungiRispostaOn){
//		
//		$(`	
//				<textarea id="risposta-recensione" rows="4" cols="50" placeholder='Scrivi una risposta...'></textarea>
//				<br><button id='add-risposta' id-recensione='${idRecensione}'>Pubblica</button><br><br>
//		`).prependTo(`.risposta-recensione-${idRecensione}`)
//		
//		aggiungiRispostaOn = true
//		
//	} else {
//		$(`.risposta-recensione-${idRecensione}`).html('')
//		aggiungiRispostaOn = false
//		
//		getRisposte(idRecensione)
//		
//	}
//		
//		
//	})
	
	
	
	function getRisposte(idRecensione){
		
		$.get(`risposte?idRecensione=${idRecensione}`, function(res){
			for(let i = 0; i < res.length; i++){
					$(`
							<div>
							<p>${res[i].comment}</p>
							</div>
						`).appendTo(`.risposta-recensione-${idRecensione}`)
				
			}
		})
		
	}
	
	// RISTORANTI
	
	// Get Ristoranti
	
	function getRistoranti(){
		 $.get('ristoranti', function(res){
			 
	            for(let i = 0; i < res.length; i++){
	                    $(`
		                    <dd> 
		                    <button class="menu list-button" data-id='${res[i].id}' nome-ristorante='${res[i].nome}'>
	                    			${res[i].nome}
	                    	</button>
		                    <p><strong>Regione</strong>: ${res[i].regione}</p>
	                    	<p><strong>Città</strong>: ${res[i].citta}<p>
	                    	<br>
		                    </dd>
	                    `).appendTo(`#lista-${res[i].categoria}`)
	                    .appendTo(`#lista-ristoranti`)
	            }
	        })
	}
	
	function getAllRistoranti(){
		$.get('ristoranti', function(res){
			
			for(let i = 0; i < res.length; i++){
				$(`
						<dd> 
						<button class="menu list-button" data-id='${res[i].id}' nome-ristorante='${res[i].nome}'>
						${res[i].nome}
						</button>
						<p><strong>Categoria</strong>: ${res[i].categoria}</p>
						<p><strong>Regione</strong>: ${res[i].regione}</p>
						<p><strong>Città</strong>: ${res[i].citta}<p>
						<br>
						</dd>
				`).appendTo(`#lista-ristoranti`)
			}
		})
	}
	
	getRistoranti()
	getAllRistoranti()
	
	function getRistorante(id){
		$.get(`ristoranti/${id}`, function(res){
			$(`	<br>
				<h3>Dettagli Ristorante</h3>
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
	
	$('body').on('click', '.dettaglio-ristorante', function(){
		
		if(!dettaglioOn){
			let idRistorante = $(this).attr('id-ristorante')
			getRistorante(idRistorante)
			dettaglioOn = true
		} else {
			$('.render-dettaglio-ristorante').html('')
			dettaglioOn = false
		}
	})
		
	// CRUD PIATTI
		
	function getPiatti(idRistorante){
		
		$.get(`piatti?idRistorante=${idRistorante}`, function(res){
			
			if(res.length == 0){
				$(`
					<p>Nessun piatto disponibile</p>
					`).appendTo('#render-menu')
			} else {
				
				for(let j = 0; j < listaCategorie.length; j++){
					
					for(let i = 0; i < res.length; i++){
						if(res[i].categoria == listaCategorie[j]){
							$(`#render-menu-${res[i].categoria}`).html('')
							$(`<br><p style='text-transform: capitalize'><strong><i>${listaCategorie[j]}</i></strong></p>`).appendTo(`#render-menu-${res[i].categoria}`)
						}
					}
				}
				
				for(let i = 0; i < res.length; i++){
				$(`	<li class ='riga-piatto${res[i].id}'>
						${res[i].nome}
						<button class='dettaglio-piatto' id-piatto=${res[i].id} id-ristorante=${idRistorante}>Dettaglio</button>
					</li>
					`).appendTo(`#render-menu-${res[i].categoria}`)
				}
			}
			
			
		})
		
	}

	function getPiatto(id){
		$.get(`piatti/${id}`, function(res){
			$(`	<h4>Dettagli Piatto</h4>
				<br>
				<p><strong>Nome</strong>: ${res.nome}<p>
				<p><strong>Categoria</strong>: ${res.categoria}<p>
				<p><strong>Ingredienti</strong>: ${res.ingredienti}<p>
				<p><strong>Prezzo</strong>: ${res.prezzo} &euro;<p>
				<br><br>
              `)
              .appendTo('.render-dettaglio-piatto')
		})
	}

	
	// Dettagli Piatto
	
	$('body').on('click', '.dettaglio-piatto', function(){
		const idPiatto = $(this).attr('id-piatto')
		
		if(!dettaglioPiattoOn){
			let idPiatto = $(this).attr('id-piatto')
			const id = $(this).attr('data-id')
			// piattoId = id
			getPiatto(idPiatto)
			dettaglioPiattoOn = true
		} else {
			$(`.render-dettaglio-piatto`).html('')
			dettaglioPiattoOn = false
		}
		
	})
	
	
})
