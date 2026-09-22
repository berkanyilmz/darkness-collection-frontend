// Yetki Kontrolü Bu Sayfada Yapılacak
'use client';

import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { createContext, useContext, useState, useEffect } from 'react';

type PermissionContextType = {
    allowedPages: string[];
    isLoading: boolean;
}

const PermissionContext = createContext<PermissionContextType | null>(null);

export function PermissionProvider ( { children }: {children: React.ReactNode} ) {
    const router = useRouter();
    const pathName = usePathname();
    const [hasToken, setHasToken] = useState<boolean | null>(false);

    // Token var mı kontrolü
    useEffect(() => {
        const fetchPermissions = async () => {
            const token = sessionStorage.getItem('accessToken');

            if (!token) {
                router.replace("/login");
            } else {
                setHasToken(true);
            }
        }
    }, [router]);

    // Veritabanından izinli sayfaları çekme
}