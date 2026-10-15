/* ---------- render ---------- */
function drawShape(s) {
  push(); translate(s.tx, s.ty); rotate(radians(s.rot)); scale(s.sx, s.sy);
  if (s.type === 'image') { imageMode(CENTER); image(s.img, 0, 0, s.w, s.h); pop(); return; }
  if (s.noFill || NOFILL[s.type]) noFill(); else fill(s.fill);
  stroke(s.stroke); strokeWeight(s.sw);
  const p = s.pts;
  switch (s.type) {
    case 'point': strokeWeight(Math.max(s.sw, 2)); point(p[0].x, p[0].y); break;
    case 'line': line(p[0].x, p[0].y, p[1].x, p[1].y); break;
    case 'rect': rectMode(CORNERS); rect(p[0].x, p[0].y, p[1].x, p[1].y); break;
    case 'square': square(Math.min(p[0].x, p[1].x), Math.min(p[0].y, p[1].y), Math.abs(p[1].x - p[0].x)); break;
    case 'ellipse': ellipseMode(CORNERS); ellipse(p[0].x, p[0].y, p[1].x, p[1].y); break;
    case 'circle': circle(p[0].x, p[0].y, 2 * dist(p[0].x, p[0].y, p[1].x, p[1].y)); break;
    case 'triangle': triangle(p[0].x, p[0].y, p[1].x, p[1].y, p[2].x, p[2].y); break;
    case 'arc': ellipseMode(CORNERS); arc(p[0].x, p[0].y, p[1].x, p[1].y, 0, PI * 1.5, PIE); break;
    case 'quad': quad(p[0].x, p[0].y, p[1].x, p[1].y, p[2].x, p[2].y, p[3].x, p[3].y); break;
    case 'bezier': bezier(p[0].x, p[0].y, p[1].x, p[1].y, p[2].x, p[2].y, p[3].x, p[3].y); break;
    case 'curve': curve(p[0].x, p[0].y, p[1].x, p[1].y, p[2].x, p[2].y, p[3].x, p[3].y); break;
  }
  pop();
}
function draw() {
  background(255);
  shapes.forEach(drawShape);
  if (draft) drawShape(make(tool, rawFor(tool, draft)));
  if (pts.length) {
    push(); noFill(); stroke('#3b5bdb'); strokeWeight(1); drawingContext.setLineDash([5, 4]);
    beginShape(); pts.forEach(p => vertex(p.x, p.y)); vertex(mouseX, mouseY); endShape();
    drawingContext.setLineDash([]); fill('#3b5bdb'); noStroke(); pts.forEach(p => circle(p.x, p.y, 7)); pop();
  }
  if (sel >= 0) {
    const s = shapes[sel], b = bounds(s), pad = (s.sw || 0) / 2 + 4;
    push(); translate(s.tx, s.ty); rotate(radians(s.rot)); scale(s.sx, s.sy);
    noFill(); stroke('#3b5bdb'); strokeWeight(1.5 / Math.max(Math.abs(s.sx), Math.abs(s.sy)));
    drawingContext.setLineDash([6, 4]); rectMode(CORNERS); rect(b.x0 - pad, b.y0 - pad, b.x1 + pad, b.y1 + pad);
    pop();
    push(); fill('#3b5bdb'); noStroke(); circle(s.tx, s.ty, 6); pop();
  }
}
