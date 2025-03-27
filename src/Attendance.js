import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Attendance() {
  const [name, setName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [attendance, setAttendance] = useState([
    { id: 1, name: "Kelly", date: "2025-03-19", time: "10:00" },
    { id: 2, name: "Kelly", date: "2025-03-26", time: "10:00" },
    { id: 3, name: "Kexin", date: "2025-03-20", time: "10:00" }
  ]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());

  const getWeekday = (dateStr) => {
    const date = new Date(dateStr);
    return ["日", "一", "二", "三", "四", "五", "六"][date.getDay()];
  };

  const handleLogin = () => {
    if (name.trim()) {
      setCurrentUser(name);
      setIsLoggedIn(true);
    } else {
      toast.error("请输入姓名");
    }
  };

  const handleClockIn = () => {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    // 判断今天是否已打卡
    const hasClockedInToday = attendance.some(
      (record) => record.name === currentUser && record.date === date
    );

    if (!hasClockedInToday) {
      setAttendance([...attendance, { id: attendance.length + 1, name: currentUser, date, time }]);
      toast.success("打卡成功！");
    } else {
      toast("你今天已经打过卡啦！");
    }
  };

  const attendanceCount = attendance.filter((r) => r.name === currentUser).length;

  return (
    <div className="flex flex-col items-center mt-10 bg-white min-h-screen text-black font-sans">
      {!isLoggedIn ? (
        <div className="p-6 w-96 border-2 border-[#FFDE17] shadow-lg rounded-xl">
          <h2 className="text-xl font-bold mb-4 text-[#FFDE17]">实习生登录</h2>
          <input
            type="text"
            placeholder="请输入姓名"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            <p className="mt-2">今天是：{currentDate}（周{getWeekday(currentDate)}）</p>
            <p className="mt-1 text-sm text-gray-600">你已打卡 {attendanceCount} 天</p>
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
                  <th className="p-2">星期</th>
                  <th className="p-2">时间</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record) => (
                  <tr key={record.id} className="border-t">
                    <td className="p-2">{record.name}</td>
                    <td className="p-2">{record.date}</td>
                    <td className="p-2">周{getWeekday(record.date)}</td>
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
