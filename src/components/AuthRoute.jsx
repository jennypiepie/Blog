import { Navigate, useLocation } from "react-router-dom"

const AuthRoute = (props) => {
    const { children } = props
    // 拿到判断是否登录的变量
    const location = useLocation()
    const isLoggedIn = localStorage.hasOwnProperty('cms-token')

    return isLoggedIn ? (
    // 如果是登录用户，则可以访问我们传入的 children 组件
        <>{children}</>
    ) : (
    // 未登录用户重定向到 login 页面
        <Navigate
        replace={true}
        to="/login"
        state={{ from: `${location.pathname}${location.search}` }}
        />
    )
}

export default AuthRoute