/* CS235 Assignment 2 : Siddarth Kumar, Kaushik Murli - April 08, 2018 */


//base call count

//Filter data according to user input
var
	source,
	dest,
	sCode,
	//dCode,
	sourceLat,
	sourceLong,
	//destLat,
	//destLong,
	temp = [],
	newFlights = []


function f(start,end){
	flights = flightsMain.slice()
	source = start;
	if(source){
		temp = source.split(",")
		sCode = temp[0]
		sourceLat = parseFloat(temp[1])
		sourceLong = parseFloat(temp[2])
		// temp = dest.split(",")
		// console.log("temp again", temp)
		// dCode = temp[0]
		// destLat = temp[1]
		// destLong = temp[2]
		console.log("Source Lat and long:", sourceLat,sourceLong)
		console.log("Flights data initially: ",flights)
		for ( i=0;i< flights.length;i++){
			if((Math.abs(sourceLat - flights[i][0])< 0.02)  && (Math.abs(sourceLong - flights[i][1])< 0.02)){
				//console.log("Inside if")
				var newlatLong = [parseFloat(flights[i][0]),parseFloat(flights[i][1]),parseFloat(flights[i][2]),parseFloat(flights[i][3])]
				newFlights.push(newlatLong)
			}
		}
	console.log("NewFlights contents:",newFlights)
	flights = []
	flights = newFlights;
	console.log("New flight data" , flights)
	callBase(++N_BASE_CALL);
  	}
}


//GUI control variables
var 
	flightSpriteSize        = 0.105,
	flightsPathLinesOpacity = 0.6


//  Three.js basics.

