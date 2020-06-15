$(document).ready(function(){
	
	let dettaglioOn = false
	let dettaglioPiattoOn = false
	
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
	
	// SIGN IN
	
	$('body').on('click', '#modal-registrati', function(){
		const url = "/signup.html";    
		$(location).attr('href',url);
	})
	
	// MODALE RISTORANTE
	
	$('body').on('click', '.menu', function(){
		const idRistorante = $(this).attr('data-id')
		getModaleRistorante(idRistorante)
	})
	
	function getModaleRistorante(idRistorante){
		
		dettaglioOn = false
		dettaglioPiattoOn = false
		
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
		
		getModaleRecensioni(idRistorante)
				
	})
	
	function getModaleRecensioni(idRistorante){
		$('#titolo-modale-recensioni').text('Recensioni')		
		
		$('#bottoni-modale-recensioni')
			.html(`<button><a href="/aggiungi_recensione.html?id=${idRistorante}">Scrivi una recensione</a></button>`)
		
		$('#render-recensioni').html('')
		getRecensioni(idRistorante)
		
		$('#modale-recensioni').css('display', 'block')
	}
	
	
	$('.close').on('click', function(){
		$('#modale-recensioni').css('display', 'none')
	})
	
	// RECENSIONI
	
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
						<p>Voto: ${res[i].rating}</p>
						<p>${res[i].comment}</p>
						</li>
						</div>
						<br>
					`).prependTo('#render-recensioni')
				}
			}
			
		})
	}
	
	
	$('body').on('click', '#add-recensione', function(){
		var idRistorante = getUrlParameter('id');
		const r = {
			titolo: $('#titolo-recensione').val(),
			comment: $('#testo-recensione').val(),
			rating: $("input[name='rating']:checked").val(),
			ristorante: {
				"id": idRistorante 
			}
		}
		
		aggiungiRecensione(r)
		
		$('#titolo-recensione').val('')
		$('#testo-recensione').val('')
		$("input[name='rating']:checked").val('')
		
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
              nCivico: $('.numero-civico').val()
              
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
        	const url = "/index.html";    
      		$(location).attr('href',url);
          },
			error: function(){
				alert("Inserimento non andato a buon fine");
			}
		})
	}
	
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
				const url = `/elencoristoranti.html`;    
        		$(location).attr('href',url)
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
			
				for(let i = 0; i < res.length; i++){
				$(`<li class ='riga-piatto${res[i].id}'>
						${res[i].nome}
						<button class='dettaglio-piatto' id-piatto=${res[i].id} id-ristorante=${idRistorante}>Dettaglio</button>
						<button class='modifica-piatto' id-piatto=${res[i].id} id-ristorante=${idRistorante}>Modifica</button>
						<button class='elimina-piatto' id-piatto=${res[i].id} id-ristorante=${idRistorante}>
						<a href='elimina_piatto.html?idRistorante=${idRistorante}&idPiatto=${res[i].id}'>
							Elimina
						</a>
						</button>
					</li>
					`).appendTo('#render-menu')
				}
			}
		})
		
	}

	function getPiatto(id){
		$.get(`piatti/${id}`, function(res){
			$(`	<br>
				<h3>Dettagli Piatto</h3>
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
			$('.render-dettaglio-piatto').html('')
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
            	const url = `/elencoristoranti.html`;    
        		$(location).attr('href',url)
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
	
	
	
	
})