<img width="1080" height="1080" alt="Untitled design" src="https://github.com/user-attachments/assets/1e91f302-5b3c-47c7-99ca-c056ac5db277" />
<img width="1069" height="1046" alt="Untitled design (1)" src="https://github.com/user-attachments/assets/543f6572-0a01-4f30-ac5b-b11f5f24d8c1" />

# **Next Banking Application – Full-Stack Fintech Project with Next.js**  

This project is a **banking platform** that allows users to **connect real bank accounts, view balances, track transactions**, and **transfer real money between accounts**. Built with a **modern full-stack approach** using **Next.js, TypeScript, Appwrite, and Plaid**, this app emphasizes **security, real-time updates, and a polished user interface** for a seamless digital banking experience.  

---

## **Backend & Server-Side Services**  

- **Appwrite**:  
  - Handles **authentication**, **user management**, and **database storage**.  
  - Provides a secure and scalable backend-as-a-service.  

- **Plaid API**:  
  - Connects user accounts with **real financial institutions**.  
  - Securely accesses bank data and displays **account balances and transactions**.  

- **Dwolla API**:  
  - Enables **real-money transfers** between user-linked accounts.  
  - Facilitates secure fund movements in compliance with banking standards.  

- **Zod Validation**:  
  - Type-safe form validation schema, integrated with React Hook Form for robust data validation.  

- **Environment Management**:  
  - All sensitive keys (Plaid, Dwolla, Appwrite) are securely managed via `.env`.  

---

## **Frontend Development**  

- **Next.js with TypeScript**:  
  - Full-stack React framework with server-side rendering and API routing.  

- **Tailwind CSS**:  
  - Utility-first styling for fast, responsive, and consistent UI development.  

- **shadcn/ui Components**:  
  - Pre-built, accessible component library built on **Radix UI** primitives.  

- **Lucide React Icons**:  
  - Clean and consistent iconography throughout the app.  

- **Form Handling**:  
  - **React Hook Form** for efficient form state management.  
  - **Zod** used with resolver for schema-based form validation.  

- **Charts & Visual Feedback**:  
  - **Chart.js** via `react-chartjs-2` to show **doughnut charts** of account balances.  
  - **React CountUp** for animated numeric indicators.  

- **User Notifications**:  
  - **Sonner** toast system for immediate feedback on user actions (e.g., successful transfers).  

---

## **Application Features & Page Flow**  

### **1. Home Page**  
- Displays **connected bank accounts** and **real-time balances**.  
- Includes a **doughnut chart** to visualize financial distribution.  

### **2. My Banks Page**  
- Shows all **linked bank accounts or cards** using the **Plaid API**.  

### **3. Transaction History Page**  
- Lists all **previous transactions** in a **styled table**.  
- Pulls historical data from linked accounts.  

### **4. Transfer Page**  
- Secure form to **initiate a money transfer**.  
- Uses **React Hook Form + Zod** for validation.  
- On submission, integrates with **Dwolla API** to transfer funds.  

---

## **Technologies Used**  

- ![Next.js](https://img.shields.io/badge/-Next.js-000000?logo=next.js&logoColor=white&style=flat) **Next.js**  
- ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white&style=flat) **TypeScript**  
- ![TailwindCSS](https://img.shields.io/badge/-Tailwind%20CSS-38B2AC?logo=tailwindcss&logoColor=white&style=flat) **Tailwind CSS**  
- ![shadcn/ui](https://img.shields.io/badge/-shadcn/ui-000000?style=flat) **shadcn/ui**  
- ![Lucide](https://img.shields.io/badge/-Lucide%20Icons-000000?logo=lucide&logoColor=white&style=flat) **Lucide React**  
- ![React Hook Form](https://img.shields.io/badge/-React%20Hook%20Form-EC5990?logo=reacthookform&logoColor=white&style=flat) **React Hook Form**  
- ![Zod](https://img.shields.io/badge/-Zod-3E64FF?logo=zod&logoColor=white&style=flat) **Zod**  
- ![Chart.js](https://img.shields.io/badge/-Chart.js-FF6384?logo=chartdotjs&logoColor=white&style=flat) **Chart.js**  
- ![Appwrite](https://img.shields.io/badge/-Appwrite-F02E65?logo=appwrite&logoColor=white&style=flat) **Appwrite**  
- ![Plaid](https://img.shields.io/badge/-Plaid-000000?logo=plaid&logoColor=white&style=flat) **Plaid API**  
- ![Dwolla](https://img.shields.io/badge/-Dwolla-FF7400?logo=dwolla&logoColor=white&style=flat) **Dwolla API**  
- ![Sonner](https://img.shields.io/badge/-Sonner-191919?style=flat&logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCI+PHJlY3Qgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiByeD0iMiIvPjwvc3ZnPg==) **Sonner**  

---

## **Conclusion**  

This **Next Banking Application** merges modern frontend tooling with powerful backend services to deliver a **secure, real-money transfer platform**. With **real-time data visualization**, **live bank connections via Plaid**, and **actual fund transfers through Dwolla**, this project showcases the future of personal banking. The clean UI powered by **Tailwind CSS and shadcn/ui**, alongside **Next.js SSR capabilities**, ensures a smooth and responsive user experience throughout.  
