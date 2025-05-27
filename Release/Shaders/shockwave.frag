#version 130

#ifdef GL_ES
precision mediump float;
#endif
 
uniform vec2 u_resolution;
uniform vec2 center;
uniform sampler2D screenSampler;
uniform bool reverse;
uniform float life;
uniform float intensity;
uniform float size;

void main() {
    vec2 pos = gl_FragCoord.xy/u_resolution.xy;
	if (reverse == true)
	{
		pos.y = 1 - pos.y;
	}
	
	vec2 truePos = center.xy/u_resolution.xy;
	
	vec2 dir = truePos - pos;
	
	float d = length(dir) - size * life;
	dir = normalize(dir);
	
	d *= 1 - smoothstep(0.0, 0.01 * intensity * (1 - life), abs(d));
	
    gl_FragColor = texture(screenSampler, pos + dir * d);
}
