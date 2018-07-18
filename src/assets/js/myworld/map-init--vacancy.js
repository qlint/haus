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
         * Filling vacancy data
         */
        var $block = $('section.grid div.overview-block div.row').empty();

        dummyData.cities.Vladivostok.getVacancies().map(function(vacancy) {

            var marker = vacancy.createMarker(map).on('click', function() {
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

            $block.append(
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
                    marker.infoWindow.show(map);
                    map.panTo(vacancy);
                })
            );

        });

        /**
         * Turn on zoom map to view all markers
         */
        map.autoZoom(true);

    };