function callBase(flag){
	
    // Three js scene elements
	var
	camera,
	scene,
	renderer,
	controls,
	stats

	//  Main stage dressing.
	var
	system,
	earth,
	stars


	//  Flight data.
	var 
	flightsTotal = flights.length,
	flightsPathSplines = [],
	flightsPointCloudGeometry,
	flightsPointCloud,
	flightPositions,
	flightSpriteSizes,
	flightsPathLines,
	flightsStartTimes = [],
	flightsEndTimes   = []

  
	// document.addEventListener( 'DOMContentLoaded', function(){

	// 	if( !Detector.webgl ) Detector.addGetWebGLMessage( document.body )
	// 	else {

	// 		setupThree()
	// 		setupSystem()
	// 		setupEarth()
	// 		// renderCities()S
	// 		setupFlightsPathSplines()
	// 		setupFlightsPathLines()
	// 		setupFlightsPointCloud()
	// 		setupGUI()

	// 		system.rotation.z += 23.4 * Math.PI / 180
	// 		system.rotation.x  = Math.PI / 5
	// 		animate()
	// 	}
	// 	console.log('Setup success')
	// })

//Listener commented such that the base.js can be re-called to load real time data
if( !Detector.webgl ) Detector.addGetWebGLMessage( document.body )
		else {
			setupThree()
			setupSystem()
			setupEarth()
			setupFlightsPathSplines()
			setupFlightsPathLines()
			setupFlightsPointCloud()
			if(flag === 1)
				setupGUI()
	
			system.rotation.z += 23.4 * Math.PI / 180
			system.rotation.x  = Math.PI / 5
			animate()

		}
		console.log('Setup success')
		console.log('Base call no', N_BASE_CALL)
		console.log('flights:',flights.length)


//Basic setup
	function setupThree(){

		var
		container = document.getElementById( 'three' ),
		angle     = 30,
		width     = container.offsetWidth  || window.innerWidth,
		height    = container.offsetHeight || window.innerHeight,
		aspect    = width / height,
		near      = 0.01,
		far       = 100
		
		//  Fire up the WebGL renderer.

		renderer = new THREE.WebGLRenderer({ antialias: true })
		renderer.setClearColor( 0x000000, 1.0 )
		renderer.setSize( width, height )
		renderer.shadowMapEnabled = true
		renderer.shadowMapType = THREE.PCFSoftShadowMap
		container.appendChild( renderer.domElement )
		window.addEventListener( 'resize', onThreeResize, false )


		//  Create and place the camera.

		camera = new THREE.PerspectiveCamera( angle, aspect, near, far )
		camera.position.z = 5


		//  Trackball controls for panning (click/touch and drag) and zooming (mouse wheel or gestures.)

		controls = new THREE.TrackballControls( camera, renderer.domElement )
		controls.dynamicDampingFactor = 0.2
		controls.addEventListener( 'change', render )


		//  Create the scene to attach objects to.

		scene = new THREE.Scene()


		//  Performance monitoring bug added to see how fast our render is

		stats = new Stats()
		stats.breakLine = function(){

			[ 'fpsText', 'msText' ].forEach( function( id ){

				var element = stats.domElement.querySelector( '#'+ id )

				element.innerHTML = element.textContent.replace( /\(/, '<br>(' )
			})
		}
		document.body.appendChild( stats.domElement )
	}


	//Resize
	function onThreeResize() {

		var
		container = document.getElementById( 'three' ),
		width     = container.offsetWidth  || window.innerWidth,
		height    = container.offsetHeight || window.innerHeight

		camera.aspect = width / height
		camera.updateProjectionMatrix()
		renderer.setSize( width, height )
		controls.handleResize()
		render()
	}


	// Apply lighting to the system
	function setupSystem(){

		system = new THREE.Object3D()
		system.name = 'system'
		scene.add( system )

		//Light color applied globally to make flight path visible.
		//Darker background. Fix to this
		scene.add( new THREE.AmbientLight( 0x404040,1 ))
	    
		//Dark gray 
		//scene.add ( new THREE.AmbientLight( 0xa9a9a9))
		
		//White
		//scene.add ( new THREE.AmbientLight( 0xffffff))

		//scene.add ( new THREE.AmbientLight( 0xC6C2C2))
	}

	//Mesh setup to model the Earth
	function setupEarth( radius ){
		
		earth = new THREE.Mesh( 

			new THREE.SphereGeometry( radius || 1, 64, 32 ),
			new THREE.MeshPhongMaterial({

				map         : THREE.ImageUtils.loadTexture( 'media/earth.png'  ),
				bumpMap     : THREE.ImageUtils.loadTexture( 'media/earth-bump.jpg' ),
				bumpScale   : 0.05,
				specularMap : THREE.ImageUtils.loadTexture( 'media/earth-specular.png' ),
				specular    : new THREE.Color( 0xFFFFFF ),
				shininess   : 4
			})
		)
		
		//Starry background
		stars = new THREE.Mesh(

			new THREE.SphereGeometry( 90, 64, 64), 
			new THREE.MeshBasicMaterial({
				map:  THREE.ImageUtils.loadTexture('media/galaxy_starfield.png'), 
				side: THREE.BackSide,
				shininess: 4
			})
			)
		//stars.name = 'stars'
		//system.add( stars )
		//scene.add( stars )

		/* 
		// create the geometry sphere
			var geometry  = new THREE.SphereGeometry(90, 32, 32)
			// create the material, using a texture of startfield
			var material  = new THREE.MeshBasicMaterial()
			material.map   = THREE.ImageUtils.loadTexture('images/galaxy_starfield.png')
			material.side  = THREE.BackSide
			// create the mesh based on geometry and material
			var mesh  = new THREE.Mesh(geometry, material)
		*/
		
		earth.name = 'earth'
		earth.castShadow = true
		earth.receiveShadow = false
		
		system.add( earth )	
		system.add( stars )
	}


	// Flights setup.
	function setFlightTimes( index ){
		
		var 
		flight    = flights[ index ],
		distance  = latlongDistance( flight[ 0 ], flight[ 1 ], flight[ 2 ], flight[ 3 ]),
		startTime = Date.now() + Math.floor( Math.random() * 1000 * 20 ),
		duration  = Math.floor( distance * 1000 * 80 )
		

		//  Random used to give some variation.

		duration *= 0.8 + Math.random()
		flightsStartTimes[ index ] = startTime
		flightsEndTimes[ index ] = startTime + duration
	}

	//  Compute skeletons of our flight paths.
	//  We can then extrapolate more detailed flight path geometry later.

	function setupFlightsPathSplines( radius ){
		
		var f,
		originLatitude,
		originLongitude,
		destinationLatitude,
		destinationLongitude,
		distance, altitudeMax,
		pointsTotal, points, pointLL, pointXYZ, p,
		arcAngle, arcRadius,
		spline

		flightsTotal = flights.length

		if( radius === undefined ) radius = 1
		for( f = 0; f < flightsTotal; f ++ ){

			originLatitude       = flights[ f ][ 0 ]
			originLongitude      = flights[ f ][ 1 ]
			destinationLatitude  = flights[ f ][ 2 ]
			destinationLongitude = flights[ f ][ 3 ]

			// 	Altitude is set to make local flights fly at lower altitudes
			//  and long haul flights fly at higher altitudes.

			distance = latlongDistance( originLatitude, originLongitude, destinationLatitude, destinationLongitude )
			altitudeMax = 0.02 + distance * 0.1

			//  We’re about to plot the path of this flight
			//  using X number of points to generate a smooth-ish curve. 

			pointsTotal = 8
			points = []
			for( p = 0; p < pointsTotal + 1; p ++ ){

				//  Is our path shooting straight up? 0 degrees or straight down? 180 degree
				//  Maybe in between

				arcAngle  = p * 180 / pointsTotal


				//  The radius is intended to be Earth’s radius.
				//  Then we build a sine curve on top of that
				//  with its max amplitude being ‘altitudeMax’.

				arcRadius = radius + ( Math.sin( arcAngle * Math.PI / 180 )) * altitudeMax


				//  So at this point in the flight (p) where are we between origin and destination?

				pointLL = latlongTween( 

					originLatitude, 
					originLongitude, 
					destinationLatitude, 
					destinationLongitude, 
					p / pointsTotal
				)


				//  Ok. Now we know where (in latitude / longitude)
				//  our flight is supposed to be at point ‘p’
				//  and we know what its altitude should be as well.
				//  Time to convert that into an actual XYZ location
				//  that will sit above our 3D globe.

				pointXYZ = ll2xyz( pointLL.latitude, pointLL.longitude, arcRadius )
				points.push( new THREE.Vector3( pointXYZ.x, pointXYZ.y, pointXYZ.z ))
			}

			//  Pack up this SplineCurve then push it into our global splines array.
			//  Also set the flight time.

			spline = new THREE.SplineCurve3( points )
			//console.log(spline)
			flightsPathSplines.push( spline )
			setFlightTimes( f )
		}
	}


	function setupFlightsPointCloud(){
		
		flightsTotal = flights.length

		
		var
		f,
		flightsColors = new Float32Array( flightsTotal * 3 ),
		color = new THREE.Color(),
		material

		flightsPointCloudGeometry = new THREE.BufferGeometry()	
		flightPositions = new Float32Array( flightsTotal * 3 )
		flightSpriteSizes = new Float32Array( flightsTotal )


		//  For each flight we’ll need to add a Point to our global Point Cloud.
		//  Each point as an XYZ position and RGB color and an image sprite size.

		for( f = 0; f < flightsTotal; f ++ ){

			flightPositions[ 3 * f + 0 ] = 0//  X
			flightPositions[ 3 * f + 1 ] = 0//  Y
			flightPositions[ 3 * f + 2 ] = 0//  Z


			//  We’re going to based our flight’s Hue on its origin longitude.
			//  This way we can easy spot foreign flights against a background of local flights.

			color.setHSL( 

				(( flights[ f ][ 1 ] + 100 ) % 360 ) / 360,
				1.0,
				0.55
			)
			flightsColors[ 3 * f + 0 ] = color.r//  Red
			flightsColors[ 3 * f + 1 ] = color.g//  Green
			flightsColors[ 3 * f + 2 ] = color.b//  Blue

			flightSpriteSizes[ f ] = flightSpriteSize
		}

		flightsPointCloudGeometry.addAttribute( 'position',    new THREE.BufferAttribute( flightPositions, 3 ))
		flightsPointCloudGeometry.addAttribute( 'customColor', new THREE.BufferAttribute( flightsColors, 3 ))
		flightsPointCloudGeometry.addAttribute( 'size',        new THREE.BufferAttribute( flightSpriteSizes, 1 ))
		flightsPointCloudGeometry.computeBoundingBox()


		//  Now that we have the basic position and color data
		//  it’s time to finesse it with our shaders.

		material = new THREE.ShaderMaterial({

			uniforms: {
		
				color:   { type: 'c', value: new THREE.Color( 0xFFFFFF )},
				texture: { type: 't', value: THREE.ImageUtils.loadTexture( 'media/point.png' )}
			},
			attributes: {
		
				size:        { type: 'f', value: null },
				customColor: { type: 'c', value: null }
			},
			vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
			fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
			blending:       THREE.AdditiveBlending,
			depthTest:      true,
			depthWrite:     false,
			transparent:    true
		})

		//  Pack this into our global variable and add it to the scene later.

		flightsPointCloud = new THREE.PointCloud( flightsPointCloudGeometry, material )
		earth.add( flightsPointCloud )
	}


	//  We’re going to draw arcs along the flight splines to show entire flight paths at a glance.
	//  These lines are 2D, in that they do not scale according to zoom level. 
	//  This is very appealing because as you zoom out 
	//  they become more visually prevalent -- like seeing 
	//  the sum of the parts rather than the individual bits.
	//  The opposite is true when you zoom in.

	function setupFlightsPathLines() {
		
		flightsTotal = flights.length

		
		var 
		geometry = new THREE.BufferGeometry(),
		material = new THREE.LineBasicMaterial({
			
			color:        0xFFFFFF,
			vertexColors: THREE.VertexColors,
			transparent:  true,
			opacity:      flightsPathLinesOpacity,
			depthTest:    true,
			depthWrite:   false,
			linewidth:    1//0.5
		}),
		segmentsTotal = 32,
		segments = new Float32Array( flightsTotal * 3 * 2 * segmentsTotal ),
		segmentBeginsAt,
		segmentEndsAt,
		colors = new Float32Array( flightsTotal * 3 * 2 * segmentsTotal ),
		color  = new THREE.Color(),
		f, s, index,
		beginsAtNormal,
		endsAtNormal

		//   Calculate where segment starts and ends. 
		//   Color is set accordingly
		for( f = 0; f < flightsTotal; f ++ ){

			for( s = 0; s < segmentsTotal - 1; s ++ ){

				index          = ( f * segmentsTotal + s ) * 6
				beginsAtNormal = s / ( segmentsTotal - 1 )
				endsAtNormal   = ( s + 1 ) / ( segmentsTotal - 1 )


				//  Begin this line segment.

				segmentBeginsAt = flightsPathSplines[ f ].getPoint( beginsAtNormal )
				segments[ index + 0 ] = segmentBeginsAt.x
				segments[ index + 1 ] = segmentBeginsAt.y
				segments[ index + 2 ] = segmentBeginsAt.z
				color.setHSL( 

					(( flights[ f ][ 1 ] + 100 ) % 360 ) / 360,
					1,
					0.3 + beginsAtNormal * 0.2
				)
				colors[ index + 0 ] = color.r
				colors[ index + 1 ] = color.g
				colors[ index + 2 ] = color.b


				//  End this line segment.

				segmentEndsAt = flightsPathSplines[ f ].getPoint( endsAtNormal )
				segments[ index + 3 ] = segmentEndsAt.x
				segments[ index + 4 ] = segmentEndsAt.y
				segments[ index + 5 ] = segmentEndsAt.z
				color.setHSL( 

					(( flights[ f ][ 1 ] + 100 ) % 360 ) / 360,
					1,
					0.3 + endsAtNormal * 0.2
				)
				colors[ index + 3 ] = color.r
				colors[ index + 4 ] = color.g
				colors[ index + 5 ] = color.b
			}
		}
		geometry.addAttribute( 'position', new THREE.BufferAttribute( segments, 3 ))
		geometry.addAttribute( 'color',    new THREE.BufferAttribute( colors,   3 ))
		//geometry.computeBoundingSphere()
		geometry.dynamic = true

		//  Pack into the global varaible which is added to the scene later

		flightsPathLines = new THREE.Line( geometry, material, THREE.LinePieces )
		flightsPathLines.dynamic = true
		// console.log(flightsPathLines)
		earth.add( flightsPathLines )
	}




	function updateFlights(){
		
		var f, 
		easedValue, point, 
		segmentsTotal = 32,
		s, index,
		//segments = flightsPathLines.geometry.attributes.position, 
		segmentBeginsAt, 
		segmentEndsAt

		flightsTotal = flights.length
		// console.log(flightsTotal)

		
		for( f = 0; f < flightsTotal; f ++ ){

			if( Date.now() > flightsStartTimes[ f ] ){
				
				easedValue = easeOutQuadratic(

					Date.now() - flightsStartTimes[ f ],
					0, 
					1, 
					flightsEndTimes[ f ] - flightsStartTimes[ f ]
				)
				if( easedValue < 0 || isNaN(easedValue)){
					
					easedValue = 0
					setFlightTimes( f )
				}
				// console.log('eased value',easedValue)

				//  Update the Point Cloud.
				point = flightsPathSplines[ f ].getPoint( easedValue )
				flightPositions[ f * 3 + 0 ] = point.x
				flightPositions[ f * 3 + 1 ] = point.y
				flightPositions[ f * 3 + 2 ] = point.z
			}
		}
		//flightsPathLines.geometry.computeBoundingSphere()
		// flightsPathLines.geometry.attributes.position.needsUpdate = true
		// flightsPathLines.geometry.verticesNeedUpdate = true
		// flightsPathLines.geometry.elementsNeedUpdate = true
		// flightsPathLines.needsUpdate = true
		flightsPointCloudGeometry.attributes.position.needsUpdate = true
	}

	// Lat long to xyz coordinates
	function ll2xyz( latitude, longitude, radius ){
		
		var
		phi   = (  90 - latitude  ) * Math.PI / 180,
		theta = ( 360 - longitude ) * Math.PI / 180

		return {

			x: radius * Math.sin( phi ) * Math.cos( theta ),
			y: radius * Math.cos( phi ),
			z: radius * Math.sin( phi ) * Math.sin( theta )
		}
	}

	// Intermediate points on the spline curve
	function latlongTween( latitudeA, longitudeA, latitudeB, longitudeB, tween ){
		

		//  Convert degrees to radians.

		latitudeA  *= Math.PI / 180
		longitudeA *= Math.PI / 180
		latitudeB  *= Math.PI / 180
		longitudeB *= Math.PI / 180

		var
		d = 2 * Math.asin( Math.sqrt( 
		
			Math.pow(( Math.sin(( latitudeA - latitudeB ) / 2 )), 2 ) +
			Math.cos( latitudeA ) * 
			Math.cos( latitudeB ) * 
			Math.pow( Math.sin(( longitudeA - longitudeB ) / 2 ), 2 )
		)),
		A = Math.sin(( 1 - tween ) * d ) / Math.sin( d ),
		B = Math.sin( tween * d ) / Math.sin( d )
		

		//  Here’s our XYZ location for the tween Point. Sort of.
		//  (It doesn’t take into account the sphere’s radius.)
		//  It’s a necessary in between step that doesn’t fully
		//  resolve to usable XYZ coordinates. 

		var
		x = A * Math.cos( latitudeA ) * Math.cos( longitudeA ) + B * Math.cos( latitudeB ) * Math.cos( longitudeB ),
		y = A * Math.cos( latitudeA ) * Math.sin( longitudeA ) + B * Math.cos( latitudeB ) * Math.sin( longitudeB ),
		z = A * Math.sin( latitudeA ) + B * Math.sin( latitudeB )
		

		//  And we can convert that right back to lat / long.

		var
		latitude  = Math.atan2( z, Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ))) * 180 / Math.PI,
		longitude = Math.atan2( y, x ) * 180 / Math.PI


		//  Return a nice package of useful values for our tween Point.

		return {

			latitude:  latitude,
			longitude: longitude
		}
	}


	//  Borrowed algorithm from http://www.movable-type.co.uk/scripts/latlong.html
	//  Future enhancement would be to integrate with latlongtween.

	function latlongDistance( latitudeA, longitudeA, latitudeB, longitudeB ){

		var 
		earthRadiusMeters = 6371000,
		
		φ1 = latitudeA * Math.PI / 180,
		φ2 = latitudeB * Math.PI / 180,
		Δφ = ( latitudeB  - latitudeA  ) * Math.PI / 180,
		Δλ = ( longitudeB - longitudeA ) * Math.PI / 180,
 
		a = Math.sin( Δφ / 2 ) * Math.sin( Δφ / 2 ) +
			Math.cos( φ1 ) * Math.cos( φ2 ) *
			Math.sin( Δλ / 2 ) * Math.sin( Δλ / 2 ),
		c = 2 * Math.atan2( Math.sqrt( a ), Math.sqrt( 1 - a )),

		distanceMeters = earthRadiusMeters * c

		//  Actual distance in km is not needed. This is used as a factor to scale time
		//  A normal of the earth's circumference is returned. 
		return c
	}

	function easeOutQuadratic( t, b, c, d ){
		
		if(( t /= d / 2 ) < 1 ) return c / 2 * t * t + b
		return -c / 2 * (( --t ) * ( t - 2 ) - 1 ) + b
	}

	function animate(){

		stats.begin()
		render()
		controls.update()
		updateFlights()
		stats.end()
		stats.breakLine()
		requestAnimationFrame( animate )
	}

	//  Render the scene
	function render(){
		
		renderer.render( scene, camera )
	}

	//  GUI setup 
	//  Control of sprite size and path opacity.
	function setupGUI(){

		var gui = new dat.GUI()

		gui.add( window, 'flightSpriteSize', 0.01, 0.2 ).name( 'Point size' ).onChange( function( value ){
		
			var f
			flightsTotal = flights.length
			for( f = 0; f < flightsTotal; f ++ ){
			
				flightSpriteSizes[ f ] = flightSpriteSize
			}
			flightsPointCloudGeometry.attributes.size.needsUpdate = true
		})
		gui.add( window, 'flightsPathLinesOpacity', 0, 1 ).name( 'Path opacity' ).onChange( function( value ){
		
			flightsPathLines.material.opacity = value;
		})
	}

}

