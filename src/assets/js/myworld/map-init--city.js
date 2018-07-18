

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
         * Output city data
         */
        dummyData.cities.Vladivostok.output('div.sidebar.container');

        /**
         * Create map with center at Vladivostok
         */
        map = dummyData.cities.Vladivostok.createMap('#map');

        /**
         * Filling places data
         */
        var $placesBlock = $('section.grid#places div.overview-block div.row').empty();

        dummyData.cities.Vladivostok.getPlaces().map(function(place) {

            /**
             * Create place marker
             */
            var marker = place.createMarker(map, {
                icon: 'img/pins/' + place.data('type') + '-color.png',
            }).on('click', function() {
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
                    /**
                     * Center map on place and show info window while mouseover
                     */
                    marker.infoWindow.show(map);
                    map.panTo(place);
                    /**
                     * Highlight current place
                     */
                    // dummyData.cities.Vladivostok.getPlaces().map(function (place) {
                    //     place.marker.setIcon('img/pins/' + place.data('type') + '.png');
                    // });
                    // marker.setIcon('img/pins/' + place.data('type') + '-active.png');
                })
            );

        });

        /**
         * Filling vacancies data
         */
        var $vacanciesBlock = $('section.grid#vacancy div.overview-block div.row').empty();

        dummyData.cities.Vladivostok.getVacancies().map(function(vacancy) {

            /**
             * Create vacancy marker
             */
            var marker = vacancy.createMarker(map, {
                icon: 'img/pins/' + vacancy.company.data('type') + '-color.png',
            }).on('click', function() {
                window.location.href = 'open_vacancy.html';
            });

            /**
             * Output vacancy tags
             */
            var $tagsSection = $('<section/>', {
                'class': 'tags'
            });

            vacancy.data('tags').map(function(tag) {

                $tagsSection.append(
                    $('<span/>', {
                        'class': 'tags__item',
                        'html': tag
                    })
                );

            });

            $vacanciesBlock.append(
                $('<div/>', {
                    'class': 'grid-item grid-item--big clearfix col-md-12'
                }).append(
                    $('<img/>', {
                        'class': 'grid-item__img'
                    }).attr('alt', vacancy.data('name')).attr('src', 'img/companies/' + vacancy.company.data('code') + '.png')
                ).append(
                    $('<div/>', {
                        'class': 'grid-item-wrapper'
                    }).append(
                        $('<a/>', {
                            'class': 'grid-item__title grid-item__title--fire',
                            'html': vacancy.data('name'),
                            'href': 'open_vacancy.html'
                        })
                    ).append(
                        $('<p/>', {
                            'class': 'pull-right price',
                            'html': vacancy.data('currency') + vacancy.data('salary')
                        })
                    ).append(
                        $('<p/>', {
                            'class': 'grid-item__desc',
                            'html': vacancy.data('description')
                        })
                    ).append(
                        $tagsSection
                    )
                ).on('mouseover', function() {
                    /**
                     * Center map on vacancy and show info window while mouseover
                     */
                    marker.infoWindow.show(map);
                    map.panTo(vacancy);
                    /**
                     * Highlight current vacancy
                     */
                    // dummyData.cities.Vladivostok.getVacancies().map(function (vacancy) {
                    //     vacancy.marker.setIcon('img/pins/' + vacancy.company.data('type') + '.png');
                    // });
                    // marker.setIcon('img/pins/' + vacancy.company.data('type') + '-active.png');
                })
            );

        });

        /**
         * Filling news data
         */
        var $newsBlock = $('section.grid#news div.overview-block div.row').empty();

        dummyData.cities.Vladivostok.getNews().map(function(news) {

            var marker;

            /**
             * Create news marker (only for news containing geo coordinates)
             */
            if (news.data('latitude') && news.data('longitude'))
                marker = news.createMarker(map).on('click', function() {
                    window.location.href = 'open_news.html';
                });

            $newsBlock.append(
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
                    /**
                     * Center map on news and show info window while mouseover (only for news containing geo coordinates)
                     */
                    if (marker) {
                        map.center(marker.position.latitude, marker.position.longitude);
                        marker.infoWindow.show();
                        /**
                         * Highlight current news
                         */
                        dummyData.cities.Vladivostok.getNews().map(function(news) {
                            if (news.marker)
                                news.marker.setIcon('img/pins/route.png');
                        });
                        marker.setIcon('img/pins/route-active.png');
                    };
                })
            );

        });

        /**
         * Filling events data
         */
        var $eventsBlock = $('section.grid#events div.overview-block div.row').empty();

        dummyData.cities.Vladivostok.getEvents().map(function(event) {

            /**
             * Create event marker
             */
            var marker = event.createMarker(map, {
                icon: 'img/pins/' + event.place.data('type') + '-color.png',
            }).on('click', function() {
                window.location.href = 'open_events.html';
            });

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
                ).on('mouseover', function() {
                    /**
                     * Center map on event and show info window while mouseover
                     */
                    marker.infoWindow.show(map);
                    map.panTo(event);
                    /**
                     * Highlight current event
                     */
                    // dummyData.cities.Vladivostok.getEvents().map(function (event) {
                    //     event.marker.setIcon('img/pins/' + event.place.data('type') + '.png');
                    // });
                    // marker.setIcon('img/pins/' + event.place.data('type') + '-active.png');
                })
            );

        });

        /**
         * Filling excursions data
         */
        var $excursionsBlock = $('section.grid#excursions div.overview-block div.row').empty();

        dummyData.cities.Vladivostok.getExcursions().map(function(excursion) {

            /**
             * Create excursion route
             */
            var route = excursion.createRoute(map);

            /**
             * Output dummy rating (4 stars)
             */
            var $ratingSection = $('<div/>', {
                'class': 'grid-item__rating'
            });

            for (var i = 0; i < 4; i++) {
                $ratingSection.append(
                    $('<span/>', {
                        'class': 'star fa fa-star'
                    })
                );
            };
            $ratingSection.append(
                $('<span/>', {
                    'class': 'start fa fa-star star--empty'
                })
            );

            $excursionsBlock.append(
                $('<div/>', {
                    'class': 'grid-item grid-item--big clearfix col-md-12'
                }).append(
                    $('<a/>', {
                        'class': 'grid-item__title',
                        'href': 'open_exc.html',
                        'html': excursion.data('name')
                    })
                ).append(
                    $('<div/>', {
                        'class': 'pull-right price-wrapper'
                    }).append(
                        $('<p/>', {
                            'class': 'price',
                            'html': excursion.data('currency') + excursion.data('price')
                        })
                    ).append(
                        $ratingSection
                    )
                ).append(
                    $('<p/>', {
                        'class': 'grid-item__desc',
                        'html': excursion.data('description')
                    })
                ).append(
                    $('<div/>', {
                        'class': 'overview-block overview-block--fluid'
                    }).append(
                        $('<div/>', {
                            'class': 'excursion',
                            'style': 'background-image: url("img/excursions/1.jpg");'
                        }).append(
                            $('<div/>', {
                                'class': 'excursion__info'
                            }).append(
                                $('<div/>', {
                                    'class': 'excursion-info-block'
                                }).append(
                                    $('<img/>', {
                                        'class': 'excursion-info-block__img'
                                    }).attr('src', 'img/guides/1.jpg').attr('alt', excursion.data('guide'))
                                ).append(
                                    $('<div/>', {
                                        'class': 'excursion-info-block-wrap'
                                    }).append(
                                        $('<p/>', {
                                            'class': 'excursion-info-block__title',
                                            'html': 'Guide:'
                                        })
                                    ).append(
                                        $('<a/>', {
                                            'href': 'javascript:void(0);',
                                            'html': excursion.data('guide')
                                        })
                                    )
                                )
                            ).append(
                                $('<div/>', {
                                    'class': 'excursion-info-block'
                                }).append(
                                    $('<img/>', {
                                        'class': 'excursion-info-block__img'
                                    }).attr('src', 'img/icons/globe.png').attr('alt', excursion.data('language'))
                                ).append(
                                    $('<div/>', {
                                        'class': 'excursion-info-block-wrap'
                                    }).append(
                                        $('<p/>', {
                                            'class': 'excursion-info-block__title',
                                            'html': 'Language'
                                        })
                                    ).append(
                                        $('<p/>', {
                                            'html': excursion.data('language')
                                        })
                                    )
                                )
                            ).append(
                                $('<div/>', {
                                    'class': 'excursion-info-block'
                                }).append(
                                    $('<img/>', {
                                        'class': 'excursion-info-block__img'
                                    }).attr('src', 'img/icons/time.png').attr('alt', excursion.data('duration'))
                                ).append(
                                    $('<div/>', {
                                        'class': 'excursion-info-block-wrap'
                                    }).append(
                                        $('<p/>', {
                                            'class': 'excursion-info-block__title',
                                            'html': 'Duration'
                                        })
                                    ).append(
                                        $('<p/>', {
                                            'html': excursion.data('duration')
                                        })
                                    )
                                )
                            )
                        )
                    )
                ).on('mouseover', function() {
                    map.hideInfoWindows();
                    /**
                     * Output all routes with default color
                     */
                    map.routes.map(function(route) {
                        route.update({
                            markers: {
                                icon: 'img/pins/route.png'
                            },
                            polylineOptions: {
                                strokeColor: '#0A161E'
                            }
                        });
                    });
                    /**
                     * And highlight current route as active
                     */
                    route.update({
                        markers: {
                            icon: 'img/pins/route-active.png'
                        },
                        polylineOptions: {
                            strokeColor: 'red'
                        }
                    });
                })
            );

        });

        /**
         * Turn on zoom map to view all markers
         */
        map.autoZoom(true);

        /**
         * You can group markers after filling
         * For example, using 3rd-party script like OverlappingMarkerSpiderfier
         */
        jQuery.ajax({
            url: 'http://jawj.github.io/OverlappingMarkerSpiderfier/bin/oms.min.js',
            dataType: 'script',
            async: true,
            success: function() {
                var oms = new OverlappingMarkerSpiderfier(map.instance, {
                    markersWontMove: true,
                    markersWontHide: true,
                    nearbyDistance: 20
                });
                map.markers.map(function(marker) {
                    /**
                     * Disable click event for marker before adding to OverlappingMarkerSpiderfier
                     */
                    oms.addMarker(marker.disableEvent('click').instance);
                });
                oms.addListener('click', function(marker) {
                    /**
                     * Run click event manually because we disable markers click event
                     */
                    marker._owner.executeEvent('click');
                });
            }
        });

    };