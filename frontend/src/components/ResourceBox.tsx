


function ResourceBox({ email }: { email: string }) {
    return (
        <div>
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Resources</h2>
                <div className="flex space-x-4">
                    <a href="get.png" className="text-blue-500 content-center hover:text-blue-700" target="__blank">Get</a>

                    <a href="post.png" className="text-blue-500 content-center hover:text-blue-700" target="__blank">Post</a>

                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => alert(email)}>
                        Contact
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ResourceBox;