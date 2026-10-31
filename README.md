# 📚 KPSS Sınav Simülatörü

> Yapay zeka destekli, interaktif KPSS hazırlık ve sınav simülasyon uygulaması.

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT-412991?style=for-the-badge&logo=openai)

---

## 🚀 Özellikler

- 🧠 **Yapay Zeka Destekli Soru Çözümü** — OpenAI API ile anlık soru açıklamaları
- 📝 **Gerçekçi Sınav Simülasyonu** — Zamanlayıcılı, KPSS formatına uygun sınavlar
- 📊 **Detaylı Analitik Dashboard** — Konu bazlı performans takibi ve zayıf alan analizi
- 🗂️ **Konu Bazlı Çalışma** — Her ders için ayrı soru havuzu
- 📈 **İlerleme Takibi** — Sınav geçmişi ve puan gelişimi
- 🔍 **Çözüm İnceleme** — Yanlış yapılan soruların detaylı incelemesi
- 📐 **Görsel Diyagramlar** — Geometri ve şekil gerektiren sorular için görsel destek

---

## 🛠️ Teknolojiler

| Teknoloji | Kullanım |
|-----------|---------|
| React 18 | Kullanıcı arayüzü |
| TypeScript | Tip güvenliği |
| Vite | Build aracı |
| TailwindCSS 4 | Stil sistemi |
| OpenAI API | Yapay zeka soru açıklamaları |
| Lucide React | İkonlar |

---

## ⚙️ Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn
- OpenAI API anahtarı

### Adımlar

```bash
# 1. Repoyu klonla
git clone https://github.com/ErenEgeY/kpss-uygulama-.git
cd kpss-uygulama-

# 2. Bağımlılıkları yükle
npm install

# 3. Ortam değişkenlerini ayarla
cp .env.local.example .env.local
# .env.local dosyasını aç ve OpenAI API anahtarını gir

# 4. Geliştirme sunucusunu başlat
npm run dev
```

### Ortam Değişkenleri

`.env.local.example` dosyasını `.env.local` olarak kopyala ve değerleri doldur:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

> **Not:** OpenAI API anahtarını [platform.openai.com/api-keys](https://platform.openai.com/api-keys) adresinden alabilirsiniz.

---

## 📁 Proje Yapısı

```
src/
├── components/          # React bileşenleri
│   ├── AnalyticsDashboardView.tsx   # Analitik dashboard
│   ├── TestExecutionView.tsx        # Sınav ekranı
│   ├── SolutionReviewView.tsx       # Çözüm inceleme
│   ├── QuestionCard.tsx             # Soru kartı
│   ├── ExamTimer.tsx                # Sınav zamanlayıcısı
│   ├── ScoreSummaryCard.tsx         # Puan özeti
│   └── ...
├── services/            # API servisleri
├── config/              # Yapılandırma dosyaları
├── types/               # TypeScript tip tanımları
├── utils/               # Yardımcı fonksiyonlar
├── App.tsx              # Ana uygulama
└── main.tsx             # Giriş noktası
```

---

## 📜 Komutlar

```bash
npm run dev      # Geliştirme sunucusunu başlat
npm run build    # Prodüksiyon build al
npm run preview  # Build önizleme
npm run lint     # TypeScript tip kontrolü
```

---

## 🔒 Güvenlik

Bu proje API anahtarını `.env.local` dosyasında saklar. Bu dosya `.gitignore` ile GitHub'a **gönderilmez**.  
Asla API anahtarınızı kod içine yazmayın veya herkese açık bir yerde paylaşmayın.

---

## 📄 Lisans

Bu proje kişisel kullanım amaçlıdır.

---

<p align="center">Made with ❤️ for KPSS candidates</p>
