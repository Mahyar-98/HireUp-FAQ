"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function FAQ() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [expanded, setExpanded] = useState([]);

    const faqs = [
        { question: 'What is Next.js?', answer: 'Next.js is a React framework for building web applications.' },
        { question: 'How does Tailwind CSS work?', answer: 'Tailwind CSS is a utility-first CSS framework for rapidly building custom designs.' },
        { question: 'What is the purpose of getStaticProps?', answer: 'getStaticProps is used to fetch data at build time in Next.js.' },
    ];

    useEffect(() => {
        const search = searchParams.get('search');
        if (search) {
            setSearchQuery(search);
        }
    }, [searchParams]);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        router.replace(`/faq?search=${query}`, { shallow: true });
    };

    const filteredFAQs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleExpand = (index) => {
        setExpanded(prevExpanded =>
            prevExpanded.includes(index)
                ? prevExpanded.filter(i => i !== index)
                : [...prevExpanded, index]
        );
    };

    const expandAll = () => {
        setExpanded(filteredFAQs.map((_, index) => index));
    };

    const collapseAll = () => {
        setExpanded([]);
    };

    return (
        <div className="min-h-screen w-full flex flex-col p-6 md:px-16 lg:px-32 bg-gray-50 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Frequently Asked Questions</h1>
            <input
                type="text"
                placeholder="Search..."
                className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <div className="flex justify-end gap-4 mb-6">
                <button 
                    onClick={expandAll} 
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Expand All
                </button>
                <button 
                    onClick={collapseAll} 
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                    Collapse All
                </button>
            </div>
            <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4">
                        <button
                            className="w-full text-left text-lg font-semibold text-gray-800 hover:text-blue-500 transition"
                            onClick={() => toggleExpand(index)}
                        >
                            {faq.question}
                        </button>
                        {expanded.includes(index) && (
                            <p className="mt-2 text-gray-600">{faq.answer}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
