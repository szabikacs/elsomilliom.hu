const counters = document.querySelectorAll(".counter");

const runCounter = (counter) => {
  const target = Number(counter.dataset.target);
  let current = 0;
  const step = Math.ceil(target / 80);

  const update = () => {
    current += step;
    if (current >= target) {
      counter.textContent = target + counter.dataset.suffix;
      return;
    }
    counter.textContent = current;
    requestAnimationFrame(update);
  };

  update();
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");

      if (entry.target.classList.contains("stats")) {
        counters.forEach(runCounter);
      }

      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll(".reveal, .stats").forEach(el => {
  observer.observe(el);
});
