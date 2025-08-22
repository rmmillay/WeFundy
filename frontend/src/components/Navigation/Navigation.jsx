import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
// import CreateModal from "../
import FundCreate from "../FundraiserCUD";
import OpenModalButton from "../OpenModalButton";
import "./Navigation.css";



function Navigation() {
  const user = useSelector((store) => store.session.user);

  if(user){

  return (
    <div className="navbar">

      <div className="login-button">
        <ul>      
          <li>
            <ProfileButton />
          </li> 
          <li>
            <NavLink to="/">Fundraisers</NavLink>
          </li>
        </ul>
      </div>

      <div>
        <NavLink to="/createFund"><button className="fundCreate-button">Create A Fundraiser!</button></NavLink>
      </div>

      <div className="fund-create">
        <OpenModalButton
          buttonText="Create Fundraiser"
          modalComponent={< FundCreate />}
        />
      </div>
    </div>

  );
}
}

export default Navigation;
