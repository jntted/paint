/* ---------- mouse ---------- */
function inside() { return mouseX >= 0 && mouseY >= 0 && mouseX < width && mouseY < height; }
function mousePressed() {
  if (!inside()) return;
  const m = { x: mouseX, y: mouseY };
  if (tool === 'select') {
    sel = -1;
    for (let i = shapes.length - 1; i >= 0; i--)if (hit(shapes[i], m)) { sel = i; drag = { dx: m.x - shapes[i].tx, dy: m.y - shapes[i].ty }; break; }
    sync(); return false;
  }
  if (tool === 'point') { shapes.push(make('point', [m])); return false; }
  if (MULTI[tool]) { pts.push(m); if (pts.length === 4) { shapes.push(make(tool, pts)); pts = []; } return false; }
  draft = { a: m, b: m }; return false;
}
function mouseDragged() {
  if (drag && sel >= 0) { shapes[sel].tx = mouseX - drag.dx; shapes[sel].ty = mouseY - drag.dy; return false; }
  if (draft) { draft.b = { x: mouseX, y: mouseY }; return false; }
}
function mouseReleased() {
  drag = null;
  if (draft) { if (dist(draft.a.x, draft.a.y, draft.b.x, draft.b.y) > 3) shapes.push(make(tool, rawFor(tool, draft))); draft = null; }
}
function keyPressed() {
  const t = document.activeElement && document.activeElement.tagName;
  if (t === 'INPUT' || t === 'SELECT') return;
  if (keyCode === ESCAPE) { pts = []; draft = null; sel = -1; sync(); return; }
  if (sel < 0) return;
  const s = shapes[sel], st = keyIsDown(SHIFT) ? 10 : 1;
  if (keyCode === DELETE || keyCode === BACKSPACE) { removeSel(); return false; }
  if (keyCode === LEFT_ARROW) { s.tx -= st; return false; }
  if (keyCode === RIGHT_ARROW) { s.tx += st; return false; }
  if (keyCode === UP_ARROW) { s.ty -= st; return false; }
  if (keyCode === DOWN_ARROW) { s.ty += st; return false; }
}
