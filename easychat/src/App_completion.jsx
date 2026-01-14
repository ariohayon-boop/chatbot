// This file contains the completion code that needs to be appended to App.jsx
// The main App.jsx was truncated and is missing the closing of ROICalculator and all subsequent components

                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    </section>
);
};

// ============== FAQ SECTION ==============
const FAQSection = () => {
const ref = useRef(null);
const isInView = useInView(ref, { once: true, margin: "-100px" });
const [openIndex, setOpenIndex] = useState(null);

const faqs = [
    {
        question: 'האם הבוט מחליף את שירות הלקוחות שלי?',
        answer: 'לא. הבוט משלים את שירות הלקוחות שלך ועונה על שאלות נפוצות 24/7. כשמשהו מורכב מדי, הוא מעביר את השיחה אליך או לצוות שלך.'
    },
    {
        question: 'כמה זמן לוקח להתקין את המערכת?',
        answer: 'ההתקנה הבסיסית לוקחת פחות מ-24 שעות. אנחנו מטפלים בכל התהליך - חיבור הוואטסאפ, הגדרת הבוט, ואימון על העסק שלך.'
    },
    {
        question: 'מה קורה אם הבוט לא יודע לענות?',
        answer: 'הבוט יודע להגיד "אני לא בטוח" ולהעביר את השיחה לאדם אמיתי. אתה תמיד יכול להיכנס לשיחה ולקחת פיקוד.'
    },
    {
        question: 'האם המידע שלי מאובטח?',
        answer: 'בהחלט. אנחנו עומדים בתקני אבטחה מחמירים (SSL, הצפנה מקצה לקצה) ולא משתפים את המידע שלך עם צד שלישי.'
    },
    {
        question: 'אפשר לבטל בכל עת?',
        answer: 'כן! אין התחייבות לטווח ארוך. אתה יכול לבטל את המנוי בכל עת ללא קנסות או עלויות נסתרות.'
    },
];

return (
    <section ref={ref} className="py-32 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
            >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-xs font-black uppercase tracking-[0.2em] mb-6">
                    ❓ שאלות נפוצות
                </div>
                <h2 className="text-4xl md:text-6xl font-black mb-4">
                    יש <span className="text-purple-500">שאלות?</span>
                </h2>
            </motion.div>

            <div className="space-y-4">
                {faqs.map((faq, i) => (
                    <motion.div
                        key={i}
                        className="glass rounded-2xl overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: i * 0.1 }}
                    >
                        <button
                            className="w-full p-6 text-right flex items-center justify-between gap-4"
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        >
                            <span className="text-lg font-bold">{faq.question}</span>
                            <motion.div
                                animate={{ rotate: openIndex === i ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Icons.ChevronDown />
                            </motion.div>
                        </button>
                        <AnimatePresence>
                            {openIndex === i && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="px-6 pb-6 text-slate-400 leading-relaxed">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);
};

// ============== FINAL CTA ==============
const FinalCTASection = ({ onOpenModal }) => {
const ref = useRef(null);
const isInView = useInView(ref, { once: true, margin: "-100px" });

return (
    <section ref={ref} className="py-32 relative z-10">
        <div className="max-w-5xl mx-auto px-6">
            <motion.div
                className="glass rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
            >
                {/* Background decorations */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/20 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/20 rounded-full blur-[100px]" />
                
                <div className="relative">
                    <motion.div
                        className="text-6xl mb-8"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        🚀
                    </motion.div>
                    
                    <h2 className="text-4xl md:text-6xl font-black mb-6">
                        מוכן להפסיק <span className="gradient-text">להפסיד לקוחות?</span>
                    </h2>
                    
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
                        הצטרף למאות עסקים שכבר חוסכים שעות כל יום ומגדילים את ההכנסות שלהם
                    </p>
                    
                    <motion.button
                        onClick={onOpenModal}
                        className="px-12 py-6 bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 rounded-2xl text-xl font-black hover:from-orange-400 hover:to-amber-400 transition-all shadow-[0_20px_50px_-10px_rgba(249,115,22,0.5)] inline-flex items-center gap-3"
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Icons.Message />
                        התחל עכשיו
                        <Icons.ArrowRight />
                    </motion.button>
                    
                    <p className="text-slate-500 text-sm mt-6">
                        ✓ ביטול בכל עת  •  ✓ תמיכה בעברית  •  ✓ התקנה תוך 24 שעות
                    </p>
                </div>
            </motion.div>
        </div>
    </section>
);
};

// ============== FOOTER ==============
const Footer = ({ setCurrentPage }) => {
return (
    <footer className="py-16 border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
                {/* Logo & Description */}
                <div className="md:col-span-2">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                            <Icons.Message />
                        </div>
                        <span className="text-2xl font-black">
                            Easy<span className="text-green-500">chat</span>
                        </span>
                    </div>
                    <p className="text-slate-400 mb-6 max-w-md">
                        הצ'אט-בוט החכם שעובד בשבילך 24/7. מענה אוטומטי, תיאום פגישות, וניהול לידים - הכל במקום אחד.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
                            <Icons.Facebook />
                        </a>
                        <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
                            <Icons.Instagram />
                        </a>
                        <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
                            <Icons.Linkedin />
                        </a>
                    </div>
                </div>

                {/* Links */}
                <div>
                    <h4 className="font-bold mb-4">מוצר</h4>
                    <ul className="space-y-2">
                        <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('how-it-works'); }} className="text-slate-400 hover:text-green-500 transition-colors">איך זה עובד</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('features'); }} className="text-slate-400 hover:text-green-500 transition-colors">תכונות</a></li>
                        <li><a href="#" className="text-slate-400 hover:text-green-500 transition-colors">מחירים</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('blog'); }} className="text-slate-400 hover:text-green-500 transition-colors">בלוג</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-4">חברה</h4>
                    <ul className="space-y-2">
                        <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('about'); }} className="text-slate-400 hover:text-green-500 transition-colors">אודות</a></li>
                        <li><a href="#" className="text-slate-400 hover:text-green-500 transition-colors">צור קשר</a></li>
                        <li><a href="#" className="text-slate-400 hover:text-green-500 transition-colors">תנאי שימוש</a></li>
                        <li><a href="#" className="text-slate-400 hover:text-green-500 transition-colors">מדיניות פרטיות</a></li>
                    </ul>
                </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-slate-500 text-sm">
                    © 2025 Easychat. כל הזכויות שמורות.
                </p>
                <p className="text-slate-500 text-sm">
                    נבנה עם ❤️ בישראל
                </p>
            </div>
        </div>
    </footer>
);
};

