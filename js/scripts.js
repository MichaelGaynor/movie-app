$(document).ready(()=>{

    const apiBaseUrl = 'http://api.themoviedb.org/3';
    const imageBaseUrl = 'http://image.tmdb.org/t/p/';
    const nowPlayingUrl = apiBaseUrl + '/movie/now_playing?api_key=' +apiKey

    $.getJSON(nowPlayingUrl,(nowPlayingData)=>{
        var nowPlayingHtml = getHTML(nowPlayingData);
        $('#movie-grid').html(nowPlayingHtml);
        $('.movie-poster').click(function(){
            var thisMovieId = $(this).attr('movie-id');
            // console.log(thisMovieId);
            var thisMovieUrl = `${apiBaseUrl}/movie/${thisMovieId}?api_key=${apiKey}`;
            $.getJSON(thisMovieUrl,(thisMovieData)=>{
                // console.log(thisMovieData);
                $('#myModalLabel').html(thisMovieData.title);
                $('.tagline').html(thisMovieData.tagline);
                // document.getElementById('modal-body-img').outerHTML = '<img src="' +imageBaseUrl + 'w780' + thisMovieData.backdrop_path+'">';
                $('.overview').html(thisMovieData.overview);
                document.getElementById('modal-body-img').outerHTML = '<img src="' +imageBaseUrl + 'w780' + thisMovieData.backdrop_path+'" id="modal-body-img">';
                $('#myModal').modal();
            })
        });
    });


    $('#movie-form').submit((event)=>{
        event.preventDefault();
        var userInput = $('#search-input').val();
        $('#search-input').val('');
        var safeUserInput = encodeURI(userInput);
        var searchUrl = apiBaseUrl + '/search/movie?query=' +safeUserInput+ '&api_key=' +apiKey;
        $.getJSON(searchUrl,(searchMovieData)=>{
            var searchMovieHtml = getHTML(searchMovieData);
            $('#movie-grid').html(searchMovieHtml);
             $('.movie-poster').click(function(){
                var thisMovieId = $(this).attr('movie-id');
                // console.log(thisMovieId);
                var thisMovieUrl = `${apiBaseUrl}/movie/${thisMovieId}?api_key=${apiKey}`;
                $.getJSON(thisMovieUrl,(thisMovieData)=>{
                    // console.log(thisMovieData);
                    $('#myModalLabel').html(thisMovieData.title);
                    $('.tagline').html(thisMovieData.tagline);
                    // document.getElementById('modal-body-img').outerHTML = '<img src="' +imageBaseUrl + 'w780' + thisMovieData.backdrop_path+'">';
                    $('.overview').html(thisMovieData.overview);
                    document.getElementById('modal-body-img').outerHTML = '<img src="' +imageBaseUrl + 'w780' + thisMovieData.backdrop_path+'" id="modal-body-img">';
                    $('#myModal').modal();
                })
            })
        });
    });


    function getHTML(data){
        var newHtml = '';
        for(let i=0; i < data.results.length; i++){
            newHtml += '<div class="col-sm-6 col-md-3 movie-poster" movie-id='+data.results[i].id+'>';
                if(data.results[i].poster_path != null){
                    var posterUrl = imageBaseUrl + 'w300' + data.results[i].poster_path;
                    newHtml += `<img src="${posterUrl}" class="posters">`;
                }else{
                    newHtml += `<div class="replace-poster">`
                        newHtml += `<h3>${data.results[i].title}</h3>`
                    newHtml += `</div>`
                }
            newHtml += '</div>';
        }
        return newHtml;
    }
});