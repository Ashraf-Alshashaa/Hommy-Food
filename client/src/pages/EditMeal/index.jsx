import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Dropdown from "../../components/Dropdown";
import InputForm from "../../components/InputForm";
import UploadImgWidget from "../../components/UploadImgWidget";
import { AuthContext } from "../../contexts/authentication";
import useFetch from "../../hooks/useFetch";
import somethingWentWrong from "../../../public/images/something-went-wrong.png";
import "./style.css";
import { MsgPopupContext } from "../../contexts/msgPopup";
import PulseLoader from "react-spinners/PulseLoader";

export default function EditMeal() {
  const { user, isLoading } = useContext(AuthContext);
  const { setPopup } = useContext(MsgPopupContext);
  const { id } = useParams();
  const [isAvailable, setIsAvailable] = useState(false);
  const [inputLength, setInputLength] = useState(0);
  const [meal, setMeal] = useState([]);
  const [imgUrl, setImgUrl] = useState(null);
  const [categories, setCategories] = useState([]);
  const [cuisines, setCuisines] = useState(null);
  const navigate = useNavigate();

  const { performFetch: performFetchCuisines } = useFetch(
    "/cuisines",
    setCuisines
  );
  const { performFetch: performFetchCategories } = useFetch(
    "/categories",
    setCategories
  );
  const { performFetch: performFetchMeal, isLoading: isLoadingMeal } = useFetch(
    `/meals/meal_detail/${id}`,
    (data) => setMeal(data?.result)
  );
  useEffect(() => {
    performFetchCuisines();
    performFetchCategories();
    performFetchMeal();
  }, []);
  useEffect(() => {
    if (meal) {
      setIsAvailable(meal?.isAvailable);
    }
  }, [meal]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedMeal = imgUrl
      ? {
          ...meal,
          image: imgUrl,
          isAvailable,
        }
      : {
          ...meal,
          isAvailable,
        };
    try {
      const response = await fetch(
        `${process.env.BASE_SERVER_URL}/api/meals/update/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedMeal),
        }
      );
      const result = await response.json();
      if (result.success) {
        setPopup({
          type: "success",
          text: "Meal is updated successfully..",
          open: true,
        });
        navigate(`/profile/${user._id}`);
      } else {
        setPopup({ type: "error", text: result?.msg, open: true });
      }
    } catch (error) {
      setPopup({
        type: "error",
        text: "sorry something went wrong",
        open: true,
      });
    }
  };
  const handleDescriptionLength = (e) => {
    setInputLength(e.target.value.length);
  };
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setMeal({ ...meal, [name]: value });
  };

  if (isLoading || isLoadingMeal) {
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

  return meal?.chefId?._id === user?._id ? (
    <div className="create-meal-page">
      <h1>Edit Your Meal</h1>
      <div className="create-meal-container">
        <div className="create-meal-page-left-side">
          <div className="img-upload-page">
            <div className="meal-img-container">
              <img src={imgUrl ? imgUrl : meal?.image} alt="meal image" />
            </div>
            <UploadImgWidget setImgUrl={setImgUrl} folderName="meal_photos" />
          </div>
          <label htmlFor="description" className="description-label">
            Meal Description
          </label>
          <div className="description-and-character">
            <textarea
              className="meal-description"
              rows={5}
              maxLength="150"
              placeholder="Write something about your meal..."
              name="description"
              value={meal?.description || ""}
              onChange={(e) => {
                handleChange(e);
                handleDescriptionLength(e);
              }}
              required
            />
            <p className="edit-meal-input-length">{inputLength} / 150</p>
          </div>
          {window.innerWidth > 600 && (
            <>
              <div className="buttons-container">
                <Link className="link-cancel-btn" to={-1}>
                  <button className="cancel-btn">Cancel</button>
                </Link>
                <button className="submit-btn" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </>
          )}
        </div>

        <div className="create-meal-page-right-side">
          <InputForm
            className="meal-input"
            label="Title*"
            type="text"
            placeholder="Title of the meal"
            name="title"
            errorMessage="Title is required field!"
            value={meal?.title || ""}
            onChange={handleChange}
            required
          />
          <InputForm
            className="meal-input"
            label="Price*"
            type="number"
            placeholder="Price of the meal"
            name="price"
            value={meal?.price || ""}
            errorMessage="Price is required field!"
            onChange={handleChange}
            required
          />
          <label>Category*</label>
          <Dropdown
            data={categories?.result}
            displayText={
              meal?.category
                ? (categories?.result?.filter(
                    (elm) =>
                      elm._id === meal?.category?._id ||
                      elm._id === meal?.category
                  ))[0].title
                : meal?.category?.title
            }
            onClick={(e) => setMeal({ ...meal, category: e.target.id })}
          />
          <label>Cuisine*</label>
          <Dropdown
            data={cuisines?.result}
            displayText={
              meal?.cuisine
                ? (cuisines?.result?.filter(
                    (elm) =>
                      elm._id === meal?.cuisine?._id ||
                      elm._id === meal?.cuisine
                  ))[0].title
                : meal?.cuisine?.title
            }
            onClick={(e) => setMeal({ ...meal, cuisine: e.target.id })}
          />
          <InputForm
            className="meal-input"
            label="Ingredients"
            placeholder="tomato,cheese.."
            type="text"
            name="ingredients"
            value={meal?.ingredients || ""}
            onChange={handleChange}
          />

          <label htmlFor="isAvailable">Meal is available for today?</label>
          <input
            className="toggle"
            type="checkbox"
            id="isAvailable"
            name="isAvailable"
            value={meal?.isAvailable}
            checked={isAvailable}
            onChange={() => setIsAvailable(!isAvailable)}
          />

          <label className="toggle-label" htmlFor="isAvailable"></label>

          <InputForm
            className="meal-input"
            label="Quantity"
            type="number"
            placeholder="Available quantity of portions for today"
            name="quantity"
            value={meal?.quantity || ""}
            onChange={handleChange}
          />
        </div>
      </div>
      {window.innerWidth < 600 && (
        <>
          <div className="buttons-container">
            <Link className="link-cancel-btn" to={-1}>
              <button className="cancel-btn">Cancel</button>
            </Link>
            <button className="submit-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  ) : (
    <div className="result-page-container">
      <div className="error">
        <img src={somethingWentWrong} alt="something went wrong" />
        <h1>Oops!Unauthorized!</h1>
        <h5>Sorry you can not edit this meal</h5>
      </div>
    </div>
  );
}
