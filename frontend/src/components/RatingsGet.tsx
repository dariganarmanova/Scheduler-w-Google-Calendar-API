import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface RetrieveRatings {
  course_id: number;
  user_id: number;
  rating: number;
  review: string;
  course_name: string;
  instructor: string;
  id: number;
}

const RatingsGet = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [ratings, setRatings] = useState<RetrieveRatings[]>([]);
  const [name, setName] = useState<string>("");
  const [instructor, setInstructor] = useState<string>("");
  const [rating, setRating] = useState<number[]>([]);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const result = await axios.get(
          `http://localhost:5001/getRating/${courseId}`
        );
        setRatings(result.data);
        setName(result.data[0].course_name);
        setInstructor(result.data[0].instructor);
        const extractedRatings: number[] = result.data.map(
          (r: RetrieveRatings) => r.rating
        );
        setRating(extractedRatings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRating();
  }, [courseId]);

  const handleMedium = () => {
    rating.sort((a, b) => a - b);
    const middleIndex = Math.floor(rating.length / 2);
    if (rating.length % 2 === 0) {
      return (rating[middleIndex - 1] + rating[middleIndex]) / 2;
    } else {
      return rating[middleIndex];
    }
  };

  return (
    <div className="flex flex-col items-center justify-center font-mono mt-10">
      <p className="text-xl">Course Name: {name}</p>
      <p className="text-xl">Instructor Name: {instructor}</p>
      {ratings.map((rating) => (
        <li
          key={rating.id}
          className="list-none flex flex-col items-center justify-center mt-7 text-lg border-2 p-3 border-stone-400 rounded-md"
        >
          <ul className="mb-2">
            Rating of user #{rating.user_id}: {rating.rating} out of 5
          </ul>
          <ul>
            Review of user #{rating.user_id}: {rating.review}
          </ul>
        </li>
      ))}
      <p className="text-lg mt-8">
        The medium rating of this course is {handleMedium()} out of 5
      </p>
    </div>
  );
};

export default RatingsGet;
