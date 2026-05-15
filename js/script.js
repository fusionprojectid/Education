// Data Mentor (bisa diedit/ditambah sesuai kebutuhan)
const dataMentor = {
    "1": {
        nama: "Kak Budi",
        jabatan: "Master Fotografi",
        foto: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
        deskripsi: "Kak Budi sudah berpengalaman 10 tahun di dunia dokumenter lho! Beliau paling jago ngajarin anak-anak cara mencari angle (sudut pandang) foto yang epik dan sinematik. Siap-siap jepretanmu jadi sekeren karya profesional!"
    },
    "2": {
        nama: "Kak Dina",
        jabatan: "Suhu Editing Keren",
        foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
        deskripsi: "Bagi Kak Dina, setiap potongan klip video adalah puzzle ajaib. Dengan trik efek visual dan transisi yang asyik, Kak Dina bakal bantu kamu mengubah video biasa menjadi mahakarya vlog yang stand out!"
    },
    "3": {
        nama: "Kak Rio",
        jabatan: "Pawang Koding Game",
        foto: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop",
        deskripsi: "Pernah kebayang bikin game sendiri? Kak Rio ini masternya! Di kelas Kak Rio, belajar algoritma tuh rasanya kayak main susun balok Lego. Error itu bukan rintangan, tapi teka-teki seru yang bikin tambah pintar!"
    }
};

const MODAL_ANIMATION_MS = 300;
let modalCloseTimer = null;
let toastTimer = null;
let lastFocusedElement = null;

function getModalParts() {
    const modal = document.getElementById('mentorModal');
    const overlay = document.getElementById('modalOverlay');
    const contentBox = document.getElementById('modalContentBox');

    if (!modal || !overlay || !contentBox) return null;

    return { modal, overlay, contentBox };
}

function setMentorContent(mentor) {
    const modalImg = document.getElementById('modalImg');
    const modalName = document.getElementById('modalName');
    const modalRole = document.getElementById('modalRole');
    const modalDesc = document.getElementById('modalDesc');

    if (!modalImg || !modalName || !modalRole || !modalDesc) return false;

    modalImg.src = mentor.foto;
    modalImg.alt = `Foto ${mentor.nama}`;
    modalName.textContent = mentor.nama;
    modalRole.textContent = mentor.jabatan;
    modalDesc.textContent = mentor.deskripsi;

    return true;
}

/* ==============================
   FUNGSI GLOBAL UNTUK MENTOR
============================== */
window.bukaModal = function(id) {
    const mentor = dataMentor[id];
    const parts = getModalParts();

    if (!mentor || !parts || !setMentorContent(mentor)) return;

    clearTimeout(modalCloseTimer);
    lastFocusedElement = document.activeElement;

    parts.modal.classList.remove('hidden');
    parts.modal.classList.add('flex');
    parts.modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    requestAnimationFrame(() => {
        parts.overlay.classList.remove('opacity-0');
        parts.overlay.classList.add('opacity-100');

        parts.contentBox.classList.remove('scale-95', 'opacity-0');
        parts.contentBox.classList.add('scale-100', 'opacity-100');

        const closeButton = parts.contentBox.querySelector('button');
        if (closeButton) closeButton.focus();
    });
};

window.tutupModal = function() {
    const parts = getModalParts();

    if (!parts || parts.modal.classList.contains('hidden')) return;

    parts.overlay.classList.remove('opacity-100');
    parts.overlay.classList.add('opacity-0');

    parts.contentBox.classList.remove('scale-100', 'opacity-100');
    parts.contentBox.classList.add('scale-95', 'opacity-0');

    parts.modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');

    clearTimeout(modalCloseTimer);
    modalCloseTimer = setTimeout(() => {
        parts.modal.classList.add('hidden');
        parts.modal.classList.remove('flex');

        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
        }
    }, MODAL_ANIMATION_MS);
};

function initMentorCards() {
    document.querySelectorAll('[data-mentor-id]').forEach((card) => {
        const openCard = () => window.bukaModal(card.dataset.mentorId);

        card.addEventListener('click', openCard);
        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openCard();
            }
        });
    });
}

/* ==============================
   FUNGSI GLOBAL UNTUK FAQ
============================== */
window.toggleFAQ = function(targetId, btnElement) {
    const content = document.getElementById(targetId);
    const icon = btnElement ? btnElement.querySelector('i') : null;

    if (!content || !icon) return;

    const willOpen = content.classList.contains('hidden');

    content.classList.toggle('hidden', !willOpen);
    content.setAttribute('aria-hidden', String(!willOpen));
    btnElement.setAttribute('aria-expanded', String(willOpen));

    icon.classList.toggle('fa-plus', !willOpen);
    icon.classList.toggle('fa-minus', willOpen);
    icon.style.transform = willOpen ? 'rotate(180deg)' : 'rotate(0deg)';
};

function initFAQButtons() {
    document.querySelectorAll('[data-faq-target]').forEach((button) => {
        button.addEventListener('click', () => {
            window.toggleFAQ(button.dataset.faqTarget, button);
        });
    });
}

function showToast(message) {
    const toast = document.getElementById('siteToast');

    if (!toast || !message) return;

    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.setAttribute('aria-hidden', 'false');
    toast.classList.add('show');

    toastTimer = setTimeout(() => {
        toast.classList.remove('show');
        toast.setAttribute('aria-hidden', 'true');
    }, 2500);
}

function initToastTriggers() {
    document.querySelectorAll('[data-toast]').forEach((element) => {
        element.addEventListener('click', (event) => {
            event.preventDefault();
            showToast(element.dataset.toast);
        });
    });
}

function initScrollTargets() {
    document.querySelectorAll('[data-scroll-target]').forEach((element) => {
        element.addEventListener('click', () => {
            const target = element.dataset.scrollTarget;

            if (target === 'body') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            const targetElement = document.querySelector(target);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/* ==============================
   EFEK NAVBAR SAAT SCROLL
============================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const updateNavbar = () => {
        const isScrolled = window.scrollY > 50;
        navbar.classList.toggle('py-2', isScrolled);
        navbar.classList.toggle('shadow-md', isScrolled);
        navbar.classList.toggle('py-0', !isScrolled);
    };

    updateNavbar();
    window.addEventListener('scroll', updateNavbar, { passive: true });
}

function initGlobalKeys() {
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            window.tutupModal();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initMentorCards();
    initFAQButtons();
    initToastTriggers();
    initScrollTargets();
    initNavbar();
    initGlobalKeys();
});
