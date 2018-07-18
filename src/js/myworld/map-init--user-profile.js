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
         * Filling visited places data
         */
        var $block = $('section.grid div.overview-block div.row:eq(0)').empty();

        dummyData.cities.Vladivostok.getPlaces().map(function(place) {

            var marker = place.createMarker(map).on('click', function() {
                window.location.href = 'open_places.html';
            });

            /**
             * Output place tags
             */
            var $tagsSection = $('<section/>', {
                'class': 'tags'
            });

            place.data('tags').map(function(tag) {

                $tagsSection.append(
                    $('<span/>', {
                        'class': 'tags__item',
                        'html': tag
                    })
                );

            });

            $block.append(
                $('<div/>', {
                    'class': 'grid-item grid-item--big clearfix col-md-12'
                }).append(
                    $('<img/>', {
                        'class': 'grid-item__img'
                    }).attr('alt', place.data('name')).attr('src', 'img/places/' + place.data('code') + '.png')
                ).append(
                    $('<div/>', {
                        'class': 'grid-item-wrapper'
                    }).append(
                        $('<a/>', {
                            'class': 'grid-item__title grid-item__title',
                            'html': place.data('name'),
                            'href': 'open_places.html'
                        })
                    ).append(
                        $('<p/>', {
                            'class': 'grid-item__desc',
                            'html': place.data('description')
                        })
                    ).append(
                        $tagsSection
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
                                    'html': place.data('rating')
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
                                    'html': place.data('comments')
                                })
                            )
                        )
                    )
                ).on('mouseover', function() {
                    marker.infoWindow.show(map);
                    map.panTo(place);
                })
            );

        });

        /**
         * Turn on zoom map to view all markers
         */
        map.autoZoom(true);

    };