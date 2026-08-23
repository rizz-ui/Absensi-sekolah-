document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('attendanceForm');
    const tableBody = document.getElementById('attendanceTableBody');

    // Mengambil data simpanan dari LocalStorage
    let attendanceData = JSON.parse(localStorage.getItem('attendanceRecords')) || [];

    // Fungsi untuk menampilkan data ke tabel
    function renderTable() {
        tableBody.innerHTML = '';

        if (attendanceData.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; color: #94a3b8;">
                        Belum ada data absensi.
                    </td>
                </tr>`;
            return;
        }

        attendanceData.forEach((item, index) => {
            const row = document.createElement('tr');
            
            // Format Badge CSS berdasarkan status
            const statusClass = `badge-${item.status.toLowerCase()}`;

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.date}</td>
                <td><strong>${item.name}</strong></td>
                <td>${item.class}</td>
                <td><span class="badge ${statusClass}">${item.status}</span></td>
                <td>
                    <button class="btn-delete" onclick="deleteRecord(${index})">Hapus</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Fungsi Tambah Data
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('studentName').value;
        const studentClass = document.getElementById('studentClass').value;
        const status = document.getElementById('attendanceStatus').value;

        // Mendapatkan Tanggal Hari Ini
        const today = new Date();
        const formattedDate = today.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });

        const newRecord = {
            date: formattedDate,
            name: name,
            class: studentClass,
            status: status
        };

        attendanceData.push(newRecord);
        localStorage.setItem('attendanceRecords', JSON.stringify(attendanceData));

        form.reset();
        renderTable();
    });

    // Fungsi Hapus Data
    window.deleteRecord = function(index) {
        if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            attendanceData.splice(index, 1);
            localStorage.setItem('attendanceRecords', JSON.stringify(attendanceData));
            renderTable();
        }
    };

    // Muat data saat halaman dibuka
    renderTable();
});
