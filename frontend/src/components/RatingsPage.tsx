import React, { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

interface Ratings {
  course_id: number;
  user_id: number;
  rating: number;
  review: string;
  id: number;
}

const RatingsPage: React.FC = () => {
  const { userId = "0" } = useParams<{ userId: string }>();
  const { courseId = "0" } = useParams<{ courseId: string }>();

  const [rating, setRating] = useState<Ratings>({
    course_id: Number(courseId),
    user_id: Number(userId),
    rating: 0,
    review: "",
    id: 0,
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5001/ratings", {
        course_id: rating.course_id,
        user_id: rating.user_id,
        rating: rating.rating,
        review: rating.review,
      });
      setRating({
        course_id: Number(courseId),
        user_id: Number(userId),
        rating: 0,
        review: "",
        id: result.data.id,
      });
      navigate(`/ratingsGet/${courseId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div className="mt-20 mb-5">
          <label className="font-mono text-xl">Rate this course from 0-5</label>
          <input
            type="range"
            min="0"
            max="5"
            step="1"
            value={rating.rating || 0}
            onChange={(e) =>
              setRating({ ...rating, rating: Number(e.target.value) })
            }
            className="range-slider w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer font-mono"
          />
          <span>{rating.rating}</span>
        </div>
        <div className="mb-5 flex flex-col">
          <label className="font-mono text-xl">
            Leave your review for this course
          </label>
          <input
            type="text"
            value={rating.review}
            placeholder="Click"
            onChange={(e) => setRating({ ...rating, review: e.target.value })}
            className="mt-5 p-10 border border-3 border-gray-500 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="p-1 rounded-lg border border-3 border-stone-400"
        >
          Click to submit
        </button>
      </form>
    </div>
  );
};

export default RatingsPage;
