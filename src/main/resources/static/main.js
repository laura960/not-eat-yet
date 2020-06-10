$(document).ready(function(){
	
//	const listaPiatti = [
//		{"id": 1, "categoria": "primo", "ingredienti": "Pasta, Pomodoro", "nome": "Pasta al sugo","prezzo": 5.99, "idRistorante": 2},	
//		{"id": 2, "categoria": "secondo", "ingredienti": "Pasta, Pomodoro", "nome": "Bistecca","prezzo": 10.99, "idRistorante": 1},	
//		{"id": 3, "categoria": "dolce", "ingredienti": "Cioccolato, Zucchero", "nome": "Sacher","prezzo": 4.99, "idRistorante": 2},
//		{"id": 4, "categoria": "dolce", "ingredienti": "Panna, Zucchero", "nome": "Meringata","prezzo": 3.99, "idRistorante": 1},
//		{"id": 5, "categoria": "primo", "ingredienti": "Ragù, Besciamella", "nome": "Lasagne","prezzo": 4.99, "idRistorante": 3},
//		{"id": 6, "categoria": "primo", "ingredienti": "Farina, Acqua, Sale", "nome": "Ravioli","prezzo": 5.99, "idRistorante": 5},
//		{"id": 7, "categoria": "dolce", "ingredienti": "Savoiardi, Caffè", "nome": "Tiramisù","prezzo": 3.99, "idRistorante": 4},
//		{"id": 8, "categoria": "secondo", "ingredienti": "Uova, Sale", "nome": "Frittata","prezzo": 4.99, "idRistorante": 3}]

	let ristoranteId = -1
	let dettaglioOn = false
	let dettaglioPiattoOn = false
	
	// MODALE
	
	$('body').on('click', '.menu', function(){
		const id = $(this).attr('data-id')
		ristoranteId = id
		
		$('#titolo-modale').text($(this).attr('nome-ristorante'))		
		  
		$('#bottoni-modale').html('')
		caricaBottoni(id)
		
		$('#render-menu').html('')
		getPiatti(id)
		
		$('#myDiv').html('')
		
		$('#modaleRistorante').css('display', 'block')
				
	})
	
	
	function caricaBottoni(id){
		$(`
				 <button class='dettaglio-ristorante btn-dmea' id-ristorante='${id}'>Dettagli Ristorante</button>
		         <button class='modifica-ristorante btn-dmea' id-ristorante='${id}'>Modifica Ristorante</button>
		         <button class='elimina-ristorante btn-dmea' id-ristorante='${id}'>Elimina Ristorante</button>
		         <button class='aggiungi-piatto btn-dmea' id-ristorante='${id}'>Aggiungi Piatto</button>
		         `
				).appendTo('#bottoni-modale')
	}
	
	
	$('#close-modale').on('click', function(){
		$('#modaleRistorante').css('display', 'none')
		$('.render-dettaglio-ristorante').html('')
		ristoranteId = -1
	})
	
	
	// RISTORANTI

	function getRistoranti(){
		 $.get('ristoranti', function(res){
	            for(let i = 0; i < res.length; i++){
	                    $(`
		                    <dd> <a href="#${res[i].nome}">
		                    <button class="menu" data-id='${res[i].id}' nome-ristorante='${res[i].nome}'>${res[i].nome}</button>
		                    </a></dd>
	                    `).appendTo(`#lista-${res[i].categoria}`)
	                    
	            }
	        })
	}
	
	getRistoranti()
	
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
				const id = $(this).attr('data-id')
				ristoranteId = id
				getRistorante(idRistorante)
				dettaglioOn = true
			} else {
				$('.render-dettaglio-ristorante').html('')
				dettaglioOn = false
			}
		
		})
		
		
	// Aggiungi Ristorante
		
	$('body').on('click', '.aggiungi-ristorante', function(){
		
		$(`
				<br><br>
				<select class='categoria-ristorante'>
					<option value='pizzeria'>Pizzeria</option>
					<option value='sushi'>Sushi</option>
					<option value='etnico'>Etnico</option>
					<option value='kebab'>Kebab</option>
				</select>
				<input type='text' class='nome-ristorante' placeholder='Nome...'>
				<input type='text' class='piva' placeholder='Partita IVA...'>
				<input type='text' class='ragione-sociale'  placeholder='Ragione Sociale...'>
				<input type='text' class='regione'  placeholder='Regione...'>
				<input type='text' class='citta'  placeholder='Città...'>
				<input type='text' class='via'  placeholder='Via...'>
				<input type='number' class='numero-civico'  placeholder='Numero Civico...'>
				<button id='salva-ristorante'>Aggiungi</button>
		
		`).appendTo('.render-aggiungi-ristorante')
		
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
        	   location.reload()
           },
			error: function(){
				alert("Inserimento non andato a buon fine");
			}
		})
	}
		
	
	// Modifica Ristorante
	
	$('body').on('click', '.modifica-ristorante', function(){
		
		const idRistorante = $(this).attr('id-ristorante')
		
		$.get(`ristoranti/${idRistorante}`, function(res){
			$('.nome-ristorante').val(res.nome)
			$('.categoria-ristorante').val(res.categoria)
			$('.piva').val(res.pIva)
			$('.ragione-sociale').val(res.ragioneSociale)
			$('.regione').val(res.regione)
			$('.citta').val(res.citta)
			$('.via').val(res.via)
			$('.numero-civico').val(res.nCivico)
		})
		
		$(`
				<br>
				<p><strong>Modifica Ristorante:</strong></p>
				<br>
				<select class='categoria-ristorante'>
					<option value='pizzeria'>Pizzeria</option>
					<option value='sushi'>Sushi</option>
					<option value='etnico'>Etnico</option>
					<option value='kebab'>Kebab</option>
				</select>
				<input type='text' class='nome-ristorante' placeholder='Nome...'>
				<input type='text' class='piva' placeholder='Partita IVA...'>
				<input type='text' class='ragione-sociale'  placeholder='Ragione Sociale...'>
				<input type='text' class='regione'  placeholder='Regione...'>
				<input type='text' class='citta'  placeholder='Città...'>
				<input type='text' class='via'  placeholder='Via...'>
				<input type='number' class='numero-civico'  placeholder='Numero Civico...'>
				<input type='hidden' class='id-rist' value='${idRistorante}'>
				<button id='salva-modifica-ristorante'>Modifica</button>
		
		`).appendTo('.render-modifica-ristorante')
		
	})
	
	$('body').on('click', '#salva-modifica-ristorante', function(){
		
		 const r = {
				 
				   id: $('.id-rist').val(),
	               nome: $('.nome-ristorante').val(),
	               categoria: $('.categoria-ristorante').val(),
	               pIva: $('.piva').val(),
	               ragioneSociale: $('.ragione-sociale').val(),
	               regione: $('.regione').val(),
	               citta: $('.citta').val(),
	               via: $('.via').val(),
	               nCivico: $('.numero-civico').val()
	               
	        }
		
		editRistorante(r)
	})
	
	function editRistorante(r){
		
		$.ajax({
			url:`ristoranti`,
			type: 'PUT',
			data: JSON.stringify(r),
			contentType: 'application/json',
			dataType: 'json',
			success: function(res){
				location.reload()
			}
		})
		
	}
		
	
	// Elimina Ristorante
	
	$('body').on('click', '.elimina-ristorante', function(){
		const idRistorante = $(this).attr('id-ristorante')
		
		deleteRistorante(idRistorante)
		
	})
		
	function deleteRistorante(idRistorante){
		$.ajax({
			url: `ristoranti/${idRistorante}`,
			type: 'DELETE',
			success: function(){
				location.reload()
			},
			error: function(){
				alert("Qualcosa è andato storto")
			}
		})
	}
	
	// PIATTI
		
	function getPiatti(idRistorante){
		
		$.get(`piatti?idRistorante=${idRistorante}`, function(res){
			for(let i = 0; i < res.length; i++){
			$(`<li class ='riga-piatto${res[i].id}'>
					${res[i].nome}
					<button class='dettaglio-piatto' id-piatto=${res[i].id} id-ristorante=${idRistorante}>Dettaglio</button>
					<button class='modifica-piatto' id-piatto=${res[i].id} id-ristorante=${idRistorante}>Modifica</button>
					<button class='elimina-piatto' id-piatto=${res[i].id } id-ristorante=${idRistorante}>Elimina</button>
				</li>
				`).appendTo('#render-menu')
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
	
	
	$('body').on('click', '.modifica-piatto', function(){
		
		$('.render-aggiungi-piatto').html('')
		const idPiatto = $(this).attr('id-piatto')
		const idRistorante = $(this).attr('id-ristorante')
		
		$.get(`piatti/${idPiatto}`, function(res){
			$('.nome-piatto').val(res.nome)
			$('.categoria-piatto').val(res.categoria)
			$('.ingredienti-piatto').val(res.ingredienti)
			$('.prezzo-piatto').val(res.prezzo)
		})
		
		$(`<br>
				<p><strong>Modifica Piatto:</strong></p>
				<br>
				<input type='text' class='nome-piatto' placeholder='Nome...'>
				<input type='text' class='categoria-piatto' placeholder='Categoria...'>
				<input type='text' class='ingredienti-piatto' placeholder='Ingredienti...'>
				<input type='number' class='prezzo-piatto' step=0.01 min=0.01 placeholder='Prezzo...'>
				<input type='hidden' class='id-ristorante' value='${idRistorante}'>
				<input type='hidden' class='id-piatto' value='${idPiatto}'>
				<button id='salva-modifica-piatto'>Modifica</button>
		`).appendTo('.render-aggiungi-piatto')
		
	})
	
	$('body').on('click', '#salva-modifica-piatto', function(){
		
		const p = {
				id: $('.id-piatto').val(),
                nome: $('.nome-piatto').val(),
                categoria: $('.categoria-piatto').val(),
                ingredienti: $('.ingredienti-piatto').val(),
                prezzo: $('.prezzo-piatto').val(),
                ristorante: {
                	"id": $('.id-ristorante').val()
                }
		}
		
		editPiatto(p)
	})
	
	function editPiatto(p){
		console.log(JSON.stringify(p))
		
		$.ajax({
			url:`piatti`,
			type: 'PUT',
			data: JSON.stringify(p),
			contentType: 'application/json',
			dataType: 'json',
			success: function(res){
				console.log('in success')
				$('#render-menu').html('')
				getPiatti(p.ristorante.id)
				$('.render-aggiungi-piatto').html('')
			}
		})
		
	}
	
			
	$('body').on('click', '.elimina-piatto', function(){
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
	
	$('body').on('click', '.aggiungi-piatto', function(){
		const idRistorante = $(this).attr('id-ristorante')
		$('.render-aggiungi-piatto').html('')
		$(`<br>
				<p><strong>Aggiungi Piatto:</strong></p>
				<br>
				<input type='text' class='nome-piatto' placeholder='Nome...'>
				<input type='text' class='categoria-piatto' placeholder='Categoria...'>
				<input type='text' class='ingredienti-piatto' placeholder='Ingredienti...'>
				<input type='number' class='prezzo-piatto' step=0.01 min=0.01 placeholder='Prezzo...'>
				<input type='hidden' class='id-ristorante' value='${idRistorante}'>
				<button id='salva-piatto'>Aggiungi</button>
		`).appendTo('.render-aggiungi-piatto')
		
	})
	
	
	
	$('body').on('click', '#salva-piatto', function(){
		
		 const p = {
                nome: $('.nome-piatto').val(),
                categoria: $('.categoria-piatto').val(),
                ingredienti: $('.ingredienti-piatto').val(),
                prezzo: $('.prezzo-piatto').val(),
                ristorante: {
                	"id": $('.id-ristorante').val()
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
            	$('#render-menu').html('')
            	getPiatti(p.ristorante.id)
            	$('.render-aggiungi-piatto').html('')
            },
			error: function(){
				alert("Inserimento non andato a buon fine");
			}
		})
	}
	
	
	
	

//	function getPiatto(id){
//		$.get(`piatti/${id}`, function(res){
//			$(`<p>Nome: ${res.nome}<p>
//				<p>Categoria: ${res.categoria}<p>
//				<p>Prezzo: ${res.prezzo} &eur;<p>
//				<p>Ingredienti: ${res.ingredienti}<p>
//              `).appendTo('#dettaglio-piatto')
//		})
//	}


///*Modal V02 https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal*/
//// Get the modal
//const modal = document.getElementById("myModal");
//
//// Get the button that opens the modal
//const btn = document.getElementById("sushi3");
//
//// Get the <span> element that closes the modal
//const span = document.getElementsByClassName("close")[0];
//
//// When the user clicks the button, open the modal 
//btn.onclick = function() {
//  modal.style.display = "block";
//}
//
//// When the user clicks on <span> (x), close the modal
//span.onclick = function() {
//  modal.style.display = "none";
//}
//
//// When the user clicks anywhere outside of the modal, close it
//window.onclick = function(event) {
//  if (event.target == modal) {
//    modal.style.display = "none";
//  }
//}
///*fine modal 02*/

		/* Modal login */
		// Get the modal
		var modal = document.getElementById("modaleLogin");

		// Get the button that opens the modal
		var btn = document.getElementById("modale-login");

		// Get the <span> element that closes the modal
		var span = document.getElementsByClassName("close")[0];

		// When the user clicks the button, open the modal 
		btn.onclick = function() {
		modal.style.display = "block";
		}

		// When the user clicks on <span> (x), close the modal
		span.onclick = function() {
		modal.style.display = "none";
		}

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
		}

		/* fine modal login */

})


/* Toggle - Hide - Show */
function myFunction() {
	const x = document.getElementById("myDIV");
	const a = x.className;


	if (x.style.display === "none") {

			x.style.display = "block";
		
	} else {
		x.style.display = "none";
	}
}
/* fine toggle - hide - show */