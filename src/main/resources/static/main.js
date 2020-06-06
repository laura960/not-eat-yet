$(document).ready(function(){
    
    
	function getRistoranti(){
		 $.get('ristoranti', function(res){
	            for(let i = 0; i < res.length; i++){
	                    $(`
	                    <a href="#"><dd>${res[i].nome}</dd></a>
	                    `).appendTo(`#lista-${res[i].categoria}`)
	            }
	        })
	}
	
	getRistoranti()
	
//    function getPizzerie() {
//        $.get('ristoranti', function(res){
//            for(let i = 0; i < res.length; i++){
//                if(res[i].categoria === 'pizzeria'){
//                    $(`
//                    <a href="#"><dd>${res[i].nome}</dd></a>
//                    `).appendTo('#lista-pizzeria')
//                }
//            }
//        })
//    }
//	
//	getPizzerie()
//	
//	function getSushi() {
//        $.get('ristoranti', function(res){
//            for(let i = 0; i < res.length; i++){
//                if(res[i].categoria === 'sushi'){
//                    $(`
//                    <a href="#"><dd>${res[i].nome}</dd></a>
//                    `).appendTo('#lista-sushi')
//                }
//            }
//        })
//    }
//	
//	getSushi()
//	
//	function getKebab() {
//        $.get('ristoranti', function(res){
//            for(let i = 0; i < res.length; i++){
//                if(res[i].categoria === 'kebab'){
//                    $(`
//                    <a href="#"><dd>${res[i].nome}</dd></a>
//                    `).appendTo('#lista-kebab')
//                }
//            }
//        })
//    }
//	
//	getKebab()
//	
//	function getEtnico() {
//        $.get('ristoranti', function(res){
//            for(let i = 0; i < res.length; i++){
//                if(res[i].categoria === 'etnico'){
//                    $(`
//                    		<a href="#"><dd>${res[i].nome}</dd></a>
//                    `).appendTo('#lista-etnico')
//                }
//            }
//        })
//    }
//	
//	getEtnico()
	
	function getRistorante(id){
		$.get(`ristoranti/${id}`, function(res){
			$(`<p>Nome: ${res.nome}<p>
				<p>Ragione sociale: ${res.ragioneSociale}<p>
				<p>Partita IVA: ${res.piva}<p>
				<p>Regione: ${res.regione}<p>
				<p>Indirizzo: ${res.via}, ${res.nCivico}<p>
				<p>Menù: [LISTA PIATTI]<p>
              `).appendTo('#dettaglio-ristorante')
		})
	}
	
	function getPiatto(id){
		$.get(`piatti/${id}`, function(res){
			$(`<p>Nome: ${res.nome}<p>
				<p>Prezzo: ${res.prezzo} &eur;<p>
				<p>Ingredienti: ${res.ingredienti}<p>
              `).appendTo('#dettaglio-piatto')
		})
	}
	
})