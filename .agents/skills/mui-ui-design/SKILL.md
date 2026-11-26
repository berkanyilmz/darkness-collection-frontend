---
name: mui-ui-design
description: >-
  Use this skill whenever creating, redesigning, or modifying any page, layout,
  form, modal, or UI component in the Darkness Collection frontend—especially
  when translating Stitch, HTML, or Tailwind design references into the project.
  Enforces strict Material UI (MUI v9) usage and alignment with the existing
  theme and shared component architecture.
---

# Darkness Collection — MUI UI & Tasarım Rehberi

Bu proje **yalnızca Material UI (`@mui/material`, `@mui/icons-material`)** ile geliştirilir. Dış tasarım kaynakları (Stitch `code.html`, Tailwind örnekleri vb.) sadece görsel referans olarak alınır; asla düz HTML veya Tailwind sınıflarıyla uygulanmaz.

## 1. Zorunlu Bileşen Kuralları

- **Sadece MUI kullan:** Tüm yapısal ve etkileşimli elemanlarda MUI bileşenleri (`Box`, `Stack`, `Paper`, `Typography`, `TextField`, `Button`, `IconButton`, `InputAdornment`, `Alert`, `Divider`, `Link`, `Chip`, `Dialog` vb.) kullan.
- **Düz HTML ve Tailwind yasağı:** `<input>`, `<button>`, `<label>`, `<form>`, `<svg>`, `<header>`, `<footer>` gibi düz HTML etiketleri veya Tailwind `className` stilleri yazma.
  - Semantik etiket gerektiğinde `Box component="header" | "main" | "section" | "footer" | "form" | "img"` veya `Typography component="label" | "blockquote"` kullan.
  - Tüm stiller MUI `theme` tokenları ve `sx` prop'u üzerinden verilir.
- **Stil katmanlama kuralı (Tekrar yasağı):** `const fieldSx`, `const labelSx` gibi ortak input/etiket/buton/alert stil objelerini bileşen dosyalarının tepesine kopyalama.
  - Uygulama geneli bileşen görünümleri (`MuiOutlinedInput`, `MuiFormLabel`, `MuiButton`, `MuiAlert`, `MuiDialog`, `MuiIconButton` vb.) `src/utils/theme/Components.tsx` içinde `styleOverrides` / `variants` olarak tanımlanır.
  - Bileşen içindeki `sx` prop'u yalnızca o bileşene özgü yerleşim/boşluk (`mt`, `gap`, `maxWidth`, `gridTemplateColumns` vb.) için kullanılır.
- **İkonlar:** Ham `<svg>` yazma; her zaman `@mui/icons-material` ikonlarını kullan.
- **Bağlantılar:** `next/link` yerine `@mui/material/Link` kullan (`src/utils/theme/Theme.tsx` içinde `LinkBehavior` zaten varsayılan olarak tanımlıdır).

## 2. Mevcut Proje Mimarisini ve Ortak Bileşenleri Koru

Yeni bir UI parçası yazmadan önce projenin mevcut altyapısını kontrol et ve yeniden üretmek yerine bunları kullan:

- **Tema sistemi:**
  - Renk paletleri: `src/utils/theme/DarkThemeColors.tsx` (`BLACK_THEME` = Darkness Collection Nocturne paleti) ve `src/utils/theme/LightThemeColors.tsx`
  - Tipografi ve fontlar: `src/utils/theme/Typography.tsx` (`Bodoni_Moda` başlıklar, `Manrope` gövde/etiketler)
  - Global bileşen override'ları: `src/utils/theme/Components.tsx`
  - Aktif tema seçimi: `src/app/hooks/useThemeSettings.tsx` (`BuildTheme`)
- **Ortak bileşenler:**
  - Modallar için `src/app/components/shared/AppModal/AppModal.tsx` kullan.
  - Toast/Snackbar bildirimleri için `src/app/components/shared/Alert/CustomAlert.tsx` kullan.
- **Mimari kararlar:** Mevcut tema yapısını, klasör düzenini veya paylaşılan bileşenlerin sözleşmesini değiştirecek bir adım gerekiyorsa kendi başına uygulama yapma; önce kullanıcıya öneri sunup onay al.

## 3. MUI v9 & Next.js App Router Teknik Kuralları

- **MUI v9 `Stack` prop'ları:** `alignItems` ve `justifyContent` doğrudan `<Stack>` prop'u olarak kullanılmaz (TS hatası verir). Her zaman `sx={{ alignItems: "...", justifyContent: "..." }}` içinde ver.
- **Global `MuiGrid` uyarısı:** `src/utils/theme/Components.tsx` içinde `MuiGrid` için global `paddingTop/paddingLeft: 30px` tanımlıdır. Kenarsız/özel çok kolonlu yerleşimlerde `Box` üzerinde `sx={{ display: "grid", gridTemplateColumns: ... }}` kullan.
- **SSR Hidrasyon:** `src/app/theme/ThemeRegistery.tsx` içinde `NextAppDirEmotionCacheProvider` (`src/utils/theme/EmotionCache.tsx`) yapısını bozma; aksi halde `<CssBaseline />` kaynaklı SSR/client hidrasyon hatası oluşur.
- **Görsel bağlantıları:** Stitch tasarım dosyalarındaki görsellerde yalnızca herkese açık (`aida-public`) veya proje içi yerel görselleri kullan; yüklenmeme ihtimaline karşı `onError` ile güvenli yedek yüzey sağla.

## 4. Doğrulama Adımları

Her UI değişikliğinden sonra aşağıdakileri çalıştırıp **0 hata** ile geçtiğini doğrula:

1. Değiştirilen dosyalar üzerinde `npx eslint <dosyalar>` çalıştır.
2. Tüm proje için `npx tsc --noEmit` çalıştırarak MUI v9 tip uyumluluğunu kontrol et.
3. Yeni veya güncellenen dosyalarda Tailwind utility sınıfı veya ham HTML form/buton/SVG kalmadığını gözden geçir.
