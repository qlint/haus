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
         * Turn on zoom map to view all markers
         */
        map.autoZoom(true);

    };