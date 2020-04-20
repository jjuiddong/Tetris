/**
 * @author alteredq / http://alteredqualia.com/
 * @author jjuiddong
 *		- 2020-04-20
 */

THREE.AdditivePass = function ( texture, opacity ) {

	if ( THREE.CopyShader === undefined )
		console.error( "THREE.TexturePass relies on THREE.CopyShader" );

	var shader = THREE.BlendShader;

	this.uniforms = THREE.UniformsUtils.clone( shader.uniforms );

	this.uniforms[ "opacity" ].value = ( opacity !== undefined ) ? opacity : 1.0;
	this.uniforms[ "tDiffuse1" ].value = texture;
	this.uniforms[ "mixRatio" ].value = 0.5;

	this.material = new THREE.ShaderMaterial( {

		uniforms: this.uniforms,
		vertexShader: shader.vertexShader,
		fragmentShader: shader.fragmentShader
		//blending: THREE.AdditiveBlending
	} );

	this.enabled = true;
	this.needsSwap = false;

};

THREE.AdditivePass.prototype = {

	render: function ( renderer, writeBuffer, readBuffer, delta ) {

		this.uniforms[ "tDiffuse2" ].value = readBuffer;
		
		THREE.EffectComposer.quad.material = this.material;

		renderer.render( THREE.EffectComposer.scene, THREE.EffectComposer.camera, readBuffer, true);

	}

};
