import React, { useState } from "react";
import axios from "axios";
import CourseButton from "./CourseButton";
import RatingsPage from "./RatingsPage";
import { useNavigate, useParams } from "react-router-dom";

export interface Course {
  id: number;
  course_code: string;
  course_name: string;
  schedule: string;
  instructor: string;
}

const CoursePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [course, setCourse] = useState<Course[]>([]);
  const [newCourse, setNewCourse] = useState<Course>({
    id: 0,
    course_code: "",
    course_name: "",
    schedule: "",
    instructor: "",
  });
  const navigate = useNavigate();
  const [courseId, setCourseId] = useState<number | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await axios.post<Course>(
        "http://localhost:5001/course",
        newCourse
      );
      if (Array.isArray(result.data)) {
        setCourse(result.data); // Add the newly created course to the state
      } else {
        setCourse([result.data]);
        setCourseId(result.data.id);
      }
      if (result.data) {
        console.log("posting was successful, check out");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickRatingGet = () => {
    navigate(`/ratingsGet/${courseId}`);
  };

  const handleClickRatingPost = () => {
    if (userId && courseId) {
      navigate(`/ratings/${userId}/${courseId}`);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-24">
      <form onSubmit={handleSubmit}>
        <div className="pt-2 relative mx-auto text-gray-600">
          <input
            className="border-2 border-gray-300 bg-white h-10 px-10 pr-36 rounded-lg text-sm focus:outline-none"
            type="text"
            required
            name="course_code"
            value={newCourse.course_code}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="absolute right-0 top-0 mt-5 mr-5 hover:border-stone-400"
          >
            <svg
              className="text-gray-600 h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              xmlSpace="preserve"
              width="512px"
              height="512px"
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
        </div>
      </form>
      <ul className="font-mono mt-20">
        {course.map((user) => (
          <li key={user.id} className="text-xl">
            {user.course_name}: {user.schedule} - {user.instructor}
          </li>
        ))}
      </ul>
      {course.map((course) => (
        <CourseButton
          key={course.id}
          courseData={course.course_name + ": " + course.schedule}
        />
      ))}
      <button
        onClick={handleClickRatingGet}
        className="mt-8 font-mono mb-5 rounded-md p-3 border-2 border-slate-400"
      >
        Click to get all of the ratings for this course
      </button>
      <button
        onClick={handleClickRatingPost}
        className="font-mono rounded-md p-3 border-2 border-slate-400"
      >
        Click to post a rating for this course
      </button>
    </div>
  );
};

export default CoursePage;
