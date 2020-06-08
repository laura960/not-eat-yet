$(document).ready(function(){
	
	const listaPiatti = [
		{"id": 1, "categoria": "primo", "ingredienti": "Pasta, Pomodoro", "nome": "Pasta al sugo","prezzo": 5.99, "idRistorante": 2},	
		{"id": 2, "categoria": "secondo", "ingredienti": "Pasta, Pomodoro", "nome": "Bistecca","prezzo": 10.99, "idRistorante": 1},	
		{"id": 3, "categoria": "dolce", "ingredienti": "Cioccolato, Zucchero", "nome": "Sacher","prezzo": 4.99, "idRistorante": 2},
		{"id": 4, "categoria": "dolce", "ingredienti": "Panna, Zucchero", "nome": "Meringata","prezzo": 3.99, "idRistorante": 1},
		{"id": 5, "categoria": "primo", "ingredienti": "Ragù, Besciamella", "nome": "Lasagne","prezzo": 4.99, "idRistorante": 3},
		{"id": 6, "categoria": "primo", "ingredienti": "Farina, Acqua, Sale", "nome": "Ravioli","prezzo": 5.99, "idRistorante": 5},
		{"id": 7, "categoria": "dolce", "ingredienti": "Savoiardi, Caffè", "nome": "Tiramisù","prezzo": 3.99, "idRistorante": 4},
		{"id": 8, "categoria": "secondo", "ingredienti": "Uova, Sale", "nome": "Frittata","prezzo": 4.99, "idRistorante": 3}]

	function getRistoranti(){
		 $.get('ristoranti', function(res){
	            for(let i = 0; i < res.length; i++){
	                    $(`
	                    <dd> <a href="#${res[i].nome}" rel="modal:open">
	                    <button class="menu">${res[i].nome}</button>
	                    
	                    </a></dd>
	                    
                        <div id="${res[i].nome}" class="modal">
                            <div class="modal-header">
                                <h2>${res[i].nome}</h2>
                            </div>
                            <div class="modale-main">
                            <button class='dettaglio-ristorante' id-ristorante='${res[i].id}'>Dettagli</button>
	                    	<button class='modifica-ristorante' id-ristorante='${res[i].id}''>Modifica</button>
	                    	<button class='elimina-ristorante' id-ristorante='${res[i].id}'>Elimina</button>
	                    	<button class='aggiungi-piatto' id-ristorante='${res[i].id}'>Aggiungi piatto</button>
                            <br>
                            <div class='add-piatto' id-ristorante='${res[i].id}'></div>
                    		<br>
                            <div class='vista-dettaglio-ristorante'></div>
                            <h3>Menù</h3>
                            <ul class='menu'>
	                    		 ${getPiatti(res[i].id)}
                            </ul>
                            </div>
                           <!-- <div class="modal-line"></div>
                            <a class= "modal-close" href="#" rel="modal:close">Close</a> -->
                          </div>

	                    `).appendTo(`#lista-${res[i].categoria}`)
	            }
	        })
	}
	
	getRistoranti()
	
	function getRistorante(id){
		$.get(`ristoranti/${id}`, function(res){
			$(`
				<p><strong>Nome</strong>: ${res.nome}<p>
				<p><strong>Categoria</strong>: ${res.categoria}<p>
				<p><strong>Ragione sociale</strong>: ${res.ragioneSociale}<p>
				<p><strong>Partita IVA</strong>: ${res.pIva}<p>
				<p><strong>Regione</strong>: ${res.regione}<p>
				<p><strong>Indirizzo</strong>: ${res.via}, ${res.nCivico}<p>
				<br><br>
              `).appendTo('.vista-dettaglio-ristorante')
		})
	}
	
	$('body').on('click', '.dettaglio-ristorante', function(){
		let idRistorante = $(this).attr('id-ristorante')
		getRistorante(idRistorante)
		
	})
	
	
	function getPiatti(idRistorante){
		let ris = ""
		
		for(let i = 0; i < listaPiatti.length; i ++){
			if(listaPiatti[i].idRistorante === idRistorante){
				ris += `<li class ='riga-piatto${listaPiatti[i].id}'>
							${listaPiatti[i].nome}
							<button class='dettaglio-piatto' id-piatto=${listaPiatti[i].id} id-ristorante=${idRistorante}>Dettaglio</button>
							<button class='modifica-piatto' id-piatto=${listaPiatti[i].id} id-ristorante=${idRistorante}>Modifica</button>
							<button class='elimina-piatto' id-piatto=${listaPiatti[i].id } id-ristorante=${idRistorante}>Elimina</button>
						</li>`
			}
		}
		
		return ris
	}

	
	$('body').on('click', '.dettaglio-piatto', function(){
		const idPiatto = $(this).attr('id-piatto')
		for(let i = 0; i < listaPiatti.length; i ++){
			if(listaPiatti[i].id == idPiatto){
				$(`
				<ul>
					<strong>Dettagli:</strong>
					<li>Categoria: ${listaPiatti[i].categoria}</li>
					<li>Ingredienti: ${listaPiatti[i].ingredienti}</li>
					<li>Prezzo: ${listaPiatti[i].prezzo} &euro;</li>
				</ul>
				`).appendTo(`.riga-piatto${idPiatto}`)
				
				break
			}
			
		}
	})
	
	
	$('body').on('click', '.modifica-piatto', function(){
		console.log("sono nell'aggiungi")
		
		const idRistorante = $(this).attr('id-ristorante')
		
		$(`<br>
				<p><strong>Modifica Piatto:</strong></p>
				<br>
				<input type='text' class='nome-piatto' placeholder='Nome...'>
				<input type='text' class='categoria-piatto' placeholder='Categoria...'>
				<input type='text' class='ingredienti-piatto' placeholder='Ingredienti...'>
				<input type='number' class='prezzo-piatto' step=0.01 min=0.01 placeholder='Prezzo...'>
				<input type='hidden' class='id-ristorante' value='${idRistorante}'>
				<button id='salva-piatto'>Modifica</button>
		`).appendTo('.add-piatto')
		
	})
	
	
	$('body').on('click', '.elimina-piatto', function(){
		const idPiatto = $(this).attr('id-piatto')
		const idRistorante = $(this).attr('id-ristorante')
		for(let i = 0; i < listaPiatti.length; i ++){
			if(listaPiatti[i].id == idPiatto){
				listaPiatti.splice(i, 1);
				
				$(this).parent().html('')
				break
			}
				
		}
		console.log(getPiatti(idRistorante))
		let ris = getPiatti(idRistorante)
		ris.appendTo('.menu')
		
	})
	
	$('body').on('click', '.aggiungi-piatto', function(){
		const idRistorante = $(this).attr('id-ristorante')
		
		$(`<br>
				<p><strong>Aggiungi Piatto:</strong></p>
				<br>
				<input type='text' class='nome-piatto' placeholder='Nome...'>
				<input type='text' class='categoria-piatto' placeholder='Categoria...'>
				<input type='text' class='ingredienti-piatto' placeholder='Ingredienti...'>
				<input type='number' class='prezzo-piatto' step=0.01 min=0.01 placeholder='Prezzo...'>
				<input type='hidden' class='id-ristorante' value='${idRistorante}'>
				<button id='salva-piatto'>Aggiungi</button>
		`).appendTo('.add-piatto')
		
	})
	
	
	
	$('body').on('click', '#salva-piatto', function(){
	console.log('funziona')
		
		 const p = {
			id: (listaPiatti.length + 1),
                nome: $('.nome-piatto').val(),
                categoria: $('.categoria-piatto').val(),
                ingredienti: $('.ingredienti-piatto').val(),
                prezzo: $('.prezzo-piatto').val(),
                idRistorante: $('.id-ristorante').val(),
                        }
		
		listaPiatti.push(p)
		
		getPiatti(p.idRistorante).appendTo('#menu')
		
	})
	
	
	$('body').on('click', '.aggiungi-ristorante', function(){
		$(`
				<br><br>
				<input type='text' class='nome-ristorante' placeholder='Nome...'>
				<input type='text' class='categoria-ristorante' placeholder='Categoria...'>
				<input type='text' class='piva' placeholder='Partita IVA...'>
				<input type='text' class='ragione-sociale'  placeholder='Ragione Sociale...'>
				<input type='text' class='regione'  placeholder='Regione...'>
				<input type='text' class='via'  placeholder='Via...'>
				<input type='number' class='numero-civico'  placeholder='Numero Civico...'>
				<button id='salva-piatto'>Aggiungi</button>
		
		`).appendTo('.render-aggiungi-ristorante')
		
	})
	
	$('body').on('click', '.modifica-ristorante', function(){
		$(`
				<br>
				<p><strong>Modifica Ristorante:</strong></p>
				<br>
				<input type='text' class='nome-ristorante' placeholder='Nome...'>
				<input type='text' class='categoria-ristorante' placeholder='Categoria...'>
				<input type='text' class='piva' placeholder='Partita IVA...'>
				<input type='text' class='ragione-sociale'  placeholder='Ragione Sociale...'>
				<input type='text' class='regione'  placeholder='Regione...'>
				<input type='text' class='via'  placeholder='Via...'>
				<input type='number' class='numero-civico'  placeholder='Numero Civico...'>
				<button id='salva-piatto'>Modifica</button>
		
		`).appendTo('.add-piatto')
		
	})
	
	
//	function addFunction() {
//    let x = document.getElementById("addRisto");
//    let text = document.getElementById("textIn")
//    if (x.innerHTML === "Add") {
//      x.innerHTML = "Save";
//      text.innerHTML= `<input type="text" placeholder="Add restaurant" />`;
//
//    } else {
//      x.innerHTML = "Add";
//      text.innerHTML="";
//    }
//  }
	

	
//	function getPiatto(id){
//		$.get(`piatti/${id}`, function(res){
//			$(`<p>Nome: ${res.nome}<p>
//				<p>Categoria: ${res.categoria}<p>
//				<p>Prezzo: ${res.prezzo} &eur;<p>
//				<p>Ingredienti: ${res.ingredienti}<p>
//              `).appendTo('#dettaglio-piatto')
//		})
//	}
	
	
})