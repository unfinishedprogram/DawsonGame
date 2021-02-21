import * as THREE from 'three';

var cubes = new Array();
var up = 0;
var right = 0;

var websocket = new WebSocket("ws://70.26.238.78:34561/");
    websocket.onmessage = function (event) {
        let data = JSON.parse(event.data);
        switch (data.type) {

            case 'current':
                //value.textContent = data.value;
                break;

            case 'users':
                //users.textContent = (
                    //data.count.toString() + " user" +
                    //(data.count == 1 ? "" : "s"));
                    break;
                
            case 'mouse_move':
                if(data.cords.length > cubes.length){
                    let newc = newCube();
                    cubes.push(newc);
                    scene.add(newc);
                } else if ( cubes.length < data.cords.length ){
                    //scene.remove (cube[0]);
                    cubes.splice(0, 1);
                }
                for (let i = 0; i < cubes.length; i++) {
                    cubes[i].position.x = data.cords[i][0];
                    cubes[i].position.y = data.cords[i][1];
                }
                break;
            default:
                console.error(
                "unsupported event", data);
    }
};

const scene = new THREE.Scene();
const width = 2;
const height = 2;
const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );

const clock =  new THREE.Clock();

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

const geometry = new THREE.PlaneGeometry();


const material = new THREE.MeshBasicMaterial( { color: 0x00ff00} );
const cube = new THREE.Mesh( geometry, material );

camera.position.z = 5;
document.body.appendChild( renderer.domElement );


function animate() {
    let deltaTime = clock.getDelta();
	requestAnimationFrame( animate );
	renderer.render( scene, camera );

    if ( up != 0 || right != 0 ) {
        cube.position.x += deltaTime * right;
        cube.position.y += deltaTime * up;

        sendPosition();
    }
    console.log(up);
}

function newCube(): THREE.Mesh {
    return new THREE.Mesh( geometry, material );
}

window.addEventListener( "keydown", onKeyDown, false );
window.addEventListener( "keyup", onKeyUp, false );

function onKeyDown( event: any  ) {
    let keyCode = event.which;
    
    if ( keyCode == 87 )        // up
        up = 1;
    else if ( keyCode == 83 )   // down
        up = -1;
    else if ( keyCode == 65 )   // left
        right = -1;
    else if ( keyCode == 68 )   // right
        right = 1;
    else if ( keyCode == 32 ) { // return
        cube.position.x = 0;
        cube.position.y = 0;

        sendPosition();
    }

};
function onKeyUp( event: any) {
    let keyCode = event.which;

    if ( keyCode == 87 || keyCode == 83 )        // up & down
        up = 0;
    else if ( keyCode == 65 || keyCode == 68 )   // left & right
        right = 0;
}
/**
 
function addParticle(){
    let tempmat = new THREE.MeshBasicMaterial( { color: new THREE.Color( Math.random(), Math.random(), Math.random() ) } );

    let particle = new THREE.Mesh( geometry, tempmat );
    scene.add ( particle );
    particle.scale.x = 0.1;
    particle.scale.y = 0.1;
    particle.scale.z = 0.1;
    particle.position.x = ( Math.random()-0.5 ) * 2 ;  
    particle.position.y = ( Math.random()-0.5 ) * 2;  
    //particles.push( particle );
}

function getRandomRgb() {
    var num = Math.round( 0xffffff * Math.random() );
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    return [ r, g, b ];
}

 **/


function sendPosition() {
    websocket.send( JSON.stringify( { "action":"mouse_move", 'value': [ cube.position.x, cube.position.y ] } ) );
}

animate();