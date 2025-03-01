import { useEffect } from "react";

// Notification Sound (Bell Chime)
const bellSound = new Audio("https://www.fesliyanstudios.com/play-mp3/4384");

const Popup = ({ message, onClose, type = "success" }) => {
    useEffect(() => {
        // Play bell sound when popup appears
        bellSound.play().catch((err) => console.error("Audio playback error:", err));

        // Close on Escape key
        const closeOnEscape = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", closeOnEscape);

        // Auto-close after 3 seconds
        const timer = setTimeout(() => onClose(), 3000);

        return () => {
            document.removeEventListener("keydown", closeOnEscape);
            clearTimeout(timer);
        };
    }, [onClose]);

    // Define icon and color based on type
    const icons = {
        success: "✅",
        error: "❌",
        warning: "⚠️",
    };
    const colors = {
        success: "bg-green-500",
        error: "bg-red-500",
        warning: "bg-yellow-500",
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30" onClick={onClose}>
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-96" onClick={(e) => e.stopPropagation()}>
                <button className="absolute top-2 right-2 text-gray-600 hover:text-black" onClick={onClose}>✖</button>
                <div className="flex items-center space-x-3">
                    <span className={`${colors[type]} text-white p-2 rounded-full text-2xl`}>
                        {icons[type]}
                    </span>
                    <h2 className="text-lg font-semibold">{message}</h2>
                </div>
            </div>
        </div>
    );
};

export default Popup;
