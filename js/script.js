// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    // Memberikan efek bayangan saat halaman di-scroll ke bawah
    if (window.scrollY > 50) {
        navbar.classList.add('py-2', 'shadow-md');
        navbar.classList.remove('py-0');
    } else {
        navbar.classList.remove('py-2', 'shadow-md');
        navbar.classList.add('py-0');
    }
});

// Simulasi Klik Tombol Default
document.querySelectorAll('.btn-press').forEach(element => {
    element.addEventListener('click', (e) => {
        if(e.currentTarget.tagName !== 'A') {
            console.log("Mengarahkan ke halaman terkait...");
        }
    });
});

/* =========================================
   LOGIKA POPUP MODAL MENTOR
========================================= */

// Database Mentor LokaLensa Kids
const dataMentor = {
    1: {
        nama: "Kak Budi",
        jabatan: "Master Fotografi",
        foto: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
        deskripsi: "Kak Budi sudah berpengalaman 10 tahun di dunia dokumenter lho! Beliau paling jago ngajarin anak-anak cara mencari angle (sudut pandang) foto yang epik dan sinematik. Siap-siap jepretanmu jadi sekeren karya profesional!"
    },
    2: {
        nama: "Kak Dina",
        jabatan: "Suhu Editing Keren",
        foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
        deskripsi: "Bagi Kak Dina, setiap potongan klip video adalah puzzle ajaib. Dengan trik efek visual dan transisi yang asyik, Kak Dina bakal bantu kamu mengubah video biasa menjadi mahakarya vlog yang stand out!"
    },
    3: {
        nama: "Kak Rio",
        jabatan: "Pawang Koding Game",
        foto: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop",
        deskripsi: "Pernah kebayang bikin game sendiri? Kak Rio ini masternya! Di kelas Kak Rio, belajar algoritma tuh rasanya kayak main susun balok Lego. Error itu bukan rintangan, tapi teka-teki seru yang bikin tambah pintar!"
    }
};

const modal = document.getElementById('mentorModal');
const modalOverlay = document.getElementById('modalOverlay');
const contentBox = document.getElementById('modalContentBox');

// Fungsi Membuka Modal
window.bukaModal = function(id) {
    // 1. Masukkan data ke dalam modal sesuai ID mentor
    document.getElementById('modalImg').src = dataMentor[id].foto;
    document.getElementById('modalName').innerText = dataMentor[id].nama;
    document.getElementById('modalRole').innerText = dataMentor[id].jabatan;
    document.getElementById('modalDesc').innerText = dataMentor[id].deskripsi;
    
    // 2. Tampilkan kontainer modal (hilangkan class hidden)
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    // Kunci scroll halaman belakang
    document.body.classList.add('modal-open');

    // 3. Efek animasi muncul (delay sedikit agar transisi jalan)
    setTimeout(() => {
        modalOverlay.classList.remove('opacity-0');
        modalOverlay.classList.add('opacity-100');
        
        contentBox.classList.remove('scale-95', 'opacity-0');
        contentBox.classList.add('scale-100', 'opacity-100');
    }, 10);
};

// Fungsi Menutup Modal
window.tutupModal = function() {
    // 1. Jalankan animasi menghilang
    modalOverlay.classList.remove('opacity-100');
    modalOverlay.classList.add('opacity-0');
    
    contentBox.classList.remove('scale-100', 'opacity-100');
    contentBox.classList.add('scale-95', 'opacity-0');
    
    // Buka kembali scroll halaman belakang
    document.body.classList.remove('modal-open');

    // 2. Sembunyikan elemen setelah animasi selesai
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }, 300); // Sesuai dengan durasi default Tailwind transition
};