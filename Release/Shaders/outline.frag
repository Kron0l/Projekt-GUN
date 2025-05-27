#version 130

precision highp float;
 
uniform vec2 u_resolution;
uniform sampler2D emissionTextureSampler;
uniform int outlineWidth;
uniform vec4 outlineColor;

void main() {
    vec2 st = gl_FragCoord.st/u_resolution.xy;
//st.y = 1 - st.y;
	
    // Pixel colour
    vec4 Color = texture(emissionTextureSampler, st);
	
	if (Color.a == 0)
	{
		for (int y=-outlineWidth ; y < outlineWidth ; y+=1)
		{
			for (int x=-outlineWidth ; x < outlineWidth ; x+=1)
			{
				
				vec2 st2 = st + vec2(x, y)/u_resolution.xy;
				vec4 CurrentColor = texture(emissionTextureSampler, st2);
				if (CurrentColor.a != 0 && abs(y) + abs(x) < outlineWidth)
				{
					Color = outlineColor;
				}
			}
		}
	}
    // Output to screen
    gl_FragColor = Color;
}
