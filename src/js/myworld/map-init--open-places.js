    'use strict';

    /**
     * Map
     */
    var map;
    /**
     * Dummy data
     */
    var dummyData = initData();
    /**
     * Current place data
     */
    var currentPlace, currentMarker;

    /**
     * Map initialization (Google Maps callback function)
     */
    function initMap() {

        currentPlace = dummyData.places.MummiyTrollCafe;

        /**
         * Output place data
         */
        dummyData.places.MummiyTrollCafe.output('div.sidebar.container');

        /**
         * Create map with center at place
         */
        map = dummyData.places.MummiyTrollCafe.createMap('#map');

        createPlaceMarker();

        /**
         * Filling events data
         */
        var $eventsBlock = $('section.grid:eq(0) div.row').empty();

        dummyData.places.MummiyTrollCafe.getEvents().map(function(event) {

            /**
             * Output event tags
             */
            var $tagsSection = $('<section/>', {
                'class': 'tags'
            });

            event.data('tags').map(function(tag) {

                $tagsSection.append(
                    $('<span/>', {
                        'class': 'tags__item',
                        'html': tag
                    })
                );

            });

            $eventsBlock.append(
                $('<div/>', {
                    'class': 'grid-item grid-item--big clearfix col-md-12'
                }).append(
                    $('<img/>', {
                        'class': 'grid-item__img'
                    }).attr('alt', event.data('name')).attr('src', 'img/places/' + event.place.data('code') + '.png')
                ).append(
                    $('<div/>', {
                        'class': 'grid-item-wrapper'
                    }).append(
                        $('<a/>', {
                            'class': 'grid-item__title',
                            'html': event.data('name'),
                            'href': 'open_events.html'
                        })
                    ).append(
                        $('<div/>', {
                            'class': 'pull-right price-wrapper'
                        }).append(
                            $('<p/>', {
                                'class': 'price',
                                'html': event.data('currency') + event.data('price')
                            })
                        ).append(
                            $('<p/>', {
                                'class': 'grid-item__date-right'
                            }).append(
                                $('<img/>', {
                                    'src': 'img/icons/calendar.png'
                                })
                            ).append(
                                $('<span/>', {
                                    'html': event.data('datetime')
                                })
                            )
                        )
                    ).append(
                        $('<p/>', {
                            'class': 'grid-item__desc',
                            'html': event.data('description')
                        })
                    ).append(
                        $tagsSection
                    )
                )
            );

        });

        /**
         * Filling city places
         */
        var $placesBlock = $('section.grid:eq(1) div.row').empty();

        dummyData.places.MummiyTrollCafe.city.getPlaces().map(function(place) {

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

            $placesBlock.append(
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
                            'class': 'grid-item__title',
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
                                'class': 'social-stats__item social-stats-item',
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
                                'class': 'social-stats__item social-stats-item',
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
                    if (place === currentPlace)
                        return;
                    map.clearMarkers();
                    createPlaceMarker();
                    var marker = place.createMarker(map);
                    map.panTo(place);
                    marker.infoWindow.show(false);
                }).on('mouseout', function() {
                    map.clearMarkers();
                    createPlaceMarker();
                })
            );

        });

        map.autoZoom(true);

    };

    /**
     * Add place marker to map
     */
    function createPlaceMarker() {

        map.panTo(currentPlace);
        var marker = currentPlace.createMarker(map, true);
        marker.createInfoWindow({
            contentString: '<div class="markinfo dark right placepin">' +
                '<h3>' + currentPlace.data('name') + '</h3>' +
                '<span class="descr">' + currentPlace.data('address') + '</span>' +
                '<a href="javascript:void(0);" class="uber">GO!</a>' +
                '<div>',
            pixelOffset: new google.maps.Size(30, 80)
        });
        marker.infoWindow.show();

    };