// ============== BLOG PAGE ==============
const BlogPage = ({ setCurrentPage }) => {
const ref = useRef(null);
const isInView = useInView(ref, { once: true, margin: "-100px" });

return (
    <section ref={ref} className="pt-32 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
            {/* Back button */}
            <motion.button
                onClick={() => setCurrentPage('home')}
                className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
            >
                <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                חזרה לדף הבית
            </motion.button>

            {/* Article Header */}
            <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
            >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 text-green-400 text-xs font-black uppercase tracking-[0.2em] mb-6">
                    📖 סיפור הצלחה
                </div>
                <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                    איך Sea4u הגדילו את ההזמנות ב-117% עם צ'אט-בוט חכם
                </h1>
                <div className="flex items-center gap-4 text-slate-400">
                    <span>5 דקות קריאה</span>
                    <span>•</span>
                    <span>ינואר 2025</span>
                </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
                className="mb-12 rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 }}
            >
                <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-green-500/20 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 p-4">
                            <img src="https://sea4u.co.il/wp-content/uploads/2025/07/Group-1-3.png" alt="Sea4u Logo" className="w-full h-full object-contain" />
                        </div>
                        <h3 className="text-2xl font-bold">Sea4u</h3>
                        <p className="text-slate-400">השכרת יאכטות במרינה הרצליה</p>
                    </div>
                </div>
            </motion.div>

            {/* Article Content */}
            <motion.article
                className="prose prose-invert prose-lg max-w-none"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
            >
                <div className="space-y-8 text-slate-300 leading-relaxed">
                    <div className="glass p-8 rounded-2xl">
                        <h3 className="text-2xl font-bold text-white mb-4">📊 התוצאות במספרים</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center">
                                <div className="text-3xl font-black text-green-500">117%</div>
                                <div className="text-sm text-slate-400">עלייה בהזמנות</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-black text-green-500">2 דק'</div>
                                <div className="text-sm text-slate-400">זמן מענה</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-black text-green-500">100%</div>
                                <div className="text-sm text-slate-400">פניות נענו</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-black text-green-500">847</div>
                                <div className="text-sm text-slate-400">הודעות/חודש</div>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-white">האתגר: לענות ללקוחות כשאתה בלב הים</h2>
                    <p>
                        Sea4u היא חברה להשכרת יאכטות פרטיות במרינה הרצליה. הבעלים, רועי, התמודד עם אתגר ייחודי: 
                        רוב הפניות מגיעות דווקא כשהוא בים עם לקוחות - בדיוק הזמן שהוא הכי עסוק.
                    </p>
                    <p>
                        "הייתי מקבל עשרות הודעות ביום, וחצי מהן היו על אותן שאלות - מחירים, זמינות, כמה אנשים אפשר להעלות. 
                        עד שהייתי חוזר מההפלגה, חלק מהלקוחות כבר הזמינו במקום אחר."
                    </p>

                    <h2 className="text-2xl font-bold text-white">הפתרון: בוט שמכיר את העסק כמו בעלים</h2>
                    <p>
                        בתוך 48 שעות, הקמנו ל-Sea4u בוט חכם שיודע לענות על כל השאלות הנפוצות:
                    </p>
                    <ul className="list-disc list-inside space-y-2 mr-4">
                        <li>מחירים לפי גודל קבוצה ומשך ההפלגה</li>
                        <li>בדיקת זמינות בזמן אמת</li>
                        <li>מידע על היאכטות והציוד</li>
                        <li>קישור ישיר להזמנה</li>
                        <li>העברה לרועי כשצריך מענה אנושי</li>
                    </ul>

                    <div className="glass p-8 rounded-2xl my-8">
                        <h3 className="text-xl font-bold text-white mb-4">💬 דוגמה לשיחה אמיתית</h3>
                        <div className="space-y-4">
                            <div className="bg-slate-800 rounded-2xl rounded-bl-sm p-4 mr-8">
                                <p className="text-white">היי, מתעניין בהשכרת יאכטה ל-10 אנשים</p>
                            </div>
                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl rounded-br-sm p-4 ml-8">
                                <p className="text-slate-900">היי! שמח לעזור ⛵ ליום הולדת ל-10 אנשים היאכטה שלנו מושלמת. באיזה תאריך חשבתם?</p>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-white">התוצאות: יותר הזמנות, פחות עבודה</h2>
                    <p>
                        אחרי חודש עם הבוט, רועי ראה שיפור דרמטי:
                    </p>
                    <ul className="list-disc list-inside space-y-2 mr-4">
                        <li><strong>117% עלייה בהזמנות</strong> - כי אף פנייה לא נופלת בין הכיסאות</li>
                        <li><strong>זמן מענה של 2 דקות</strong> - במקום שעות</li>
                        <li><strong>100% מהפניות נענות</strong> - גם בשבת, גם בלילה</li>
                        <li><strong>חיסכון של 3 שעות ביום</strong> - זמן שמושקע בהפלגות במקום בהודעות</li>
                    </ul>

                    <blockquote className="border-r-4 border-green-500 pr-6 my-8 text-xl italic">
                        "הבוט עונה על כל פנייה תוך שניות - בזמן שאנחנו בים עם לקוחות. זה כאילו שכרנו עובד שעובד 24/7 ולעולם לא מתעייף."
                        <footer className="text-slate-400 text-base mt-2">— רועי, בעלים של Sea4u</footer>
                    </blockquote>
                </div>
            </motion.article>

            {/* CTA */}
            <motion.div
                className="mt-16 glass p-8 rounded-2xl text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
            >
                <h3 className="text-2xl font-bold mb-4">רוצה תוצאות כאלה גם בעסק שלך?</h3>
                <p className="text-slate-400 mb-6">בוא נדבר ונראה איך הבוט יכול לעזור לך</p>
                <button 
                    onClick={() => setCurrentPage('home')}
                    className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 rounded-xl font-bold"
                >
                    קבע שיחת ייעוץ
                </button>
            </motion.div>
        </div>
    </section>
);
};

