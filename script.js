document.addEventListener('DOMContentLoaded', () => {
    const myButton = document.getElementById('myButton');
    const messagePara = document.getElementById('message');
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let celebrating = false;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    myButton.addEventListener('click', () => {
        messagePara.textContent = 'SURPRISE! Hope you have a great one!';
        if (!celebrating) {
            celebrating = true;
            launchConfetti();
            setTimeout(() => { celebrating = false; }, 5000); // Celebrate for 5 seconds
        }
    });

    function launchConfetti() {
        particles = [];
        const particleCount = 200;
        const colors = ['#ff69b4', '#ff1493', '#7b68ee', '#00ced1', '#ffd700', '#32cd32'];

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height, // Start from above
                vx: (Math.random() - 0.5) * 5,
                vy: Math.random() * 5 + 2,
                size: Math.random() * 10 + 5,
                color: colors[Math.floor(Math.random() * colors.length)],
                opacity: Math.random() * 0.5 + 0.5
            });
        }
        if (!animationActive) animateConfetti();
    }

    let animationActive = false;
    function animateConfetti() {
        animationActive = true;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, index) => {
            p.x += p.vx;
            p.y += p.vy;

            // Bounce off sides (a little)
            if (p.x < 0 || p.x > canvas.width) p.vx *= -0.9;

            p.opacity -= 0.005;

            if (p.opacity <= 0 || p.y > canvas.height) {
                particles.splice(index, 1);
            }

            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.opacity;
            ctx.fillRect(p.x, p.y, p.size, p.size);
            ctx.globalAlpha = 1;
        });

        if (particles.length > 0) {
            requestAnimationFrame(animateConfetti);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            animationActive = false;
        }
    }
});
