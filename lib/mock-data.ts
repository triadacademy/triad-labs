// ── Centralized Mock Data for Triad Labs LMS ──

// ── Types ──

export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "instructor" | "admin";
  avatar: string;
  bio?: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  videoUrl?: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  category: string;
  instructor: string;
  instructorRole?: string;
  description: string;
  sections: number;
  price: string;
  rating?: number;
  students?: number;
  duration?: string;
  level?: string;
  lastUpdated?: string;
  modules: Module[];
  enrolled?: boolean;
  progress?: number;
  quizzes?: Quiz[];
}

export interface EnrolledCourse {
  id: string;
  title: string;
  category: string;
  instructor: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  lastAccessed: string;
  certificate: boolean;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  members: number;
  posts: number;
  category: string;
  isPrivate: boolean;
  joined: boolean;
}

export interface Notification {
  id: string;
  type: "course" | "achievement" | "community" | "system";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  moduleId?: string;
  questions: QuizQuestion[];
  timeLimit?: number; // minutes
  passingScore: number; // percentage
}

export interface Resource {
  id: string;
  title: string;
  type: "pdf" | "video" | "spreadsheet" | "code";
  category: string;
  size: string;
  downloadUrl: string;
}

// ── Current User ──

export const CURRENT_USER: User = {
  id: "u1",
  name: "Yash Grover",
  email: "yash@triadlabs.com",
  role: "student",
  avatar: "Y",
  bio: "Passionate about trading and technology. Currently focused on algorithmic trading systems and AI-driven market analysis.",
};

export const ADMIN_USER: User = {
  id: "u2",
  name: "Admin User",
  email: "admin@triadlabs.com",
  role: "admin",
  avatar: "A",
};

// ── Courses ──

