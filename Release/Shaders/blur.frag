uniform sampler2D texture;
uniform float blurAmount;     // Controls blur intensity (e.g. 1.0 to 10.0)
uniform vec2 resolution;      // Resolution of the input texture

const float pi = 3.1415926535897932384626433832795;

// 2D Gaussian function
float gaussian(float x, float y, float sigma) {
    float sigma2 = sigma * sigma;
    return exp(-(x*x + y*y) / (2.0 * sigma2)) / (2.0 * pi * sigma2);
}

void main()
{
    vec2 texCoord = gl_TexCoord[0].xy;
    vec2 texelSize = 1.0 / resolution;

    const int kernelRadius = 4; // 9x9 kernel
    float sigma = blurAmount;

    vec4 color = vec4(0.0);
    float weightSum = 0.0;

    for (int x = -kernelRadius; x <= kernelRadius; ++x) {
        for (int y = -kernelRadius; y <= kernelRadius; ++y) {
            vec2 offset = vec2(float(x), float(y)) * texelSize;
            float weight = gaussian(float(x), float(y), sigma);
            color += texture2D(texture, texCoord + offset) * weight;
            weightSum += weight;
        }
    }

    gl_FragColor = color / weightSum;
}
