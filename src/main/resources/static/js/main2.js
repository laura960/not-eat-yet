$(document).ready(function(){
	
	let idLogin = -1
	let modificaRispostaOn = false
	let aggiungiRispostaOn = false
	let dettaglioOn = false
	let dettaglioPiattoOn = false
	const listaCategorie = ['antipasto', 'primo', 'secondo', 'fritti', 'pizza', 'kebab', 'sushi', 'contorno', 'dolce', 'bevande']
	
	getUtente()
	
	
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
			         <button class='modifica-ristorante btn-dmea' id-ristorante='${id}'>Modifica Ristorante</button>
			         <button class='elimina-ristorante btn-dmea' id-ristorante='${id}'>
			         	<a href="elimina_ristorante.html?id=${id}">Elimina Ristorante</a>
			         </button>
			         <button class='aggiungi-piatto btn-dmea' id-ristorante='${id}'>
					 <a href='aggiungi_piatto.html?id=${id}'>	
						Aggiungi Piatto
					</a>
			         </button>
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
		
		modificaRispostaOn = false
		aggiungiRispostaOn = false
		
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
					if (idLogin == 1){
						$(`
								<div>
								<li>
								<h4><strong>${res[i].titolo}</strong></h4>
								<p>Autore: ${res[i].nomeUtente}</p>
								<p>Voto: ${res[i].rating}</p>
								<p>${res[i].comment}</p>
								</li>
								<button class='elimina-recensione' id-recensione='${res[i].id}' style='margin-top: 5px;'>Elimina recensione</button>
								<br><br>
								<div class='risposta-recensione-${res[i].id}' style='margin-left: 25px;'></div>
								</div>
								<br>
							`).prependTo('#render-recensioni')
					} else {
						$(`
								<div>
								<li>
								<h4><strong>${res[i].titolo}</strong></h4>
								<p>Autore: ${res[i].nomeUtente}</p>
								<p>Voto: ${res[i].rating}</p>
								<p>${res[i].comment}</p>
								</li>
								<br>
								<button class='render-form-risposta' id-recensione='${res[i].id}'>Rispondi</button>
								<br><br>
								<div class='risposta-recensione-${res[i].id}' style='margin-left: 25px;'></div>
								</div>
								<br>
							`).prependTo('#render-recensioni')
					}
					
					 getRisposte(res[i].id)
				}
			}
			
		})
	}
	
	$('body').on('click', '.elimina-recensione', function(){
		
		const idRecensione = $(this).attr('id-recensione')
		
		eliminaRecensione(idRecensione, $(this).parent())
		
		
	})
	
	function eliminaRecensione(idRecensione, htmlRow){
		$.ajax({
			url: `recensioni/${idRecensione}`,
			type: 'DELETE',
			success: function(){
				htmlRow.remove()
			},
			error: function(){
				alert("Non hai il permesso di utilizzare questo comando, accedi con le credenziali corrette")
			}
		})
		
	}
	
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
	
	$('body').on('click', '.render-form-risposta', function(){
		const idRecensione = $(this).attr('id-recensione')
		
	if(!aggiungiRispostaOn){
		
		$(`	
				<textarea id="risposta-recensione" rows="4" cols="50" placeholder='Scrivi una risposta...'></textarea>
				<br><button id='add-risposta' id-recensione='${idRecensione}'>Pubblica</button><br><br>
		`).prependTo(`.risposta-recensione-${idRecensione}`)
		
		aggiungiRispostaOn = true
		
	} else {
		$(`.risposta-recensione-${idRecensione}`).html('')
		aggiungiRispostaOn = false
		
		getRisposte(idRecensione)
		
	}
		
		
	})
	
	$('body').on('click', '#add-risposta', function(){
		const idRecensione = $(this).attr('id-recensione')
		
		const r = {
			comment: $('#risposta-recensione').val(),
			recensione: {
				"id": idRecensione
			}
		}
		
		
		postRisposta(r)
		
	})
	
	function postRisposta(r){
		
		$.ajax({
			url: '/risposte',
            type: 'POST',
            data: JSON.stringify(r),
            contentType: 'application/json',
            dataType: 'json',
            success: function(data) {
            	
            	$(`.risposta-recensione-${r.recensione.id}`).html('')
            	getRisposte(r.recensione.id)
        		
            },
			error: function(){
				alert("Non hai il permesso di utilizzare questo comando, accedi con le credenziali corrette")
			}
		})
	}
	
	function getRisposte(idRecensione){
		
		$.get(`risposte?idRecensione=${idRecensione}`, function(res){
			for(let i = 0; i < res.length; i++){
				if(idLogin == 1){
					$(`
							<div>
							<p>${res[i].comment}</p>
							<button class='elimina-risposta' id-risposta='${res[i].id}' style='margin-top: 5px;'>Elimina risposta</button>
							</div>
						`).appendTo(`.risposta-recensione-${idRecensione}`)
				} else {
					$(`
							<div>
							<p>${res[i].comment}</p>
							<button class='modifica-risposta' id-risposta='${res[i].id}' id-recensione='${idRecensione}'>Modifica</button>
							<button class='elimina-risposta' id-risposta='${res[i].id}'>Elimina</button>
							</div>
						`).appendTo(`.risposta-recensione-${idRecensione}`)
				}
				
			}
		})
		
	}
	
	
	$('body').on('click', '.modifica-risposta', function(){
		const idRisposta = $(this).attr('id-risposta')
		const idRecensione = $(this).attr('id-recensione')
	
	if(!modificaRispostaOn){
		
		$.get(`risposte/${idRisposta}`, function(res){
			$('#modifica-risposta-recensione').val(res.comment)
		})
		
		
		$(`<br>
			<textarea id="modifica-risposta-recensione" rows="4" cols="50" placeholder='Scrivi una risposta...'></textarea>
			<br><button id='salva-modifica-risposta' id-risposta='${idRisposta}' id-recensione='${idRecensione}'>Salva</button>
		`).appendTo(`.risposta-recensione-${idRecensione}`)
		
		modificaRispostaOn = true
		
	} else {
		$(`.risposta-recensione-${idRecensione}`).html('')
		modificaRispostaOn = false
		
		getRisposte(idRecensione)
		
	}
		
	})
	
	
	$('body').on('click', '#salva-modifica-risposta', function(){
		
		const idRisposta = $(this).attr('id-risposta')
		const idRecensione = $(this).attr('id-recensione')
		
		const r = {
			id: idRisposta,
			comment: $('#modifica-risposta-recensione').val(),
			recensione: {
				"id": idRecensione
			}
		}
		
		editRisposta(r)
	})
	
	function editRisposta(r){
		
		$.ajax({
			url:`risposte`,
			type: 'PUT',
			data: JSON.stringify(r),
			contentType: 'application/json',
			dataType: 'json',
			success: function(res){
				
				$(`.risposta-recensione-${r.recensione.id}`).html('')
				getRisposte(r.recensione.id)
				
			},
			error: function(){
			alert("Non hai il permesso di utilizzare questo comando, accedi con le credenziali corrette")
			}
		
		})
	}
	
	
	$('body').on('click', '.elimina-risposta', function(){
		const idRisposta = $(this).attr('id-risposta')
		
		deleteRisposta(idRisposta, $(this).parent())
		
	})
		
	function deleteRisposta(idRisposta, htmlRow){
		$.ajax({
			url: `risposte/${idRisposta}`,
			type: 'DELETE',
			success: function(){
				htmlRow.remove()
			},
			error: function(){
				alert("Non hai il permesso di utilizzare questo comando, accedi con le credenziali corrette")
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
	
	// Post Ristorante
	
	$('body').on('click', '.aggiungi-ristorante', function(){
		const url = "/aggiungi_ristorante.html";    
		$(location).attr('href',url);
		
		getUtente()
		
	})
	
	$('body').on('click', '#salva-ristorante', function(){
		
		const r = {
              nome: $('.nome-ristorante').val(),
              categoria: $('.categoria-ristorante').val(),
              pIva: $('.piva').val(),
              ragioneSociale: $('.ragione-sociale').val(),
              regione: $('.regione').val(),
              citta: $('.citta').val(),
              via: $('.via').val(),
              nCivico: $('.numero-civico').val(),
              utente: {
            	  "id": idLogin
              }
              
       }
		
		 addRistorante(r)
		 
		$('.nome-ristorante').val('')
        $('.categoria-ristorante').val('')
        $('.piva').val('')
        $('.ragione-sociale').val('')
        $('.regione').val('')
        $('.citta').val('')
        $('.via').val('')
        $('.numero-civico').val('')
		
	})
	
	function addRistorante(r){
		
		$.ajax({
			url: '/ristoranti',
          type: 'POST',
          data: JSON.stringify(r),
          contentType: 'application/json',
          dataType: 'json',
          success: function(data) {
        	  
        	  if(idLogin == 1){
          		const url = `/pannello_admin.html`  
          		$(location).attr('href',url)
          	} else {
          		const url = `/pannello_ristorante.html`   
          		$(location).attr('href',url)
          	}
          },
			error: function(){
				alert("Inserimento non andato a buon fine");
			}
		})
	}
	
	
	const listaUtenti = []
	
	// Post Ristorante Admin
	function inutile(){
		if(idLogin == 1){
			$.get("/utenti", function(res){
				
				for(let i = 0; i < res.length; i++){
					if(res[i].ruolo == 'RISTORANTE'){
						$(`<option value='${res[i].id}'>${res[i].username}</option>`)
						.appendTo('.id-ristoratore')
						
						var usedNames = {}
						$("select[name='select-id-ristoratore'] > option").each(function () {
						    if(usedNames[this.text]) {
						        $(this).remove()
						    } else {
						        usedNames[this.text] = this.value
						    }
						})
					}
						
				}
				
			})
			
		}
	}
	
	
	
	$('body').on('click', '.aggiungi-ristorante-admin', function(){
		const url = "/aggiungi_ristorante_admin.html"  
		$(location).attr('href',url)
		
	})
	
	$('body').on('click', '#salva-ristorante-admin', function(){
		
		const r = {
              nome: $('.nome-ristorante').val(),
              categoria: $('.categoria-ristorante').val(),
              pIva: $('.piva').val(),
              ragioneSociale: $('.ragione-sociale').val(),
              regione: $('.regione').val(),
              citta: $('.citta').val(),
              via: $('.via').val(),
              nCivico: $('.numero-civico').val(),
              utente: {
            	  "id": $('.id-ristoratore').val()
              }
              
       }
		
		 addRistorante(r)
		 
		$('.nome-ristorante').val('')
        $('.categoria-ristorante').val('')
        $('.piva').val('')
        $('.ragione-sociale').val('')
        $('.regione').val('')
        $('.citta').val('')
        $('.via').val('')
        $('.numero-civico').val('')
        $('.id-ristoratore').val('')
		
	})
	
	
	// Modifica Ristorante
	
	$('body').on('click', '.modifica-ristorante', function(){
		const idRistorante = $(this).attr('id-ristorante')
		
		const url = `/modifica_ristorante.html?id=${idRistorante}`;    
		$(location).attr('href',url);
		
	})
	
	
	
	// Elimina Ristorante
	
	$('body').on('click', '.elimina-ristorante2', function(){
		const idRistorante = $(this).attr('id-ristorante')
		
		deleteRistorante(idRistorante)
		
	})
		
	function deleteRistorante(idRistorante){
		$.ajax({
			url: `ristoranti/${idRistorante}`,
			type: 'DELETE',
			success: function(){
				
				if(idLogin == 1){
            		const url = `/pannello_admin.html`  
            		$(location).attr('href',url)
            	} else {
            		const url = `/pannello_ristorante.html`   
            		$(location).attr('href',url)
            	}
			},
			error: function(){
				alert("Qualcosa è andato storto")
			}
		})
	}
	
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
						<button class='modifica-piatto' id-piatto=${res[i].id} id-ristorante=${idRistorante}>Modifica</button>
						<button class='elimina-piatto' id-piatto=${res[i].id} id-ristorante=${idRistorante}>
						<a href='elimina_piatto.html?idRistorante=${idRistorante}&idPiatto=${res[i].id}'>
							Elimina
						</a>
						</button>
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
	
	
	// Elimina Piatto
			
	$('body').on('click', '.elimina-piatto3', function(){
		const idPiatto = $(this).attr('id-piatto')
		const idRistorante = $(this).attr('id-ristorante')
		
		deletePiatto(idPiatto, $(this).parent())
		
		
	})
	
	function deletePiatto(idPiatto, htmlRow){
		$.ajax({
			url: `piatti/${idPiatto}`,
			type: 'DELETE',
			success: function(){
				htmlRow.remove()
			},
			error: function(){
				alert("Qualcosa è andato storto");
			}
			
		})
	}
	
// Aggiungi Piatto
	
	$('body').on('click', '#salva-piatto', function(){
		
		const idRistorante = getUrlParameter('id')
		
		 const p = {
                nome: $('.nome-piatto').val(),
                categoria: $('.categoria-piatto').val(),
                ingredienti: $('.ingredienti-piatto').val(),
                prezzo: $('.prezzo-piatto').val(),
                ristorante: {
                	"id": idRistorante
                }
         }
		
		 addPiatto(p)
		 
		 $('.nome-piatto').val('')
         $('.categoria-piatto').val('')
         $('.ingredienti-piatto').val('')
         $('.prezzo-piatto').val('')
		
	})
	
	function addPiatto(p){
		
		$.ajax({
			url: '/piatti',
            type: 'POST',
            data: JSON.stringify(p),
            contentType: 'application/json',
            dataType: 'json',
            success: function(data) {
            	
            	if(idLogin == 1){
            		const url = `/pannello_admin.html`  
            		$(location).attr('href',url)
            	} else {
            		const url = `/pannello_ristorante.html`   
            		$(location).attr('href',url)
            	}
            
            },
			error: function(){
				alert("Inserimento non andato a buon fine");
			}
		})
	}
	
// Modifica Piatto
	
	$('body').on('click', '.modifica-piatto', function(){
		
		const idPiatto = $(this).attr('id-piatto')
		const idRistorante = $(this).attr('id-ristorante')
		
		const url = `/modifica_piatto.html?idRistorante=${idRistorante}&idPiatto=${idPiatto}`;    
		$(location).attr('href',url);
		
	})
	
	
	// PANNELLO RISTORANTE
	
	function getUtente(){
		
		$.ajax({
			url: 'secured',
            type: 'GET',
            success: function(res) {
            	idLogin = res.id
				inutile()
            },
			error: function(){
				idLogin = -1
			}
		})
		
	}
	
	$('body').on('click', '.visualizza-ristoranti', function(){
		$(`#pannello-ristorante`).html('')
		getRistorantiUtente(idLogin)
	})
	
	function getRistorantiUtente(idUtente){
		$.get(`ristoranti?idUtente=${idUtente}`, function(res){
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
				`).appendTo(`#pannello-ristorante`)
			}
		})
	}
	
	
})
