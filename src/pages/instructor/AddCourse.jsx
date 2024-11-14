import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDeleteSweep } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import {
  ALL_CATEGORY_API,
  COURSE_BY_ID_API,
  UPDATE_COURSE_API,
  USER_DETAILS_API,
} from "../../Utils/Constants/Api";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [price, setPrice] = useState("");
  const [courseImage, setCourseImage] = useState(null);
  const [userData, setUserData] = useState("");
  const [modules, setModules] = useState([
    {
      moduleNumber: 1,
      title: "",
      lessons: [
        {
          title: "",
          duration: "",
          image: null,
        },
      ],
    },
  ]);
  const [selectedOption, setSelectedOption] = useState();
  const [existingImages, setExistingImages] = useState([]);

  const { action, userId , id } = useParams();


  const navigate = useNavigate();

  // Fetch course data if in edit mode
  useEffect(() => {
    const fetchCourseData = async () => {
      if (action === "edit" && id) {
        try {
          const response = await axios.get(`${COURSE_BY_ID_API}/${id}`);
          const courseData = response.data;

          setTitle(courseData.title);
          setDescription(courseData.description);
          setSelectedOption(courseData.category);
          setPrice(courseData.price);
          setExistingImages(courseData.images || []);

          if (courseData.modules && courseData.modules.length > 0) {
            const formattedModules = courseData.modules.map((module) => ({
              ...module,
              lessons: module.lessons.map((lesson) => ({
                ...lesson,
                image: null,
              })),
            }));
            setModules(formattedModules);
          }
        } catch (error) {
          console.error("Error fetching course data:", error);
        }
      }
    };

    fetchCourseData();
  }, [action, id]);

  const handleAddModule = () => {
    setModules([
      ...modules,
      {
        moduleNumber: modules.length + 1,
        title: "",
        lessons: [
          {
            title: "",
            duration: "",
            image: null,
          },
        ],
      },
    ]);
  };

  const handleAddLesson = (moduleIndex) => {
    const newModules = [...modules];
    newModules[moduleIndex].lessons.push({
      title: "",
      duration: "",
      image: null,
    });
    setModules(newModules);
  };

  const handleModuleChange = (index, e) => {
    const { name, value } = e.target;
    const newModules = [...modules];
    newModules[index][name] = value;
    setModules(newModules);
  };

  const handleLessonChange = (moduleIndex, lessonIndex, e) => {
    const { name, value } = e.target;
    const newModules = [...modules];
    newModules[moduleIndex].lessons[lessonIndex][name] = value;
    setModules(newModules);
  };

  const handleLessonImageChange = (moduleIndex, lessonIndex, e) => {
    const file = e.target.files[0];
    const newModules = [...modules];
    newModules[moduleIndex].lessons[lessonIndex].image = file;
    setModules(newModules);
  };

  const handleCourseImageChange = (e) => {
    setCourseImage(e.target.files[0]);
  };

  const handleDeleteModule = (moduleIndex) => {
    setModules(modules.filter((_, index) => index !== moduleIndex));
  };

  const handleDeleteLesson = (moduleIndex, lessonIndex) => {
    const newModules = [...modules];
    newModules[moduleIndex].lessons = newModules[moduleIndex].lessons.filter(
      (_, index) => index !== lessonIndex
    );
    setModules(newModules);
  };

  const handleCategoryChange = (e) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${USER_DETAILS_API}/${userId}`);
        setUserData(response?.data?.users[0]);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (userId) {
      fetchUserDetails();
    }

    const getAllCategories = async () => {
      try {
        const response = await axios.get(ALL_CATEGORY_API);
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getAllCategories();
  }, [userId]);

  console.log(category, "cat");

  const handleSubmit = async (e) => {
    if (!selectedOption) {
      alert("Please select a category");
      return;
    }

    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", selectedOption);
    formData.append("price", price);
    formData.append("instructor", userId);

    if (courseImage) {
      formData.append("images", courseImage);
    }

    modules.forEach((module) => {
      module.lessons.forEach((lesson) => {
        if (lesson.image) {
          formData.append("images", lesson?.image);
        }
      });
    });

    if (existingImages?.length > 0) {
      formData.append("existingImages", JSON.stringify(existingImages));
    }

    const modulesData = modules.map((module) => ({
      moduleNumber: module.moduleNumber,
      title: module.title,
      lessons: module.lessons.map((lesson) => ({
        title: lesson.title,
        duration: lesson.duration,
      })),
    }));

    formData.append("modules", JSON.stringify(modulesData));

    try {
      let response;
      if (action === "edit") {
        response = await axios.patch(
          `${UPDATE_COURSE_API}/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Successfully Updated course")
        navigate(-1)
      } else if (action === "add") {
        response = await axios.post(`${UPDATE_COURSE_API}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Successfully created course")
      }
      console.log(
        `Course ${action === "edit" ? "updated" : "added"} successfully`,
        response.data
      );
    } catch (error) {
      toast.error(`Error ${action === "edit" ? "updating" : "adding"} course:`)
      console.error(
        `Error ${action === "edit" ? "updating" : "adding"} course:`,
        error.response?.data || error.message
      );
    }
  };

  console.log(userData, "user")

  return (
    <div
      className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg m-10"
      id="Tags"
    >
      <h2 className="text-2xl font-bold mb-4">
        {action === "edit" ? "Edit Course" : "Create a New Course"}
      </h2>
      
      {/* <div>
        <button onClick={notify}>Notify!</button>
       
      </div> */}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="bg-primary p-4" id="Tags">
          {/* Course Title */}
          <div className="mb-4">
            <label className="block text-gray-700" id="Text">
              Course Title
            </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 p-2 w-full border rounded-lg"
              id="InputBg"
              required
            />
          </div>

          {/* Course Description */}
          <div className="mb-4">
            <label className="block text-gray-700" id="Text">
              Course Description
            </label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-2 w-full border rounded-lg"
              id="InputBg"
              required
            />
          </div>

          <div className="mb-4">
            <div className="flex flex-row gap-4">
              {/* Category Selection */}
              <select
                className="mt-1 p-2 border w-1/2 rounded-lg"
                id="InputBg"
                value={selectedOption}
                onChange={handleCategoryChange}
                required
              >
                <option value="">Select Category</option>{" "}
                {/* Changed from disabled to empty string */}
                {category?.map((op) => (
                  <option key={op._id} value={op._id}>
                    {op.name}
                  </option>
                ))}
              </select>

              {/* Price Input */}
              <div className="w-1/2">
                <input
                  type="number"
                  name="price"
                  placeholder="Price ($)"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-lg"
                  id="InputBg"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            {/* Instructor Info */}
            <div className="w-1/2">
              <label className="block text-gray-700" id="Text">
                Instructor Name
              </label>
              <input
                type="text"
                value={userData?.name}
                className="mt-1 p-2 w-full border rounded-lg"
                id="InputBg"
                disabled
              />
            </div>

            {/* Course Image Upload */}
            <div className="w-1/2 flex items-center mt-5 gap-6">
              <label className="text-gray-700 ml-8" id="Text">
                Course Image
              </label>
              <input
                type="file"
                name="images"
                accept="image/*"
                onChange={handleCourseImageChange}
                className="mt-1 p-2 border rounded-lg"
                id="InputBg"
              />
            </div>
          </div>

          {/* Preview existing course image in edit mode */}
          {action === "edit" && existingImages?.length > 0 && (
            <div className="mb-4">
              <label className="block text-gray-700" id="Text">
                Current Course Image
              </label>
              <img
                src={existingImages[0]}
                alt="Current course"
                className="mt-2 max-w-xs"
              />
            </div>
          )}
        </div>

        {/* Modules and Lessons */}
        {modules.map((module, moduleIndex) => (
          <div
            key={moduleIndex}
            className="mb-6 border p-4 rounded-lg bg-gray-100 relative"
            id="Tags"
          >
            <h3 className="text-lg font-semibold mb-2" id="Text">
              Module {module?.moduleNumber}
            </h3>
            <button
              type="button"
              className="absolute top-6 right-6 text-2xl text-red-500 hover:text-red-700"
              onClick={() => handleDeleteModule(moduleIndex)}
            >
              <MdDeleteSweep />
            </button>

            {/* Module Title */}
            <div className="mb-4">
              <label className="block text-gray-700" id="Text">
                Module Title
              </label>
              <input
                type="text"
                name="title"
                value={module?.title}
                onChange={(e) => handleModuleChange(moduleIndex, e)}
                className="mt-1 p-2 w-full border rounded-lg"
                id="InputBg"
                required
              />
            </div>

            {/* Lessons */}
            {module.lessons.map((lesson, lessonIndex) => (
              <div
                key={lessonIndex}
                className="mb-4 p-4 border rounded-lg bg-gray-100 shadow-sm relative"
                id="Tags"
              >
                <h3 className="font-semibold mb-2" id="Text">
                  Lesson {lessonIndex + 1}
                </h3>
                <button
                  type="button"
                  className="absolute top-6 right-6 text-2xl text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteLesson(moduleIndex, lessonIndex)}
                >
                  <MdDeleteSweep />
                </button>

                {/* Lesson Title */}
                <div className="mb-2">
                  <label className="block text-gray-600" id="Text">
                    Lesson Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={lesson?.title}
                    onChange={(e) =>
                      handleLessonChange(moduleIndex, lessonIndex, e)
                    }
                    className="mt-1 p-2 w-full border rounded-lg"
                    id="InputBg"
                    required
                  />
                </div>

                {/* Lesson Duration */}
                <div className="mb-2">
                  <label className="block text-gray-600" id="Text">
                    Lesson Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={lesson?.duration}
                    onChange={(e) =>
                      handleLessonChange(moduleIndex, lessonIndex, e)
                    }
                    className="mt-1 p-2 w-full border rounded-lg"
                    id="InputBg"
                    required
                  />
                </div>

                {/* Lesson Image Upload */}
                <div className="mb-2">
                  <label className="block text-gray-600" id="Text">
                    Lesson Image
                  </label>
                  <input
                    type="file"
                    name="images"
                    accept="image/*"
                    onChange={(e) =>
                      handleLessonImageChange(moduleIndex, lessonIndex, e)
                    }
                    className="mt-1 p-2 w-full border rounded-lg"
                    id="InputBg"
                  />
                </div>

                {/* Preview existing lesson image in edit mode */}
                {action === "edit" && lesson.image && (
                  <div className="mt-2">
                    <label className="block text-gray-600" id="Text">
                      Current Lesson Image
                    </label>
                    <img
                      src={lesson?.image}
                      alt={`Lesson ${lessonIndex + 1}`}
                      className="mt-1 max-w-xs"
                    />
                  </div>
                )}
              </div>
            ))}

            {/* Add Lesson Button */}
            <button
              type="button"
              onClick={() => handleAddLesson(moduleIndex)}
              className="text-blue-500 hover:text-blue-700 mt-2"
            >
              + Add Lesson
            </button>
          </div>
        ))}

        {/* Add Module Button */}
        <button
          type="button"
          onClick={handleAddModule}
          className="text-green-500 hover:text-green-700 mb-6"
        >
          + Add Module
        </button>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          >
            {action === "edit" ? "Update Course" : "Save Course"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
