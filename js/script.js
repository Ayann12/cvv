document.addEventListener("DOMContentLoaded", function() {
    console.log("CV Loaded Successfully");

    // Fungsionalitas untuk download CV
    const downloadBtn = document.getElementById('download-btn');
    downloadBtn.addEventListener('click', () => {
        const cvElement = document.getElementById('cv');

        // Menunggu gambar dimuat
        const images = cvElement.getElementsByTagName('img');
        let loadedImagesCount = 0;

        // Cek semua gambar
        for (let img of images) {
            if (img.complete) {
                loadedImagesCount++;
            } else {
                img.onload = () => {
                    loadedImagesCount++;
                    if (loadedImagesCount === images.length) {
                        downloadCV();
                    }
                };
                img.onerror = () => {
                    console.error("Error loading image:", img.src);
                    loadedImagesCount++;
                };
            }
        }

        // Jika semua gambar sudah dimuat
        if (loadedImagesCount === images.length) {
            downloadCV();
        }
    });

    function downloadCV() {
        const cvElement = document.getElementById('cv');

        // Opsi untuk PDF
        const options = {
            margin: 1,
            filename: 'Curriculum_Vitae.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };

        // Menampilkan pesan sebelum proses download
        alert("Mengunduh CV Anda. Silakan tunggu...");

        // Menggunakan html2pdf untuk mendownload
        html2pdf()
            .from(cvElement)
            .set(options)
            .save()
            .then(() => {
                console.log("CV downloaded successfully");
                alert("CV Anda telah berhasil diunduh.");
            })
            .catch(err => {
                console.error("Error downloading CV:", err);
                alert("Terjadi kesalahan saat mengunduh CV. Silakan coba lagi.");
            });
    }
});
