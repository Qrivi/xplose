$( document ).ready( function(){

    Pace.on( 'done', function(){
        $( '.pace-progress' ).animate( {
            opacity : 0
        }, {
            duration : 1000,
            complete : function(){
                $( '.pace' ).remove();
                $.force_appear();
            }
        } );
    } );

    $( '.mail' ).attr( 'href', 'mailto:info@X-plose.be' );
    $( '.mail' ).text( 'info@x-plose.be' );
    $( '.phone' ).attr( 'href', 'tel:0032477349149' );
    $( '.phone' ).text( '+32 477 34 91 49' );

    $( 'body > header p, .h' ).appear();

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

    $( 'footer' ).on( 'mousedown touchstart', function(){
        $( 'footer a' ).fadeOut( 250 );
    } ).on( 'mouseup touchend', function(){
        $( 'footer a' ).fadeIn( 250 );
    } );

    $( 'input, textarea' ).on( 'focus', function(){
        if( $( '#contact' ).hasClass( 'sent' ) ){
            $( '#contact' ).removeClass( 'sent' );
            $( '#contact button' ).removeAttr( 'disabled' );
            $( '#contact span' ).text( ' ' );
            $( '#contact input, #contact textarea' ).val( '' );
        }
    } );

    $( 'input, textarea' ).on( 'blur', function(){
        $( this ).removeClass( 'error' );
    } );

    $( 'body > header p' ).on( 'appear', function(){
        $( this ).css( 'animation', 'fadeIn 1250ms forwards' );
    } );

    $( '.h' ).on( 'appear', function(){
        $( this ).removeClass( 'h' );
    } );

    $( '#contact' ).submit( function( e ){
        e.preventDefault();

        var errors = false;

        $( '*' ).removeClass( 'error' );
        $( 'span', this ).text( '' );

        if( $( '[name=email]', this ).val().indexOf( '@' ) < 0 ){
            $( '[name=email]', this ).addClass( 'error' );
            $( '#contact span' ).addClass( 'error' );
            $( '#contact span' ).text( 'Gelieve een geldig e-mailadres op te geven.' );
            errors = true;
        }

        $( 'input, textarea', this ).each( function(){
            if( !$( this ).val().trim() ){
                $( this ).addClass( 'error' );
                $( '#contact span' ).addClass( 'error' );
                $( '#contact span' ).text( 'Alle velden zijn verplicht.' );
                errors = true;
            }
        } );

        if( errors ){
            for( var i = 0; i < 5; i++ ){
                $( 'button', this ).animate( {
                    marginRight : ((i % 2 == 0 ? 15 : 15 * -1))
                }, 75 );
            }
            $( 'button', this ).animate( { marginRight : 0 }, 75 );
        }else{
            $.post( $( '#contact' ).attr( 'action' ), $( '#contact' ).serialize(), function(){
                $( '#contact *' ).removeClass( 'error' );
                $( '#contact span' ).text( ' ' );
            } )
                .done( function(){
                    $( '#contact' ).addClass( 'sent' );
                    $( '#contact button' ).attr( 'disabled', 'disabled' );
                    $( '#contact span' ).text( 'Je bericht werd verzonden! We antwoorden zo spoedig mogelijk!' );
                } )
                .fail( function(){
                    $( '#contact span' ).addClass( 'error' );
                    $( '#contact span' ).text( 'Er ging iets goed mis! Je bericht kon niet verzonden worden.' );
                } );
        }
        return false;
    } );

    loadMap();
} )
;

function loadMap(){
    mapboxgl.accessToken = 'pk.eyJ1IjoicXJpdmkiLCJhIjoiY2l2MWphb3RoMDAwMjJ0bnpremV4YXozMSJ9.RIlfGIqXPsijNmYe6VpgIQ';

    var el = document.createElement( 'div' );
    el.className = 'marker';
    el.innerHTML = '<p>18-Oktoberstraat 39<br>8200 Brugge</p>';

    var map = new mapboxgl.Map( {
        container : 'map',
        style : 'mapbox://styles/qrivi/ciuk8d6jb00ar2jmlqkwgbsrg',
        center : [3.209271, 51.202320],
        zoom : 13
    } );

    new mapboxgl.Marker( el )
        .setLngLat( [3.209271, 51.202320] )
        .addTo( map );

    map.addControl( new mapboxgl.NavigationControl() );
    map.scrollZoom.disable();
}