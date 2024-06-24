const translations = {
    en: {
        welcome: "Choose language:\n1. English\n2. Kinyarwanda\n3. French",
        enterCountry: "Enter your country:",
        enterCity: "Enter your city:",
        enterDistrict: "Enter your district:",
        weather: (location, weather, temp) => `Weather in ${location}:\n${weather}, Temp: ${temp}°C`,
        error: "Could not fetch weather for",
        invalidOption: "Invalid option",
    },
    rw: {
        welcome: "Hitamo ururimi:\n1. Icyongereza\n2. Ikinyarwanda\n3. Igifaransa",
        enterCountry: "Injiza igihugu cyawe:",
        enterCity: "Injiza umujyi wawe:",
        enterDistrict: "Injiza akarere kawe:",
        weather: (location, weather, temp) => `Igihe cy’ikirere muri ${location}:\n${weather}, Ubushyuhe: ${temp}°C`,
        error: "Ntibyakunze kubona igihe cy’ikirere cya",
        invalidOption: "Amahitamo adakwiye",
    },
    fr: {
        welcome: "Choisissez la langue:\n1. Anglais\n2. Kinyarwanda\n3. Français",
        enterCountry: "Entrez votre pays:",
        enterCity: "Entrez votre ville:",
        enterDistrict: "Entrez votre district:",
        weather: (location, weather, temp) => `Météo à ${location}:\n${weather}, Temp: ${temp}°C`,
        error: "Impossible d'obtenir la météo pour",
        invalidOption: "Option invalide",
    }
};

module.exports = translations;
