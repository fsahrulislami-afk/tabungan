let saldo = 0;
const BATAS_MINIMUM = 10000; // Contoh batas minimum Rp 10.000

function mulaiAplikasi() {
    const inputAwal = document.getElementById('input-awal').value;
    
    if (inputAwal === "" || inputAwal < 0) {
        alert("Harap masukkan nominal saldo awal yang valid!");
        return;
    }

    // Set Saldo = Uang Saku (Sesuai Flowchart)
    saldo = parseFloat(inputAwal);
    
    // Transisi UI
    document.getElementById('initial-setup').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    
    updateDisplay();
}

function tambahPemasukan() {
    const jumlah = parseFloat(document.getElementById('input-pemasukan').value);
    if (!isNaN(jumlah) && jumlah > 0) {
        saldo += jumlah; // Tambah ke Saldo
        document.getElementById('input-pemasukan').value = "";
        updateDisplay();
    }
}

function kurangPengeluaran() {
    const jumlah = parseFloat(document.getElementById('input-pengeluaran').value);
    if (!isNaN(jumlah) && jumlah > 0) {
        saldo -= jumlah; // Pengeluaran
        document.getElementById('input-pengeluaran').value = "";
        cekBatasMinimum();
        updateDisplay();
    }
}

function cekBatasMinimum() {
    const warningBox = document.getElementById('warning-box');
    const systemStatus = document.getElementById('system-status');

    // Cek Saldo < Batas Minimum? (Sesuai Flowchart)
    if (saldo < BATAS_MINIMUM) {
        warningBox.classList.remove('hidden'); // Tampilkan Peringatan
        systemStatus.innerText = "CRITICAL";
        systemStatus.className = "status-danger";
    } else {
        warningBox.classList.add('hidden');
        systemStatus.innerText = "OPERASIONAL";
        systemStatus.className = "status-safe";
    }
}

function updateDisplay() {
    // Tampilkan Saldo (Sesuai Flowchart)
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    });
    
    document.getElementById('display-saldo').innerText = formatter.format(saldo);
}

function resetSystem() {
    if (confirm("Reset seluruh data finansial?")) {
        location.reload();
    }
}