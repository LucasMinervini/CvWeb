/* ============================================
   Módulo: Desafío Mental – Shell Game
   ¿Es tu mascota un Genio Oculto?
   ============================================ */

(function () {
    'use strict';

    /* ---------- Helpers ---------- */
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const rand  = n  => Math.floor(Math.random() * n);

    /* ---------- DOM ---------- */
    const instruction  = document.getElementById('genius-instruction');
    const cupsTrack    = document.getElementById('cups-track');
    const ctaWrapper   = document.getElementById('genius-cta-wrapper');
    const playBtn      = document.getElementById('genius-play-btn');
    const resultPanel  = document.getElementById('genius-result');
    const resultIcon   = document.getElementById('genius-result-icon');
    const resultText   = document.getElementById('genius-result-text');
    const replayBtn    = document.getElementById('genius-replay-btn');

    if (!instruction || !cupsTrack || !playBtn) return;

    const cupItems = Array.from(cupsTrack.querySelectorAll('.cup-item'));
    const cups     = cupItems.map(item => item.querySelector('.cup'));
    const N        = cupItems.length; // 3

    /* ---------- State ---------- */
    // positions[i] = slot index (0,1,2) where cup-item i currently sits
    let positions  = [0, 1, 2];
    let treatOwner = 0;   // index of cup-item that holds the treat
    let isPlaying  = false;

    /* ---------- Position helpers ---------- */
    const SLOT_PCT = 100 / N; // 33.33…%

    function applyPositions(animated) {
        cupItems.forEach((item, i) => {
            item.style.transition = animated
                ? 'left 0.52s cubic-bezier(0.4, 0, 0.2, 1)'
                : 'none';
            item.style.left = `${positions[i] * SLOT_PCT}%`;
        });
        // Force reflow after disabling transitions so next frame re-enables them
        if (!animated) void cupsTrack.offsetWidth;
    }

    async function swapItems(a, b) {
        [positions[a], positions[b]] = [positions[b], positions[a]];
        applyPositions(true);
        await delay(580);
    }

    /* ---------- Reveal treat ---------- */
    async function revealTreat() {
        const item = cupItems[treatOwner];
        const cup  = cups[treatOwner];

        // Lift cup to expose treat
        item.classList.add('treat-here');
        cup.classList.add('is-lifted');
        await delay(950);

        // Lower cup to hide treat
        cup.classList.remove('is-lifted');
        await delay(460);
        item.classList.remove('treat-here');
        await delay(200);
    }

    /* ---------- Shuffle ---------- */
    async function shuffle() {
        const rounds = 5 + rand(4); // 5–8 swaps
        for (let r = 0; r < rounds; r++) {
            let a = rand(N);
            let b;
            do { b = rand(N); } while (b === a);
            await swapItems(a, b);
            await delay(55);
        }
    }

    /* ---------- Enable guessing ---------- */
    function enableGuessing() {
        instruction.textContent = '¡Ahora haz clic en el cuenco donde crees que está la golosina!';
        cups.forEach(cup => {
            cup.disabled = false;
            cup.classList.add('is-guessable');
        });
    }

    /* ---------- Handle guess ---------- */
    async function handleGuess(clickedIndex) {
        if (!isPlaying) return;
        isPlaying = false;

        cups.forEach(cup => {
            cup.disabled = true;
            cup.classList.remove('is-guessable');
        });
        instruction.classList.add('is-hidden');

        const won = clickedIndex === treatOwner;

        // Always lift the clicked cup first
        cups[clickedIndex].classList.add('is-lifted');
        cupItems[clickedIndex].classList.add('treat-here');
        await delay(520);

        // If wrong, also reveal the correct cup
        if (!won) {
            cups[treatOwner].classList.add('is-lifted');
            cupItems[treatOwner].classList.add('treat-here');
            await delay(420);
        }

        // Show result panel
        resultIcon.textContent  = won ? '🎉' : '🤔';
        resultText.textContent  = won
            ? '¡Correcto! Tu mascota tiene una mente afilada.'
            : '¡Casi! Pero ningún problema — la práctica hace al maestro.';
        resultText.classList.toggle('is-wrong', !won);

        // Re-trigger animation by cloning the panel
        const clone = resultPanel.cloneNode(true);
        resultPanel.replaceWith(clone);
        clone.hidden = false;

        // Re-bind replay button after clone
        clone.querySelector('#genius-replay-btn').addEventListener('click', resetGame);
    }

    /* ---------- Start game ---------- */
    async function startGame() {
        if (isPlaying) return;

        // Reset to clean slate
        resetVisuals();

        // Hide CTA
        ctaWrapper.classList.add('is-hidden');

        // Pick random treat owner
        treatOwner = rand(N);

        await delay(350);

        // Reveal treat under one cup
        await revealTreat();
        await delay(280);

        // Shuffle cups
        await shuffle();
        await delay(200);

        // Let user guess
        isPlaying = true;
        enableGuessing();
    }

    /* ---------- Reset ---------- */
    function resetVisuals() {
        isPlaying = false;
        instruction.classList.remove('is-hidden');
        instruction.textContent = 'Sigue la golosina... ¡y haz clic donde creas que está!';

        cups.forEach(cup => {
            cup.classList.remove('is-lifted', 'is-guessable');
            cup.disabled = true;
        });
        cupItems.forEach(item => item.classList.remove('treat-here'));

        positions = [0, 1, 2];
        applyPositions(false);
    }

    function resetGame() {
        // Re-fetch result panel in case it was replaced via clone trick
        const rPanel = document.getElementById('genius-result');
        if (rPanel) rPanel.hidden = true;

        resetVisuals();
        ctaWrapper.classList.remove('is-hidden');
    }

    /* ---------- Events ---------- */
    playBtn.addEventListener('click', startGame);

    cups.forEach((cup, i) => {
        cup.addEventListener('click', () => {
            if (!isPlaying || cup.disabled) return;
            handleGuess(i);
        });
    });

    // Replay button (initial binding — subsequent bindings happen after clone)
    replayBtn.addEventListener('click', resetGame);

    /* ---------- Init ---------- */
    applyPositions(false);

})();
