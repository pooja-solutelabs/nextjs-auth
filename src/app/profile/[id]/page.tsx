export default function UserProfile ({params}: any) {
    return(
        <div className="h-screen flex flex-col justify-center items-center">
            <h1>Profile</h1>
            <p className="justify-center items-center">Profile page
                <span className="p-1 m-2 rounded bg-orange-500">{params.id}</span>
            </p>
        </div>
    )
}