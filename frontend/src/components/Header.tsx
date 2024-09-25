
import React, { useState } from 'react';


function ContactForm() {
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission here
        const data = { name, comment };
        alert(JSON.stringify(data, null, 2));
        // Reset form fields
        setName('');
        setComment('');
    };

    return (
        <div className="p-4 rounded-md">
            <h2 className="text-2xl font-semibold text-gray-50 mb-4">Leave a Comment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-50 mb-1">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-700 text-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-50 mb-1">Comment</label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-700 text-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-gray-50 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

function ExperienceList({ experiences }: { experiences: { title: string }[] }) {
    if (experiences.length === 0) {
        return <p className="text-gray-50">No experience found</p>;
    }
    return (
        <>
            {experiences.map((experience, index) => (
                <div key={index} className="bg-zinc-800 p-3 rounded-md">
                    <p className="text-sm font-medium text-gray-50">{experience.title}</p>
                </div>
            ))}
        </>
    )
}

function Experience({ experiences }: { experiences: { title: string }[] }) {
    return (
        <div className="p-4 rounded-md">
            <h2 className="text-2xl font-semibold text-gray-50 mb-4">Experience</h2>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
                <ExperienceList experiences={experiences} />
            </div>
        </div>
    )
}


type HeaderProps = {
    name: string;
    degree: string;
    points: number;
    email: string;
    experiences: { title: string }[];
};

function Header(props: HeaderProps) {
    return (
        <div className="container mx-auto px-4 py-12 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-gray-50 mb-8 border-b border-zinc-800 pb-4">Portfolio</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-1 space-y-2 p-4">
                    <p className="text-xl font-semibold text-gray-50">{props.name}</p>
                    <p className="text-gray-50">{props.degree}</p>
                    <p className="text-gray-50">{props.email}</p>
                    <p className="text-gray-50">{props.points} points</p>

                </div>

                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Experience experiences={props.experiences} />
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}


export default Header;