import React, { useState } from "react";

function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [instructor, setInstructor] = useState("");
  const [modules, setModules] = useState([
    {
      moduleNumber: 1,
      title: "",
      lessons: [
        {
          title: "",
          duration: "",
          resource: null,
        },
      ],
    },
  ]);

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
            resource: null,
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
      resource: null,
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

  const handleLessonFileChange = (moduleIndex, lessonIndex, e) => {
    const file = e.target.files[0];
    const newModules = [...modules];
    newModules[moduleIndex].lessons[lessonIndex].resource = file;
    setModules(newModules);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("instructor", instructor);

    if (image) {
      formData.append("image", image);
    }

    modules.forEach((mod, modIndex) => {
      formData.append(`modules[${modIndex}][moduleNumber]`, mod.moduleNumber);
      formData.append(`modules[${modIndex}][title]`, mod.title);

      mod.lessons.forEach((lesson, lessonIndex) => {
        formData.append(
          `modules[${modIndex}][lessons][${lessonIndex}][title]`,
          lesson.title
        );
        formData.append(
          `modules[${modIndex}][lessons][${lessonIndex}][duration]`,
          lesson.duration
        );

        if (lesson.resource) {
          formData.append(
            `modules[${modIndex}][lessons][${lessonIndex}][resource]`,
            lesson.resource
          );
        }
      });
    });

    try {
      const response = await axios.post(
        "http://localhost:4500/course",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Course added successfully", response.data);
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Server responded with an error:", error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response received:", error.request);
      } else {
        // Something else caused the error
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg m-10">
      <h2 className="text-2xl font-bold mb-4">Create a New Course</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="bg-gray-100 p-4">
          {/* Course Title */}
          <div className="mb-4 ">
            <label className="block text-gray-700">Course Title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 p-2 w-full border rounded-lg"
              required
            />
          </div>

          {/* Course Description */}
          <div className="mb-4">
            <label className="block text-gray-700">Course Description</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-2 w-full border rounded-lg"
              required
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 p-2 w-full border rounded-lg"
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block text-gray-700">Price ($)</label>
            <input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 p-2 w-full border rounded-lg"
              required
            />
          </div>

          {/* Instructor ID */}
          <div className="mb-4">
            <label className="block text-gray-700">Instructor ID</label>
            <input
              type="text"
              name="instructor"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              className="mt-1 p-2 w-full border rounded-lg"
              required
            />
          </div>

          {/* Course Image */}
          <div className="mb-4">
            <label className="block text-gray-700">Course Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 p-2 w-full border rounded-lg"
            />
          </div>
        </div>

        {/* Modules and Lessons */}
        {modules.map((module, index) => (
          <div key={index} className="mb-6 border p-4 rounded-lg bg-gray-100">
            <h3 className="text-lg font-semibold mb-2">
              Module {module.moduleNumber}
            </h3>

            {/* Module Title */}
            <div className="mb-4">
              <label className="block text-gray-700">Module Title</label>
              <input
                type="text"
                name="title"
                value={module.title}
                onChange={(e) => handleModuleChange(index, e)}
                className="mt-1 p-2 w-full border rounded-lg"
                required
              />
            </div>

            {/* Lessons */}
            {module.lessons.map((lesson, lessonIndex) => (
              <div
                key={lessonIndex}
                className="mb-4 p-4 border rounded-lg bg-gray-100 shadow-sm"
              >
                <h4 className="font-semibold mb-2">Lesson {lessonIndex + 1}</h4>

                {/* Lesson Title */}
                <div className="mb-2">
                  <label className="block text-gray-600">Lesson Title</label>
                  <input
                    type="text"
                    name="title"
                    value={lesson.title}
                    onChange={(e) => handleLessonChange(index, lessonIndex, e)}
                    className="mt-1 p-2 w-full border rounded-lg"
                    required
                  />
                </div>

                {/* Lesson Duration */}
                <div className="mb-2">
                  <label className="block text-gray-600">Lesson Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={lesson.duration}
                    onChange={(e) => handleLessonChange(index, lessonIndex, e)}
                    className="mt-1 p-2 w-full border rounded-lg"
                    required
                  />
                </div>

                {/* Lesson Resource */}
                <div className="mb-2">
                  <label className="block text-gray-600">Lesson Resource</label>
                  <input
                    type="file"
                    name="resource" // Corrected name
                    accept="image/*"
                    onChange={(e) =>
                      handleLessonFileChange(index, lessonIndex, e)
                    }
                    className="mt-1 p-2 w-full border rounded-lg"
                  />
                </div>
              </div>
            ))}

            {/* Add Lesson Button */}
            <button
              type="button"
              onClick={() => handleAddLesson(index)}
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
            Save Course
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCourse;
