$(document).ready(function(){
	
	let idLogin = -1
	
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
	
	function getUtente(){
		
		$.ajax({
			url: 'secured',
            type: 'GET',
            success: function(res) {
            	idLogin = res.id
				console.log('success ' + idLogin)
            },
			error: function(){
				idLogin = -1
				console.log('error')
			}
		})
		
	}
	
	getUtente()
	
	function renderModificaRistorante(){
		
		var idRistorante = getUrlParameter('id');
		
	$.get(`ristoranti/${idRistorante}`, function(res){
		$('.nome-ristorante').val(res.nome)
		$('.categoria-ristorante').val(res.categoria)
		$('.piva').val(res.pIva)
		$('.ragione-sociale').val(res.ragioneSociale)
		$('.regione').val(res.regione)
		$('.citta').val(res.citta)
		$('.via').val(res.via)
		$('.numero-civico').val(res.nCivico)
		$('.id-ristoratore').val(res.utente.id)
	})
	
	$(`
			<h1 style='margin: 15px;'><strong>Modifica Ristorante:</strong></h1>
			<div class='templet-add'>
				<p><strong>Categoria:</strong></p>
				<select class='categoria-ristorante'>
					<option value='pizzeria'>Pizzeria</option>
					<option value='sushi'>Sushi</option>
					<option value='etnico'>Etnico</option>
					<option value='kebab'>Kebab</option>
					<option value='altro'>Altro</option>
				</select>
				<p><strong>Nome:</strong></p>
				<input type='text' class='nome-ristorante' placeholder='Nome...'>
				<p><strong>Partita Iva:</strong></p>
				<input type='text' class='piva' placeholder='Partita IVA...'>
				<p><strong>Ragione Sociale:</strong></p>
				<input type='text' class='ragione-sociale'  placeholder='Ragione Sociale...'>
				<p><strong>Regione:</strong></p>
				<input type='text' class='regione'  placeholder='Regione...'>
				<p><strong>Città:</strong></p>
				<input type='text' class='citta'  placeholder='Città...'>
				<p><strong>Via:</strong></p>
				<input type='text' class='via'  placeholder='Via...'>
				<p><strong>Numero Civico:</strong></p>
				<input type='number' class='numero-civico'  placeholder='Numero Civico...'>
				<input type='hidden' class='id-rist' value='${idRistorante}'>
				<input type='hidden' class='id-ristoratore'>
				<br>
				<button id='salva-modifica-ristorante'>Modifica</button>
			</div>
	
	`).appendTo('.render-modifica-ristorante')
	
	}
	
	renderModificaRistorante()
	
	$('body').on('click', '#salva-modifica-ristorante', function(){
		
		if(idLogin == 1){
			const r = {
					 
					   id: $('.id-rist').val(),
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
			editRistorante(r)
			
		} else {
			const r = {
					 
					   id: $('.id-rist').val(),
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
			editRistorante(r)
		}
		 
	})
	
	function editRistorante(r){
		
		$.ajax({
			url:`ristoranti`,
			type: 'PUT',
			data: JSON.stringify(r),
			contentType: 'application/json',
			dataType: 'json',
			success: function(res){
				if(idLogin == 1){
					const url = `/pannello_admin.html`
	        		$(location).attr('href',url)
				} else {
					const url = `/pannello_ristorante.html`;     
	        		$(location).attr('href',url)
				}
			}
		})
		
	}
	
})