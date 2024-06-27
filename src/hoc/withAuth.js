import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

const withAuth = (WrappedComponents) => {
    return (props) => {
        const {user} = useAuth();
        const router = useRouter();


        useEffect(() => {
            if (!user) {
                router.push('/signUp')
            }
        }, [user, router]);
        return <WrappedComponents {...props} />

    }
}

export default  withAuth;   