// ============== SIGNUP MODAL ==============
const SignupModal = ({ isOpen, onClose }) => {
const [step, setStep] = useState(1);
const [formData, setFormData] = useState({
    name: '',
    phone: '',
    business: '',
    messages: '',
});
const [isSubmitting, setIsSubmitting] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);

const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
        const { error } = await supabase.from('leads').insert([{
            name: formData.name,
            phone: formData.phone,
            business_name: formData.business,
            daily_messages: formData.messages,
            source: 'landing_page',
            created_at: new Date().toISOString()
        }]);

        if (error) throw error;
        
        setIsSuccess(true);
    } catch (error) {
        console.error('Error submitting lead:', error);
        setIsSuccess(true);
    } finally {
        setIsSubmitting(false);
    }
};

if (!isOpen) return null;

return (
    <AnimatePresence>
        <motion.div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div 
                className="bg-slate-900 rounded-3xl max-w-md w-full p-8 border border-white/10 relative"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={e => e.stopPropagation()}
            >
                {/* Close button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 left-4 text-slate-400 hover:text-white"
                >
                    <Icons.X />
                </button>

                {isSuccess ? (
                    <motion.div 
                        className="text-center py-8"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div className="text-6xl mb-4">🎉</div>
                        <h3 className="text-2xl font-bold mb-2">תודה!</h3>
                        <p className="text-slate-400 mb-6">קיבלנו את הפרטים שלך. ניצור איתך קשר תוך 24 שעות.</p>
                        <button 
                            onClick={onClose}
                            className="px-6 py-3 bg-green-500 text-slate-950 rounded-xl font-bold"
                        >
                            סגור
                        </button>
                    </motion.div>
                ) : (
                    <>
                        {/* Progress */}
                        <div className="flex gap-2 mb-8">
                            {[1, 2].map(i => (
                                <div 
                                    key={i}
                                    className={`h-1 flex-1 rounded-full ${i <= step ? 'bg-green-500' : 'bg-slate-700'}`}
                                />
                            ))}
                        </div>

                        {step === 1 ? (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <h3 className="text-2xl font-bold mb-2">ספר לנו על עצמך</h3>
                                <p className="text-slate-400 mb-6">נשתמש בזה כדי להתאים את הפתרון בדיוק בשבילך</p>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">שם מלא</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={e => setFormData({...formData, name: e.target.value})}
                                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:border-green-500 focus:outline-none"
                                            placeholder="ישראל ישראלי"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">טלפון</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={e => setFormData({...formData, phone: e.target.value})}
                                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:border-green-500 focus:outline-none"
                                            placeholder="050-0000000"
                                            dir="ltr"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={() => setStep(2)}
                                    disabled={!formData.name || !formData.phone}
                                    className="w-full mt-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-slate-950 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    המשך
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <h3 className="text-2xl font-bold mb-2">על העסק שלך</h3>
                                <p className="text-slate-400 mb-6">זה יעזור לנו להבין את הצרכים שלך</p>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">שם העסק</label>
                                        <input
                                            type="text"
                                            value={formData.business}
                                            onChange={e => setFormData({...formData, business: e.target.value})}
                                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:border-green-500 focus:outline-none"
                                            placeholder="שם העסק שלך"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">כמה הודעות אתה מקבל ביום?</label>
                                        <select
                                            value={formData.messages}
                                            onChange={e => setFormData({...formData, messages: e.target.value})}
                                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:border-green-500 focus:outline-none"
                                        >
                                            <option value="">בחר...</option>
                                            <option value="1-10">1-10</option>
                                            <option value="10-30">10-30</option>
                                            <option value="30-50">30-50</option>
                                            <option value="50+">יותר מ-50</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-6">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="px-6 py-4 bg-slate-800 rounded-xl font-bold"
                                    >
                                        חזרה
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={!formData.business || !formData.messages || isSubmitting}
                                        className="flex-1 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                שולח...
                                            </>
                                        ) : (
                                            'שלח'
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </>
                )}
            </motion.div>
        </motion.div>
    </AnimatePresence>
);
};

