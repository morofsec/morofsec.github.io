document.addEventListener('DOMContentLoaded', () => {
    // 1. הגדרת משתנים לאלמנטים בדף
    const statusDiv = document.getElementById('status');
    const checkBtn = document.getElementById('checkBtn');
    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');

    // פונקציית עזר לעדכון טקסט בצורה מאובטחת
    const updateUI = (element, message, color) => {
        if (element) {
            element.textContent = message;
            element.style.color = color || "";
        }
    };

    // 2. לוגיקה לכפתור בדיקת הסטטוס
    if (checkBtn) {
        checkBtn.addEventListener('click', () => {
            updateUI(statusDiv, "מבצע בדיקת הקשחה (Hardening)...", "#3b82f6");
            
            setTimeout(() => {
                // בדיקה אם ה-CSP קיים במטה-דאטה של הדף
                const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
                if (cspMeta) {
                    updateUI(statusDiv, "נמצאה פוליסת CSP תקינה. האתר מוגן!", "#4ade80");
                } else {
                    updateUI(statusDiv, "שגיאה: לא זוהתה פוליסת אבטחה!", "#f87171");
                }
            }, 1000);
        });
    }

    // 3. לוגיקה לטופס יצירת הקשר
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // מונע את רענון הדף

            // שליפת נתונים בצורה בטוחה
            const name = document.getElementById('userName')?.value || "אורח";
            
            // הצגת הודעת אישור (שימוש ב-textContent למניעת XSS)
            updateUI(formResponse, `תודה ${name}, ההודעה נשלחה בהצלחה (סימולציה).`, "#4ade80");

            // איפוס הטופס לאחר שליחה
            contactForm.reset();
        });
    }

    console.log("Security Script Loaded: Strict Mode Active.");
});