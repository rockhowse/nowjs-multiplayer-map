var container, stats;
var camera, scene, renderer;
var projector, plane;
var mouse2D, mouse3D, ray,
    rollOveredFace, isShiftDown = false,
    theta = 45, isCtrlDown = false,
    target = new THREE.Vector3( 0, 200, 0 );

$(document).ready(function(){
    init();
    animate();
});

function init() {

    var info = document.createElement( 'div' );
    info.style.position = 'absolute';
    info.style.top = '10px';
    info.style.width = '100%';
    info.style.textAlign = 'center';
    info.innerHTML = '<a href="http://github.com/mrdoob/three.js" target="_blank">three.js</a> - voxel painter<br /><strong>click</strong>: add voxel, <strong>control + click</strong>: remove voxel, <strong>shift</strong>: rotate, <a href="javascript:save();return false;">save .png</a>';
    $('#view-port').append( info );

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.y = 800;

    scene = new THREE.Scene();

    scene.add( camera );

    // Grid

    var geometry = new THREE.Geometry();
    geometry.vertices.push( new THREE.Vertex( new THREE.Vector3( - 500, 0, 0 ) ) );
    geometry.vertices.push( new THREE.Vertex( new THREE.Vector3( 500, 0, 0 ) ) );

    var material = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } );

    for ( var i = 0; i <= 20; i ++ ) {
        var line = new THREE.Line( geometry, material );
        line.position.z = ( i * 50 ) - 500;
        scene.add( line );

        var line = new THREE.Line( geometry, material );
        line.position.x = ( i * 50 ) - 500;
        line.rotation.y = 90 * Math.PI / 180;
        scene.add( line );
    }

    projector = new THREE.Projector();

    plane = new THREE.Mesh( new THREE.PlaneGeometry( 1000, 1000, 20, 20 ), new THREE.MeshFaceMaterial() );
    plane.rotation.x = - 90 * Math.PI / 180;
    scene.add( plane );

    mouse2D = new THREE.Vector3( 0, 10000, 0.5 );
    ray = new THREE.Ray( camera.position, null );

    // Lights

    var ambientLight = new THREE.AmbientLight( 0x606060 );
    scene.add( ambientLight );

    var directionalLight = new THREE.DirectionalLight( 0xffffff );
    directionalLight.position.x = Math.random() - 0.5;
    directionalLight.position.y = Math.random() - 0.5;
    directionalLight.position.z = Math.random() - 0.5;
    directionalLight.position.normalize();
    scene.add( directionalLight );

    var directionalLight = new THREE.DirectionalLight( 0x808080 );
    directionalLight.position.x = Math.random() - 0.5;
    directionalLight.position.y = Math.random() - 0.5;
    directionalLight.position.z = Math.random() - 0.5;
    directionalLight.position.normalize();
    scene.add( directionalLight );

    renderer = new THREE.CanvasRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    $('#view-port').append(renderer.domElement);

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    $('#view-port').append( stats.domElement );

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    document.addEventListener( 'keydown', onDocumentKeyDown, false );
    document.addEventListener( 'keyup', onDocumentKeyUp, false );
}

function onDocumentMouseMove( event ) {
    event.preventDefault();
    mouse2D.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse2D.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function onDocumentMouseDown( event ) {
    event.preventDefault();
    var intersects = ray.intersectScene( scene );

    var position = new THREE.Vector3().add( intersects[ 0 ].point, intersects[ 0 ].object.matrixRotationWorld.multiplyVector3( intersects[ 0 ].face.normal.clone() ) );

    // send the position of the added voxel to the server
    now.distributeVoxelInfo(position.x, position.y, position.z, isCtrlDown);
}

function onDocumentKeyDown( event ) {
    switch( event.keyCode ) {
        case 16: isShiftDown = true; break;
        case 17: isCtrlDown = true; break;
    }
}

function onDocumentKeyUp( event ) {
    switch( event.keyCode ) {
        case 16: isShiftDown = false; break;
        case 17: isCtrlDown = false; break;
    }
}

function save() {
    window.open( renderer.domElement.toDataURL('image/png'), 'mywindow' );
}
function animate() {
    requestAnimationFrame( animate );
    render();
    stats.update();
}

function render() {
    if ( isShiftDown ) {
        theta += mouse2D.x * 3;
    }
    camera.position.x = 1400 * Math.sin( theta * Math.PI / 360 );
    camera.position.z = 1400 * Math.cos( theta * Math.PI / 360 );
    camera.lookAt( target );

    mouse3D = projector.unprojectVector( mouse2D.clone(), camera );
    ray.direction = mouse3D.subSelf( camera.position ).normalize();

    var intersects = ray.intersectScene( scene );

    if ( intersects.length > 0 ) {
        if ( intersects[ 0 ].face != rollOveredFace ) {
            if ( rollOveredFace ) rollOveredFace.materials = [];
            rollOveredFace = intersects[ 0 ].face;
            rollOveredFace.materials = [ new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5 } ) ];
        }
    } else if ( rollOveredFace ) {
        rollOveredFace.materials = [];
        rollOveredFace = null;
    }
    renderer.render( scene, camera );
}

// when we get the voxel info from the server, let's update the 3d map!
now.receiveVoxelInfo = function(posX, posY, posZ, isCtrlDownRemote){
    $("#messages").append("<br>" + name + ": added voxel");

    // scroll the div to the bottom
    $("#messages").scrollTop($("#messages")[0].scrollHeight);

    var voxel = new THREE.Mesh( new THREE.CubeGeometry( 50, 50, 50 ), new THREE.MeshLambertMaterial( { color: 0x00ff80, opacity: 1, shading: THREE.FlatShading } ) );
    voxel.position.x = Math.floor( posX / 50 ) * 50 + 25;
    voxel.position.y = Math.floor( posY / 50 ) * 50 + 25;
    voxel.position.z = Math.floor( posZ / 50 ) * 50 + 25;
    voxel.matrixAutoUpdate = false;
    voxel.updateMatrix();
    voxel.overdraw = true;
    scene.add( voxel );
}