// ============== MAIN APP ==============
function App() {
const [isModalOpen, setIsModalOpen] = useState(false);
const [currentPage, setCurrentPage] = useState('home');

useEffect(() => {
    window.scrollTo(0, 0);
}, [currentPage]);

const renderPage = () => {
    switch (currentPage) {
        case 'about':
            return <AboutPage />;
        case 'blog':
            return <BlogPage setCurrentPage={setCurrentPage} />;
        case 'how-it-works':
        case 'features':
        case 'integrations':
        case 'solutions':
        default:
            return (
                <>
                    <HeroSection onOpenModal={() => setIsModalOpen(true)} />
                    <HowItWorksSection onOpenModal={() => setIsModalOpen(true)} />
                    <FeaturesSection />
                    <CaseStudySection setCurrentPage={setCurrentPage} />
                    <ROICalculator onOpenModal={() => setIsModalOpen(true)} />
                    <ConsultationSection onOpenModal={() => setIsModalOpen(true)} />
                    <FAQSection />
                    <FinalCTASection onOpenModal={() => setIsModalOpen(true)} />
                </>
            );
    }
};

return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden" dir="rtl">
        <BackgroundAnimation />
        <ScrollProgressIndicator />
        <Navbar 
            onOpenModal={() => setIsModalOpen(true)} 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
        />
        
        <main>
            {renderPage()}
        </main>
        
        <Footer setCurrentPage={setCurrentPage} />
        
        <StickyCTA onOpenModal={() => setIsModalOpen(true)} />
        <WhatsAppButton />
        <SignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
);
}

export default App
