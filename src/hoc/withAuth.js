import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

const withAuth = (WrappedComponents) => {
    return (props) => {
        const {user, loading} = useAuth();
        const router = useRouter();


        useEffect(() => {
            if (!user && !loading) {
                router.push('/signUp')
            }
        }, [user, loading, router]);
        return user ? <WrappedComponents {...props} /> : null

    }
}

export default  withAuth;   