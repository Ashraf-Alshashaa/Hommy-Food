import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PersonalInfo from "../../components/PersonalInfo";
import ProfileHeader from "../../components/ProfileHeader";
import RateStar from "../../components/RatingStar";
import useFetch from "../../hooks/useFetch";
import CustomerPersonalInfo from "../../components/CustomerPersonalInfo";
import { AuthContext } from "../../contexts/authentication";
import somethingWentWrong from "../../../public/images/something-went-wrong.png";
import MealList from "../../components/MealList";
import PulseLoader from "react-spinners/PulseLoader";

const ProfilePage = () => {
  const { id } = useParams();
  const [chefData, setChefData] = useState();
  const { performFetch, isLoading: isLoadingChef } = useFetch(
    `/user/chef/${id}`,
    (data) => setChefData(data?.result)
  );
  const { user, isLoading } = useContext(AuthContext);

  useEffect(() => {
    performFetch();
  }, [id, user]);
  if (isLoading || isLoadingChef) {
    return (
      <div className="result-page-container">
        <div className="loading-gif">
          <PulseLoader
            color="#f9a01b"
            size={60}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div>
    );
  }

  return (
    <>
      {!user && !chefData?.isChef ? (
        <div className="went-wrong-msg">
          <img src={somethingWentWrong} alt="something went wrong" />
          <h1>Oops!</h1>
          <h3>Unauthorized!</h3>
        </div>
      ) : user?._id !== id || !user || user?.isChef ? (
        <div className="chef-profile-page">
          <ProfileHeader chefData={chefData} setChefData={setChefData} />
          <PersonalInfo id={id} chefData={chefData} setChefData={setChefData} />
          <RateStar id={id} chefData={chefData} setChefData={setChefData} />
          <MealList id={id} />
        </div>
      ) : (
        <CustomerPersonalInfo id={id} />
      )}
    </>
  );
};
export default ProfilePage;
