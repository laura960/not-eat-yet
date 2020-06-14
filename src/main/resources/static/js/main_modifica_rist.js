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
	
	}
	
	renderModificaRistorante()
	
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
				const url = `/elencoristoranti.html`;    
        		$(location).attr('href',url)
			}
		})
		
	}
	
})