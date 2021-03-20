/**
 * @author mrdoob / http://mrdoob.com/
 * @author jetienne / http://jetienne.com/
 */

import { WebGLRenderer } from "three";

/**
 * provide info on THREE.WebGLRenderer
 * 
 * @param {Object} renderer the renderer to update
 * @param {Object} Camera the camera to update
*/
export class RendererStats {

	msMin: number = 100;
	msMax: number = 0;

    container: HTMLElement;
    msDiv: HTMLElement;
    msText: HTMLElement;

    lastTime:number;

    msTexts: HTMLElement[];
    nLines: number;

    renderer: WebGLRenderer;

    constructor(renderer:WebGLRenderer){
        this.renderer = renderer;
        this.container = document.createElement( 'div' );

        this.msDiv = document.createElement( 'div' );

	    this.container.appendChild( this.msDiv );
        this.msText = document.createElement( 'div' );
       
	    this.msText.innerHTML= 'WebGLRenderer';
        this.msDiv.appendChild( this.msText );
        
        this.msTexts = [];
	    this.nLines = 6;

        for(let i = 0; i < this.nLines; i++){
            this.msTexts[i]	= document.createElement( 'div' );
        
            this.msDiv.appendChild( this.msTexts[i] );		
            this.msTexts[i].innerHTML= '-';
        }
        document.body.appendChild(this.msDiv);
        this.lastTime = Date.now()
        
    }

    update() { 
        
        // refresh only 30time per second
        if( Date.now() - this.lastTime < 1000/30 ) return;
        this.lastTime = Date.now()


        let i = 0;
        this.msTexts[i++].innerHTML = "== Memory =====";
        this.msTexts[i++].innerHTML = "Geometries: "+ this.renderer.info.memory.geometries;
        this.msTexts[i++].innerHTML = "Textures: " + this.renderer.info.memory.textures;

        this.msTexts[i++].innerHTML = "== Render =====";
        this.msTexts[i++].innerHTML = "Calls: "  + this.renderer.info.render.calls;
        this.msTexts[i++].innerHTML = "Points: " + this.renderer.info.render.points;
        
            //elm.innerHTML = "== Memory =====";
            //elm.innerHTML = "Programs: " + this.renderer.info.memory.programs;
            //elm.innerHTML = "Geometries: "+ this.renderer.info.memory.geometries;
            //elm.innerHTML = "Textures: " + this.renderer.info.memory.textures;
    
            //elm.innerHTML = "== Render =====";
            //elm.innerHTML = "Calls: "  + this.renderer.info.render.calls;
            //elm.innerHTML = "Vertices: " + this.renderer.info.render.vertices;
            //elm.innerHTML = "Faces: "  + this.renderer.info.render.faces;
            //elm.innerHTML = "Points: " + this.renderer.info.render.points;
    }
};