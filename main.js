console.log("JavaScript is connected!");

const nameText = "CHUKWUDI";
const target = document.getElementById("typed-name");

let i = 0;

function typeLetter(){
    if (i < nameText.length){
        target.textContent += nameText[i];
        i++;
        setTimeout(typeLetter, 200)
    }
    else{
        setTimeout(function(){
            document.getElementById("last-name").style.opacity =1;
        } , 300)
    }
}
window.addEventListener("DOMContentLoaded", typeLetter);

console.log("JS is connected to about page");



const revealElements = document.querySelectorAll('.reveal-from-left, .reveal-from-right');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
   if (entry.isIntersecting) {
  entry.target.classList.add('visible');
    } else {
        entry.target.classList.remove('visible');  
    }

  });
});

revealElements.forEach(el => observer.observe(el));

window.addEventListener("scroll", () => {
  const scrollProgress = document.getElementById("scroll-progress");
  const pageHeight = document.body.scrollHeight - window.innerHeight;
  const scrollTop = window.scrollY;

  const scrollPercent = (scrollTop / pageHeight) * 100;
  scrollProgress.style.width = scrollPercent + "%";
});


console.log("JS is connected to Project page");

const revealProjectElements = document.querySelectorAll('.project-1');

const ProjectObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
   if (entry.isIntersecting) {
  entry.target.classList.add('visible');
    } else {
        entry.target.classList.remove('visible');  
    }

  });
});

revealProjectElements.forEach(el => observer.observe(el));


