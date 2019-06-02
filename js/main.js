if (!isVisible(document.querySelector('#searchInput'))) {
    let searchInput = document.querySelector('#searchInput');
    document.querySelector('.searchClick').addEventListener('click', function (e) {
         searchInput.style.display = isVisible(searchInput) ? 'none' : 'block';
    });
}

