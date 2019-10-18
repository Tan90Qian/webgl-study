1. 通过`canvas DOM元素`的`getContext()`可以通过参数获取对应的绘图上下文，如传入`webgl`可获取`webgl 1.0`的绘图上下文。
2. WebGL 是基于`OpenGL ES`的，因此 WebGL 中的函数名可以与 OpenGL ES 中的函数名对应起来，如`getContext('webgl').clearColor()`对应`OpenGL ES2.0或OpenGL中的glclearColor()`。
3. WebGL 遵循传统的 OpenGL 颜色分量的取值范围，即从 0.0 到 1.0。`RGB`的值越高，颜色就越`亮`；第四分量`α`的值越高，颜色就越`不透明`。
4. 一旦指定了背景色之后，背景色就会驻存在 WebGL 系统中，下次调用对应方法（如`clearColor`）前不会改变。
5. 所有 WebGL 相关的方法都有`错误`项，错误不能由函数返回值表示。在默认情况下，错误不会显示出来。
6. WebGL 的`gl.clear()`继承自 OpenGL，基于`多基本缓冲区模型`。
   - 清空绘图区域，实际上是在清空`颜色缓冲区`(color buffer)，传递参数`gl.COLOR_BUFFER_BIT`就是告诉 WebGL 清空颜色缓冲区。
   - 除了颜色缓冲区，还有`深度缓冲区(depth)`、`模板缓冲区(stencil)`等类型的缓冲区。
   - 清空颜色缓冲区将导致 WebGL 清空页面上的`<canvas>`区域。
7. WebGL依赖于一种称为`着色器`的绘图机制，它提供了灵活且强大的绘制二维或三维图形的方法。但它相比canvas的2d上下文更复杂，仅仅通过一条简单的绘图命令是不能操作它的。