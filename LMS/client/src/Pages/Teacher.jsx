import React, { useState, useEffect } from "react";
import axios from "axios";

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [positions, setPositions] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isPositionsModalOpen, setIsPositionsModalOpen] = useState(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [newPosition, setNewPosition] = useState({
    code: "",
    des: "",
    isActive: true,
    isDeleted: false,
    name: "",
  });
  const [newTeacher, setNewTeacher] = useState({
    userId: '',
    code: '',
    startDate: '',
    endDate: '',
    teacherPositionsId: [],
    degrees: [{
      type: '',
      school: '',
      major: '',
      year: '',
      isGraduated: true,
    }],
  });
 
  const fetchTeachers = async (page) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/allDetailTeachers`
      );
      setTeachers(response.data.teachers);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  
  const fetchPositions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/allPositions` 
      );
      setPositions(response.data);
    } catch (error) {
      console.error("Error fetching positions:", error);
    }
  };

  useEffect(() => {
    fetchTeachers(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (isPositionsModalOpen) {
      fetchPositions(); 
    }
  }, [isPositionsModalOpen]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPosition({
      ...newPosition,
      [name]: value,
    });
  };

  
  const handleCreatePosition = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/position`,
        newPosition
      );
      alert("Teacher position created successfully!");
      setIsModalOpen(false); 
      fetchTeachers(currentPage); 
    } catch (error) {
      console.error("Error creating teacher position:", error);
      alert("Error creating position.");
    }
  };
  const handleTeacherInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher({
      ...newTeacher,
      [name]: value,
    });
  };

 
  const handleCreateTeacher = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/teacher`,
        newTeacher
      );
      alert("Teacher created successfully!");
      setIsTeacherModalOpen(false);
      fetchTeachers(currentPage); 
    } catch (error) {
      console.error("Error creating teacher:", error);
      alert("Error creating teacher.");
    }
  };
  const handleDegreeInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedDegrees = [...newTeacher.degrees];
    updatedDegrees[index] = { ...updatedDegrees[index], [name]: value };
    setNewTeacher({ ...newTeacher, degrees: updatedDegrees });
  };
  
  return (
    <div className="teacher-list">
     
      

      
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Mã</th>
            <th className="border border-gray-300 p-2">Tên giáo viên</th>
            <th className="border border-gray-300 p-2">Trạng thái</th>
            <th className="border border-gray-300 p-2">Vị trí</th>
            <th className="border border-gray-300 p-2">Trình độ</th>
            <th className="border border-gray-300 p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher._id}>
              <td className="border border-gray-300 p-2">{teacher.code}</td>
              <td className="border border-gray-300 p-2">
                <p className="font-medium">{teacher.userId.name}</p>
                <p className="text-sm text-gray-600">{teacher.userId.email}</p>
              </td>
              <td className="border border-gray-300 p-2">
                {teacher.isActive ? (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                    Hoạt động
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded">
                    Không hoạt động
                  </span>
                )}
              </td>
              <td className="border border-gray-300 p-2">
                {teacher.teacherPositionsId.map((position) => (
                  <div key={position._id}>
                    <p className="font-medium">{position.name}</p>
                    <p className="text-sm text-gray-600">{position.des}</p>
                  </div>
                ))}
              </td>
              <td className="border border-gray-300 p-2">
                {teacher.degrees.map((degree) => (
                  <div key={degree._id}>
                    <p className="font-medium">{degree.type}</p>
                    <p>
                      {degree.major} - {degree.school} ({degree.year})
                    </p>
                    <p>
                      {degree.isGraduated ? "Đã tốt nghiệp" : "Chưa tốt nghiệp"}
                    </p>
                  </div>
                ))}
              </td>
              <td className="border border-gray-300 p-2">
                <button className="text-blue-500">Chi tiết</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    
      <div className="pagination mt-4">
        {[...Array(totalPages).keys()].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 border ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Thêm vị trí mới
      </button>

     
      <button
        onClick={() => setIsPositionsModalOpen(true)}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded ml-4"
      >
        Xem danh sách vị trí
      </button>
      <button
        onClick={() => setIsTeacherModalOpen(true)}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Thêm giáo viên mới
      </button>
     
       {isTeacherModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="text-xl font-semibold">Thêm Giáo Viên Mới</h2>
            <form onSubmit={handleCreateTeacher}>
              <div className="mb-4">
                <label htmlFor="userId" className="block">ID Người Dùng</label>
                <input
                  type="text"
                  id="userId"
                  name="userId"
                  value={newTeacher.userId}
                  onChange={handleTeacherInputChange}
                  required
                  className="border px-2 py-1 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="code" className="block">Mã Giáo Viên</label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={newTeacher.code}
                  onChange={handleTeacherInputChange}
                  required
                  className="border px-2 py-1 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="startDate" className="block">Ngày Bắt Đầu</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={newTeacher.startDate}
                  onChange={handleTeacherInputChange}
                  required
                  className="border px-2 py-1 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="endDate" className="block">Ngày Kết Thúc</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={newTeacher.endDate}
                  onChange={handleTeacherInputChange}
                  required
                  className="border px-2 py-1 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="teacherPositionsId" className="block">Vị trí</label>
                <select
                  multiple
                  name="teacherPositionsId"
                  value={newTeacher.teacherPositionsId}
                  onChange={handleTeacherInputChange}
                  className="border px-2 py-1 rounded w-full"
                >
                  {positions.map((position) => (
                    <option key={position._id} value={position._id}>
                      {position.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
  <h3 className="text-lg font-semibold">Trình độ</h3>
  {(newTeacher.degrees || []).map((degree, index) => (
    <div key={index} className="mb-4">
      <div className="flex gap-4">
        <input
          type="text"
          name="type"
          value={degree.type}
          onChange={(e) => handleDegreeInputChange(index, e)}
          placeholder="Loại"
          className="border px-2 py-1 rounded w-full"
        />
        <input
          type="text"
          name="school"
          value={degree.school}
          onChange={(e) => handleDegreeInputChange(index, e)}
          placeholder="Trường"
          className="border px-2 py-1 rounded w-full"
        />
      </div>
      <div className="flex gap-4">
        <input
          type="text"
          name="major"
          value={degree.major}
          onChange={(e) => handleDegreeInputChange(index, e)}
          placeholder="Ngành"
          className="border px-2 py-1 rounded w-full"
        />
        <input
          type="text"
          name="year"
          value={degree.year}
          onChange={(e) => handleDegreeInputChange(index, e)}
          placeholder="Năm"
          className="border px-2 py-1 rounded w-full"
        />
      </div>
      <div className="flex gap-4">
        <select
          name="isGraduated"
          value={degree.isGraduated}
          onChange={(e) => handleDegreeInputChange(index, e)}
          className="border px-2 py-1 rounded w-full"
        >
          <option value={true}>Đã tốt nghiệp</option>
          <option value={false}>Chưa tốt nghiệp</option>
        </select>
      </div>
    </div>
  ))}
</div>
<div className="mb-4">
  <button
    type="submit"
    className="bg-blue-500 text-white px-4 py-2 rounded"
  >
    Lưu
  </button>
  <button
    type="button"
    onClick={() => setIsTeacherModalOpen(false)}
    className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
  >
    Hủy
  </button>
</div>

            </form>
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="text-xl font-semibold">Thêm Vị Trí Mới</h2>
            <form onSubmit={handleCreatePosition}>
              <div className="mb-4">
                <label htmlFor="name" className="block">
                  Tên Vị Trí
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newPosition.name}
                  onChange={handleInputChange}
                  required
                  className="border px-2 py-1 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="code" className="block">
                  Mã Vị Trí
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={newPosition.code}
                  onChange={handleInputChange}
                  required
                  className="border px-2 py-1 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="des" className="block">
                  Mô Tả
                </label>
                <input
                  type="text"
                  id="des"
                  name="des"
                  value={newPosition.des}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block">Trạng thái</label>
                <select
                  name="isActive"
                  value={newPosition.isActive}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded w-full"
                >
                  <option value={true}>Hoạt động</option>
                  <option value={false}>Không hoạt động</option>
                </select>
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Lưu
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      
      {isPositionsModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="text-xl font-semibold">Danh Sách Vị Trí</h2>
            <button
              onClick={() => setIsPositionsModalOpen(false)}
              className="mb-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Đóng
            </button>
            <ul className="list-disc pl-6">
              {positions.map((position) => (
                <li key={position._id}>
                  <p className="font-medium">{position.name}</p>
                  <p className="text-sm text-gray-600">{position.des}</p>
                  <p>{position.isActive ? "Hoạt động" : "Không hoạt động"}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherList;
