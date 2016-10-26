$( document ).ready( function(){

    Pace.on( 'done', function(){
        $( '.pace-progress' ).animate( {
            opacity : 0
        }, {
            duration : 1000,
            complete : function(){
                $.force_appear();
                $( '.pace' ).remove();
            }
        } );
    } );

    $( 'a[href*="#"]:not([href="#"])' ).click( function(){
        if( location.pathname.replace( /^\//, '' ) == this.pathname.replace( /^\//, '' ) && location.hostname == this.hostname ){
            var target = $( this.hash );
            var hash = this.hash.slice( 1 );
            target = target.length ? target : $( '[name=' + hash + ']' );
            if( target.length ){
                $( 'html, body' ).animate( {
                    scrollTop : target.offset().top
                }, {
                    duration : 500,
                    complete : function(){
                        window.location.hash = hash;
                    }
                } );
                return false;
            }
        }
    } );

    loadMap();
} );

function loadMap(){
    mapboxgl.accessToken = 'pk.eyJ1IjoicXJpdmkiLCJhIjoicXRVWmhDNCJ9.6uKJH1YNBkLbus8T_ZvRFA';

    var el = document.createElement( 'div' );
    el.className = 'marker';

    var map = new mapboxgl.Map( {
        container : 'map',
        style : 'mapbox://styles/qrivi/ciuk8d6jb00ar2jmlqkwgbsrg',
        center : [3.209271,51.202320],
        zoom : 15
    } );

    new mapboxgl.Marker( el )
        .setLngLat( [3.209271,51.202320] )
        .addTo( map );

    map.addControl( new mapboxgl.NavigationControl() );
    map.scrollZoom.disable();
}