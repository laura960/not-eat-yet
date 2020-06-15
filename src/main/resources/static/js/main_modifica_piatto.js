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
	
	
	function renderModificaPiatto(){
		var idRistorante = getUrlParameter('idRistorante');
		var idPiatto = getUrlParameter('idPiatto');
		
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
				<select  class='categoria-piatto'>
					<option value='antipasto'>Antipasto</option>
					<option value='primo'>Primo</option>
					<option value='secondo'>Secondo</option>
					<option value='fritti'>Fritti</option>
					<option value='pizza'>Pizza</option>
					<option value='kebab'>Kebab</option>
					<option value='sushi'>Sushi</option>
					<option value='contorno'>Contorno</option>
					<option value='dolce'>Dolce</option>
					<option value='bevande'>Bevande</option>
				</select>
				<input type='text' class='ingredienti-piatto' placeholder='Ingredienti...'>
				<input type='number' class='prezzo-piatto' step=0.01 min=0.01 placeholder='Prezzo...'>
				<input type='hidden' class='id-ristorante' value='${idRistorante}'>
				<input type='hidden' class='id-piatto' value='${idPiatto}'>
				<button id='salva-modifica-piatto'>Modifica</button>
		`).appendTo('.render-modifica-piatto')
		
	}
		
	renderModificaPiatto()
	
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
				const url = `/elencoristoranti.html`;    
        		$(location).attr('href',url)
			}
		})
		
	}

	
})