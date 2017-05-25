$(document).ready(()=>{

    const apiBaseUrl = 'http://api.themoviedb.org/3';
    const imageBaseUrl = 'http://image.tmdb.org/t/p/';
    const nowPlayingUrl = apiBaseUrl + '/movie/now_playing?api_key=' +apiKey

    var buttonsHtml = '';
    for(let i=0; i<genreArray.length; i++){
        buttonsHtml += `<button class="btn btn-success genre-button">${genreArray[i].name}</button>`
    }
    buttonsHtml += '<button class="btn btn-primary all-genre-button">All</button>'
    $('#genre-buttons').html(buttonsHtml);

    $.getJSON(nowPlayingUrl,(nowPlayingData)=>{
        var nowPlayingHtml = getHTML(nowPlayingData);
        $('#movie-grid').html(nowPlayingHtml);
        $('.movie-poster').click(function(){
            
            // movieInfo();

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
        $grid = $('#movie-grid').isotope({
            itemSelector: '.movie-poster'
        });
        $grid.imagesLoaded().progress( function() {
            $grid.isotope('layout');
        });
        $('.genre-button').click(function(){
            $grid.isotope({filter: '.'+this.innerText})
        });
        $('.all-genre-button').click(function(){
            $grid.isotope({filter: '.movie-poster'})
        });
        $grid.isotope('destroy');
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
            });
            $grid = $('#movie-grid').isotope({
                itemSelector: '.movie-poster'
            })
            $grid.imagesLoaded().progress( function() {
                $grid.isotope('layout');
            });
            $('.genre-button').click(function(){
                $grid.isotope({filter: '.'+this.innerText})
            });
            $('.all-genre-button').click(function(){
                $grid.isotope({filter: '.movie-poster'})
            });
        });
    });

    // function movieInfo(){
    //     var thisMovieId = $(this).attr('movie-id');
    //     var thisMovieUrl = `${apiBaseUrl}/movie/${thisMovieId}?api_key=${apiKey}`;
    //     $.getJSON(thisMovieUrl,(thisMovieData)=>{
    //         $('#myModalLabel').html(thisMovieData.title);
    //         $('.tagline').html(thisMovieData.tagline);
    //         $('.overview').html(thisMovieData.overview);
    //         document.getElementById('modal-body-img').outerHTML = '<img src="' +imageBaseUrl + 'w780' + thisMovieData.backdrop_path+'" id="modal-body-img">';
    //         $('#myModal').modal();
    //     });
    // };


    function getHTML(data){
        var newHtml = '';
        for(let i=0; i < data.results.length; i++){
            var thisMovieGenres = data.results[i].genre_ids;
            var movieGenreClassList = " ";
            for (let j=0; j<genreArray.length; j++){
                if(thisMovieGenres.indexOf(genreArray[j].id) > -1){
                    movieGenreClassList += genreArray[j].name + " ";
                }
            };
            newHtml += '<div class="col-sm-6 col-md-3 movie-poster ' +movieGenreClassList+ '" movie-id='+data.results[i].id+'>';
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