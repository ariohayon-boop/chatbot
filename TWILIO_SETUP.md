# 📱 מדריך הגדרת Twilio WhatsApp API

## 🎯 סקירה כללית

Twilio הוא ספק רשמי של Meta ל-WhatsApp Business API.
**יתרונות:** יציב, חוקי, תמיכה טובה, קל לשימוש.

---

## 📋 שלב 1: יצירת חשבון Twilio

1. לך ל-[twilio.com/try-twilio](https://www.twilio.com/try-twilio)
2. הירשם עם אימייל
3. אמת את הטלפון שלך
4. **תקבל $15 קרדיט חינם לבדיקות**

---

## 🔑 שלב 2: קבלת API Credentials

בדשבורד של Twilio (console.twilio.com) תמצא:

| פרט | איפה למצוא | דוגמה |
|-----|-----------|-------|
| **Account SID** | בדף הבית | `ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| **Auth Token** | בדף הבית (לחץ "Show") | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |

⚠️ **שמור אותם! תצטרך אותם בהמשך.**

---

## 📱 שלב 3: הפעלת WhatsApp Sandbox (לבדיקות)

### 3.1 גישה ל-Sandbox:
1. בתפריט הצד: **Messaging** → **Try it out** → **Send a WhatsApp message**

### 3.2 חיבור הטלפון שלך ל-Sandbox:
1. שלח הודעה מהטלפון שלך למספר: **+1 415 523 8886**
2. עם הטקסט: `join <your-code>` (הקוד יופיע על המסך)
3. תקבל אישור שהתחברת

### 3.3 מספר ה-Sandbox:
```
whatsapp:+14155238886
```
זה המספר שממנו הבוט ישלח הודעות (בשלב הבדיקות)

---

## 🔗 שלב 4: הגדרת Webhook

### 4.1 ב-Twilio Console:
1. **Messaging** → **Try it out** → **Send a WhatsApp message**
2. גלול למטה ל-**Sandbox Configuration**

### 4.2 הגדר את ה-Webhook:
בשדה **"When a message comes in"** הכנס:
```
https://fqfdetxvfdgaxbtwrulj.supabase.co/functions/v1/handle-twilio-webhook
```

| שדה | ערך |
|-----|-----|
| URL | `https://YOUR_PROJECT.supabase.co/functions/v1/handle-twilio-webhook` |
| Method | **HTTP POST** |

3. לחץ **Save**

---

## ⚙️ שלב 5: הגדרת Supabase

### 5.1 הרצת Migration:
ב-Supabase Dashboard → **SQL Editor** → הרץ:
```sql
-- מתוך: supabase/migrations/001_add_twilio_fields.sql

ALTER TABLE businesses 
ADD COLUMN IF NOT EXISTS twilio_phone_number TEXT,
ADD COLUMN IF NOT EXISTS twilio_account_sid TEXT,
ADD COLUMN IF NOT EXISTS twilio_auth_token TEXT;

CREATE INDEX IF NOT EXISTS idx_businesses_twilio_phone 
ON businesses(twilio_phone_number);
```

### 5.2 עדכון עסק עם מספר Twilio:
```sql
UPDATE businesses 
SET twilio_phone_number = '14155238886'  -- מספר ה-Sandbox ללא +
WHERE email = 'demo@chatbot-pro.com';
```

### 5.3 הגדרת Secrets ב-Edge Functions:
ב-Supabase Dashboard → **Settings** → **Edge Functions** → **Secrets**:

| Secret Name | Value |
|-------------|-------|
| `TWILIO_ACCOUNT_SID` | `ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| `TWILIO_AUTH_TOKEN` | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| `CLAUDE_API_KEY` | `sk-ant-xxxxxxxxxxxxx` |

---

## 🚀 שלב 6: פריסת Edge Function

### אפשרות א' - דרך Supabase CLI:
```bash
# התקנה
npm install -g supabase

# התחברות
supabase login

# פריסה
supabase functions deploy handle-twilio-webhook --project-ref fqfdetxvfdgaxbtwrulj
```

### אפשרות ב' - דרך Dashboard:
1. Supabase Dashboard → **Edge Functions**
2. **New Function**
3. העתק את הקוד מ: `supabase/functions/handle-twilio-webhook/index.ts`

---

## 🧪 שלב 7: בדיקה

### בדיקה מהירה:
1. שלח הודעה מהטלפון שלך למספר Sandbox: `+1 415 523 8886`
2. כתוב משהו כמו: "כמה עולה?"
3. אם הכל עובד - תקבל תשובה מהבוט!

### בדיקה דרך cURL:
```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Messages.json" \
  -u "YOUR_ACCOUNT_SID:YOUR_AUTH_TOKEN" \
  -d "To=whatsapp:+972501234567" \
  -d "From=whatsapp:+14155238886" \
  -d "Body=שלום! זו הודעת בדיקה"
```

---

## 🏭 שלב 8: מעבר ל-Production (מספר אמיתי)

### דרישות:
- חשבון Twilio משודרג (לא Trial)
- חשבון Meta Business מאומת
- מספר טלפון ייעודי

### התהליך:
1. **Twilio Console** → **Messaging** → **Senders** → **WhatsApp Senders**
2. לחץ **"Request a new WhatsApp Sender"**
3. מלא את פרטי העסק
4. העלה מסמכים (ח.פ./רישיון עסק)
5. **זמן אישור: 1-5 ימי עסקים**

---

## 💰 תמחור Twilio

| סוג | מחיר (משתנה לפי מדינה) |
|-----|----------------------|
| שיחה שהלקוח פתח | ~$0.005 - $0.08 |
| שיחה שהעסק פתח | ~$0.03 - $0.15 |
| מספר WhatsApp | ~$0 - $1/חודש |

### דוגמה לישראל:
- הודעה נכנסת + תשובה = ~$0.04
- 500 שיחות בחודש = ~$20

---

## 🔍 Troubleshooting

### הודעות לא מגיעות:
1. ✅ בדוק שה-Webhook URL נכון
2. ✅ בדוק שהטלפון שלך מחובר ל-Sandbox
3. ✅ בדוק לוגים ב-Supabase Edge Functions

### שגיאת 401 Unauthorized:
- בדוק שה-Account SID ו-Auth Token נכונים ב-Secrets

### שגיאת 403 Forbidden:
- ודא שהמספר ששולח חיבר את ה-Sandbox (שלח `join <code>`)

### Business not found:
- ודא שה-`twilio_phone_number` בטבלת businesses מכיל את המספר הנכון

---

## 📁 מבנה הקבצים

```
chatbot/
├── supabase/
│   ├── functions/
│   │   └── handle-twilio-webhook/
│   │       └── index.ts          ← Edge Function
│   └── migrations/
│       └── 001_add_twilio_fields.sql  ← DB Migration
├── schema.sql                     ← Schema מקורי
└── TWILIO_SETUP.md               ← המדריך הזה
```

---

## 🔗 קישורים שימושיים

- [Twilio Console](https://console.twilio.com)
- [Twilio WhatsApp Docs](https://www.twilio.com/docs/whatsapp)
- [WhatsApp Pricing](https://www.twilio.com/whatsapp/pricing)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)

---

## ✅ צ'קליסט מהיר

- [ ] נרשמתי ל-Twilio וקיבלתי $15 קרדיט
- [ ] שמרתי Account SID ו-Auth Token
- [ ] חיברתי את הטלפון שלי ל-Sandbox
- [ ] הגדרתי Webhook ב-Twilio
- [ ] הרצתי Migration ב-Supabase
- [ ] הגדרתי Secrets ב-Supabase
- [ ] פרסתי את ה-Edge Function
- [ ] בדקתי עם הודעה אמיתית

---

**בהצלחה! 🚀**
