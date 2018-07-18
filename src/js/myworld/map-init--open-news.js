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
         * Create map with center at news
         */
        var map = dummyData.news.AirportApproaches.createMap('#map');

        /**
         * Output news data
         */
        dummyData.news.AirportApproaches.output('div.sidebar.container');

        /**
         * Create news marker and center map
         */
        dummyData.news.AirportApproaches.createMarker(map);
        map.panTo(dummyData.news.AirportApproaches);

    };