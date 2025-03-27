import { useState } from "react";
import { toast } from "react-hot-toast";

const mockData = [
  { id: 1, name: "张三", date: "2025-03-25", time: "09:00" },
  { id: 2, name: "李四", date: "2025-03-25", time: "09:05" },
];

export default function Attendance() {
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [attendance, setAttendance] = useState(mockData);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());

  const handleLogin = () => {
    if (email.trim()) {
      setCurrentUser(email);
      setIsLoggedIn(true);
    } else {
      toast.error("请输入有效的邮箱");
    }
  };

  const handleClockIn = () => {
    const now = new Date();
    const time = now.toLocaleTimeString();
    setAttendance([...attendance, { id: attendance.length + 1, name: currentUser, date: currentDate, time }]);
    toast.success("打卡成功！");
  };

  return (
    <div className="flex flex-col items-center mt-10 bg-white min-h-screen text-black font-sans">
      {!isLoggedIn ? (
        <div className="p-6 w-96 border-2 border-[#FFDE17] shadow-lg rounded-xl">
          <h2 className="text-xl font-bold mb-4 text-[#FFDE17]">实习生登录</h2>
          <input
            type="email"
            placeholder="输入邮箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-[#FFDE17] rounded mb-4"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-[#FFDE17] text-black py-2 rounded hover:bg-yellow-300"
          >
            登录
          </button>
        </div>
      ) : (
        <div className="w-96">
          <div className="p-6 mb-6 border-2 border-[#FFDE17] shadow-md rounded-xl">
            <h2 className="text-xl font-bold text-[#FFDE17]">{currentUser}，欢迎</h2>
            <p className="mt-2">今天是：{currentDate}</p>
            <button
              onClick={handleClockIn}
              className="mt-4 w-full bg-[#FFDE17] text-black py-2 rounded hover:bg-yellow-300"
            >
              点击打卡
            </button>
          </div>

          <div className="border-2 border-[#FFDE17] p-4 rounded-xl">
            <h2 className="text-lg font-bold mb-4 text-[#FFDE17]">打卡记录</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FFDE17] text-black">
                  <th className="p-2">姓名</th>
                  <th className="p-2">日期</th>
                  <th className="p-2">时间</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record) => (
                  <tr key={record.id} className="border-t">
                    <td className="p-2">{record.name}</td>
                    <td className="p-2">{record.date}</td>
                    <td className="p-2">{record.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
