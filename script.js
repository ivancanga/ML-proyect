function getSearchResults() {
    search = document.getElementById('search').value;
    const FOUND = fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${search}&limit=10`)
        .then((response) => {
            return response.json();
        })
        .then(data => {
            console.log(data.results)
            $("#inner-results").html("");
            for (e in data.results) {
                let title = data.results[e].title;
                let price = data.results[e].price;
                let image = data.results[e].thumbnail;
                let permalink = data.results[e].permalink;
                renderizeResults(title, price, image, permalink);
            }

        })
    return FOUND
}

function renderizeResults(title, price, image, permalink) {
    $('#inner-results').append(
        `
        <div class='result'>
        <a href='${permalink}' target='_blank'>
        <img class='thumbnail' src='${image}' />
        ${title}<br>
        $${price}<br>
        </a>
        </div>
        `
    );
}

$(function () {
    $("#search").keypress(function (e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            $('button').click();
            return false;
        } else {
            return true;
        }
    });
});