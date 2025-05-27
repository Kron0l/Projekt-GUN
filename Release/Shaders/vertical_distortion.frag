#version 130

#ifdef GL_ES
precision mediump float;
#endif
 
uniform vec2 u_resolution;
uniform sampler2D screenSampler;
uniform float intensity;
uniform float frequency;
uniform float waveState;
uniform float speedMultiplier;
uniform float camX;

void main() {
    vec2 pos = gl_FragCoord.st/u_resolution.xy;
	
	float x = 0;
	float y = sin((pos.x - camX / u_resolution.x + waveState * speedMultiplier / 20 + waveState * speedMultiplier / 20) * frequency) * intensity / 100;
	vec2 offset = vec2(x, y);
    gl_FragColor = texture(screenSampler, pos + offset);
}
