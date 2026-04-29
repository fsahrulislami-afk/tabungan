let saldo = 0;
const BATAS_MINIMUM = 15000; // Contoh batas minimum sesuai flowchart logic

// 1. Inisialisasi Kursor Glow
const cursorLight = document.getElementById('cursor-light');
document.addEventListener('mousemove', (e) => {
    cursorLight.style.left = e.clientX + 'px';
    cursorLight.style.top = e.clientY + 'px';
});

// 2. Mulai Aplikasi (Input Uang Saku Awal)
function mulaiAplikasi() {
    const inputAwal = document.getElementById('input-awal').value;
    if (inputAwal === "" || inputAwal < 0) {
        alert("Isi saldo awal dulu ya kak! ✨");
        return;
    }
    
    // Set Saldo = Uang Saku
    saldo = parseFloat(inputAwal);
    
    document.getElementById('initial-setup').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    updateDisplay();
}

// 3. Tambah Pemasukan
function tambahPemasukan() {
    const input = document.getElementById('input-pemasukan');
    const jumlah = parseFloat(input.value);
    
    if (!isNaN(jumlah) && jumlah > 0) {
        saldo += jumlah;
        input.value = "";
        triggerGlowEffect();
        updateDisplay();
    }
}

// 4. Kurang Pengeluaran
function kurangPengeluaran() {
    const input = document.getElementById('input-pengeluaran');
    const jumlah = parseFloat(input.value);
    
    if (!isNaN(jumlah) && jumlah > 0) {
        saldo -= jumlah;
        input.value = "";
        cekBatasMinimum(); // Cek Saldo < Batas Minimum (Sesuai Flowchart)
        updateDisplay();
    }
}

// 5. Cek Kondisi (Decision pada Flowchart)
function cekBatasMinimum() {
    const warningBox = document.getElementById('warning-box');
    const systemStatus = document.getElementById('system-status');

    if (saldo < BATAS_MINIMUM) {
        warningBox.classList.remove('hidden'); // Tampilkan Peringatan
        systemStatus.innerText = "🌸 Status: Dompet Kritis!";
        systemStatus.style.background = "#ffccd5";
    } else {
        warningBox.classList.add('hidden');
        systemStatus.innerText = "🌸 Status: Aman Bestie";
        systemStatus.style.background = "#caffbf";
    }
}

// 6. Update Tampilan Saldo
function updateDisplay() {
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    });
    document.getElementById('display-saldo').innerText = formatter.format(saldo);
}

// Fitur Lighting Lucu (Visual Feedback)
function triggerGlowEffect() {
    const bubble = document.getElementById('balance-container');
    bubble.style.transform = "scale(1.1)";
    bubble.style.backgroundColor = "#caffbf"; // Berubah hijau bentar kalau nambah
    
    setTimeout(() => {
        bubble.style.transform = "scale(1)";
        bubble.style.backgroundColor = "#e2ceff";
    }, 300);
}

function resetSystem() {
    if (confirm("Hapus semua catatan dan mulai baru?")) {
        location.reload();
    }
}