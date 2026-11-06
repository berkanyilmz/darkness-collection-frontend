"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRefreshMutation, useLazyMeQuery } from '@/features/auth/auth';
import { setCredentials, setUser, logOut } from '@/features/auth/slices/authSlices';
import { usePermission } from '@/hooks/usePermission';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();

    const { token, user } = useSelector((state: RootState) => state.auth);
    const { canAccess } = usePermission();

    const [refresh] = useRefreshMutation();
    const [triggerMe] = useLazyMeQuery();
    const [isCheckingSession, setIsCheckingSession] = useState(true);

    // 1. OTURUM KURTARMA VE /users/me BİLGİLERİNİ ÇEKME
    useEffect(() => {
        let isMounted = true;

        const verifySessionAndFetchProfile = async () => {
            try {
                let currentToken = token;

                // Sayfa yenilendiyse (RAM'de token yoksa) çerezden yeni token al
                if (!currentToken) {
                    const refreshRes = await refresh().unwrap();
                    currentToken = refreshRes.accessToken;
                    dispatch(setCredentials({ accessToken: currentToken }));
                }

                // Token var ama kullanıcı profili/yetkileri yoksa (veya F5 atıldıysa) /users/me çağır
                if (currentToken) {
                    const userProfile = await triggerMe().unwrap();
                    if (isMounted) {
                        dispatch(setUser(userProfile));
                    }
                }
            } catch (error) {
                // Refresh token süresi bitmişse veya çerez yoksa oturumu temizle ve login'e at
                dispatch(logOut());
                router.replace('/login');
                return;
            } finally {
                if (isMounted) {
                    setIsCheckingSession(false);
                }
            }
        };

        verifySessionAndFetchProfile();

        return () => {
            isMounted = false;
        };
    }, []); // Sadece ilk açılışta / F5'te çalışır

    // 2. SAYFA YETKİSİ (URL) KONTROLÜ
    useEffect(() => {
        if (!isCheckingSession && user) {
            if (!canAccess(pathname)) {
                router.replace('/403');
            }
        }
    }, [pathname, isCheckingSession, user, canAccess, router]);

    // Oturum kontrol edilirken ekranın flaşlamasını önle
    if (isCheckingSession) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-gray-950 text-white">
                <p className="animate-pulse text-lg">Oturum doğrulanıyor...</p>
            </div>
        );
    }

    // Yetkisiz bir URL'deyse yönlendirme tamamlanana kadar içeriği gizle
    if (user && !canAccess(pathname)) {
        return null;
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* İleride oluşturacağın Sidebar bileşenini buraya koyabilirsin */}
            <main className="flex-1 p-6">
                {children}
            </main>
        </div>
    );
}