<h2 align="left">Minimal Library Management System</h2>

###

<h2 align="left">Technologies Used</h2>

###

<p align="left">- React<br>- TypeScript<br>- Shadcn<br>- Zod (for input validation)<br>- Toast</p>

###

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="40" alt="typescript logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg" height="40" alt="react logo"  />
</div>

###

<h2 align="left">Features</h2>

###

<p align="left">- Comprehensive Book Management: Full CRUD (Create, Read, Update, Delete) operations for books, supporting a dynamic library catalog for the frontend.<br>- Book Borrowing Logic: Implements business rules for borrowing books, including real-time availability checks and tracking.<br>- Availability Control: Ensures accurate book availability status when books are borrowed or returned.<br>- Aggregated Summaries: Provides summarized data for borrowed books, useful for dashboard views or reporting on the frontend.<br>- Mongoose Middleware: Utilizes pre/post middleware for efficient data manipulation and validation.<br>- Static Methods: Includes static methods for streamlined operations like availability updates.<br>- Advanced Querying: Supports filtering and sorting for books, enabling flexible search and display on the frontend.</p>

###

<h2 align="left">Getting Started</h2>

###

<h3 align="left">Clone the Repository</h3>

###

<p align="left">https://github.com/rafirabby13/library-management-client</p>

###

<h3 align="left">Install Dependencies</h3>

###

<p align="left">npm install</p>

###

<h3 align="left">Available Scripts</h3>

###

<p align="left"># Start in development mode<br>npm run dev<br><br># Build TypeScript project<br>npm run build<br><br># Start the compiled project<br>npm start</p>

###

<h2 align="left">Library Management System Frontend Features</h2>

###

<p align="left">This frontend provides a complete interface for managing library books:<br><br>Book List Table: Displays all books with columns for Title, Author, Genre, ISBN, Copies, Availability, and Actions.<br><br>Action Buttons:<br><br>Edit Book: Opens a pre-filled form; updates reflect instantly. If copies become 0, the book is marked "Unavailable."<br><br>Delete Book: Confirmed via dialog before removal.<br><br>Borrow Book: Simple form to initiate borrowing.<br><br>Add New Book: Button to open a form with fields for Title, Author, Genre, ISBN, Description, Copies, and Availability. After submission, redirects to the book list with instant UI update.</p>

###

<h2 align="left">Validation & Error Handling</h2>

###

<h3 align="left">Generic Error Response:</h3>

###

<p align="left">{<br>  "message": "Validation failed",<br>  "success": false,<br>  "error": {<br>    "name": "ValidationError",<br>    "errors": {<br>      "copies": {<br>        "message": "Copies must be a positive number",<br>        "name": "ValidatorError"<br>      }<br>    }<br>  }<br>}</p>

###