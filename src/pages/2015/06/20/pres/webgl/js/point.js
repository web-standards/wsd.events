var VSHADER_SOURCE = 
  'void main() {\n' +
  '  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\n' + 
  '  gl_PointSize = 20.0;\n' +                    
  '}\n';

var FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + 
  '}\n';

function point() {
  var gl = document.getElementById('webgl-point').getContext("webgl");
  var vShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vShader, VSHADER_SOURCE);
  gl.compileShader(vShader);
  var fShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fShader, FSHADER_SOURCE);
  gl.compileShader(fShader);
  gl.program = gl.createProgram();
  gl.attachShader(gl.program, vShader);
  gl.attachShader(gl.program, fShader);
  gl.linkProgram(gl.program);
  gl.useProgram(gl.program);
  gl.drawArrays(gl.POINTS, 0, 1);
}