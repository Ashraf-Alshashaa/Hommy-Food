import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "../../components/Dropdown";
import InputForm from "../../components/InputForm";
import UploadImgWidget from "../../components/UploadImgWidget";
import { AuthContext } from "../../contexts/authentication";
import { MsgPopupContext } from "../../contexts/msgPopup";
import useFetch from "../../hooks/useFetch";
import "./style.css";

export default function CreateMeal() {
  const { user } = useContext(AuthContext);
  const [isAvailable, setIsAvailable] = useState(false);
  const [imgUrl, setImgUrl] = useState(
    "https://res.cloudinary.com/dmykyluyo/image/upload/v1668194264/meal_photos/nezxr8lcizgsnr48y5mi.png"
  );
  const [data, setData] = useState({});
  const [inputLength, setInputLength] = useState(0);
  const [categories, setCategories] = useState([]);
  const [cuisines, setCuisines] = useState(null);
  const navigate = useNavigate();
  const { setPopup } = useContext(MsgPopupContext);
  const { performFetch: performFetchCuisines } = useFetch(
    "/cuisines",
    setCuisines
  );
  const { performFetch: performFetchCategories } = useFetch(
    "/categories",
    setCategories
  );
  useEffect(() => {
    performFetchCuisines();
    performFetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.BASE_SERVER_URL}/api/meals/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            chefId: user?._id,
            image: imgUrl,
            isAvailable,
          }),
        }
      );
      const result = await response.json();
      if (result.success) {
        setPopup({ type: "success", text: "Meal is created..", open: true });
        navigate(`/profile/${user?._id}`);
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
    setData({ ...data, [name]: value });
  };
  return (
    <div className="create-meal-page">
      <h1>Create Your Meal</h1>
      <div className="create-meal-container">
        <div className="create-meal-page-left-side">
          <div className="img-upload-page">
            <div className="meal-img-container">
              <img src={imgUrl} alt="meal image" />
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
              placeholder="Write something about your meal..."
              name="description"
              value={data["description"] || ""}
              onChange={(e) => {
                handleChange(e);
                handleDescriptionLength(e);
              }}
              required
            />
            <p className="create-meal-input-length">{inputLength} / 150</p>
          </div>
          {window.innerWidth > 600 && (
            <>
              <div className="buttons-container">
                <Link className="link-cancel-btn" to={-1}>
                  <button className="cancel-btn">Cancel</button>
                </Link>
                <button
                  className="submit-btn"
                  onClick={handleSubmit}
                  disabled={
                    !(
                      data?.description &&
                      data?.title &&
                      data?.cuisine &&
                      data?.category &&
                      data?.price
                    )
                  }
                >
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
            value={data["title"] || ""}
            onChange={handleChange}
            required
          />
          <InputForm
            className="meal-input"
            label="Price*"
            type="number"
            placeholder="Price of the meal"
            name="price"
            value={data["price"] || ""}
            errorMessage="Price is required field!"
            onChange={handleChange}
            required
          />
          <label>Category*</label>
          <Dropdown
            data={categories?.result}
            displayText={
              data.category
                ? (categories?.result.filter(
                    (elm) => elm._id === data.category
                  ))[0].title
                : "Select a category"
            }
            onClick={(e) => setData({ ...data, category: e.target.id })}
          />
          <label>Cuisine*</label>
          <Dropdown
            data={cuisines?.result}
            displayText={
              data.cuisine
                ? (cuisines?.result.filter(
                    (elm) => elm._id === data.cuisine
                  ))[0].title
                : "Select a cuisine"
            }
            onClick={(e) => setData({ ...data, cuisine: e.target.id })}
          />
          <InputForm
            className="meal-input"
            label="Ingredients"
            placeholder="tomato,cheese.."
            type="text"
            name="ingredients"
            value={data["ingredients"] || ""}
            onChange={handleChange}
          />

          <label htmlFor="isAvailable">Meal is available for today?</label>
          <input
            className="toggle"
            type="checkbox"
            id="isAvailable"
            name="isAvailable"
            value={isAvailable}
            onChange={() => setIsAvailable(!isAvailable)}
          />

          <label className="toggle-label" htmlFor="isAvailable"></label>

          <InputForm
            className="meal-input"
            label="Quantity"
            type="number"
            placeholder="Available quantity of portions for today"
            name="quantity"
            value={data["quantity"] || ""}
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
            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={
                !(
                  data?.description &&
                  data?.title &&
                  data?.cuisine &&
                  data?.category &&
                  data?.price
                )
              }
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
}
