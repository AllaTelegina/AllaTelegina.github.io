const presentationData = {"madeleines": {"title": "Homemade Madeleines", "pages": ["../images/viewer/madeleines/page-01.jpg", "../images/viewer/madeleines/page-02.jpg", "../images/viewer/madeleines/page-03.jpg", "../images/viewer/madeleines/page-04.jpg", "../images/viewer/madeleines/page-05.jpg", "../images/viewer/madeleines/page-06.jpg", "../images/viewer/madeleines/page-07.jpg", "../images/viewer/madeleines/page-08.jpg", "../images/viewer/madeleines/page-09.jpg", "../images/viewer/madeleines/page-10.jpg", "../images/viewer/madeleines/page-11.jpg", "../images/viewer/madeleines/page-12.jpg", "../images/viewer/madeleines/page-13.jpg", "../images/viewer/madeleines/page-14.jpg", "../images/viewer/madeleines/page-15.jpg"]}, "medovik": {"title": "Medovik Candle Cake", "pages": ["../images/viewer/medovik/page-01.jpg", "../images/viewer/medovik/page-02.jpg", "../images/viewer/medovik/page-03.jpg", "../images/viewer/medovik/page-04.jpg", "../images/viewer/medovik/page-05.jpg", "../images/viewer/medovik/page-06.jpg", "../images/viewer/medovik/page-07.jpg", "../images/viewer/medovik/page-08.jpg", "../images/viewer/medovik/page-09.jpg", "../images/viewer/medovik/page-10.jpg", "../images/viewer/medovik/page-11.jpg", "../images/viewer/medovik/page-12.jpg", "../images/viewer/medovik/page-13.jpg", "../images/viewer/medovik/page-14.jpg", "../images/viewer/medovik/page-15.jpg", "../images/viewer/medovik/page-16.jpg"]}, "kindergarten": {"title": "Kapa the Droplet: Kindergarten", "pages": ["../images/viewer/kindergarten/page-01.jpg", "../images/viewer/kindergarten/page-02.jpg", "../images/viewer/kindergarten/page-03.jpg", "../images/viewer/kindergarten/page-04.jpg", "../images/viewer/kindergarten/page-05.jpg", "../images/viewer/kindergarten/page-06.jpg", "../images/viewer/kindergarten/page-07.jpg", "../images/viewer/kindergarten/page-08.jpg", "../images/viewer/kindergarten/page-09.jpg", "../images/viewer/kindergarten/page-10.jpg"]}};

(() => {
 const requested = new URLSearchParams(location.search).get('guide');
 const guideKey = Object.hasOwn(presentationData, requested) ? requested : 'madeleines';
 const guide = presentationData[guideKey];
 const image = document.getElementById('viewerImage');
 const previous = document.getElementById('viewerPrevious');
 const next = document.getElementById('viewerNext');
 const select = document.getElementById('viewerPage');
 const status = document.getElementById('viewerStatus');
 const fullscreen = document.getElementById('viewerFullscreen');
 const error = document.getElementById('viewerError');
 const shell = document.getElementById('presentationViewer');
 let page = 0;
 document.title = `${guide.title} | Alla Telegina`;
 document.getElementById('viewerTitle').textContent = guide.title;
 document.getElementById('viewerBack').href = guideKey === 'kindergarten' ? 'project-kindergarten.html' : 'project-baking-guides.html';
 guide.pages.forEach((_, index) => select.add(new Option(String(index + 1), String(index))));
 function show(index) {
   page = Math.min(guide.pages.length - 1, Math.max(0, index));
   error.hidden = true;
   image.src = guide.pages[page];
   image.alt = `${guide.title}, page ${page + 1} of ${guide.pages.length}`;
   select.value = String(page);
   status.textContent = `${page + 1} / ${guide.pages.length}`;
   previous.disabled = page === 0;
   next.disabled = page === guide.pages.length - 1;
   if (page + 1 < guide.pages.length) { const preload = new Image(); preload.src = guide.pages[page + 1]; }
 }
 image.addEventListener('error', () => { error.hidden = false; });
 previous.addEventListener('click', () => show(page - 1));
 next.addEventListener('click', () => show(page + 1));
 select.addEventListener('change', () => show(Number(select.value)));
 document.addEventListener('keydown', event => {
   if (event.target.closest('select, input, textarea, button, a')) return;
   if (['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) event.preventDefault();
   if (event.key === 'ArrowRight') show(page + 1);
   if (event.key === 'ArrowLeft') show(page - 1);
   if (event.key === 'Home') show(0);
   if (event.key === 'End') show(guide.pages.length - 1);
 });
 let touchStart = null;
 image.addEventListener('touchstart', event => { touchStart = event.touches.length === 1 ? event.touches[0].clientX : null; }, {passive:true});
 image.addEventListener('touchend', event => {
   if (touchStart === null) return;
   const delta = event.changedTouches[0].clientX - touchStart;
   if (Math.abs(delta) > 55) show(page + (delta < 0 ? 1 : -1));
   touchStart = null;
 }, {passive:true});
 fullscreen.hidden = !document.fullscreenEnabled;
 fullscreen.addEventListener('click', async () => {
   try { if (document.fullscreenElement) await document.exitFullscreen(); else await shell.requestFullscreen(); }
   catch { status.textContent = 'Full screen is unavailable in this browser.'; }
 });
 document.addEventListener('fullscreenchange', () => { fullscreen.textContent = document.fullscreenElement ? 'Exit full screen' : 'Full screen'; });
 show(0);
})();
