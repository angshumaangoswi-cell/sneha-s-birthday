// PERSONALISE THESE TWO VALUES:
const recipientName = "Sneha";
const senderName = "Angshu";
document.getElementById("recipient").textContent = recipientName;
document.getElementById("sender").textContent = senderName;

const screens = [...document.querySelectorAll(".screen")];
const bar = document.getElementById("bar");
function go(id){screens.forEach(s=>s.classList.toggle("active",s.id===id));bar.style.width=((screens.findIndex(s=>s.id===id)+1)/screens.length*100)+"%";window.scrollTo({top:0,behavior:"smooth"});if(id!=="home")hearts(id==="letter"?30:12)}
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.go)));
document.getElementById("openLetter").addEventListener("click",()=>{document.getElementById("letterText").classList.add("show");document.getElementById("openLetter").style.display="none";hearts(35)});

function hearts(n){const box=document.getElementById("hearts");for(let i=0;i<n;i++){const h=document.createElement("span");h.className="heart";h.textContent=["♡","♥","✧"][Math.floor(Math.random()*3)];h.style.left=Math.random()*100+"%";h.style.fontSize=(12+Math.random()*20)+"px";h.style.animationDuration=(2.5+Math.random()*3)+"s";box.appendChild(h);h.addEventListener("animationend",()=>h.remove())}}

// Twinkling star field
const c=document.getElementById("stars"),ctx=c.getContext("2d");let dots=[];
function resize(){c.width=innerWidth*devicePixelRatio;c.height=innerHeight*devicePixelRatio;c.style.width=innerWidth+"px";c.style.height=innerHeight+"px";ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);dots=Array.from({length:100},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.4+.3,a:Math.random()*6}))}
function draw(){ctx.clearRect(0,0,innerWidth,innerHeight);dots.forEach(d=>{d.a+=.015;ctx.fillStyle=`rgba(255,225,241,${.2+(.5+.5*Math.sin(d.a))*.5})`;ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill()});requestAnimationFrame(draw)}addEventListener("resize",resize);resize();draw();

// Optional gentle synthesized chime. Click to enable; no music file is used.
let audio=null, enabled=false,timer=null;
document.getElementById("sound").addEventListener("click",async e=>{if(!audio){const AC=window.AudioContext||window.webkitAudioContext;if(!AC){e.currentTarget.textContent="Sound unavailable";return}audio=new AC()}if(audio.state==="suspended")await audio.resume();enabled=!enabled;e.currentTarget.textContent=enabled?"♫ Sound on":"♫ Sound off";if(enabled){const play=()=>{if(!enabled)return;const o=audio.createOscillator(),g=audio.createGain();o.type="sine";o.frequency.value=[523,659,784,659,587][Math.floor(Math.random()*5)];g.gain.setValueAtTime(.0001,audio.currentTime);g.gain.exponentialRampToValueAtTime(.025,audio.currentTime+.08);g.gain.exponentialRampToValueAtTime(.0001,audio.currentTime+1);o.connect(g);g.connect(audio.destination);o.start();o.stop(audio.currentTime+1)};play();timer=setInterval(play,1700)}else clearInterval(timer)});

/* Interactive photo gallery */
const galleryPhotos = [...document.querySelectorAll(".gallery-photo")];
const photoViewer = document.getElementById("photoViewer");
const viewerImage = document.getElementById("viewerImage");
const viewerCaption = document.getElementById("viewerCaption");
const viewerCounter = document.getElementById("viewerCounter");

let galleryIndex = 0;

const galleryCaptions = [
  "The beginning of a favourite story ♡",
  "Nothing extraordinary. Everything special.",
  "Another chapter in our story.",
  "The best parts are still ahead."
];

function showGalleryPhoto(index) {
  galleryIndex = (index + galleryPhotos.length) % galleryPhotos.length;
  const photo = galleryPhotos[galleryIndex];

  viewerImage.src = photo.src;
  viewerImage.alt = photo.alt;
  viewerCaption.textContent = galleryCaptions[galleryIndex];
  viewerCounter.textContent =
    `${galleryIndex + 1} / ${galleryPhotos.length}`;
}

function openGallery(index) {
  showGalleryPhoto(index);
  photoViewer.classList.add("visible");
  photoViewer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeGallery() {
  photoViewer.classList.remove("visible");
  photoViewer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

galleryPhotos.forEach((photo, index) => {
  photo.addEventListener("click", () => openGallery(index));
});

document.getElementById("viewerClose")
  .addEventListener("click", closeGallery);

document.getElementById("viewerPrev")
  .addEventListener("click", () => showGalleryPhoto(galleryIndex - 1));

document.getElementById("viewerNext")
  .addEventListener("click", () => showGalleryPhoto(galleryIndex + 1));

photoViewer.addEventListener("click", event => {
  if (event.target === photoViewer) closeGallery();
});

document.addEventListener("keydown", event => {
  if (!photoViewer.classList.contains("visible")) return;

  if (event.key === "Escape") closeGallery();
  if (event.key === "ArrowLeft") showGalleryPhoto(galleryIndex - 1);
  if (event.key === "ArrowRight") showGalleryPhoto(galleryIndex + 1);
});


/* Birthday cake interaction */
const birthdayCake = document.getElementById("birthdayCake");
const cakeMessage = document.getElementById("cakeMessage");

if (birthdayCake && cakeMessage) {
  function blowOutCandles() {
    if (birthdayCake.classList.contains("blown")) return;

    birthdayCake.classList.add("blown");
    birthdayCake.setAttribute("aria-label", "Candles blown out");

    cakeMessage.textContent =
      "Wish made! May your year be beautiful, Sneha! ♡";

    if (typeof hearts === "function") {
      hearts(60);
    }
  }

  birthdayCake.addEventListener("click", blowOutCandles);

  birthdayCake.addEventListener("keydown", function(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      blowOutCandles();
    }
  });
} else {
  console.error("Birthday cake or message element not found.");
}

