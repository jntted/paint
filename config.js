const TOOLS = [['select', 'Pilih / pindah'], ['point', 'point'], ['line', 'line'], ['rect', 'rect'], ['square', 'square'], ['ellipse', 'ellipse'], ['circle', 'circle'], ['triangle', 'triangle'], ['arc', 'arc'], ['quad', 'quad'], ['bezier', 'bezier'], ['curve', 'curve']];
const HINT = { select: 'Klik objek untuk memilih, seret untuk memindah. Delete menghapus, panah menggeser.', point: 'Klik untuk menaruh titik.', line: 'Seret dari titik awal ke titik akhir.', rect: 'Seret diagonal untuk membuat persegi panjang.', square: 'Seret untuk membuat persegi.', ellipse: 'Seret diagonal untuk membuat elips.', circle: 'Seret dari pusat ke tepi lingkaran.', triangle: 'Seret untuk membuat segitiga pada kotak pembatas.', arc: 'Seret diagonal: busur 3/4 elips (mode PIE).', quad: 'Klik 4 sudut berurutan.', bezier: 'Klik 4 titik: jangkar, kontrol, kontrol, jangkar.', curve: 'Klik 4 titik: kontrol awal, titik awal, titik akhir, kontrol akhir.' };
const MULTI = { quad: 1, bezier: 1, curve: 1 };
const NOFILL = { point: 1, line: 1, bezier: 1, curve: 1 };
const TF = ['rot', 'sxr', 'syr', 'fh', 'fv', 'dup', 'front', 'del'];
const $ = id => document.getElementById(id);
let tool = 'select', shapes = [], sel = -1, draft = null, pts = [], drag = null;

function setTool(t) { tool = t; pts = []; draft = null; document.querySelectorAll('#tools button').forEach(b => b.classList.toggle('on', b.dataset.t === t)); $('hint').textContent = HINT[t]; }
TOOLS.forEach(([t, l]) => { const b = document.createElement('button'); b.textContent = l; b.dataset.t = t; b.onclick = () => setTool(t); $('tools').appendChild(b); });
setTool('select');

function setup() { const w = $('cv'); createCanvas(w.clientWidth, w.clientHeight).parent(w); }
function windowResized() { const w = $('cv'); resizeCanvas(w.clientWidth, w.clientHeight); }
