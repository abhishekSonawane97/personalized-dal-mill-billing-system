import { useState, useEffect } from "react";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState(localStorage.getItem("selectedLang") || "en");
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Function to add Google Translate script dynamically
        const addGoogleTranslateScript = () => {
            if (!document.querySelector("#google-translate-script")) { // Ensure script is not duplicated
                const script = document.createElement("script");
                script.id = "google-translate-script";
                script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
                script.async = true;
                document.body.appendChild(script);
            } else if (window.google?.translate) {
                window.googleTranslateElementInit();
            }
        };

        // Function to initialize Google Translate
        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: "en", 
                    includedLanguages: "mr,en,hi", 
                    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE, 
                },
                "google_translate_element"
            );
            setIsLoaded(true);
        };

        addGoogleTranslateScript(); // Inject the script

        const checkTranslateDropdown = setInterval(() => {
            const translateDropdown = document.querySelector(".goog-te-gadget");
            if (translateDropdown) {
                clearInterval(checkTranslateDropdown);
                setIsLoaded(true);
                applySavedLanguage();
            }
        }, 1000); // Check every 1 second

        return () => clearInterval(checkTranslateDropdown);
    }, []);

    // Function to apply previously selected language
    const applySavedLanguage = () => {
        const translateDropdown = document.querySelector(".goog-te-combo");
        if (translateDropdown) {
            translateDropdown.value = selectedLang; // Apply saved language
            translateDropdown.dispatchEvent(new Event("change")); // Trigger change
        }
    };

    // Function to change language
    
    
    
    

    return (
        <>
            
        </>
    );
};

export default LanguageSwitcher;
