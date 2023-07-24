import { Nav } from "../components/navbar"
import { UserTable } from "../components/userdashboard/userTable"

function UserDashboard() {
    return (
        <>
            <Nav />
            <UserTable />
        </>
    )
}

export { UserDashboard }
