import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Attendance() {
  const [name, setName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [attendance, setAttendance] = useState([
    { id: 1, name: "kelly", date: "2025-03-19", time: "10:00" },
    { id: 2, name: "kelly", date: "2025-03-26", time: "10:00" },
    { id: 3, name: "kexin", date: "2025-03-20", time: "10:00" }
  ]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  const isAdmin = currentUser?.toLowerCase() === "admin";

  const getWeekday = (dateStr) => {
    const date = new Date(dateStr);
    return ["日", "一", "二", "三", "四", "五", "六"][date.getDay()];
  };

  const getWeekDates = (start, weeks) => {
    const allWeeks = [];
    for (let i = 0; i < weeks; i++) {
      const week = [];
      for (let d = 0; d < 5; d++) {
        const date = new Date(start);
        date.setDate(date.getDate() + i * 7 + d);
        week.push(date);
      }
      allWeeks.push(week);
    }
    return allWeeks;
  };

  const handleLogin = () => {
    if (name.trim()) {
      const normalized = name.trim().toLowerCase();
      setCurrentUser(normalized);
      setIsLoggedIn(true);
    } else {
      toast.error("请输入姓名");
    }
  };

  const handleClockIn = () => {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

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

  const attendanceCountByName = (name) => attendance.filter((r) => r.name.toLowerCase() === name.toLowerCase()).length;
  const userRecords = isAdmin ? attendance : attendance.filter(r => r.name.toLowerCase() === currentUser.toLowerCase());

  const weekDates = getWeekDates("2025-03-17", 24);
  const weekTable = weekDates.map((week, weekIndex) => {
    return week.map((day) => {
      const dateStr = day.toLocaleDateString();
      const record = userRecords.find(r => r.date === dateStr);
      return {
        week: `Week ${weekIndex + 1}`,
        date: dateStr,
        weekday: getWeekday(dateStr),
        name: capitalize(currentUser),
        time: record?.time || "/"
      };
    });
  }).flat();

  const uniqueNames = [...new Set(attendance.map((r) => r.name))];

  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-black font-sans">
      {!isLoggedIn ? (
        <div className="p-6 w-96 border-2 border-[#FFDE17] shadow-lg rounded-xl">
          <h2 className="text-xl font-bold mb-4 text-[#FFDE17] text-center">实习生登录</h2>
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
        <div className="w-full max-w-3xl">
          <div className="p-6 mb-6 border-2 border-[#FFDE17] shadow-md rounded-xl">
            <h2 className="text-xl font-bold text-[#FFDE17]">{capitalize(currentUser)}，欢迎</h2>
            <p className="mt-2">今天是：{currentDate}（周{getWeekday(currentDate)}）</p>
            {!isAdmin && (
              <p className="mt-1 text-sm text-gray-600">你已打卡 {attendanceCountByName(currentUser)} 天</p>
            )}
            {!isAdmin && (
              <button
                onClick={handleClockIn}
                className="mt-4 w-full bg-[#FFDE17] text-black py-2 rounded hover:bg-yellow-300"
              >
                点击打卡
              </button>
            )}
            {isAdmin && (
              <div className="mt-4 text-sm text-gray-700">
                <h3 className="font-bold mb-2">各成员已打卡天数：</h3>
                <ul className="list-disc list-inside">
                  {uniqueNames.map((n) => (
                    <li key={n}>{capitalize(n)}: {attendanceCountByName(n)} 天</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="border-2 border-[#FFDE17] p-4 rounded-xl">
            <h2 className="text-lg font-bold mb-4 text-[#FFDE17]">打卡记录</h2>
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-[#FFDE17] text-black">
                  <th className="p-2">周次</th>
                  <th className="p-2">姓名</th>
                  <th className="p-2">日期</th>
                  <th className="p-2">星期</th>
                  <th className="p-2">时间</th>
                </tr>
              </thead>
              <tbody>
                {weekTable.map((row, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-2">{row.week}</td>
                    <td className="p-2">{row.name}</td>
                    <td className="p-2">{row.date}</td>
                    <td className="p-2">周{row.weekday}</td>
                    <td className="p-2">{row.time}</td>
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
