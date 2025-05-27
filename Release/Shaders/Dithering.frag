#version 130

uniform sampler2D screenSampler;
uniform float intensity;
uniform float speedMultiplier;
uniform float frameTime;

float random(vec2 uv) 
{
    return fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() 
{
    vec2 pos = gl_FragCoord.st;
	pos.x = pos.x + (frameTime * speedMultiplier);
	vec4 pixel = texture(screenSampler, pos);
	
	int pox = int(pos.x);
	int poy = int(pos.y);
	
	if (((pox + poy) % 8 != 0 || (pox - poy) % 8 != 0) || random(pos) > intensity)
	{
		pixel = vec4(0,0,0,0);
	}
	
    gl_FragColor = pixel ;
}
