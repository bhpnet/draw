const baseSize = 16;
function setRem() {
  const scale = document.documentElement.clientWidth / 1920;
  const scale1 = document.documentElement.clientWidth / 750;

  if (document.documentElement.clientWidth > 1024) {
    document.documentElement.style.fontSize = (baseSize * scale) + 'px';
  } else if (document.documentElement.clientWidth <= 1024) {
    document.documentElement.style.fontSize = (baseSize * scale1) + 'px';
  }
}
setRem();
window.addEventListener('resize', () => {
  setRem();
});