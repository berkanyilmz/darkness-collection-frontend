export const ERROR_CODE_MESSAGES: Record<string, string> = {
    "1001": "Kayıt bulunamadı",
    "1002": "Bu e-posta adresi zaten kayıtlı.",
    "1003": "Bu telefon numarası zaten kayıtlı.",
    "1004": "Doğrulama hatası. Lütfen tekrar deneyin.",
    "1005": "Genel bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
    // İleride backend'den gelen diğer kodları buraya ekleyebilirsiniz
};

export const getErrorMessageByCode = (code?: string, fallback?: string): string => {
    if (code && ERROR_CODE_MESSAGES[code]) {
        return ERROR_CODE_MESSAGES[code];
    }
    return fallback || "Beklenmeyen bir hata oluştu.";
};