# 🤖 ChatBot Pro

<div align="center">

![ChatBot Pro Logo](https://img.shields.io/badge/ChatBot-Pro-00D4AA?style=for-the-badge&logo=whatsapp&logoColor=white)

**מערכת בוט וואטסאפ חכם עם AI לעסקים**

[🚀 התחלה מהירה](#-התחלה-מהירה) •
[📖 תיעוד](#-תיעוד) •
[🔧 Twilio Setup](TWILIO_SETUP.md)

</div>

---

## 📋 תוכן עניינים

- [מה זה ChatBot Pro?](#-מה-זה-chatbot-pro)
- [פיצ'רים](#-פיצרים)
- [ארכיטקטורה](#-ארכיטקטורה)
- [סטאק טכנולוגי](#-סטאק-טכנולוגי)
- [מבנה הפרויקט](#-מבנה-הפרויקט)
- [התחלה מהירה](#-התחלה-מהירה)

---

## 🎯 מה זה ChatBot Pro?

ChatBot Pro היא פלטפורמה מתקדמת שמאפשרת לבעלי עסקים ליצור בוט וואטסאפ חכם שעונה אוטומטית לשאלות לקוחות.

### הבעיה שאנחנו פותרים:
- 📞 בעלי עסקים מבזבזים שעות על מענה לשאלות חוזרות
- ⏰ לקוחות לא מקבלים מענה מחוץ לשעות פעילות
- 📊 אין מעקב אחרי שיחות והזדמנויות עסקיות

### הפתרון:
- 🤖 בוט AI חכם שעונה 24/7
- 📚 מאגר מידע מותאם אישית לכל עסק
- 📈 דשבורד לניתוח שיחות ושיפור ביצועים

---

## ✨ פיצ'רים

### 🤖 בוט AI חכם
- מבוסס Claude AI של Anthropic
- לומד ממאגר המידע של העסק
- מזהה מתי אין תשובה ומעביר לבעל העסק

### 💬 ניהול שיחות
- היסטוריית שיחות מלאה
- סינון לפי סטטוס (נענה/לא נענה)
- חיפוש בתוך שיחות

### 📚 מאגר מידע
- שאלות ותשובות לפי קטגוריות
- מילות מפתח לחיפוש חכם
- עדיפות בין תשובות

### 📅 קביעת פגישות
- אינטגרציה עם Google Calendar
- תזכורות אוטומטיות
- ניהול זמינות

### 📊 דשבורד מתקדם
- סטטיסטיקות בזמן אמת
- גרפים ודוחות
- התראות על שאלות ללא מענה

---

## 🏗️ ארכיטקטורה

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│    WhatsApp     │────▶│   Twilio API    │────▶│   Edge Function │
│    (לקוחות)     │     │    (Webhook)    │     │(handle-twilio)  │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └────────┬────────┘
                                                         │
                        ┌────────────────────────────────┼────────────────────────────────┐
                        │                                │                                │
                        ▼                                ▼                                ▼
               ┌─────────────────┐             ┌─────────────────┐             ┌─────────────────┐
               │                 │             │                 │             │                 │
               │   Supabase DB   │             │   Claude API    │             │ Google Calendar │
               │   (PostgreSQL)  │             │      (AI)       │             │   (פגישות)      │
               │                 │             │                 │             │                 │
               └─────────────────┘             └─────────────────┘             └─────────────────┘
                        │
                        │
                        ▼
               ┌─────────────────┐
               │                 │
               │    Dashboard    │
               │   (Frontend)    │
               │                 │
               └─────────────────┘
```

---

## 🛠️ סטאק טכנולוגי

| שכבה | טכנולוגיה |
|------|-----------|
| **Frontend** | HTML5, Tailwind CSS, Vanilla JS, Vite (React) |
| **Backend** | Supabase Edge Functions (Deno) |
| **Database** | PostgreSQL (Supabase) |
| **AI** | Claude API (Anthropic) |
| **WhatsApp** | Twilio WhatsApp Business API |
| **Calendar** | Google Calendar API |
| **Animations** | GSAP |
| **Icons** | Lucide Icons |
| **Hosting** | Vercel |

---

## 📂 מבנה הפרויקט

```
chatbot/
├── 📁 easychat/               # React App (Vite)
│   ├── src/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── 📁 supabase/
│   ├── 📁 functions/
│   │   └── 📁 handle-twilio-webhook/
│   │       └── index.ts       # Twilio Webhook Handler
│   └── 📁 migrations/
│       └── 001_add_twilio_fields.sql
│
├── 📁 js/
│   └── config.js              # Frontend configuration
│
├── schema.sql                  # Main database schema
├── TWILIO_SETUP.md            # 📱 מדריך הגדרת Twilio
├── README.md
├── vercel.json
│
├── appointments.html
├── blog.html
├── conversations.html
├── crm.html
├── knowledge.html
└── settings.html
```

---

## 🚀 התחלה מהירה

### 1️⃣ הקמת Database (Supabase)

1. צור פרויקט חדש ב-[Supabase](https://supabase.com)
2. העתק את תוכן `schema.sql` ל-SQL Editor והרץ
3. העתק את תוכן `supabase/migrations/001_add_twilio_fields.sql` והרץ

### 2️⃣ הגדרת Twilio (WhatsApp)

📖 **[מדריך מלא - TWILIO_SETUP.md](TWILIO_SETUP.md)**

בקצרה:
1. הירשם ל-[Twilio](https://www.twilio.com/try-twilio) (תקבל $15 חינם)
2. שמור את Account SID ו-Auth Token
3. חבר את הטלפון שלך ל-WhatsApp Sandbox
4. הגדר Webhook לכתובת ה-Edge Function

### 3️⃣ הגדרת משתני סביבה

ב-Supabase Dashboard → Settings → Edge Functions → Secrets:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
CLAUDE_API_KEY=your_anthropic_api_key
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 4️⃣ Deploy Edge Function

```bash
# התקנת Supabase CLI
npm install -g supabase

# התחברות
supabase login

# פריסה
supabase functions deploy handle-twilio-webhook --project-ref YOUR_PROJECT_REF
```

### 5️⃣ הגדרת Webhook ב-Twilio

ב-Twilio Console → Messaging → WhatsApp Sandbox:
```
https://YOUR_PROJECT.supabase.co/functions/v1/handle-twilio-webhook
```

### 6️⃣ עדכון Database

```sql
-- הוסף מספר Twilio לעסק
UPDATE businesses 
SET twilio_phone_number = '14155238886'  -- מספר Sandbox
WHERE email = 'your@email.com';
```

### 7️⃣ בדיקה

שלח הודעה מהטלפון שלך למספר Sandbox: `+1 415 523 8886`

---

## 📖 תיעוד API

### Edge Function: `handle-twilio-webhook`

**Webhook Payload (מ-Twilio):**
```
From=whatsapp:+972501234567
To=whatsapp:+14155238886
Body=כמה עולה?
ProfileName=שם הלקוח
```

**Response:** TwiML (XML)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response></Response>
```

### Database Tables

| טבלה | תיאור |
|------|-------|
| `businesses` | פרטי עסקים והגדרות + Twilio credentials |
| `knowledge_base` | שאלות ותשובות |
| `conversations` | היסטוריית שיחות |
| `appointments` | פגישות |
| `notifications` | התראות |

---

## 🔒 אבטחה

- ✅ Row Level Security (RLS) על כל הטבלאות
- ✅ API Keys מאוחסנים ב-Secrets
- ✅ HTTPS בכל התקשורת
- ✅ Input validation בכל הפונקציות
- ✅ Twilio Webhook Signature Verification (אופציונלי)

---

## 📈 שלבים הבאים

- [ ] הוספת Authentication (Supabase Auth)
- [ ] מעבר ל-Twilio Production (מספר אמיתי)
- [ ] תמיכה בהודעות קוליות
- [ ] תמיכה בתמונות
- [ ] דוחות PDF
- [ ] אפליקציית מובייל

---

## 🤝 תרומה

נשמח לתרומות! אנא פתח Issue או Pull Request.

---

## 📄 רישיון

MIT License

---

<div align="center">

**נבנה עם ❤️ על ידי [Ariel](https://github.com/ariohayon-boop)**

</div>
