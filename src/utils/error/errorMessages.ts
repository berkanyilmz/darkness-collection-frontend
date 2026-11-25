export const ERROR_CODE_MESSAGES: Record<string, string> = {
    "1001": "Kayıt bulunamadı",
    "1002": "Bu e-posta adresi zaten kayıtlı.",
    "1003": "Bu telefon numarası zaten kayıtlı.",
    "1004": "Doğrulama hatası. Lütfen tekrar deneyin.",
    "1005": "Doğrulama kodu hatalı. Lütfen tekrar deneyin.",
    "1006": "Doğrulama kodunun süresi doldu. Yeni kod isteyin.",
    "1007": "Yeni kod istemeden önce 60 saniye beklemelisiniz.",
    "1008": "Günlük doğrulama kodu gönderim limitine ulaştınız.",
    "1009": "Bu doğrulama zaten tamamlanmış.",
    "1010": "Çok fazla hatalı deneme yaptınız. Lütfen yeni kod isteyin.",
    "9999": "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.",
    // İleride backend'den gelen diğer kodları buraya ekleyebilirsiniz
};

export const getErrorMessageByCode = (code?: string, fallback?: string): string => {
    if (code && ERROR_CODE_MESSAGES[code]) {
        return ERROR_CODE_MESSAGES[code];
    }
    return fallback || "Beklenmeyen bir hata oluştu.";
};