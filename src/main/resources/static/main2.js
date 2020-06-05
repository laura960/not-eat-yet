$(document).ready(function(){
    
    const listaCategorie = ['dhso']

    function getCategorie(){
        $.get('categorie-ristoranti', function(res){
            for (let i = 0; i < res.length; i++){
                listaCategorie.push(res[i].nome)
            }
        })
    }
    getCategorie()
    console.log('gdg')

    function getPizzerie() {
        console.log('funzione')
        $.get('ristoranti', function(res){
            for(let i = 0; i < res.length; i++){
                console.log('jusigdf')
                if(res[i].categoria === 'pizzeria'){
                    console.log('trovata categoria')
                    $(`
                    <a href="#"><dd>${res[i].nome}</dd></a>
                    
                    `).appendTo('#lista-pizzerie')
                }
            }
        })
    }
	
	getPizzerie()
	
})
