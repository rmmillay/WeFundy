import { getAllFundraisersThunk } from "../../redux/fundraisers";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Fundraisers.css";
import { useEffect } from "react";

 
function GetAllFundraisers() {
    const dispatch = useDispatch();
    const navigateTo = useNavigate(); 
    // const sessionUser = useSelector((state) => state.session.user);
    const allFundraisers = useSelector(
      (state) => state.fundraisers.allFundraisers);

    useEffect(() => {
        if (allFundraisers.length === 0){
            dispatch(getAllFundraisersThunk());
        }
    }, [dispatch, allFundraisers.length]); 
       
  //  console.log(allFundraisers)
    // useEffect(
    //     function(){ 

    //         if (!sessionUser){
    //             navigateTo('/login')
    //         }
    //     }, [sessionUser, navigateTo]
    // );

    // if (!sessionUser) return null

     return (
    <div className="g-all-wrapper">
    <div className="everything">
        <span className="h1">
            <h1 className="h1-heading">Choose your Fundraiser O_0</h1>
        </span>

      <ul>
        {allFundraisers.map((fundraiser) => (
          <li key={fundraiser.id} className="fundraiser-item" id="no-dot">
             <Link to={`/fundraisers/${fundraiser.id}`}>

              <div className="row-wrapper">
              <div className="row-div1">

              <div className="fundraiser-icons">
              <h1 className="icon-text">{fundraiser.name.slice(0, 2).toUpperCase()}</h1>
              <div className="icon-text">
              </div></div>
              <div className="fundraiser-info">{fundraiser.name}
              </div>
              <div className="user-count">
              
              </div>

            </div></div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
</div>
  );
}

export default GetAllFundraisers;