// import {useSession, signIn, signOut} from "next-auth/react"
// import Nav from "@/components/Nav";
// import {useState} from "react";
// import Logo from "@/components/Logo";
//
// export default function Layout({children}) {
//     const [showNav, setShowNav] = useState(false);
//     const {data: session} = useSession();
//     if (!session) {
//         return (
//             <div className="bg-bgGray w-screen h-screen flex items-center">
//                 <div className="text-center w-full">
//                     <button onClick={() => signIn('google')} className="bg-white p-2 px-4 rounded-lg">Login with
//                         Google
//                     </button>
//                 </div>
//             </div>
//         );
//     }
//
//     return (
//         <div className="bg-bgGray min-h-screen ">
//             <div className="block md:hidden flex items-center p-4">
//                 <button onClick={() => setShowNav(true)} className="bg-white p-2 rounded-lg">
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//                         <path fillRule="evenodd"
//                               d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
//                               clipRule="evenodd"/>
//                     </svg>
//                 </button>
//                 <div className="flex grow justify-center mr-6">
//                     <Logo/>
//                 </div>
//             </div>
//             <div className="flex">
//                 <Nav show={showNav}/>
//                 <div className="flex-grow p-4">
//                     {children}
//                 </div>
//             </div>
//         </div>
//     );
// }

import {useSession, signIn} from "next-auth/react";
import Nav from "@/components/Nav";
import {useState} from "react";
import Logo from "@/components/Logo";
import Swal from "sweetalert2";
import Link from "next/link";

export default function Layout({children}) {
    const [showNav, setShowNav] = useState(false);
    const {data: session} = useSession();

    const handleLogin = (e) => {
        e.preventDefault();
        // Check for user authentication logic here
        Swal.fire({
            icon: "error",
            title: "User not found",
            text: "Please check your email and password",
        });
    };

    if (!session) {
        return (
            <div className="bg-bgGray w-screen h-screen flex items-center">
                <div className="text-center w-full max-w-xs mx-auto">
                    <div className="flex justify-center mb-4">
                        <Logo/>
                    </div>
                    <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleLogin}>
                        <div className="mb-4">
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-3 py-2 rounded-sm border border-gray-300"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full px-3 py-2 rounded-sm border border-gray-300"
                            />
                        </div>
                        <button type="submit" className="btn-primary w-full mb-2">
                            Login
                        </button>
                        <button
                            type="button"
                            onClick={() => signIn("google")}
                            className="btn-primary w-full"
                        >
                            Login with Google
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-bgGray min-h-screen">
            <div className="block md:hidden flex items-center p-4">
                <button onClick={() => setShowNav(true)} className="bg-white p-2 rounded-lg">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                <div className="flex grow justify-center mr-6">
                    <Link href={"/"} className="flex gap-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
            <div className="flex">
                <Nav show={showNav}/>
                <div className="flex-grow p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
