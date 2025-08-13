## 🧪 Tugas Sesi 11 - Web UI Automation Advance Part 2

Proyek ini merupakan implementasi **Web UI Automation Testing** menggunakan **Selenium WebDriver**, **Mocha**, dan **Visual Testing** pada situs [SauceDemo](https://www.saucedemo.com/).  
Pengujian dilakukan untuk memverifikasi skenario login, pengurutan produk (sort) A-Z, serta perbandingan visual elemen halaman menggunakan **Pixelmatch**.

---

### 📌 Teknologi yang Digunakan
- [Node.js](https://nodejs.org/) – JavaScript runtime
- [Selenium WebDriver](https://www.selenium.dev/) – Web automation
- [Mocha](https://mochajs.org/) – Test framework
- [Mochawesome](https://www.npmjs.com/package/mochawesome) – HTML reporting
- [Mocha Simple HTML Reporter](https://www.npmjs.com/package/mocha-simple-html-reporter) – Simple HTML reporting
- [Pixelmatch](https://www.npmjs.com/package/pixelmatch) – Image comparison
- [PNGJS](https://www.npmjs.com/package/pngjs) – PNG parser

---

### 📂 Struktur Proyek
```
.
├── baselines/                  # Gambar acuan untuk visual testing
│   └── login_logo.png
├── mochawesome-report/         # Laporan HTML otomatis dari Mochawesome
│   └── assets/
├── output/                     # Screenshot hasil test & perbedaan visual
│   ├── login_logo_current.png
│   └── login_logo_diff.png
├── pages/                      # Page Object Model (POM)
│   ├── basePage.js
│   ├── loginPage.js
│   └── productsPage.js
├── tests/                      # Test cases
│   └── sauceDemo.test.js
├── utils/                      # Helper functions
│   └── visualHelper.js
├── package.json
└── README.md
```

---

### ⚙️ Instalasi
1. Pastikan Node.js sudah terpasang:
   ```bash
   node -v
   npm -v
   ```
2. Clone repository ini:
   ```bash
   git clone [https://github.com/username/saucedemo-automation.git](https://github.com/amanswasono/Tugas-Sesi-11-Web-UI-Automation-Advance.git)
   cd saucedemo-automation
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

---

### ▶️ Menjalankan Test
#### 1. Test tanpa reporter khusus
```bash
npm test
```

#### 2. Test dengan **Mochawesome Report**
```bash
npm run test:mochawesome
```
Laporan tersimpan di:
```
/mochawesome-report/mochawesome.html
```

#### 3. Test dengan **Simple HTML Report**
```bash
npm run test:simple-html
```
Laporan tersimpan di:
```
/reports/report.html
```

---

### 🧪 Skenario Pengujian
#### 1. **Visual Testing - Halaman Login**
- Membuka halaman login `https://www.saucedemo.com`
- Mengambil screenshot elemen logo
- Membandingkan dengan baseline (`baselines/login_logo.png`)
- Jika pixel mismatch > 0, test dinyatakan gagal

#### 2. **User berhasil login**
- Input **username**: `standard_user`
- Input **password**: `secret_sauce`
- Klik tombol login
- Verifikasi halaman menampilkan teks `Products`

#### 3. **User berhasil sort produk A-Z**
- Login seperti skenario sebelumnya
- Pilih sort `Name (A to Z)`
- Ambil semua nama produk
- Pastikan urutan sesuai alfabet A-Z

---

### 📸 Visual Testing
- **Baseline**: Gambar acuan tersimpan di folder `baselines/`
- **Current**: Hasil screenshot test di folder `output/`
- **Diff**: Perbedaan visual otomatis di folder `output/`

---

### ✍️ Author
**Aman Swasono**  
_Tugas Sesi 11 - Web UI Automation Advance_
