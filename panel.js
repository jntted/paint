/* ---------- panel ---------- */
function sync() {
  const has = sel >= 0;
  TF.forEach(id => $(id).disabled = !has);
  if (!has) { $('info').textContent = 'Pilih objek dengan alat Pilih.'; return; }
  const s = shapes[sel];
  $('info').textContent = 'Objek terpilih: ' + s.type;
  $('rot').value = s.rot; $('roto').textContent = Math.round(s.rot) + '°';
  $('sxr').value = Math.abs(s.sx); $('sxo').textContent = Math.abs(s.sx).toFixed(2);
  $('syr').value = Math.abs(s.sy); $('syo').textContent = Math.abs(s.sy).toFixed(2);
  if (s.type !== 'image') { $('fillC').value = s.fill; $('noFill').checked = s.noFill; $('strokeC').value = s.stroke; $('sw').value = s.sw; $('swo').textContent = s.sw; }
}
function removeSel() { if (sel >= 0) { shapes.splice(sel, 1); sel = -1; sync(); } }
['fillC', 'noFill', 'strokeC', 'sw'].forEach(id => $(id).oninput = () => {
  $('swo').textContent = $('sw').value;
  if (sel >= 0 && shapes[sel].type !== 'image') { const s = shapes[sel]; s.fill = $('fillC').value; s.noFill = $('noFill').checked; s.stroke = $('strokeC').value; s.sw = +$('sw').value; }
});
$('rot').oninput = () => { if (sel < 0) return; shapes[sel].rot = +$('rot').value; $('roto').textContent = $('rot').value + '°'; };
$('sxr').oninput = () => { if (sel < 0) return; const s = shapes[sel]; s.sx = Math.sign(s.sx) * $('sxr').value; $('sxo').textContent = (+$('sxr').value).toFixed(2); };
$('syr').oninput = () => { if (sel < 0) return; const s = shapes[sel]; s.sy = Math.sign(s.sy) * $('syr').value; $('syo').textContent = (+$('syr').value).toFixed(2); };
$('fh').onclick = () => { if (sel >= 0) shapes[sel].sx *= -1; };
$('fv').onclick = () => { if (sel >= 0) shapes[sel].sy *= -1; };
$('dup').onclick = () => { if (sel < 0) return; const c = Object.assign({}, shapes[sel], { pts: shapes[sel].pts.map(p => ({ ...p })) }); c.tx += 20; c.ty += 20; shapes.push(c); sel = shapes.length - 1; sync(); };
$('front').onclick = () => { if (sel < 0) return; shapes.push(shapes.splice(sel, 1)[0]); sel = shapes.length - 1; };
$('del').onclick = removeSel;
$('clr').onclick = () => { shapes = []; sel = -1; pts = []; draft = null; sync(); };

/* ---------- load image ---------- */
$('file').onchange = e => {
  const f = e.target.files[0]; if (!f) return;
  const r = new FileReader();
  r.onload = () => loadImage(r.result, img => {
    const k = Math.min(1, width * .6 / img.width, height * .6 / img.height);
    shapes.push({ type: 'image', img, w: img.width * k, h: img.height * k, pts: [], tx: width / 2, ty: height / 2, rot: 0, sx: 1, sy: 1, sw: 0 });
    sel = shapes.length - 1; setTool('select'); sync();
  }, () => alert('Gambar tidak dapat dibaca. Coba file PNG, JPG, GIF, atau WebP.'));
  r.readAsDataURL(f); e.target.value = '';
};
sync();
