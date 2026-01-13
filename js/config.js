// ============================================
// EasyChat - Global Configuration
// ============================================

const CONFIG = {
    SUPABASE_URL: 'https://fqfdetxvfdgaxbtwrulj.supabase.co',
    SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxZmRldHh2ZmRnYXhidHdydWxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3MTcxNTEsImV4cCI6MjA4MzI5MzE1MX0.foTliw-WXvPhtlhYqA_yXe0TDoU4LWfvxDhOSSMLMHA',
    APP_NAME: 'EasyChat',
    DEFAULT_BOT_NAME: 'עוזר וירטואלי',
    DEMO_MODE: false
};

let supabaseClient = null;

function getSupabase() {
    if (!supabaseClient && window.supabase) {
        supabaseClient = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
    }
    return supabaseClient;
}

function getBusinessId() {
    const urlId = new URLSearchParams(window.location.search).get('business_id');
    return urlId || localStorage.getItem('easychat_business_id') || 'f6dcf952-6e4a-4f74-8de7-ae9818f73fd0';
}

function setBusinessId(id) {
    localStorage.setItem('easychat_business_id', id);
}

function isDemoMode() {
    return getBusinessId() === 'demo' || CONFIG.DEMO_MODE;
}

function formatPhone(phone) {
    if (!phone) return 'לא ידוע';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    if (cleaned.startsWith('972')) return '0' + cleaned.substring(3).replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
    return phone;
}

function getInitials(name) {
    if (!name) return '?';
    const parts = name.split(' ').filter(p => p);
    if (parts.length >= 2) return parts[0][0] + parts[1][0];
    return name.substring(0, 2).toUpperCase();
}

function getTimeAgo(timestamp) {
    const now = new Date();
    const then = new Date(timestamp);
    const diff = Math.floor((now - then) / 1000);
    if (diff < 60) return 'עכשיו';
    if (diff < 3600) return `לפני ${Math.floor(diff / 60)} דקות`;
    if (diff < 86400) return `לפני ${Math.floor(diff / 3600)} שעות`;
    if (diff < 604800) return `לפני ${Math.floor(diff / 86400)} ימים`;
    return then.toLocaleDateString('he-IL');
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('he-IL', { year: 'numeric', month: 'long', day: 'numeric' });
}

function formatTime(date) {
    return new Date(date).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });
}

