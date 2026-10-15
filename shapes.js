/* ---------- model ---------- */
function make(type, raw) {
  let px, py;
  if (type === 'circle' || type === 'point') { px = raw[0].x; py = raw[0].y; }
  else { const xs = raw.map(p => p.x), ys = raw.map(p => p.y); px = (Math.min(...xs) + Math.max(...xs)) / 2; py = (Math.min(...ys) + Math.max(...ys)) / 2; }
  return { type, pts: raw.map(p => ({ x: p.x - px, y: p.y - py })), tx: px, ty: py, rot: 0, sx: 1, sy: 1, fill: $('fillC').value, noFill: $('noFill').checked, stroke: $('strokeC').value, sw: +$('sw').value };
}
function rawFor(t, d) {
  const a = d.a, b = d.b;
  if (t === 'square') { const s = Math.max(Math.abs(b.x - a.x), Math.abs(b.y - a.y)); return [a, { x: a.x + (b.x < a.x ? -s : s), y: a.y + (b.y < a.y ? -s : s) }]; }
  if (t === 'triangle') return [{ x: (a.x + b.x) / 2, y: a.y }, { x: a.x, y: b.y }, { x: b.x, y: b.y }];
  return [a, b];
}
function bounds(s) {
  if (s.type === 'image') return { x0: -s.w / 2, y0: -s.h / 2, x1: s.w / 2, y1: s.h / 2 };
  if (s.type === 'circle') { const r = dist(0, 0, s.pts[1].x, s.pts[1].y); return { x0: -r, y0: -r, x1: r, y1: r }; }
  const xs = s.pts.map(p => p.x), ys = s.pts.map(p => p.y);
  return { x0: Math.min(...xs), y0: Math.min(...ys), x1: Math.max(...xs), y1: Math.max(...ys) };
}
function hit(s, m) {
  let dx = m.x - s.tx, dy = m.y - s.ty; const a = -radians(s.rot);
  const x = (dx * Math.cos(a) - dy * Math.sin(a)) / s.sx, y = (dx * Math.sin(a) + dy * Math.cos(a)) / s.sy;
  const b = bounds(s), p = 6 + (s.sw || 0) / 2;
  return x >= b.x0 - p && x <= b.x1 + p && y >= b.y0 - p && y <= b.y1 + p;
}
