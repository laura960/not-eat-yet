$(document).ready(function(){
    
    
    function getPizzerie() {
        $.get('ristoranti', function(res){
            for(let i = 0; i < res.length; i++){
                if(res[i].categoria === 'pizzeria'){
                    $(`
                    <a href="#"><dd>${res[i].nome}</dd></a>
                    `).appendTo('#lista-pizzerie')
                }
            }
        })
    }
	
	getPizzerie()
	
	function getSushi() {
        $.get('ristoranti', function(res){
            for(let i = 0; i < res.length; i++){
                if(res[i].categoria === 'sushi'){
                    $(`
                    <a href="#"><dd>${res[i].nome}</dd></a>
                    `).appendTo('#lista-sushi')
                }
            }
        })
    }
	
	getSushi()
	
	function getKebab() {
        $.get('ristoranti', function(res){
            for(let i = 0; i < res.length; i++){
                if(res[i].categoria === 'kebab'){
                    $(`
                    <a href="#"><dd>${res[i].nome}</dd></a>
                    `).appendTo('#lista-kebab')
                }
            }
        })
    }
	
	getKebab()
	
	function getEtnico() {
        $.get('ristoranti', function(res){
            for(let i = 0; i < res.length; i++){
                if(res[i].categoria === 'etnico'){
                    $(`
                    <a href="#"><dd>${res[i].nome}</dd></a>
                    `).appendTo('#lista-etnico')
                }
            }
        })
    }
	
	getEtnico()
	
})