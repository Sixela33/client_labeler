class Canvas {
  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.matrix = [];
  }

  get canvas() {
    return this.matrix.length;
  }
}
console.log("Running webpage");
const canvaserino = new Canvas(10, 10);
console.log(canvaserino.canvas());
