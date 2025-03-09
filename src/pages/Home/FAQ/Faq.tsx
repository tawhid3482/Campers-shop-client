import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const faqs = [
        { question: "What types of camping gear do you offer?", answer: "We offer tents, sleeping bags, cookware, hiking gear, and more!" },
        { question: "How long does shipping take?", answer: "Standard shipping takes 5-7 business days, while express shipping takes 2-3 days." },
        { question: "Do you offer international shipping?", answer: "Yes! We ship worldwide. Shipping rates vary by location." },
        { question: "What is your return policy?", answer: "You can return any unused product within 30 days for a full refund." },
        { question: "Are your products eco-friendly?", answer: "Yes, we prioritize sustainable and eco-friendly materials in our products." },
    ];

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="p-6 md:p-12  text-white">
            <h2 className="text-3xl font-bold text-center mb-6 text-[#833d47]">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-white text-[#833d47] rounded-lg shadow-md">
                        <button
                            className="w-full flex justify-between items-center p-4 text-lg font-semibold focus:outline-none"
                            onClick={() => toggleFAQ(index)}
                        >
                            {faq.question}
                            {activeIndex === index ? <FaMinus className="text-[#833d47]" /> : <FaPlus className="text-[#833d47]" />}
                        </button>
                        {activeIndex === index && (
                            <div className="p-4 border-t border-gray-300 text-[#833d47]">{faq.answer}</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
