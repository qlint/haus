    'use strict';

    /**
     * Map
     */
    var map;

    /**
     * Map initialization (Google Maps callback function)
     */
    function initMap() {

        /**
         * Dummy data
         */
        var dummyData = initData();

        /**
         * Block containing cities data
         */
        var $block = $('section.grid div.overview-block div.row').empty();

        /**
         * Create map with center at Russia
         */
        map = dummyData.countries.Russia.createMap('#map');

        /**
         * Filling countries data
         */
        dummyData.countries.Russia.getCities().map(function(city, index) {

            $block.append(
                $('<div/>', {
                    'class': 'grid-item clearfix col-md-6'
                }).append(
                    $('<img/>', {
                        'class': 'grid-item__img'
                    }).attr('src', 'img/cities/' + city.data('name').replace(' ', '-') + '--thumb.jpg').attr('alt', city.data('name'))
                ).append(
                    $('<div/>', {
                        'class': 'grid-item-wrapper'
                    }).append(
                        $('<a/>', {
                            'class': 'grid-item__title',
                            'html': city.data('name'),
                            'href': 'city.html'
                        })
                    ).append(
                        $('<section/>', {
                            'class': 'social-stats'
                        }).append(
                            $('<div/>', {
                                'class': 'social-stats__item social-stats-item'
                            }).append(
                                $('<span/>', {
                                    'class': 'social-stats-item__icon fa fa-star'
                                })
                            ).append(
                                $('<span/>', {
                                    'class': 'social-stats-item__value',
                                    'html': city.data('rating')
                                })
                            )
                        ).append(
                            $('<div/>', {
                                'class': 'social-stats__item social-stats-item'
                            }).append(
                                $('<span/>', {
                                    'class': 'social-stats-item__icon fa fa-comment'
                                })
                            ).append(
                                $('<span/>', {
                                    'class': 'social-stats-item__value',
                                    'html': city.data('comments')
                                })
                            )
                        )
                    )
                ).on('mouseover', function() {
                    /**
                     * Create and show city marker while mouseover
                     */
                    addMarker(city);
                }).on('mouseout', function() {
                    /**
                     * Clear all markers while mouseout
                     */
                    clearMarkers(city);
                })
            );

            /**
             * Show first city
             */
            if (0 === index)
                addMarker(city);

        });

        /**
         * Block containing largest cities data
         */
        var $ul = $('section.places-block ul.striped-list').empty();

        dummyData.countries.Russia.getCities('largest').map(function(city) {

            $ul.append(
                $('<li/>', {
                    'class': 'striped-list-item'
                }).append(
                    $('<a/>', {
                        'href': 'city.html',
                        'html': city.data('name')
                    })
                ).on('mouseover', function() {
                    /**
                     * Create and show city marker while mouseover
                     */
                    addMarker(city);
                }).on('mouseout', function() {
                    /**
                     * Clear all markers while mouseout
                     */
                    clearMarkers(city);
                })
            );

        });

    };

    /**
     * Create new city marker
     */
    function addMarker(city) {

        map.clearMarkers(city);

        city.country.createMarker(map);

        var marker = city.createMarker(map).on('click', function() {
            window.location.href = 'city.html';
        });
        map.panTo(city);
        marker.infoWindow.show();

    };

    /**
     * Clear all map markers
     */
    function clearMarkers(city) {

        map.clearMarkers();

        city.country.createMarker(map);

    };