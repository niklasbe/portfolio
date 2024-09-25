
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
            <h1 className="text-4xl font-bold text-gray-50 mb-8 border-b border-gray-600 pb-4">Portfolio</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-2">
                    <p className="text-xl font-semibold text-gray-50">{props.name}</p>
                    <p className="text-gray-50">{props.degree}</p>
                    <p className="text-gray-50">{props.email}</p>
                </div>
                <div className="bg-zinc-800 p-4 rounded-md">
                    <h2 className="text-2xl font-semibold text-gray-50 mb-2">Points</h2>
                    <p className="text-gray-50">{props.points}</p>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-gray-50 mb-4">Experience</h2>
                <div className="space-y-4">
                    {props.experiences.map((experience, index) => (
                        <div key={index} className="bg-zinc-800 p-4 rounded-md">
                            <p className="text-lg font-medium text-gray-50">{experience.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


export default Header;