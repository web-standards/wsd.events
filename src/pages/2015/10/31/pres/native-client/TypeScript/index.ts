function M(stdlib, foreign, heap) {
    "use asm";
    var i32 = new stdlib.Int32Array(heap);
    var f64 = new stdlib.Float64Array(heap);
    var imul = stdlib.Math.imul;
    var truncate = foreign.truncate;

    function foo() {
      var a = 0, b = 0.0;
      a = i32[0]|0;
      b = +f64[0];
      return imul(a, truncate(b))|0;
    }

    return { foo: foo };
}