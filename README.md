
```
SubLTWeb
├─ backend
│  ├─ .env
│  ├─ package-lock.json
│  ├─ package.json
│  └─ src
│     ├─ app.js
│     ├─ config
│     │  └─ db.js
│     ├─ controllers
│     │  ├─ cityController.js       // Nơi tôi viết hàm call API getAllCities
│     │  ├─ companyController.js       // Nơi tôi viết các hàm call API liên quan tới bảng companies
│     │  ├─ cvController.js         // Nơi tôi viết các hàm call API liên quan tới bảng cvs
│     │  ├─ jobController.js        // Nơi tôi viết các hàm call API liên quan tới bảng jobs
│     │  ├─ tagController.js        // Nơi tôi viết hàm call API getAllTags
│     │  └─ userController.js       // Nơi tôi viết các hàm call API liên quan tới bảng users
│     ├─ models
│     │  ├─ cityModel.js         // Nơi tôi đỉnh nghĩa bảng (hoặn nói theo 1 cách gì đấy kiểu const cityShema = new mongoose.Schema...)
│     │  ├─ companyModel.js
│     │  ├─ cvModel.js
│     │  ├─ jobModel.js
│     │  ├─ tagModel.js
│     │  └─ userModel.js
│     ├─ routes
│     │  ├─ cityRoute.js         // Nơi tôi định nghĩa router (const cityRouter = express.Router(); cityRouter.get("/all", getCities);)
│     │  ├─ companyRoute.js
│     │  ├─ cvRoute.js
│     │  ├─ jobRoute.js
│     │  ├─ tagRoute.js
│     │  └─ userRoutes.js
│     └─ server.js
└─ my-app (FE)
   ├─ eslint.config.js
   ├─ index.html
   ├─ package-lock.json
   ├─ package.json
   ├─ public
   │  ├─ logo.jpg    (lưu logo trang web)
   |  ├─ bg.jpg
   ├─ README.md
   ├─ src
   │  ├─ App.css
   │  ├─ App.jsx
   │  ├─ assets
   │  │  └─ react.svg
   │  ├─ components
   │  │  ├─ allRoutes (ko biết nói sao, nhưng tôi viết một hàm AllRouter sau đó import nó vào App.jsx trong đó tôi dùng useRoutes(route))
   │  │  │  └─ index.jsx
   │  │  ├─ CompanyList    (lấy ra ds toàn bộ công ty để hiện lên trang home)
   │  │  │  └─ index.jsx
   │  │  ├─ helpers     (trong đây có các hàm setCookie, getCookie, deleteCookie)
   │  │  │  ├─ cookie.jsx
   │  │  ├─ LayoutAdmin    (layout cho các nhà tuyển dụng khi đăng nhập xong và vào trang dashboard)
   │  │  │  └─ index.jsx
   │  │  ├─ LayoutDefault     (layout của toàn bộ web)
   │  │  │  └─ index.jsx
   │  │  ├─ ListJob     (lấy ra toàn bộ job của 1 công ty, khi tôi vào trang company detail thì sẽ có danh sách các job của cty đó)
   │  │  │  └─ index.jsx
   │  │  ├─ routes      (nơi định nghĩa là route)
   │  │  │  └─ index.jsx
   │  │  ├─ SearchForm     (nơi code khung search của trang home)
   │  │  │  └─ index.jsx
   │  │  ├─ services (trong này chứa các hàm để giao tiếp với bên BE)
   │  │  │  ├─ cities.jsx     (như là trong này sẽ có hàm GetAllCities)
   │  │  │  ├─ companies.jsx
   │  │  │  ├─ cv.jsx
   │  │  │  ├─ jobs.jsx
   │  │  │  └─ tags.jsx
   │  │  └─ ultis
   │  │     └─ index.jsx      (nơi tôi định nghĩa các phương thức get, post, patch, delete)
   │  ├─ dashboard      (trang dashboard dành cho nhà tuyển dụng)
   │  │  ├─ Home     (trong này sẽ có từng Card một)
   │  │  │  ├─ Company
   │  │  │  │  └─ index.jsx
   │  │  │  ├─ CV
   │  │  │  │  └─ index.jsx
   │  │  │  ├─ index.jsx
   │  │  │  └─ Jobs
   │  │  │     └─ index.jsx
   │  │  ├─ inforCompany      (trang hiện thông tin công ty và chỉnh sửa thông tin)
   │  │  │  └─ index.jsx
   │  │  ├─ ManageCV    (trang quản lý CV)
   │  │  │  ├─ DeleteCV
   │  │  │  │  └─ index.jsx
   │  │  │  ├─ DetailCV
   │  │  │  │  └─ index.jsx
   │  │  │  ├─ index.jsx
   │  │  │  └─ NameJob
   │  │  │     └─ index.jsx
   │  │  └─ ManageJob   (trang quản lý job)
   │  │     ├─ CreateJob
   │  │     │  └─ index.jsx
   │  │     ├─ EditJob
   │  │     │  └─ index.jsx
   │  │     └─ index.jsx
   │  ├─ index.css
   │  ├─ main.jsx
   │  ├─ pages    (nơi code ra các pages)
   │  │  ├─ CompanyDetail
   │  │  │  └─ index.jsx
   │  │  ├─ Home
   │  │  │  └─ index.jsx
   │  │  ├─ JobDetail      (trong này sẽ có 2 phần)
   │  │  │  ├─ ApplyForm
   │  │  │  │  └─ index.jsx
   │  │  │  ├─ Detail
   │  │  │  │  └─ index.jsx
   │  │  │  └─ index.jsx
   │  │  ├─ ListJobFound      (danh sách công việc khi  người dụng search)
   │  │  │  └─ index.jsx
   │  │  ├─ Login
   │  │  │  └─ index.jsx
   │  │  ├─ Logout
   │  │  │  └─ index.jsx
   │  │  └─ Register
   │  │     └─ index.jsx
   │  └─ PrivatePage    (cái này tôi dùng để kiểm tra xem đã login hay chưa để sửa menu trên nav)
   │     └─ index.jsx
   └─ vite.config.js

```