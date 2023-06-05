import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HOME_EN from "./locales/en/home.json";
import VIDEO_EN from "./locales/en/video.json";
import SEARCH_EN from "./locales/en/search.json";
import BLOG_EN from "./locales/en/blog.json";
import SETTING_EN from "./locales/en/setting.json";
import CALENDAR_EN from "./locales/en/calendar.json";

import HOME_VI from "./locales/vi/home.json";
import VIDEO_VI from "./locales/vi/video.json";
import SEARCH_VI from "./locales/vi/search.json";
import BLOG_VI from "./locales/vi/blog.json";
import SETTING_VI from "./locales/vi/setting.json";
import CALENDAR_VI from "./locales/vi/calendar.json";

export const locales = {
    en: "English",
    vi: "Tiếng Việt",
};

const resources = {
    en: {
        home: HOME_EN,
        video: VIDEO_EN,
        search: SEARCH_EN,
        blog: BLOG_EN,
        setting: SETTING_EN,
        calendar: CALENDAR_EN,
    },
    vi: {
        home: HOME_VI,
        video: VIDEO_VI,
        search: SEARCH_VI,
        blog: BLOG_VI,
        setting: SETTING_VI,
        calendar: CALENDAR_VI,
    },
};
const defaultNS = "home";
i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en",
        ns: ["home", "video", "search", "blog", "setting", "calendar"],
        defaultNS,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;
