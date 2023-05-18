import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
    isAllowed: any;
    redirectTo?: string;
    children?: any;
}
        

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    isAllowed,
    redirectTo = "/landing",
    children,
    }) => {
    if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
    }
    
    return children ? children : <Outlet />;
    };