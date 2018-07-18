    'use strict';

    /**
     * Map initialization (Google Maps callback function)
     */
    function initMap() {

        /**
         * Dummy data
         */
        var dummyData = initData();

        /**
         * Create map with center at Vladivostok
         */
        var map = dummyData.cities.Vladivostok.createMap('#map');

        /**
         * Filling news data
         */
        var $block = $('section.grid div.overview-block div.row').empty();

        dummyData.cities.Vladivostok.getNews().map(function(news) {

            var marker;

            if (news.data('latitude') && news.data('longitude'))
                marker = news.createMarker(map).on('click', function() {
                    window.location.href = 'open_news.html';
                });

            $block.append(
                $('<div/>', {
                    'class': 'grid-item grid-item--post clearfix col-sm-6'
                }).append(
                    $('<a/>', {
                        'class': 'grid-item__title',
                        'href': 'open_news.html',
                        'html': news.data('title')
                    })
                ).append(
                    $('<p/>', {
                        'class': 'grid-item__desc',
                        'html': news.data('description')
                    })
                ).append(
                    $('<p/>', {
                        'class': 'grid-item__date',
                        'html': news.data('datetime')
                    })
                ).on('mouseover', function() {
                    if (marker) {
                        map.center(marker.position.latitude, marker.position.longitude);
                        marker.infoWindow.show();
                    };
                })
            );

        });

        /**
         * Turn on zoom map to view all markers
         */
        map.autoZoom(true);

    };