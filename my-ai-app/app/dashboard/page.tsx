"use client"
import { authClient } from "@/lib/auth-client"


const  ClientDashboard=()=>{
    const {
        data:session,
        isPending,//loading state
        error,//error object
        refetch //refetch the sess
        
    }=authClient.useSession()


    //show laoding state
    if(isPending){
        return <div>Loading...</div>
    }

    //show error state
    if(error){
        return <div>Error:{error.message}</div>
    }

    //check if user is logged in

    if(!session){
        return <div>Not logged in</div>
    }


    return(
        <div>
        <h1>Client Dashboard</h1>
          <div className="p-4 border rounded-lg">
             <h2 className="text-xl font-bold mb-2">User Information</h2>

             <p><strong>Name:</strong>{session.user?.name || "Not Provied"}</p>
             <p><strong>Email:</strong>{session.user?.email}</p>
             <p><strong>Email Verified:</strong>{session.user?.emailVerified?"Yes":"No"}</p>
             {session.user?.image &&(
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

          <div className="mt-4 p-4 bg-rose-100 rounded-lg">
                <h3 className="font-bold">Client-Side Features:</h3>
                <ul className="list-disc list-inside mt-2">
                    <li>Real-time updates and interactions</li>
                    <li>Loading states and error handling</li>
                    <li>Interactive buttons and forms</li>
                    <li>Better user experience with immediate feedback</li>
                </ul>
            </div>


             <div className="mt-4 space-x-2">
                <button 
                    onClick={() => refetch()}
                    className="px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600"
                >
                    Refresh Session
                </button>
                <button 
                    onClick={() => authClient.signOut()}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Sign Out
                </button>
            </div>
          </div>
    )
}

export default ClientDashboard