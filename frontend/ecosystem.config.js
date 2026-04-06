module.exports = {
  apps: [
   {
      name: 'NextJS-Frontend',      // Tên ứng dụng
      script: "node_modules/next/dist/bin/next",
      args: 'start -p 3000',         // Arguments cho câu lệnh
      cwd: './',            // Thư mục chứa ứng dụng
      instances: 2,
      exec_mode: 'cluster', // Chế độ thực thi
      max_memory_restart: '500M', // Tự động restart nếu vượt quá RAM
      // Các options khác
      autorestart: true,    // Tự động restart khi crash
      watch: false,         // Không watch file changes
      max_restarts: 10,     // Số lần restart tối đa
      restart_delay: 5000,  // Delay giữa các lần restart (ms)
    }
  ],
};
