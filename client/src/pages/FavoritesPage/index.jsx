import React, { useContext } from "react";
import FavoriteChefCard from "../../components/FavoriteChefCard";
import "./style.css";
import { AuthContext } from "../../contexts/authentication";
import PulseLoader from "react-spinners/PulseLoader";

const FavoritesPage = () => {
  const { user, isLoading } = useContext(AuthContext);
  const favorites = user?.favoriteChefs;

  if (isLoading) {
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
    <div className="favorites-page-container">
      <div className="favorites-info-title">
        <h2>Your Favorite Chefs</h2>
      </div>
      {favorites?.length > 0 ? (
        <div className="favorite-chef-cards-container">
          {favorites.map((chefId) => (
            <FavoriteChefCard key={chefId} id={chefId} />
          ))}
        </div>
      ) : (
        <h1 className="none-favorite-chef">
          {"! You haven't got any favorite chef yet."}
        </h1>
      )}
    </div>
  );
};

export default FavoritesPage;
