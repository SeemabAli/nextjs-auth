export default function UserProfile({params}: any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
            <h1>Profile</h1>
            <hr />
            <p className="text-8xl">Profile Page 
                <span className="bg-blue-700">{params.id}</span>
            </p>

        </div>
    )
}