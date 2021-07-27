import { useEffect } from "react";
import UserService from "../services/UserService";

const Akash = () => {


    useEffect(() => {

        UserService.doLogout();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            Hello akash
        </div>
    );
}

export default Akash
