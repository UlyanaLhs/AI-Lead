import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "en" | "ru";

const STORAGE_KEY = "ai-lead-revival-lang";

const dictionary = {
  nav: {
    howItWorks: { en: "How It Works", ru: "Как это работает" },
    whoItsFor: { en: "Who It's For", ru: "Для кого" },
    pricing: { en: "Pricing", ru: "Цены" },
    faq: { en: "FAQ", ru: "Вопросы" },
    bookCall: { en: "Book a Call", ru: "Записаться" },
  },
  hero: {
    eyebrow: {
      en: "We Reactivate Your Dead Leads via AI SMS — and Turn Them Into Booked Meetings",
      ru: "Реактивируем мёртвые лиды через AI SMS — и превращаем их во встречи",
    },
    headlineStart: { en: "What if your phone started ringing from leads", ru: "Что если ваш телефон начнёт звонить от лидов," },
    headlineAccent: { en: "you gave up on", ru: "на которых вы уже махнули рукой" },
    headlineEnd: { en: "— without hiring anyone or running new ads?", ru: "— без найма людей и без новой рекламы?" },
    subheadline: {
      en: "We deploy an AI SMS agent into your existing lead database. It has human conversations, qualifies prospects, and books meetings directly into your calendar — fully automated. Most clients see booked calls within 72 hours of launch.",
      ru: "Мы запускаем AI SMS агента в вашу существующую базу лидов. Он ведёт живые диалоги, квалифицирует клиентов и записывает встречи прямо в ваш календарь — полностью автоматически. Большинство клиентов видят первые звонки в течение 72 часов после запуска.",
    },
    cta: { en: "Book a Free Strategy Call", ru: "Записаться на бесплатный звонок" },
    trust: {
      en: "No upfront commitment. See results before you pay more.",
      ru: "Без предоплаты на старте. Сначала результат — потом решение.",
    },
    chatAgentName: { en: "AI SMS Agent", ru: "AI SMS агент" },
    chatStatus: { en: "Active and sending", ru: "Активен и отправляет" },
    chatMsg1: {
      en: "Hi Sarah, it's Alex from the clinic. You inquired about treatments a while ago. Are you still looking to achieve your skin goals before summer?",
      ru: "Здравствуйте, Сара, это Алекс из клиники. Вы интересовались процедурами какое-то время назад. Ещё хотите подготовить кожу к лету?",
    },
    chatMsg2: {
      en: "Yes actually, but I've just been so busy with work.",
      ru: "Да, на самом деле, но я была очень занята на работе.",
    },
    chatMsg3: {
      en: "Totally understand! We have a few evening slots open next week. Would you like me to send over a link to grab a time that works for you?",
      ru: "Полностью понимаю! У нас есть несколько вечерних окон на следующей неделе. Прислать ссылку, чтобы выбрать удобное время?",
    },
    chatMsg4: { en: "That would be great, thanks.", ru: "Было бы отлично, спасибо." },
  },
  problem: {
    title: { en: "Sound familiar?", ru: "Узнаёте себя?" },
    p1: {
      en: "You're paying for new leads while old ones sit ignored in your CRM",
      ru: "Вы тратите деньги на новых лидов, пока старые пылятся в CRM",
    },
    p2: {
      en: "Your team doesn't have time to follow up with hundreds of cold leads manually",
      ru: "У команды нет времени вручную дожимать сотни холодных контактов",
    },
    p3: {
      en: "Every month without reactivation is revenue leaking from your business",
      ru: "Каждый месяц без реактивации — это деньги, которые уходят мимо вас",
    },
  },
  how: {
    title: { en: "How It Works", ru: "Как это работает" },
    subtitle: {
      en: "A completely done-for-you system that runs in the background.",
      ru: "Полностью под ключ — система работает за вас в фоне.",
    },
    s1Title: { en: "We audit your lead database", ru: "Аудит базы лидов" },
    s1Desc: {
      en: "We identify leads from the last 30–180 days who enquired but never converted.",
      ru: "Находим лидов за последние 30–180 дней, которые интересовались но не купили.",
    },
    s2Title: { en: "We deploy your AI SMS agent", ru: "Запускаем AI SMS агента" },
    s2Desc: {
      en: "Personalised conversations, one question at a time, from a human name.",
      ru: "Персональные диалоги от имени живого сотрудника, один вопрос за раз.",
    },
    s3Title: { en: "You get booked meetings", ru: "Вы получаете встречи" },
    s3Desc: {
      en: "Qualified leads land in your calendar automatically.",
      ru: "Квалифицированные лиды сами записываются в ваш календарь.",
    },
  },
  who: {
    title: { en: "Who This Is For", ru: "Для кого это" },
    subtitle: {
      en: "Perfect for high-ticket service businesses with a backlog of old leads.",
      ru: "Идеально для сервисного бизнеса с дорогим чеком и базой старых лидов.",
    },
    n1: { en: "Med Spa & Aesthetic Clinics", ru: "Медицинские и эстетические клиники" },
    n2: { en: "Real Estate Agents & Brokers", ru: "Агентства недвижимости" },
    n3: { en: "Dental & Orthodontic Practices", ru: "Стоматологии и ортодонтии" },
    n4: { en: "Fitness Studios & Personal Trainers", ru: "Фитнес-студии и тренеры" },
    n5: { en: "Digital Agencies (white-label)", ru: "Digital-агентства (white-label)" },
    n6: { en: "Online Educators & Course Creators", ru: "Онлайн-школы и эксперты" },
  },
  value: {
    title: { en: "Everything Included", ru: "Что входит в систему" },
    i1: { en: "AI SMS Agent (built for your niche)", ru: "AI SMS агент (настроен под вашу нишу)" },
    i2: { en: "Lead Database Audit + Segmentation", ru: "Аудит и сегментация базы лидов" },
    i3: { en: "Automated Meeting Booking (Calendly)", ru: "Автоматическое бронирование встреч" },
    i4: { en: "CRM Pipeline Setup", ru: "Настройка pipeline в CRM" },
    i5: { en: "14-Day Optimization Sprint", ru: "14 дней оптимизации" },
    i6: { en: "Results Report with ROI tracking", ru: "Отчёт с ROI" },
    totalLabel: { en: "TOTAL VALUE:", ru: "ОБЩАЯ ЦЕННОСТЬ:" },
    youPayLabel: { en: "YOU PAY:", ru: "ВЫ ПЛАТИТЕ:" },
    fromLabel: { en: "from", ru: "от" },
    forPilot: { en: "for pilot", ru: "за пилот" },
  },
  pricing: {
    title: { en: "Simple Pricing", ru: "Прозрачные цены" },
    mostPopular: { en: "MOST POPULAR", ru: "ПОПУЛЯРНЫЙ" },
    pilotName: { en: "PILOT", ru: "ПИЛОТ" },
    pilotDesc: {
      en: "Perfect for testing with your first 200 leads",
      ru: "Идеально для теста на первых 200 лидах",
    },
    pilotF1: { en: "AI SMS agent setup", ru: "Настройка AI SMS агента" },
    pilotF2: { en: "1 lead segment", ru: "1 сегмент лидов" },
    pilotF3: { en: "14 days of conversations", ru: "14 дней диалогов" },
    pilotF4: { en: "Meeting booking automation", ru: "Автозапись встреч" },
    pilotF5: { en: "Results report", ru: "Отчёт с результатами" },
    pilotCta: { en: "Start Pilot", ru: "Начать пилот" },

    fullName: { en: "FULL BUILD", ru: "ПОЛНАЯ СИСТЕМА" },
    fullDesc: {
      en: "Complete reactivation system for your business",
      ru: "Полная система реактивации для вашего бизнеса",
    },
    fullF1: { en: "Everything in Pilot", ru: "Всё из Пилота" },
    fullF2: { en: "Full lead database audit", ru: "Полный аудит базы" },
    fullF3: { en: "3 lead segments", ru: "3 сегмента лидов" },
    fullF4: { en: "CRM pipeline integration", ru: "Интеграция с CRM" },
    fullF5: { en: "30-day optimization", ru: "30 дней оптимизации" },
    fullF6: { en: "Priority support", ru: "Приоритетная поддержка" },
    fullCta: { en: "Get Full System", ru: "Получить систему" },

    retainerName: { en: "RETAINER", ru: "РЕТЕЙНЕР" },
    retainerPrice: { en: "$1,997/mo", ru: "$1,997/мес" },
    retainerDesc: {
      en: "Ongoing reactivation + new lead follow-up",
      ru: "Постоянная реактивация + дожим новых лидов",
    },
    retainerF1: { en: "Everything in Full Build", ru: "Всё из Full Build" },
    retainerF2: { en: "Monthly new campaigns", ru: "Новые кампании каждый месяц" },
    retainerF3: { en: "Weekly performance reports", ru: "Еженедельные отчёты" },
    retainerF4: { en: "Continuous AI optimization", ru: "Постоянная оптимизация" },
    retainerCta: { en: "Book a Call", ru: "Записаться на звонок" },
    pilotSubDesc: {
      en: "One-time investment. Includes all 4 bonuses ($1,388 value).",
      ru: "Разовая инвестиция. Включает все 4 бонуса (ценность $1,388).",
    },
    pilotUrgency: { en: "⚡ 1 spot left this month", ru: "⚡ Осталось 1 место в этом месяце" },
    fullSubDesc: {
      en: "Split payment available: 50% now, 50% after launch. Includes all 4 bonuses ($1,388 value).",
      ru: "Разбивка доступна: 50% сейчас, 50% после запуска. Включает все 4 бонуса (ценность $1,388).",
    },
    fullUrgency: { en: "⚡ 2 spots available this month", ru: "⚡ 2 места доступны в этом месяце" },
    retainerSubDesc: {
      en: "Cancel anytime. No lock-in contracts. First month includes full setup + all 4 bonuses.",
      ru: "Отмена в любой момент. Без контрактов на привязку. Первый месяц включает полную настройку и все 4 бонуса.",
    },
  },
  guarantee: {
    title: { en: "Our 'You Win Either Way' Guarantee", ru: "Наша гарантия «Вы выигрываете в любом случае»" },
    body1: { en: "Here is our commitment to you:", ru: "Вот наше обязательство перед вами:" },
    body2: {
      en: "If your AI SMS agent does not generate at least 10 qualified conversations in the first 30 days — you pay nothing more.",
      ru: "Если ваш AI SMS агент не принесёт минимум 10 квалифицированных диалогов за первые 30 дней — вы не платите ничего сверх.",
    },
    body3: {
      en: "We will either fix it for free until it works, or refund 100% of your payment. No forms. No negotiations. No awkward conversations.",
      ru: "Мы либо исправим всё бесплатно пока не заработает, либо вернём 100% оплаты. Без форм. Без переговоров. Без неловких разговоров.",
    },
    body4: {
      en: "We can make this guarantee because we have done this before and we know it works. The only way you lose is if you do nothing.",
      ru: "Мы можем давать эту гарантию потому что делали это раньше и знаем что это работает. Единственный способ проиграть — это ничего не делать.",
    },
  },
  cases: {
    title: { en: "Early Results", ru: "Первые результаты" },
    c1Business: { en: "Med Spa, London", ru: "Med Spa, Лондон" },
    c1Result: { en: "12 meetings booked", ru: "12 встреч записано" },
    c1Context: {
      en: "from 180 dead leads in 21 days",
      ru: "из 180 мёртвых лидов за 21 день",
    },
    c2Business: {
      en: "Real Estate Agency, Amsterdam",
      ru: "Агентство недвижимости, Амстердам",
    },
    c2Result: { en: "9 qualified calls", ru: "9 квалиф. звонков" },
    c2Context: {
      en: "from leads inactive for 4 months",
      ru: "из базы 4-месячной давности",
    },
  },
  faq: {
    title: { en: "Questions", ru: "Частые вопросы" },
    q1: { en: "Will leads know they're talking to AI?", ru: "Лиды узнают, что общаются с ИИ?" },
    a1: {
      en: "The agent writes as a named team member. We never claim it's human, and if directly asked, the agent hands off to a real person.",
      ru: "Агент пишет от имени сотрудника компании. Мы не выдаём его за человека, а если лид напрямую спросит — передаём живому человеку.",
    },
    q2: { en: "What if I don't have a CRM?", ru: "Что если у меня нет CRM?" },
    a2: {
      en: "No problem. We work with Google Sheets, any CRM, or a plain contact list.",
      ru: "Без проблем. Работаем с Google Sheets, любой CRM или просто списком контактов.",
    },
    q3: { en: "How quickly can we start?", ru: "Как быстро можно начать?" },
    a3: {
      en: "Onboarding takes 48 hours. First messages go out within 3–5 days.",
      ru: "Онбординг занимает 48 часов. Первые сообщения уходят через 3–5 дней.",
    },
    q4: { en: "Is this GDPR compliant?", ru: "Это соответствует требованиям GDPR?" },
    a4: {
      en: "Yes — we only contact leads who previously opted in to receive communications from your business.",
      ru: "Да — мы пишем только тем лидам, которые дали согласие на получение сообщений от вашей компании.",
    },
    q5: { en: "What does SMS cost?", ru: "Сколько стоят сами SMS?" },
    a5: {
      en: "SMS provider costs are separate — typically $50–150/month paid directly by you to Twilio or OpenPhone.",
      ru: "Стоимость SMS-провайдера оплачивается отдельно — обычно $50–150/месяц напрямую через Twilio или OpenPhone.",
    },
    q6: { en: "How long does setup take?", ru: "Сколько времени занимает настройка?" },
    a6: {
      en: "Onboarding takes 48 hours. I need access to your lead database and a 30-minute kickoff call. First messages go out within 3–5 days of payment.",
      ru: "Онбординг занимает 48 часов. Мне нужен доступ к базе лидов и 30-минутный кикофф-звонок. Первые сообщения уходят через 3–5 дней после оплаты.",
    },
    q7: { en: "What if a lead asks to stop receiving messages?", ru: "Что если лид попросит прекратить писать?" },
    a7: {
      en: "The agent handles it automatically. Any stop or unsubscribe reply removes the lead from the campaign immediately and flags them in your CRM.",
      ru: "Агент обрабатывает это автоматически. Любой ответ со словом 'стоп' сразу удаляет лида из кампании и помечает в CRM.",
    },
    q8: { en: "Can you integrate with my existing CRM?", ru: "Можно ли интегрировать с моей текущей CRM?" },
    a8: {
      en: "Yes. I work with GoHighLevel, HubSpot, AmoCRM, Bitrix24, and any CRM with an API or Make/Zapier integration. A spreadsheet works too.",
      ru: "Да. Работаю с GoHighLevel, HubSpot, AmoCRM, Битрикс24 и любой CRM с API или интеграцией через Make/Zapier. Таблица тоже работает.",
    },
  },
  finalCta: {
    title: {
      en: "You already paid for these leads once. Let us turn them into revenue.",
      ru: "Вы уже заплатили за этих лидов однажды. Позвольте нам превратить их в деньги.",
    },
    sub: {
      en: "Fill out the audit form. Takes 5 minutes. Within 24 hours you receive a personalised report showing exactly how many meetings are sitting in your database right now — and what it would cost to get them.",
      ru: "Заполните форму аудита. Занимает 5 минут. В течение 24 часов вы получите персональный отчёт с точным количеством встреч, которые сейчас лежат в вашей базе — и сколько это стоит чтобы их получить.",
    },
    cta: { en: "Book Free Strategy Call", ru: "Записаться на бесплатный разбор" },
    small: {
      en: "No pitch. No pressure. Just numbers.",
      ru: "Без продаж. Без давления. Только цифры.",
    },
    trust1: { en: "No commitment required", ru: "Без обязательств" },
    trust2: { en: "Report within 24 hours", ru: "Отчёт в течение 24 часов" },
    trust3: { en: "100% money-back guarantee", ru: "100% гарантия возврата" },
  },
  calculator: {
    title: { en: "Calculate your recovery potential", ru: "Рассчитайте потенциал реактивации" },
    slider1Label: { en: "Dead leads in your database:", ru: "Мёртвых лидов в базе:" },
    slider2Label: { en: "Average client value: $", ru: "Средний чек клиента: $" },
    recoverableLabel: { en: "Recoverable leads:", ru: "Лидов к возврату:" },
    revenueLabel: { en: "Potential revenue:", ru: "Потенциальный доход:" },
    investmentLine: { en: "Your investment: from $2,997", ru: "Ваши инвестиции: от $2,997" },
    roiLabel: { en: "Estimated ROI:", ru: "Расчётный ROI:" },
    cta: { en: "Get your free audit to see exact numbers →", ru: "Получите бесплатный аудит для точных цифр →" },
    disclaimer: {
      en: "* Based on average 8% reactivation rate. Actual results vary.",
      ru: "* На основе средней конверсии реактивации 8%. Реальные результаты могут отличаться.",
    },
  },
  emailCapture: {
    headline: { en: "Free: AI SMS script for your niche", ru: "Бесплатно: AI SMS скрипт для вашей ниши" },
    subtext: {
      en: "Enter your email — get a ready-to-use SMS conversation template for your business type. Sent instantly.",
      ru: "Введите email — получите готовый шаблон SMS-диалога под ваш тип бизнеса. Отправлю сразу.",
    },
    placeholder: { en: "Your email address", ru: "Ваш email" },
    button: { en: "Send me the template", ru: "Получить шаблон" },
    success: { en: "Check your inbox — template is on its way.", ru: "Проверьте входящие — шаблон уже летит к вам." },
    error: {
      en: "Something went wrong. Email us: revenuesystemai@gmail.com",
      ru: "Что-то пошло не так. Напишите: revenuesystemai@gmail.com",
    },
    validationError: { en: "Please enter a valid email", ru: "Введите корректный email" },
  },
  process: {
    title: { en: "How I work with you", ru: "Как проходит работа" },
    s1Title: { en: "Audit", ru: "Аудит" },
    s1Desc: {
      en: "You fill out the form. I analyse your lead database and send a personalised report within 24 hours.",
      ru: "Вы заполняете форму. Я анализирую базу и присылаю персональный отчёт в течение 24 часов.",
    },
    s2Title: { en: "Proposal + prepayment", ru: "Предложение + предоплата" },
    s2Desc: {
      en: "You receive a 1-page proposal with exact scope and price. Work begins within 48 hours of payment.",
      ru: "Вы получаете одностраничное предложение. Работа начинается в течение 48 часов после оплаты.",
    },
    s3Title: { en: "Build + launch", ru: "Сборка + запуск" },
    s3Desc: {
      en: "I configure your AI SMS agent, test it, and launch the campaign. First replies appear within days.",
      ru: "Настраиваю AI SMS агент, тестирую и запускаю кампанию. Первые ответы появляются в течение нескольких дней.",
    },
    s4Title: { en: "Results + report", ru: "Результаты + отчёт" },
    s4Desc: {
      en: "After 14–30 days you receive a full report: leads reactivated, meetings booked, ROI.",
      ru: "Через 14–30 дней вы получаете полный отчёт: лиды, встречи, ROI.",
    },
  },
  bonuses: {
    title: { en: "Order today and get these bonuses free", ru: "Закажите сегодня и получите эти бонусы бесплатно" },
    subtitle: {
      en: "These are not discounts. The price stays. These bonuses are added on top.",
      ru: "Это не скидки. Цена остаётся. Эти бонусы добавляются сверху.",
    },
    b1Title: { en: "SMS conversation scripts for your niche", ru: "SMS скрипты для вашей ниши" },
    b1Text: {
      en: "Ready-to-use AI prompt templates for your specific business type. Plug in and launch — no writing required.",
      ru: "Готовые AI промпт-шаблоны под ваш тип бизнеса. Подключи и запускай — ничего писать не нужно.",
    },
    b1Value: { en: "Value: $497", ru: "Ценность: $497" },
    b2Title: { en: "Lead database audit template", ru: "Шаблон аудита базы лидов" },
    b2Text: {
      en: "Google Sheets template to segment and score your leads before launch. Identifies which leads are hottest.",
      ru: "Шаблон Google Sheets для сегментации и скоринга лидов перед запуском. Показывает самых горячих.",
    },
    b2Value: { en: "Value: $297", ru: "Ценность: $297" },
    b3Title: { en: "Objection handling playbook", ru: "Плейбук по обработке возражений" },
    b3Text: {
      en: "Word-for-word responses for every reply your leads might send — including stop requests, pricing questions, and skeptics.",
      ru: "Дословные ответы на каждую реакцию лида — включая стоп-запросы, вопросы цены и скептиков.",
    },
    b3Value: { en: "Value: $197", ru: "Ценность: $197" },
    b4Title: { en: "30-day reactivation campaign calendar", ru: "Календарь реактивационной кампании на 30 дней" },
    b4Text: {
      en: "Exact sequence of when to send messages, how many touchpoints, and what to say at each stage of the conversation.",
      ru: "Точная последовательность отправки сообщений, количество касаний и что говорить на каждом этапе.",
    },
    b4Value: { en: "Value: $397", ru: "Ценность: $397" },
    totalLabel: { en: "Total bonus value:", ru: "Общая ценность бонусов:" },
  },
  scarcityBanner: {
    prefix: { en: "We only onboard 3 new clients per month.", ru: "Мы берём не более 3 новых клиентов в месяц." },
    taken: { en: "2 spots taken for May.", ru: "2 места на май уже заняты." },
    remaining: { en: "1 spot remaining —", ru: "Осталось 1 место —" },
    cta: { en: "claim it here →", ru: "занять его →" },
  },
  urgencyTimer: {
    label: {
      en: "⚡ Price increases after this week's spots are filled",
      ru: "⚡ Цена повышается после заполнения мест этой недели",
    },
    days: { en: "days", ru: "дн" },
    hrs: { en: "hrs", ru: "час" },
    min: { en: "min", ru: "мин" },
    sec: { en: "sec", ru: "сек" },
  },
  footer: {
    copyright: {
      en: "© 2025 AI Lead Revival. All rights reserved.",
      ru: "© 2025 AI Lead Revival. Все права защищены.",
    },
  },
} as const;

type Dict = typeof dictionary;
type SectionKey = keyof Dict;
type LeafKey<S extends SectionKey> = keyof Dict[S];

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: <S extends SectionKey, K extends LeafKey<S>>(section: S, key: K) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function getInitialLang(): Lang {
  }
  if (typeof window === "undefined") return "en";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "ru") return saved;
  } catch {
    // ignore
  }
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => getInitialLang());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);

  const t = useCallback(
    <S extends SectionKey, K extends LeafKey<S>>(section: S, key: K): string => {
      const entry = dictionary[section][key] as { en: string; ru: string };
      return entry[lang];
    },
    [lang],
  );

  const value = useMemo<LanguageContextValue>(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang(): LanguageContextValue {
    }
  )
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLang must be used within a LanguageProvider");
  }
  return ctx;
}