function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'fixed top-4 left-4 z-50 flex flex-col gap-2';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 
                    type === 'error' ? 'bg-gradient-to-r from-red-500 to-rose-500' : 
                    type === 'warning' ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 
                    'bg-gradient-to-r from-blue-500 to-indigo-500';
    toast.className = `toast ${bgColor} text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-sm`;
    toast.style.animation = 'slideIn 0.3s ease';
    const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : type === 'warning' ? '⚠' : 'ℹ';
    toast.innerHTML = `<span class="text-lg">${icon}</span><span class="font-medium">${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// AI Auto-categorize function
async function autoCategorizeBusiness(rawText) {
    const categories = {
        pricing: { keywords: ['מחיר', 'עלות', 'כמה עולה', 'תעריף', '₪', 'שקל', 'עלות'], items: [] },
        services: { keywords: ['שירות', 'כולל', 'מציעים', 'אפשרויות', 'חבילה', 'מה יש'], items: [] },
        hours: { keywords: ['שעות', 'פתוח', 'סגור', 'זמינים', 'פעילות', 'ימים'], items: [] },
        location: { keywords: ['כתובת', 'מיקום', 'איפה', 'הגעה', 'חניה', 'רחוב'], items: [] },
        terms: { keywords: ['ביטול', 'תנאים', 'מדיניות', 'החזר', 'אחריות'], items: [] },
        faq: { keywords: ['שאלה', 'האם', 'אפשר', 'מותר'], items: [] }
    };
    
    const lines = rawText.split('\n').filter(line => line.trim());
    const result = [];
    
    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.length < 5) continue;
        
        let bestCategory = 'other';
        let bestScore = 0;
        
        for (const [cat, data] of Object.entries(categories)) {
            const score = data.keywords.filter(kw => trimmed.includes(kw)).length;
            if (score > bestScore) {
                bestScore = score;
                bestCategory = cat;
            }
        }
        
        // Generate question from content
        let question = trimmed;
        if (trimmed.includes(':')) {
            question = trimmed.split(':')[0] + '?';
        } else if (bestCategory === 'pricing') {
            question = 'כמה עולה ' + trimmed.substring(0, 30) + '?';
        } else if (bestCategory === 'hours') {
            question = 'מתי אתם פתוחים?';
        } else if (bestCategory === 'location') {
            question = 'איפה אתם נמצאים?';
        }
        
        result.push({
            category: bestCategory,
            question: question.substring(0, 100),
            answer: trimmed,
            keywords: categories[bestCategory]?.keywords.slice(0, 3) || [],
            is_active: true,
            priority: bestCategory === 'pricing' ? 10 : 5
        });
    }
    
    return result;
}

const DEMO_DATA = {
    business: {
        id: 'demo',
        business_name: 'Sea4u',
        owner_name: 'ישראל',
        email: 'demo@easychat.com',
        phone: '050-1234567',
        whatsapp_number: '972501234567',
        bot_name: 'הבוט של Sea4u',
        bot_style: 'friendly',
        status: 'active',
        total_conversations: 156,
        total_answered: 142,
        working_hours: {
            sunday: { active: true, start: '09:00', end: '18:00' },
            monday: { active: true, start: '09:00', end: '18:00' },
            tuesday: { active: true, start: '09:00', end: '18:00' },
            wednesday: { active: true, start: '09:00', end: '18:00' },
            thursday: { active: true, start: '09:00', end: '18:00' },
            friday: { active: true, start: '09:00', end: '14:00' },
            saturday: { active: false, start: '00:00', end: '00:00' }
        }
    },
    knowledge: [
        { id: '1', category: 'pricing', question: 'כמה עולה להשכיר יאכטה?', answer: 'המחירים משתנים לפי גודל היאכטה והמועד:\n\n🚤 יאכטה קטנה (עד 8 אנשים): 3,500-4,500 ₪\n🛥️ יאכטה בינונית (עד 15 אנשים): 5,000-6,500 ₪\n⛵ יאכטה גדולה (עד 25 אנשים): 7,000-9,000 ₪\n\nהמחיר כולל קפטן, דלק, וציוד בטיחות.', keywords: ['מחיר', 'עלות', 'כמה', 'תעריף'], is_active: true, priority: 10 },
        { id: '2', category: 'hours', question: 'מתי אתם פתוחים?', answer: 'אנחנו פעילים:\n\n📅 ימים א-ה: 09:00-18:00\n📅 יום ו: 09:00-14:00\n📅 שבת: סגור', keywords: ['שעות', 'פתוח', 'זמינים', 'מתי'], is_active: true, priority: 5 },
        { id: '3', category: 'services', question: 'מה כולל השייט?', answer: 'כל שייט כולל:\n\n✅ קפטן מקצועי ומנוסה\n✅ דלק לכל המסלול\n✅ ציוד בטיחות מלא\n✅ מערכת סאונד\n✅ אזור ישיבה מוצל', keywords: ['כולל', 'שייט', 'מה יש'], is_active: true, priority: 8 },
        { id: '4', category: 'location', question: 'איפה אתם נמצאים?', answer: '📍 אנחנו נמצאים במרינה הרצליה, רציף 3.\n\nהכתובת: רח\' המרינה 15, הרצליה פיתוח', keywords: ['איפה', 'מיקום', 'כתובת', 'הגעה'], is_active: true, priority: 5 },
        { id: '5', category: 'terms', question: 'מה מדיניות הביטולים?', answer: 'מדיניות ביטולים:\n\n✅ עד 7 ימים לפני - ביטול חינם\n⚠️ 3-7 ימים לפני - 50% מהסכום\n❌ פחות מ-3 ימים - ללא החזר', keywords: ['ביטול', 'לבטל', 'החזר'], is_active: true, priority: 3 }
    ],
    conversations: [
        { id: '1', customer_phone: '052-9876543', customer_name: 'דני כהן', message: 'כמה עולה להשכיר יאכטה ל-10 אנשים?', bot_response: 'המחירים משתנים לפי גודל היאכטה...', response_type: 'answered', ai_confidence: 0.95, timestamp: new Date(Date.now() - 5 * 60000).toISOString(), is_read: false },
        { id: '2', customer_phone: '054-1234567', customer_name: 'שרה לוי', message: 'האם יש לכם יאכטה עם ג\'קוזי?', bot_response: null, response_type: 'no_answer', ai_confidence: 0, timestamp: new Date(Date.now() - 30 * 60000).toISOString(), is_read: false, needs_followup: true },
        { id: '3', customer_phone: '050-5555555', customer_name: 'יוסי אברהם', message: 'מתי אתם פתוחים?', bot_response: 'אנחנו פעילים ימים א-ה...', response_type: 'answered', ai_confidence: 0.98, timestamp: new Date(Date.now() - 2 * 3600000).toISOString(), is_read: true },
        { id: '4', customer_phone: '053-7777777', customer_name: 'רונית דוד', message: 'אפשר לקבוע שיחה?', bot_response: 'מעולה! אשמח לקבוע לך שיחה...', response_type: 'scheduling', ai_confidence: 1.0, timestamp: new Date(Date.now() - 5 * 3600000).toISOString(), is_read: true },
        { id: '5', customer_phone: '058-8888888', customer_name: null, message: 'כמה אנשים אפשר על היאכטה הגדולה?', bot_response: 'היאכטה הגדולה מתאימה לעד 25 אנשים...', response_type: 'answered', ai_confidence: 0.88, timestamp: new Date(Date.now() - 24 * 3600000).toISOString(), is_read: true }
    ],
    appointments: [],
    stats: { total: 156, answered: 142, pending: 8, appointments: 2 }
};

const CATEGORY_LABELS = {
    pricing: '💰 מחירים',
    services: '🛠️ שירותים',
    hours: '🕐 שעות פעילות',
    location: '📍 מיקום',
    terms: '📋 תנאים',
    technical: '⚙️ טכני',
    faq: '❓ שאלות נפוצות',
    other: '📁 אחר'
};

const RESPONSE_TYPE_LABELS = {
    answered: { text: '✓ נענה', class: 'badge-success' },
    no_answer: { text: '⏳ ממתין', class: 'badge-warning' },
    scheduling: { text: '📅 פגישה', class: 'badge-info' },
    out_of_hours: { text: '🌙 מחוץ לשעות', class: 'badge-gray' },
    greeting: { text: '👋 ברכה', class: 'badge-info' },
    error: { text: '❌ שגיאה', class: 'badge-error' }
};

const STATUS_LABELS = {
    pending: { text: 'ממתין', class: 'bg-yellow-100 text-yellow-800' },
    confirmed: { text: 'מאושר', class: 'bg-green-100 text-green-800' },
    cancelled: { text: 'בוטל', class: 'bg-red-100 text-red-800' },
    completed: { text: 'הושלם', class: 'bg-blue-100 text-blue-800' },
    no_show: { text: 'לא הגיע', class: 'bg-gray-100 text-gray-800' }
};
