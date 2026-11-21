import { getUser } from "@/server/user"
import { redirect } from "next/navigation"

 const  ServerDashboard = async() => {
    //Fetch user data on the server
    const session=await getUser()

    //if on user, redirect to login
   

    if(!session){
        redirect("/login")
    }
  return (
      <div>
            <h1>Server Dashboard</h1>
            <div className="p-4 border rounded-lg">
                <h2 className="text-xl font-bold mb-2">User Information</h2>
                <p><strong>Name:</strong> {session.user?.name || "Not provided"}</p>
                <p><strong>Email:</strong> {session.user?.email}</p>
                <p><strong>ID:</strong> {session.user?.id}</p>
                <p><strong>Email Verified:</strong> {session.user?.emailVerified ? "Yes" : "No"}</p>
                {session.user?.image && (
                    <div className="mt-2">
                        <strong>Profile Image:</strong>
                        <img 
                            src={session.user.image} 
                            alt="Profile" 
                            className="w-16 h-16 rounded-full mt-1"
                        />
                    </div>
                )}
            </div>
            
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <h3 className="font-bold">Server-Side Features:</h3>
                <ul className="list-disc list-inside mt-2">
                    <li>Data fetched on the server (faster initial load)</li>
                    <li>SEO friendly (search engines can see the content)</li>
                    <li>No loading states needed</li>
                    <li>Automatic redirect if not authenticated</li>
                </ul>
            </div>
        </div>
  )
}

export default  ServerDashboard
