# Tandur: Farmer Empowerment Platform Through Digital Transparency

[![Next.js](https://img.shields.io/badge/Next.js-Black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![Neon](https://img.shields.io/badge/Neon-41EE79?style=for-the-badge&logo=Neon&logoColor=white)](https://neon.tech/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-236262?style=for-the-badge&logo=Next.js&logoColor=white)](https://next-auth.js.org/)


The development of the Tandur platform will utilize a modern and proven technology stack to ensure scalability, optimal performance, data security and responsive user experience.

1.  **Next.js (Frontend Framework):** Chosen for SSR & SSG, rapid development, automatic image optimization, and scalability.
2.  **Prisma (ORM - Object-Relational Mapper):** Used for *type-safe* database interaction, easy schema migration, and intuitive queries.
3.  **Neon (Serverless PostgreSQL Database):** The choice for relational databases due to automatic scalability, separation of compute and storage, instant branches, full PostgreSQL compatibility, and cost efficiency.
4.  **NextAuth.js (Authentication & Authorization):** For secure and flexible authentication management, with easy OAuth integration and proven security.
5.  **Tailwind CSS (CSS Framework):** Used for fast UI/UX design, design consistency, high flexibility, and responsive by *default*.

## System Architecture

The system architecture of the Tandur platform is designed to be modern, scalable, and efficient, utilizing the latest technologies to ensure optimal performance and a seamless user experience.


* Client (Browser):** The main interface for users to interact with the platform.
**Next.js Page:** The core application *frontend*, responsible for page *rendering*, *routing*, and data request initiation. Can serve content via **SSR (Server-Side Rendering)** for fast and *SEO friendly* *loading*, or via **API Route** for dynamic data interaction after page load.
**Prism:** Serves as the ORM layer that bridges Next.js and the database, providing secure and *type-safe* data access, schema management, and consistency.
* Database (Neon):** The main repository for all platform data (farmer information, products, transactions, users), utilizing the auto-scalability and *serverless* architecture of Neon.
* Authentication Mechanism (NextAuth.js):** Integrated with Routes and Prisma APIs to manage user sessions, OAuth interactions, and validation of user information.
