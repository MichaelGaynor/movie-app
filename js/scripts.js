$(document).ready(()=>{

    const apiBaseUrl = 'http://api.themoviedb.org/3';
    const imageBaseUrl = 'http://image.tmdb.org/t/p/';
    const nowPlayingUrl = apiBaseUrl + '/movie/now_playing?api_key=' +apiKey

    $.getJSON(nowPlayingUrl,(nowPlayingData)=>{
        var nowPlayingHtml = '';
        for(let i=0; i < nowPlayingData.results.length; i++){
            var posterUrl = imageBaseUrl + 'w300' + nowPlayingData.results[i].poster_path;
            nowPlayingHtml += '<div class="col-sm-6 col-md-3">';
                nowPlayingHtml += `<img src="${posterUrl}">`;
            nowPlayingHtml += '</div>';
        }
        $('#movie-grid').html(nowPlayingHtml);
    })
    $('#movie-form').submit((event)=>{
        event.preventDefault();
        var userInput = $('#search-input').val();
        $('#search-input').val('');
        var safeUserInput = encodeURI(userInput);
        var searchUrl = apiBaseUrl + '/search/movie?query=' +safeUserInput+ '&api_key=' +apiKey;
        $.getJSON(searchUrl,(searchMovieData)=>{
            var searchMovieHtml = getHTML(searchMovieData);
            $('#movie-grid').html(searchMovieHtml);
        })
    })

    function getHTML(data){
        var newHtml = '';
        for(let i=0; i < data.results.length; i++){
            var posterUrl = imageBaseUrl + 'w300' + data.results[i].poster_path;
            newHtml += '<div class="col-sm-6 col-md-3">';
                newHtml += `<img src="${posterUrl}">`;
            newHtml += '</div>';
        }
        return newHtml;
    }
});