export const MOCK_COURSES: Course[] = [
  {
    id: "1",
    title: "Advanced Trading Strategies",
    category: "Trading",
    instructor: "Rajesh Kumar",
    instructorRole: "Senior Market Analyst, 15+ years experience",
    description: "Master advanced trading techniques including swing trading, momentum strategies, and risk management for consistent profits. This comprehensive course covers everything from market psychology to advanced chart patterns.",
    sections: 12,
    price: "₹4,999",
    rating: 4.8,
    students: 1247,
    duration: "42 hours",
    level: "Advanced",
    lastUpdated: "May 2026",
    enrolled: true,
    progress: 23,
    modules: [
      {
        id: "m1",
        title: "Module 1: Market Psychology",
        lessons: [
          { id: "l1", title: "Understanding Market Sentiment", duration: "18 min", completed: true },
          { id: "l2", title: "Fear & Greed Index Analysis", duration: "24 min", completed: true },
          { id: "l3", title: "Crowd Behavior Patterns", duration: "20 min", completed: false },
        ],
      },
      {
        id: "m2",
        title: "Module 2: Swing Trading",
        lessons: [
          { id: "l4", title: "Identifying Swing Points", duration: "22 min", completed: false },
          { id: "l5", title: "Entry & Exit Strategies", duration: "30 min", completed: false },
          { id: "l6", title: "Position Sizing for Swings", duration: "18 min", completed: false },
          { id: "l7", title: "Swing Trading Case Studies", duration: "35 min", completed: false },
        ],
      },
      {
        id: "m3",
        title: "Module 3: Momentum Strategies",
        lessons: [
          { id: "l8", title: "RSI & MACD Deep Dive", duration: "28 min", completed: false },
          { id: "l9", title: "Volume-Price Analysis", duration: "25 min", completed: false },
          { id: "l10", title: "Momentum Breakout System", duration: "32 min", completed: false },
        ],
      },
      {
        id: "m4",
        title: "Module 4: Risk Management",
        lessons: [
          { id: "l11", title: "Stop Loss Strategies", duration: "20 min", completed: false },
          { id: "l12", title: "Portfolio Risk Assessment", duration: "26 min", completed: false },
          { id: "l13", title: "Building a Trading Plan", duration: "30 min", completed: false },
        ],
      },
    ],
    quizzes: [
      {
        id: "q1",
        title: "Market Psychology Quiz",
        description: "Test your understanding of market sentiment and crowd behavior.",
        moduleId: "m1",
        passingScore: 70,
        timeLimit: 15,
        questions: [
          {
            id: "q1-1",
            question: "What does the Fear & Greed Index measure?",
            options: [
              "The total volume of trades in the market",
              "The emotional sentiment of market participants",
              "The number of stocks hitting 52-week highs",
              "The interest rate set by the central bank",
            ],
            correctIndex: 1,
            explanation: "The Fear & Greed Index measures the emotional sentiment of market participants, ranging from extreme fear to extreme greed.",
          },
          {
            id: "q1-2",
            question: "Which cognitive bias causes traders to hold losing positions too long?",
            options: [
              "Anchoring bias",
              "Confirmation bias",
              "Loss aversion",
              "Herd mentality",
            ],
            correctIndex: 2,
            explanation: "Loss aversion makes traders feel the pain of losses more intensely than the pleasure of gains, causing them to hold losing positions hoping for recovery.",
          },
          {
            id: "q1-3",
            question: "What is 'crowd behavior' in trading?",
            options: [
              "When too many traders use the same platform",
              "When large groups of traders react similarly to market events",
              "When trading volume exceeds normal levels",
              "When market makers manipulate prices",
            ],
            correctIndex: 1,
            explanation: "Crowd behavior refers to the tendency of large groups of traders to react similarly to market events, often driven by shared emotions and herding instincts.",
          },
          {
            id: "q1-4",
            question: "At what level does the Fear & Greed Index indicate 'Extreme Greed'?",
            options: [
              "0-25",
              "26-50",
              "51-75",
              "76-100",
            ],
            correctIndex: 3,
            explanation: "A reading of 76-100 on the Fear & Greed Index indicates Extreme Greed, which historically can signal an overbought market.",
          },
          {
            id: "q1-5",
            question: "What is contrarian investing?",
            options: [
              "Investing only in index funds",
              "Going against prevailing market sentiment",
              "Following the crowd in all trades",
              "Investing in opposite sectors simultaneously",
            ],
            correctIndex: 1,
            explanation: "Contrarian investing involves going against prevailing market sentiment — buying when others are fearful and selling when others are greedy.",
          },
        ],
      },
      {
        id: "q2",
        title: "Swing Trading Fundamentals",
        description: "Assess your knowledge of swing trading concepts and strategies.",
        moduleId: "m2",
        passingScore: 70,
        timeLimit: 20,
        questions: [
          {
            id: "q2-1",
            question: "What is the typical holding period for swing trades?",
            options: [
              "A few minutes to hours",
              "A few days to weeks",
              "Several months",
              "Over a year",
            ],
            correctIndex: 1,
            explanation: "Swing trades typically last a few days to weeks, capturing price 'swings' within a larger trend.",
          },
          {
            id: "q2-2",
            question: "Which is the best time frame for identifying swing points?",
            options: [
              "1-minute chart",
              "5-minute chart",
              "Daily chart",
              "Monthly chart",
            ],
            correctIndex: 2,
            explanation: "The daily chart is the most commonly used time frame for identifying swing points as it filters out intraday noise.",
          },
          {
            id: "q2-3",
            question: "What is a 'swing low'?",
            options: [
              "The lowest price in a year",
              "A price point where buying pressure exceeds selling pressure, causing a reversal upward",
              "The opening price of the day",
              "The lowest volume day of the week",
            ],
            correctIndex: 1,
            explanation: "A swing low is a price point where buying pressure exceeds selling pressure, causing price to reverse from downward to upward movement.",
          },
          {
            id: "q2-4",
            question: "What position sizing rule is recommended for swing trading?",
            options: [
              "Risk 10% of portfolio per trade",
              "Risk 1-2% of portfolio per trade",
              "Invest entire portfolio in one trade",
              "Risk 50% of portfolio per trade",
            ],
            correctIndex: 1,
            explanation: "The 1-2% rule is widely recommended — never risk more than 1-2% of your total portfolio on a single swing trade.",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Technical Analysis Masterclass",
    category: "Trading",
    instructor: "Priya Sharma",
    description: "Learn to read candlestick patterns, support/resistance, and technical indicators like a professional trader.",
    sections: 10,
    price: "₹3,499",
    rating: 4.6,
    students: 892,
    duration: "36 hours",
    level: "Intermediate",
    enrolled: true,
    progress: 65,
    modules: [
      {
        id: "m1",
        title: "Module 1: Chart Basics",
        lessons: [
          { id: "l1", title: "Types of Charts", duration: "15 min", completed: true },
          { id: "l2", title: "Candlestick Anatomy", duration: "20 min", completed: true },
          { id: "l3", title: "Time Frames Explained", duration: "18 min", completed: true },
        ],
      },
      {
        id: "m2",
        title: "Module 2: Support & Resistance",
        lessons: [
          { id: "l4", title: "Identifying Key Levels", duration: "25 min", completed: true },
          { id: "l5", title: "Trendlines & Channels", duration: "22 min", completed: true },
          { id: "l6", title: "Breakout Confirmation", duration: "28 min", completed: false },
        ],
      },
      {
        id: "m3",
        title: "Module 3: Indicators",
        lessons: [
          { id: "l7", title: "Moving Averages", duration: "20 min", completed: true },
          { id: "l8", title: "RSI Explained", duration: "24 min", completed: false },
          { id: "l9", title: "MACD Signals", duration: "26 min", completed: false },
          { id: "l10", title: "Bollinger Bands", duration: "22 min", completed: false },
        ],
      },
    ],
    quizzes: [
      {
        id: "q3",
        title: "Technical Analysis Basics",
        description: "Test your understanding of chart patterns and indicators.",
        moduleId: "m1",
        passingScore: 70,
        timeLimit: 15,
        questions: [
          {
            id: "q3-1",
            question: "What does a 'doji' candlestick pattern indicate?",
            options: [
              "Strong buying pressure",
              "Indecision in the market",
              "Guaranteed price reversal",
              "High trading volume",
            ],
            correctIndex: 1,
            explanation: "A doji forms when the open and close prices are virtually equal, indicating market indecision between buyers and sellers.",
          },
          {
            id: "q3-2",
            question: "What is a 'higher high' in an uptrend?",
            options: [
              "The highest price ever recorded",
              "A peak that is higher than the previous peak",
              "The opening price of the day",
              "The closing price above the moving average",
            ],
            correctIndex: 1,
            explanation: "In an uptrend, a higher high is formed when the price reaches a peak that is higher than the previous peak, confirming bullish momentum.",
          },
          {
            id: "q3-3",
            question: "Which chart type shows the open, high, low, and close prices?",
            options: [
              "Line chart",
              "Bar chart / Candlestick chart",
              "Area chart",
              "Point and figure chart",
            ],
            correctIndex: 1,
            explanation: "Both bar charts and candlestick charts display the open, high, low, and close (OHLC) prices for each time period.",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "AI-Based Trading Systems",
    category: "AI & Tech",
    instructor: "Dr. Amit Patel",
    description: "Build algorithmic trading systems using Python, machine learning, and real-time market data analysis.",
    sections: 15,
    price: "₹7,999",
    rating: 4.9,
    students: 567,
    duration: "56 hours",
    level: "Advanced",
    modules: [
      {
        id: "m1",
        title: "Module 1: Python for Trading",
        lessons: [
          { id: "l1", title: "Setting Up Your Environment", duration: "20 min", completed: false },
          { id: "l2", title: "Pandas for Market Data", duration: "30 min", completed: false },
          { id: "l3", title: "Data Visualization", duration: "25 min", completed: false },
        ],
      },
      {
        id: "m2",
        title: "Module 2: ML Fundamentals",
        lessons: [
          { id: "l4", title: "Supervised Learning Basics", duration: "35 min", completed: false },
          { id: "l5", title: "Feature Engineering", duration: "28 min", completed: false },
          { id: "l6", title: "Model Evaluation", duration: "22 min", completed: false },
        ],
      },
    ],
    quizzes: [],
  },
  {
    id: "4",
    title: "F&O Trading Fundamentals",
    category: "Finance",
    instructor: "Vikram Mehta",
    description: "Understand Futures & Options from scratch — Greeks, strategies, hedging, and income generation techniques.",
    sections: 8,
    price: "₹2,999",
    rating: 4.5,
    students: 1034,
    duration: "28 hours",
    level: "Beginner",
    enrolled: true,
    progress: 100,
    modules: [
      {
        id: "m1",
        title: "Module 1: F&O Basics",
        lessons: [
          { id: "l1", title: "What are Futures?", duration: "20 min", completed: true },
          { id: "l2", title: "What are Options?", duration: "22 min", completed: true },
          { id: "l3", title: "Call vs Put", duration: "18 min", completed: true },
        ],
      },
      {
        id: "m2",
        title: "Module 2: The Greeks",
        lessons: [
          { id: "l4", title: "Delta Explained", duration: "25 min", completed: true },
          { id: "l5", title: "Gamma & Theta", duration: "30 min", completed: true },
          { id: "l6", title: "Vega & Rho", duration: "22 min", completed: true },
        ],
      },
    ],
    quizzes: [],
  },
  {
    id: "5",
    title: "Candlestick Pattern Recognition",
    category: "Trading",
    instructor: "Sneha Gupta",
    description: "Identify and trade 50+ candlestick patterns with real chart examples and backtested results.",
    sections: 6,
    price: "₹1,999",
    rating: 4.4,
    students: 2103,
    duration: "18 hours",
    level: "Beginner",
    modules: [
      {
        id: "m1",
        title: "Module 1: Single Patterns",
        lessons: [
          { id: "l1", title: "Doji Patterns", duration: "15 min", completed: false },
          { id: "l2", title: "Hammer & Hanging Man", duration: "18 min", completed: false },
          { id: "l3", title: "Engulfing Patterns", duration: "20 min", completed: false },
        ],
      },
    ],
    quizzes: [],
  },
  {
    id: "6",
    title: "Prompt Engineering for Business",
    category: "AI & Tech",
    instructor: "Rohan Desai",
    description: "Leverage AI tools like ChatGPT, Claude, and Midjourney to automate workflows and boost productivity.",
    sections: 9,
    price: "₹3,999",
    rating: 4.7,
    students: 1567,
    duration: "24 hours",
    level: "Intermediate",
    enrolled: true,
    progress: 45,
    modules: [
      {
        id: "m1",
        title: "Module 1: AI Fundamentals",
        lessons: [
          { id: "l1", title: "How LLMs Work", duration: "22 min", completed: true },
          { id: "l2", title: "Prompt Structure", duration: "18 min", completed: true },
          { id: "l3", title: "Chain of Thought", duration: "24 min", completed: true },
        ],
      },
      {
        id: "m2",
        title: "Module 2: Advanced Techniques",
        lessons: [
          { id: "l4", title: "Few-Shot Learning", duration: "20 min", completed: true },
          { id: "l5", title: "System Prompts", duration: "16 min", completed: false },
          { id: "l6", title: "Multi-Modal Prompts", duration: "28 min", completed: false },
        ],
      },
    ],
    quizzes: [],
  },
  {
    id: "7",
    title: "Multibagger Stock Selection",
    category: "Finance",
    instructor: "Arun Joshi",
    description: "Fundamental analysis framework to identify stocks with 10x potential before the market catches on.",
    sections: 11,
    price: "₹5,499",
    rating: 4.3,
    students: 789,
    duration: "38 hours",
    level: "Intermediate",
    modules: [
      {
        id: "m1",
        title: "Module 1: Fundamental Analysis",
        lessons: [
          { id: "l1", title: "Reading Financial Statements", duration: "30 min", completed: false },
          { id: "l2", title: "Key Ratios", duration: "25 min", completed: false },
          { id: "l3", title: "Valuation Methods", duration: "28 min", completed: false },
        ],
      },
    ],
    quizzes: [],
  },
  {
    id: "8",
    title: "Autonomous Vehicle Engineering",
    category: "Innovation",
    instructor: "Dr. Kavita Rao",
    description: "From sensors to self-driving — understand the full stack of autonomous vehicle technology.",
    sections: 14,
    price: "₹9,999",
    rating: 4.8,
    students: 456,
    duration: "62 hours",
    level: "Advanced",
    modules: [
      {
        id: "m1",
        title: "Module 1: Sensor Stack",
        lessons: [
          { id: "l1", title: "LiDAR Fundamentals", duration: "30 min", completed: false },
          { id: "l2", title: "Camera Systems", duration: "25 min", completed: false },
          { id: "l3", title: "Sensor Fusion", duration: "35 min", completed: false },
        ],
      },
    ],
    quizzes: [],
  },
  {
    id: "9",
    title: "Industrial Robotics & Automation",
    category: "Innovation",
    instructor: "Suresh Nair",
    description: "Design, program, and deploy industrial robots for manufacturing and warehouse automation.",
    sections: 13,
    price: "₹8,499",
    rating: 4.6,
    students: 345,
    duration: "48 hours",
    level: "Intermediate",
    modules: [
      {
        id: "m1",
        title: "Module 1: Robotics Basics",
        lessons: [
          { id: "l1", title: "Types of Industrial Robots", duration: "22 min", completed: false },
          { id: "l2", title: "Kinematics", duration: "30 min", completed: false },
          { id: "l3", title: "Robot Programming", duration: "28 min", completed: false },
        ],
      },
    ],
    quizzes: [],
  },
];

// ── Enrolled Courses (derived) ──

export const MOCK_ENROLLED: EnrolledCourse[] = MOCK_COURSES.filter((c) => c.enrolled).map((c) => {
  const totalLessons = c.modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedLessons = c.modules.reduce(
    (sum, m) => sum + m.lessons.filter((l) => l.completed).length,
    0
  );
  return {
    id: c.id,
    title: c.title,
    category: c.category,
    instructor: c.instructor,
    progress: c.progress ?? (totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0),
    totalLessons,
    completedLessons,
    lastAccessed: c.id === "1" ? "2 hours ago" : c.id === "2" ? "Yesterday" : c.id === "4" ? "3 days ago" : "1 week ago",
    certificate: c.progress === 100,
  };
});

// ── Communities ──

export const MOCK_COMMUNITIES: Community[] = [
  {
    id: "1",
    name: "Trading Enthusiasts",
    description: "Discuss market trends, share trade setups, and learn from fellow traders.",
    members: 2340,
    posts: 456,
    category: "Trading",
    isPrivate: false,
    joined: true,
  },
  {
    id: "2",
    name: "F&O Strategies",
    description: "Advanced options and futures strategies for experienced traders.",
    members: 890,
    posts: 234,
    category: "Finance",
    isPrivate: true,
    joined: true,
  },
  {
    id: "3",
    name: "AI & Tech Innovators",
    description: "Explore AI, ML, and emerging technologies shaping the future.",
    members: 1560,
    posts: 312,
    category: "AI & Tech",
    isPrivate: false,
    joined: false,
  },
  {
    id: "4",
    name: "Beginner Traders Hub",
    description: "A safe space for beginners to ask questions and learn the basics.",
    members: 4200,
    posts: 890,
    category: "Trading",
    isPrivate: false,
    joined: false,
  },
  {
    id: "5",
    name: "Wealth Creation Club",
    description: "Long-term investing, portfolio building, and financial planning.",
    members: 1120,
    posts: 178,
    category: "Finance",
    isPrivate: false,
    joined: true,
  },
  {
    id: "6",
    name: "Robotics & Automation",
    description: "Industrial robotics, autonomous systems, and hardware innovation.",
    members: 670,
    posts: 98,
    category: "Innovation",
    isPrivate: false,
    joined: false,
  },
];

// ── Notifications ──

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    type: "course",
    title: "New lesson available",
    message: "Swing Trading Case Studies has been added to Advanced Trading Strategies.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "n2",
    type: "achievement",
    title: "Achievement unlocked!",
    message: "You earned the 'Fast Learner' badge for completing 5 lessons in one day.",
    time: "5 hours ago",
    read: false,
  },
  {
    id: "n3",
    type: "community",
    title: "New reply in Trading Enthusiasts",
    message: "Rajesh Kumar replied to your discussion on RSI divergence strategies.",
    time: "Yesterday",
    read: false,
  },
  {
    id: "n4",
    type: "system",
    title: "Course update",
    message: "Technical Analysis Masterclass has been updated with new chart examples.",
    time: "2 days ago",
    read: true,
  },
  {
    id: "n5",
    type: "course",
    title: "Assignment graded",
    message: "Your submission for Module 2 quiz scored 85%. Great work!",
    time: "3 days ago",
    read: true,
  },
  {
    id: "n6",
    type: "community",
    title: "New community: Crypto Traders",
    message: "A new community for cryptocurrency trading discussions has been created.",
    time: "4 days ago",
    read: true,
  },
];

// ── Resources ──

export const MOCK_RESOURCES: Resource[] = [
  { id: "r1", title: "Trading Strategy Cheat Sheet", type: "pdf", category: "Trading", size: "2.4 MB", downloadUrl: "#" },
  { id: "r2", title: "Python Backtesting Template", type: "code", category: "AI & Tech", size: "156 KB", downloadUrl: "#" },
  { id: "r3", title: "F&O Greeks Calculator", type: "spreadsheet", category: "Finance", size: "340 KB", downloadUrl: "#" },
  { id: "r4", title: "Candlestick Pattern Visual Guide", type: "pdf", category: "Trading", size: "5.1 MB", downloadUrl: "#" },
  { id: "r5", title: "Risk Management Workbook", type: "pdf", category: "Finance", size: "1.8 MB", downloadUrl: "#" },
  { id: "r6", title: "ML Trading Model Notebook", type: "code", category: "AI & Tech", size: "890 KB", downloadUrl: "#" },
  { id: "r7", title: "Portfolio Tracker Template", type: "spreadsheet", category: "Finance", size: "420 KB", downloadUrl: "#" },
  { id: "r8", title: "Technical Indicators Library", type: "video", category: "Trading", size: "1.2 GB", downloadUrl: "#" },
];

// ── Admin Stats ──

export const ADMIN_STATS = {
  totalStudents: 4521,
  totalCourses: 9,
  totalRevenue: "₹24,56,700",
  activeCourses: 9,
  newStudentsThisMonth: 342,
  courseCompletions: 1287,
  avgRating: 4.6,
  totalEnrollments: 8934,
};

export const ADMIN_RECENT_ACTIVITY = [
  { id: "a1", action: "New enrollment", detail: "Priya enrolled in AI-Based Trading Systems", time: "10 min ago" },
  { id: "a2", action: "Course completed", detail: "Amit completed F&O Trading Fundamentals", time: "25 min ago" },
  { id: "a3", action: "New review", detail: "5-star review on Prompt Engineering for Business", time: "1 hour ago" },
  { id: "a4", action: "Payment received", detail: "₹4,999 for Advanced Trading Strategies", time: "2 hours ago" },
  { id: "a5", action: "New student", detail: "Rahul Sharma registered", time: "3 hours ago" },
  { id: "a6", action: "Quiz completed", detail: "Neha scored 90% on Market Psychology Quiz", time: "4 hours ago" },
];

// ── Helper ──

export function getCourseById(id: string): Course | undefined {
  return MOCK_COURSES.find((c) => c.id === id);
}

export function getQuizById(courseId: string, quizId: string): Quiz | undefined {
  const course = getCourseById(courseId);
  return course?.quizzes?.find((q) => q.id === quizId);
}
