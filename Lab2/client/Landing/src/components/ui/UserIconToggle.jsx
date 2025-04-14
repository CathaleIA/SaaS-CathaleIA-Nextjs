
import { FaUserCircle, FaUserClock, FaUserMinus } from "react-icons/fa";



export const dynamic = 'force-dynamic';

function UserIconToggle() {

    return (
        <button
            type="button"
            className={``}
            // onClick={signOutSignIn}
        >
            <FaUserCircle className="h-5 w-5 md:h-6 md:w-6 " />
            {/* {authStatus === "authenticated" ? <FaUserMinus className="h-5 w-5 md:h-6 md:w-6 " /> : authStatus === "unauthenticated" ? <FaUserCircle className="h-5 w-5 md:h-6 md:w-6 " /> : <FaUserClock className="h-5 w-5 md:h-6 md:w-6 " />} */}
        </button>
    );
}
export default UserIconToggle