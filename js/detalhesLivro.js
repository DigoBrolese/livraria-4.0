document.querySelector('.formMenuConteiner').addEventListener('submit', function (e) {
    e.preventDefault();
    let search = document.querySelector('#searchInput').value;

    window.location.href = domain+'/index.html?search='+search;
});

window.addEventListener('load', function () {
    let param = window.location.search;
    let isbn = param.split('=')[1];

    if (isbn != undefined) {
        document.querySelectorAll('.conteiner > div').forEach(div => div.remove());

        let ajax = new XMLHttpRequest();

        let url = "https://www.googleapis.com/books/v1/volumes?q=";

        // Cria campo de Familia e Relações
        query = ":isbn"+isbn;
        ajax.addEventListener('load', function(){
            let book = JSON.parse(this.responseText);
            makeBook(book.items[0]);
            events();
        });
        ajax.open("GET", url+query);
        ajax.send();
    } else {
        events();
        return false;
    }
});


function makeBook(book) {
    let bookInfo = book.volumeInfo;

    let conteiner = document.querySelector('.conteiner');
    conteiner.innerHTML +=
    '<div class="card-head-details"> ' +
        '<h2>'+ ((bookInfo.title != undefined) ? bookInfo.title : "Não encontrado") +'</h2> ' +
        '<h3>'+ ((bookInfo.authors != undefined) ? bookInfo.authors.join(', ') : "Não encontrado") +'</h3> ' +
    '</div> ' +
    '<div class="conteiner-principal"> ' +
        '<div class="card-conteiner"> ' +
            '<div class="card-img-details">' +
                '<div class="card-img"> ' +
                    '<img src="'+ ((bookInfo.imageLinks == undefined) ? 'img/no_cover_thumb.gif' : bookInfo.imageLinks.thumbnail)  +'" alt="Capa do Livro"> ' +
                '</div> ' +
            '</div> ' +
        '</div> ' +
        '<div class="card-content-purchase"> ' +
            '<h2>Comprar</h2> ' +
            '<div class="price"> ' +
                '<h1>R$ 79,90 <em>em 1x no crédito ou À Vista no Boleto</em> </h1> ' +
                '<div> ' +
                    '<i class="material-icons iconCard">payment</i> ' +
                    '<p>Parcelado no Cartão: R$ 79,90 em até 2x de R$ 39,95 sem juros</p> ' +
                '</div>' +
            '</div>' +
            '<div class="calcularFrete"> ' +
                '<form> ' +
                    '<div> ' +
                        '<label for="campoCalcularFrete">Calcular Frete</label> ' +
                        '<input id="campoCalcularFrete" type="text" placeholder="CEP"> ' +
                        '<input type="hidden" value="79.90" id="precoLivro"> ' +
                    '</div> ' +
                    '<button type="button" class="btn btn-secundary btn-calcular-frete">Calcular</button> ' +
                '</form>' +
                '<div class="valorFrete"></div>' +
            '</div>' +
            '<div class="group-button-purchase">' +
                '<button type="button" class="btn btn-secundary"><i class="material-icons">add_shopping_cart</i>Adicionar no carrinho</button>' +
                '<button type="button" class="btn btn-primaty">Comprar</button>' +
            '</div> ' +
        '</div>' +
    '</div> ' +
    '<div class="conteiner-details"> ' +
        '<div class="card-content-details"> ' +
            '<h2>Detalhes</h2> ' +
            '<div> ' +
                '<div> ' +
                    '<p><b>Autor: </b>'+ ((bookInfo.authors != undefined) ? bookInfo.authors.join(', ') : "Não encontrado") +'</p>' +
                    '<p><b>Editora: </b>'+ ((bookInfo.publisher != undefined) ? bookInfo.publisher : "Não encontrado") +'</p>' +
                    '<p><b>Publicado: </b>'+ ((bookInfo.publishedDate != undefined) ? (bookInfo.publishedDate).split('-').reverse().join('/') : "Não encontrado") +'</p> ' +
                '</div> ' +
                '<div> ' +
                    '<p><b>Páginas: </b>'+ ((bookInfo.pageCount != undefined) ? bookInfo.pageCount : "Não encontrado")  +'</p>' +
                    '<p><b>Idioma: </b>'+ ((bookInfo.language != undefined) ? (bookInfo.language).toUpperCase() : "Não encontrado") +'</p>' +
                '</div>' +
            '</div>' +
        '</div> ' +
        '<div class="card-content-description">' +
            '<h2>Descrição</h2>' +
                '<p class="details-text">'+ ((bookInfo.description != undefined) ? (bookInfo.description).toUpperCase() : "Sem descrição") +'</p>' +
        '</div>' +
    '</div>';
}

function events(){
    if (document.querySelector('.btn-calcular-frete') != null) {
        document.querySelector('.btn-calcular-frete').addEventListener('click', function (e) {
            let cepDestino = document.querySelector('#campoCalcularFrete').value;
            let precoLivro = document.querySelector('#precoLivro').value;
            document.querySelector('.valorFrete').innerHTML = "  ";
            calculaFrete(41106, cepDestino, precoLivro, 'PAC');
            calculaFrete(40010, cepDestino, precoLivro, 'Sedex');
        });


        function calculaFrete(codServico, cepDestivo, precoLivor, type) {
            let url = "https://www.chsweb.com.br/apicorreios/frete.php?sCepOrigem=88750000&sCepDestino="+ cepDestivo +"&nVlValorDeclarado="+ precoLivor +"&nCdServico=" + codServico;

            let ajax = new XMLHttpRequest();

            ajax.addEventListener('load', function () {
                addValue(JSON.parse(this.responseText).results, type);
            });
            ajax.open("GET", url);
            ajax.send();
        }

        function addValue(values, type) {
            document.querySelector('.valorFrete').innerHTML += ""
                                                            +"<p><b>"+ type +": </b>R$ "+ values.cServico.Valor +" </p>";
                                                            // +"<p><b>PAC: </b>R$ 39,95</p>";

        }
    }

}

