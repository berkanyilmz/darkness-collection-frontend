## Auth & RBAC Mimari Kuralları
- `accessToken` yalnızca Redux belleğinde (RAM) tutulur; `authPersistConfig` içinde `blacklist: ['accessToken']` zorunludur, asla `localStorage` veya `sessionStorage`'a yazılmaz.
- `refreshToken` yalnızca Backend tarafından yönetilen HttpOnly Cookie'de saklanır; Frontend JavaScript tarafında erişilmez. Tüm API isteklerinde `credentials: 'include'` kullanılır.
- `store.ts` içinde ikinci bir `persistReducer` sarmalaması yapılmaz; persist yalnızca `rootReducer.ts` içindeki `auth` slice'ına uygulanır.
- Her kullanıcının tek bir `role` değeri vardır. Sayfa erişimleri ve sol menü (Sidebar) hardcode edilmez; `GET /users/me` yanıtından gelen `allowedPages` ve `allowedMenus` üzerinden `usePermission` kancası ile yönetilir.
- `(DashboardPanel)/layout.tsx` F5 sonrası `/auth/refresh` + `/users/me` oturum kurtarmasını ve yetkisiz URL'lerde `/403` yönlendirmesini üstlenir.

## UI & MUI Tasarım Mimarisi Kuralları
- Proje arayüzü yalnızca **Material UI (`@mui/material` v9, `@mui/icons-material`)** ile geliştirilir; düz HTML form/buton/SVG elemanları veya Tailwind utility sınıfları kullanılmaz. Dış tasarım çıktıları (Stitch `code.html` vb.) yalnızca görsel referanstır ve MUI bileşenlerine çevrilir.
- Her yeni sayfa, form, modal veya görsel güncellemede `.agents/skills/mui-ui-design/SKILL.md` rehberi uygulanır.
- Renkler, tipografi ve `borderRadius` değerleri merkezi MUI tema mimarisinden yönetilir (`src/utils/theme/DarkThemeColors.tsx`, `LightThemeColors.tsx`, `Typography.tsx`, `Components.tsx`, `Theme.tsx`, `src/app/hooks/useThemeSettings.tsx`).
- `src/app/theme/ThemeRegistery.tsx` içinde Next.js App Router uyumlu `NextAppDirEmotionCacheProvider` (`src/utils/theme/EmotionCache.tsx`) yapısı korunur; SSR hidrasyonunu bozacak şekilde düz `createEmotionCache()` kullanımına dönülmez.
- MUI v9'da `Stack` üzerinde `alignItems`/`justifyContent` doğrudan prop değil `sx` içinde tanımlanır.
- Paylaşılan UI bileşenleri yeniden yazılmaz, doğrudan kullanılır:
  - Modallar: `src/app/components/shared/AppModal/AppModal.tsx`
  - Bildirimler (Snackbar/Alert): `src/app/components/shared/Alert/CustomAlert.tsx`
  - Linkler: `@mui/material/Link` (`Theme.tsx` içinde `LinkBehavior` varsayılan bağlıdır)

## Klasör & Özellik (Feature-Based) Mimarisi
- `src/app/` yalnızca Next.js App Router route girişlerini (`page.tsx`, `layout.tsx`), paylaşılan UI bileşenlerini (`src/app/components/shared/`), temel API katmanını (`src/app/api/`) ve tema/hook sağlayıcılarını (`src/app/theme/`, `src/app/hooks/`) barındırır. `page.tsx` dosyaları ince tutulur; form ve iş mantığı özellik bileşenlerinde yer alır.
- Alan bazlı (domain) tüm UI bileşenleri, RTK Query endpoint tanımları, Redux slice'ları ve TypeScript tipleri `src/features/<feature>/` altında (`components/`, `slices/`, `types/`) düzenlenir.
- `src/store/` yalnızca store yapılandırması, `rootReducer.ts`, `authPersistConfig.ts`, `providers.tsx` ve tipli Redux kancalarını (`hooks.ts`, `useTypedHooks.ts`) içerir.
- Çoklu dil dosyaları `src/utils/languages/` altında ve i18n başlatması `src/utils/theme/i18n.ts` üzerinden yönetilir.

## API, State & Hata Yönetimi Kuralları
- Tüm backend istekleri `src/features/apiSlice.ts` (`apiSlice.injectEndpoints`) ve `src/app/api/customBaseQuery.ts` üzerinden RTK Query ile yapılır; bileşen içinden doğrudan `fetch` veya `axios` çağrılmaz.
- Genel API yanıt sözleşmesi için `src/app/api/type.ts` içindeki `ApiResponse<T>` kullanılır.
- Hata yönetimi `customBaseQuery.ts` tarafından üretilen `NormalizedError` (`src/utils/error/errorType.ts`) yapısına dayanır; yeni backend hata kodları `src/utils/error/errorMessages.ts` (`ERROR_CODE_MESSAGES`) içine eklenir.

## Mimari Değişiklik Kuralı
- Mevcut klasör yapısını, MUI tema mimarisini, Redux/persist kurgusunu veya paylaşılan bileşen sözleşmelerini değiştirecek kararlar kendi başına uygulanmaz; önce kullanıcıya öneri sunulup onay alınır.
