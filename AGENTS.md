## Auth & RBAC Mimari Kuralları
- `accessToken` yalnızca Redux belleğinde (RAM) tutulur; `authPersistConfig` içinde `blacklist: ['accessToken']` zorunludur, asla `localStorage` veya `sessionStorage`'a yazılmaz.
- `refreshToken` yalnızca Backend tarafından yönetilen HttpOnly Cookie'de saklanır; Frontend JavaScript tarafında erişilmez. Tüm API isteklerinde `credentials: 'include'` kullanılır.
- `store.ts` içinde ikinci bir `persistReducer` sarmalaması yapılmaz; persist yalnızca `rootReducer.ts` içindeki `auth` slice'ına uygulanır.
- Her kullanıcının tek bir `role` değeri vardır. Sayfa erişimleri ve sol menü (Sidebar) hardcode edilmez; `GET /users/me` yanıtından gelen `allowedPages` ve `allowedMenus` üzerinden `usePermission` kancası ile yönetilir.
- `(DashboardPanel)/layout.tsx` F5 sonrası `/auth/refresh` + `/users/me` oturum kurtarmasını ve yetkisiz URL'lerde `/403` yönlendirmesini üstlenir.